import { pgTable, text, timestamp, jsonb, customType } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { users } from './auth.js';

// ----------------------------------------------------------------------
// Custom Types & Extensions
// NOTE: Requires pgvector extension — already enabled in Supabase by default.
// Run in Supabase SQL Editor if needed: CREATE EXTENSION IF NOT EXISTS vector;
// ----------------------------------------------------------------------
const vector = customType<{ data: number[]; driverData: string }>({
  dataType() { return 'vector(1536)'; },
  toDriver(value: number[]): string { return JSON.stringify(value); },
  fromDriver(value: string): number[] { return typeof value === 'string' ? JSON.parse(value) : value; },
});

// ----------------------------------------------------------------------
// Documents
// NOTE: RLS policies are managed in Supabase Dashboard, not drizzle-kit push.
// Recommended RLS policy for documents:
//   USING (user_id = auth.uid())
//   WITH CHECK (user_id = auth.uid())
// ----------------------------------------------------------------------
export const documents = pgTable('documents', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ----------------------------------------------------------------------
// Document Chunks (RAG)
// NOTE: RLS policy recommendation for document_chunks:
//   USING (EXISTS (SELECT 1 FROM documents WHERE id = document_id AND user_id = auth.uid()))
// ----------------------------------------------------------------------
export const documentChunks = pgTable('document_chunks', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  documentId: text('document_id').notNull().references(() => documents.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  embedding: vector('embedding'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ----------------------------------------------------------------------
// Relations
// ----------------------------------------------------------------------
export const documentsRelations = relations(documents, ({ one, many }) => ({
  user: one(users, { fields: [documents.userId], references: [users.id] }),
  chunks: many(documentChunks),
}));

export const documentChunksRelations = relations(documentChunks, ({ one }) => ({
  document: one(documents, { fields: [documentChunks.documentId], references: [documents.id] }),
}));

// ----------------------------------------------------------------------
// RPC Function (run this once in Supabase SQL Editor)
// ----------------------------------------------------------------------
export const matchDocumentsRpc = sql`
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  document_id text,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    document_chunks.id,
    document_chunks.document_id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) AS similarity
  FROM document_chunks
  WHERE 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY document_chunks.embedding <=> query_embedding
  LIMIT match_count;
$$;
`;
