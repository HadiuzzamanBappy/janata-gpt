import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './auth.js';

// ----------------------------------------------------------------------
// Chats
// NOTE: RLS policies are managed in Supabase Dashboard, not drizzle-kit push.
// Recommended RLS policy for chats:
//   USING (user_id = auth.uid())
//   WITH CHECK (user_id = auth.uid())
// ----------------------------------------------------------------------
export const chats = pgTable('chats', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull().default('New Conversation'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ----------------------------------------------------------------------
// Messages
// NOTE: RLS policy recommendation for messages:
//   USING (EXISTS (SELECT 1 FROM chats WHERE id = chat_id AND user_id = auth.uid()))
//   WITH CHECK (EXISTS (SELECT 1 FROM chats WHERE id = chat_id AND user_id = auth.uid()))
// ----------------------------------------------------------------------
export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  chatId: text('chat_id').notNull().references(() => chats.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  content: text('content').notNull(),
  toolCalls: jsonb('tool_calls'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

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
