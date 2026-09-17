import { z } from 'zod';
import * as schemas from './schemas.js';

// ----------------------------------------------------------------------
// Generic API Response Wrappers
// ----------------------------------------------------------------------
export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>; // e.g., pagination data
};

export type ApiError = {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown; // e.g., Zod validation errors
  };
};

/**
 * Standardized API Response for all endpoints in the monorepo.
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ----------------------------------------------------------------------
// Inferred API Request Types (from Zod Schemas)
// ----------------------------------------------------------------------

// Auth
export type LoginRequest = z.infer<typeof schemas.LoginSchema>;
export type RegisterRequest = z.infer<typeof schemas.RegisterSchema>;

// AI & Chat
export type CreateChatRequest = z.infer<typeof schemas.CreateChatSchema>;
export type SendMessageRequest = z.infer<typeof schemas.SendMessageSchema>;

// RAG & Documents
export type UploadDocumentRequest = z.infer<typeof schemas.UploadDocumentSchema>;
export type SearchDocumentsRequest = z.infer<typeof schemas.SearchDocumentsSchema>;
