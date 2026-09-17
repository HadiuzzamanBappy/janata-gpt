import { 
  users, roles, permissions, userRoles, rolePermissions,
  chats, messages,
  documents, documentChunks 
} from '@repo/db';

// ----------------------------------------------------------------------
// Auth Types
// ----------------------------------------------------------------------
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Role = typeof roles.$inferSelect;
export type InsertRole = typeof roles.$inferInsert;

export type Permission = typeof permissions.$inferSelect;
export type InsertPermission = typeof permissions.$inferInsert;

export type UserRole = typeof userRoles.$inferSelect;
export type RolePermission = typeof rolePermissions.$inferSelect;

// ----------------------------------------------------------------------
// AI Types
// ----------------------------------------------------------------------
export type Chat = typeof chats.$inferSelect;
export type InsertChat = typeof chats.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

// ----------------------------------------------------------------------
// RAG Types
// ----------------------------------------------------------------------
export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

export type DocumentChunk = typeof documentChunks.$inferSelect;
export type InsertDocumentChunk = typeof documentChunks.$inferInsert;
