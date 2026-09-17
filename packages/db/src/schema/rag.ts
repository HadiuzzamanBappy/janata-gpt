import { pgTable, text, timestamp, jsonb, customType, pgPolicy } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { users } from './auth.js';

// ----------------------------------------------------------------------
// Custom Types & Extensions
// ----------------------------------------------------------------------
const vector = customType<{ data: number[]; driverData: string }>({
  dataType() { return 'vector(1536)'; },
  toDriver(value: number[]): string { return JSON.stringify(value); },
  fromDriver(value: string): number[] { return typeof value === 'string' ? JSON.parse(value) : value; },
});

// ----------------------------------------------------------------------
// Documents
// ----------------------------------------------------------------------
export const documents = pgTable('documents', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => [
  pgPolicy('Users can manage their own documents', {
    as: 'permissive',
    for: 'all',
    to: 'public',
    using: sql`${table.userId} = auth.uid()`,
    withCheck: sql`${table.userId} = auth.uid()`,
  })
]);

// ----------------------------------------------------------------------
// Document Chunks (RAG)
// ----------------------------------------------------------------------
export const documentChunks = pgTable('document_chunks', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  documentId: text('document_id').notNull().references(() => documents.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  embedding: vector('embedding'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => [
  pgPolicy('Users can view chunks of their documents', {
    as: 'permissive',
    for: 'all',
    to: 'public',
    using: sql`exists (select 1 from documents where documents.id = ${table.documentId} and documents.user_id = auth.uid())`,
    withCheck: sql`exists (select 1 from documents where documents.id = ${table.documentId} and documents.user_id = auth.uid())`,
  })
]);

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
// RPC Functions (Raw SQL string to be executed)
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
