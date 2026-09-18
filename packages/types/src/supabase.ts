export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      chat_attachments: {
        Row: {
          created_at: string | null
          file_id: string | null
          id: string
          message_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_id?: string | null
          id?: string
          message_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_id?: string | null
          id?: string
          message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_attachments_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "sys_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          feedback_comment: string | null
          feedback_rating: string | null
          finish_reason: string | null
          id: string
          input_tokens: number | null
          model: string | null
          output_tokens: number | null
          parent_id: string | null
          role: string
          session_id: string | null
          tool_calls_json: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          feedback_comment?: string | null
          feedback_rating?: string | null
          finish_reason?: string | null
          id?: string
          input_tokens?: number | null
          model?: string | null
          output_tokens?: number | null
          parent_id?: string | null
          role: string
          session_id?: string | null
          tool_calls_json?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          feedback_comment?: string | null
          feedback_rating?: string | null
          finish_reason?: string | null
          id?: string
          input_tokens?: number | null
          model?: string | null
          output_tokens?: number | null
          parent_id?: string | null
          role?: string
          session_id?: string | null
          tool_calls_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          is_archived: boolean | null
          is_pinned: boolean | null
          metadata_json: Json | null
          organization_id: string | null
          project_id: string | null
          share_token: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          is_pinned?: boolean | null
          metadata_json?: Json | null
          organization_id?: string | null
          project_id?: string | null
          share_token?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          is_pinned?: boolean | null
          metadata_json?: Json | null
          organization_id?: string | null
          project_id?: string | null
          share_token?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "org_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      image_generations: {
        Row: {
          aspect_ratio: string | null
          created_at: string | null
          file_id: string | null
          id: string
          message_id: string | null
          model_used: string | null
          negative_prompt: string | null
          prompt: string
          revised_prompt: string | null
          seed: number | null
          user_id: string | null
        }
        Insert: {
          aspect_ratio?: string | null
          created_at?: string | null
          file_id?: string | null
          id?: string
          message_id?: string | null
          model_used?: string | null
          negative_prompt?: string | null
          prompt: string
          revised_prompt?: string | null
          seed?: number | null
          user_id?: string | null
        }
        Update: {
          aspect_ratio?: string | null
          created_at?: string | null
          file_id?: string | null
          id?: string
          message_id?: string | null
          model_used?: string | null
          negative_prompt?: string | null
          prompt?: string
          revised_prompt?: string | null
          seed?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_generations_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "sys_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_generations_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_generations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      library_items: {
        Row: {
          content: string | null
          created_at: string | null
          file_id: string | null
          id: string
          project_id: string | null
          tags: string[] | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          file_id?: string | null
          id?: string
          project_id?: string | null
          tags?: string[] | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          file_id?: string | null
          id?: string
          project_id?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "library_items_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "sys_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "library_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "library_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      org_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          expires_at: string
          id: string
          organization_id: string | null
          role: string
          token_hash: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          organization_id?: string | null
          role: string
          token_hash: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          organization_id?: string | null
          role?: string
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "org_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      org_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "org_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      org_organizations: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string | null
          settings_json: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id?: string | null
          settings_json?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          settings_json?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plugins: {
        Row: {
          auth_schema_json: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          logo_url: string | null
          mcp_endpoint_url: string | null
          name: string
        }
        Insert: {
          auth_schema_json?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          logo_url?: string | null
          mcp_endpoint_url?: string | null
          name: string
        }
        Update: {
          auth_schema_json?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          logo_url?: string | null
          mcp_endpoint_url?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "plugins_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_collaborators: {
        Row: {
          created_at: string | null
          id: string
          project_id: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_collaborators_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          emoji: string | null
          id: string
          is_archived: boolean | null
          name: string
          organization_id: string | null
          owner_id: string | null
          share_token: string | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          emoji?: string | null
          id?: string
          is_archived?: boolean | null
          name: string
          organization_id?: string | null
          owner_id?: string | null
          share_token?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          emoji?: string | null
          id?: string
          is_archived?: boolean | null
          name?: string
          organization_id?: string | null
          owner_id?: string | null
          share_token?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "org_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saas_plans: {
        Row: {
          created_at: string | null
          features_json: Json | null
          id: string
          limits_json: Json | null
          live_id: string | null
          monthly_price: number | null
          name: string
          price_label: string | null
          test_id: string | null
          yearly_price: number | null
        }
        Insert: {
          created_at?: string | null
          features_json?: Json | null
          id?: string
          limits_json?: Json | null
          live_id?: string | null
          monthly_price?: number | null
          name: string
          price_label?: string | null
          test_id?: string | null
          yearly_price?: number | null
        }
        Update: {
          created_at?: string | null
          features_json?: Json | null
          id?: string
          limits_json?: Json | null
          live_id?: string | null
          monthly_price?: number | null
          name?: string
          price_label?: string | null
          test_id?: string | null
          yearly_price?: number | null
        }
        Relationships: []
      }
      saas_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string
          current_period_start: string | null
          id: string
          organization_id: string | null
          plan_id: string | null
          provider: string | null
          provider_subscription_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end: string
          current_period_start?: string | null
          id?: string
          organization_id?: string | null
          plan_id?: string | null
          provider?: string | null
          provider_subscription_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string
          current_period_start?: string | null
          id?: string
          organization_id?: string | null
          plan_id?: string | null
          provider?: string | null
          provider_subscription_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saas_subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "org_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saas_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "saas_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_runs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          output_content: string | null
          status: string
          task_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          output_content?: string | null
          status: string
          task_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          output_content?: string | null
          status?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_runs_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "scheduled_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_tasks: {
        Row: {
          created_at: string | null
          cron_expression: string
          id: string
          next_run_at: string | null
          prompt_content: string
          status: string | null
          target_plugin_id: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          cron_expression: string
          id?: string
          next_run_at?: string | null
          prompt_content: string
          status?: string | null
          target_plugin_id?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          cron_expression?: string
          id?: string
          next_run_at?: string | null
          prompt_content?: string
          status?: string | null
          target_plugin_id?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_tasks_target_plugin_id_fkey"
            columns: ["target_plugin_id"]
            isOneToOne: false
            referencedRelation: "plugins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sys_files: {
        Row: {
          created_at: string | null
          file_name: string
          id: string
          mime_type: string | null
          organization_id: string | null
          size_bytes: number | null
          storage_path: string
          uploader_id: string | null
          visibility: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          id?: string
          mime_type?: string | null
          organization_id?: string | null
          size_bytes?: number | null
          storage_path: string
          uploader_id?: string | null
          visibility?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          id?: string
          mime_type?: string | null
          organization_id?: string | null
          size_bytes?: number | null
          storage_path?: string
          uploader_id?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sys_files_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "org_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sys_files_uploader_id_fkey"
            columns: ["uploader_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_logs: {
        Row: {
          action_type: string
          amount: number | null
          created_at: string | null
          id: string
          metadata_json: Json | null
          organization_id: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          amount?: number | null
          created_at?: string | null
          id?: string
          metadata_json?: Json | null
          organization_id?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          amount?: number | null
          created_at?: string | null
          id?: string
          metadata_json?: Json | null
          organization_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "org_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_plugins: {
        Row: {
          created_at: string | null
          credentials_json: Json | null
          id: string
          is_active: boolean | null
          plugin_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credentials_json?: Json | null
          id?: string
          is_active?: boolean | null
          plugin_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credentials_json?: Json | null
          id?: string
          is_active?: boolean | null
          plugin_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_plugins_plugin_id_fkey"
            columns: ["plugin_id"]
            isOneToOne: false
            referencedRelation: "plugins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_plugins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          locale: string | null
          preferences_json: Json | null
          status: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          locale?: string | null
          preferences_json?: Json | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          locale?: string | null
          preferences_json?: Json | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
