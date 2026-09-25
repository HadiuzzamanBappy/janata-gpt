import { ChatSessionView } from "@/components/chat/chat-view";
import { createSupabaseServerClient } from "@repo/auth/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UIMessage } from "ai";

interface ChatMessageRow {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { id } = await params;
  const { q } = await searchParams;

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // Fetch real chat messages from Supabase
  const { data: rawMessages } = await supabase
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("session_id", id)
    .order("created_at", { ascending: true });

  // Map to ai@7 UIMessage format — requires `parts` array, not flat `content`
  const formattedMessages: UIMessage[] = (rawMessages as ChatMessageRow[] ?? []).map(
    (msg) => ({
      id: msg.id,
      role: msg.role as "user" | "assistant" | "system",
      content: msg.content,
      parts: [{ type: "text" as const, text: msg.content }],
      createdAt: new Date(msg.created_at),
    })
  );

  return (
    <ChatSessionView
      key={id}
      sessionId={id}
      initialMessage={q}
      existingMessages={formattedMessages}
    />
  );
}
