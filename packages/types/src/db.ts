import type { Tables } from './supabase.js';

// ==============================================================================
// 2. EXPLICIT TABLE SHORTCUTS
// ==============================================================================
// Exporting the exact names so your frontend can just `import { User, ChatSession } from '@repo/types'`
export type User = Tables<'users'>;
export type Organization = Tables<'org_organizations'>;
export type SaasPlan = Tables<'saas_plans'>;
export type SaasSubscription = Tables<'saas_subscriptions'>;
export type UsageLog = Tables<'usage_logs'>;
export type Project = Tables<'projects'>;
export type Plugin = Tables<'plugins'>;
export type UserPlugin = Tables<'user_plugins'>;
export type SysFile = Tables<'sys_files'>;
export type LibraryItem = Tables<'library_items'>;
export type ChatSession = Tables<'chat_sessions'>;
export type ChatMessage = Tables<'chat_messages'>;
export type ChatAttachment = Tables<'chat_attachments'>;
export type ScheduledTask = Tables<'scheduled_tasks'>;
export type ScheduledRun = Tables<'scheduled_runs'>;
export type ImageGeneration = Tables<'image_generations'>;

// ==============================================================================
// 3. STRICT JSONB SCHEMAS
// ==============================================================================
// Supabase generates JSONB columns as a generic `Json` type (which could be anything).
// We define strict TypeScript interfaces here to map to our specific JSONB columns.

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  sidebar_state?: 'expanded' | 'collapsed';
  default_model?: string;
}

export interface OrgSettings {
  default_system_prompt?: string;
  allowed_models?: string[];
}

export interface PlanLimits {
  max_documents?: number;
  max_chats?: number;
  max_tokens?: number;
  max_plugins?: number;
}

export interface PluginAuthSchema {
  type: 'bearer' | 'basic' | 'oauth';
  label: string;
  placeholder?: string;
}

export interface UsageMetadata {
  model?: string;
  input_tokens?: number;
  output_tokens?: number;
}

// Maps directly to the Vercel AI SDK Tool Call structure
export interface ToolCallData {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  result?: Record<string, unknown>;
}

// ==============================================================================
// 4. STRONGLY TYPED OVERRIDES
// ==============================================================================
// If you want to use the database rows but with strictly typed JSONB columns instead
// of the generic `Json` type, use these overridden interfaces in your frontend.

export interface TypedUser extends Omit<User, 'preferences_json'> {
  preferences_json: UserPreferences | null;
}

export interface TypedOrganization extends Omit<Organization, 'settings_json'> {
  settings_json: OrgSettings | null;
}

export interface TypedSaasPlan extends Omit<SaasPlan, 'limits_json'> {
  limits_json: PlanLimits | null;
}

export interface TypedChatMessage extends Omit<ChatMessage, 'tool_calls_json'> {
  tool_calls_json: ToolCallData[] | null;
}
