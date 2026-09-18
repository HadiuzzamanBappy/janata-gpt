import { ChatSessionView } from "@/components/chat-view";
import { getChatById } from "@/lib/chats";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { id } = await params;
  const { q } = await searchParams;

  // Load existing chat from demo data (sidebar navigation)
  const existingChat = getChatById(id);

  return (
    <ChatSessionView
      key={id}
      initialMessage={q}
      existingMessages={existingChat?.messages}
    />
  );
}
