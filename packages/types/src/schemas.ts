import { z } from 'zod';

// ----------------------------------------------------------------------
// Auth Schemas
// ----------------------------------------------------------------------
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

// ----------------------------------------------------------------------
// AI & Chat Schemas
// ----------------------------------------------------------------------
export const CreateChatSchema = z.object({
  title: z.string().min(1, 'Title is required').optional().default('New Conversation'),
});

export const SendMessageSchema = z.object({
  chatId: z.string().uuid('Invalid Chat ID'),
  content: z.string().min(1, 'Message cannot be empty'),
  role: z.enum(['user', 'assistant', 'system', 'tool']).default('user'),
});

// ----------------------------------------------------------------------
// RAG & Document Schemas
// ----------------------------------------------------------------------
export const UploadDocumentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Document content cannot be empty'),
});

export const SearchDocumentsSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty'),
  matchCount: z.number().int().min(1).max(20).default(5),
  matchThreshold: z.number().min(0).max(1).default(0.7),
});
