ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "chats" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "messages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "document_chunks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "documents" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "Users can view their own profile" ON "users" AS PERMISSIVE FOR SELECT TO public USING ("users"."id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can update their own profile" ON "users" AS PERMISSIVE FOR UPDATE TO public USING ("users"."id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can manage their own chats" ON "chats" AS PERMISSIVE FOR ALL TO public USING ("chats"."user_id" = auth.uid()) WITH CHECK ("chats"."user_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can view messages of their chats" ON "messages" AS PERMISSIVE FOR ALL TO public USING (exists (select 1 from chats where chats.id = "messages"."chat_id" and chats.user_id = auth.uid())) WITH CHECK (exists (select 1 from chats where chats.id = "messages"."chat_id" and chats.user_id = auth.uid()));--> statement-breakpoint
CREATE POLICY "Users can manage their own documents" ON "documents" AS PERMISSIVE FOR ALL TO public USING ("documents"."user_id" = auth.uid()) WITH CHECK ("documents"."user_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can view chunks of their documents" ON "document_chunks" AS PERMISSIVE FOR ALL TO public USING (exists (select 1 from documents where documents.id = "document_chunks"."document_id" and documents.user_id = auth.uid())) WITH CHECK (exists (select 1 from documents where documents.id = "document_chunks"."document_id" and documents.user_id = auth.uid()));