import { pgTable, text, timestamp, jsonb, pgPolicy } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { users } from './auth.js';

// ----------------------------------------------------------------------
// Chats
// ----------------------------------------------------------------------
export const chats = pgTable('chats', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull().default('New Conversation'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => [
  pgPolicy('Users can manage their own chats', {
    as: 'permissive',
    for: 'all',
    to: 'public',
    using: sql`${table.userId} = auth.uid()`,
    withCheck: sql`${table.userId} = auth.uid()`,
  })
]);

// ----------------------------------------------------------------------
// Messages
// ----------------------------------------------------------------------
export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  chatId: text('chat_id').notNull().references(() => chats.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  content: text('content').notNull(),
  toolCalls: jsonb('tool_calls'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => [
  // A bit more advanced: Users can only see messages if they own the parent chat
  pgPolicy('Users can view messages of their chats', {
    as: 'permissive',
    for: 'all',
    to: 'public',
    using: sql`exists (select 1 from chats where chats.id = ${table.chatId} and chats.user_id = auth.uid())`,
    withCheck: sql`exists (select 1 from chats where chats.id = ${table.chatId} and chats.user_id = auth.uid())`,
  })
]);

// ----------------------------------------------------------------------
// Relations
// ----------------------------------------------------------------------
export const chatsRelations = relations(chats, ({ one, many }) => ({
  user: one(users, { fields: [chats.userId], references: [users.id] }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, { fields: [messages.chatId], references: [chats.id] }),
}));
