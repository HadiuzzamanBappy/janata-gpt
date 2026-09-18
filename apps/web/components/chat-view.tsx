"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppChatInput } from "@/components/app-chat-input";
import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "What can you do?",
  "Help me write a cover letter",
  "Explain quantum computing simply",
  "Create a weekly meal plan",
];

/**
 * New Chat landing page — the empty state.
 * On send, creates a new chat session and navigates to /chat/[id].
 */
export function NewChatView() {
  const router = useRouter();

  function handleSend(text: string) {
    if (!text.trim()) return;
    // Generate a new chat ID and pass the first message via query param
    const chatId = crypto.randomUUID().slice(0, 8);
    router.push(`/chat/${chatId}?q=${encodeURIComponent(text.trim())}`);
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl flex flex-col items-center gap-8 -mt-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Where should we begin?
          </h1>
        </div>

        <AppChatInput onSend={handleSend} />

        <div className="flex flex-wrap items-center justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-full hover:bg-muted hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared message types
// ─────────────────────────────────────────────────────────────

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

/**
 * Active chat session view.
 * Receives initial message from the URL query param on first load.
 */
export function ChatSessionView({
  initialMessage,
  existingMessages,
}: {
  initialMessage?: string;
  existingMessages?: import("@/lib/chats").ChatMessage[];
}) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Seed with existing demo messages if available
    if (existingMessages && existingMessages.length > 0) {
      return existingMessages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.timestamp),
      }));
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Seed first message from URL ?q= param (new chat flow only)
  useEffect(() => {
    if (initialMessage && !initialized.current && !existingMessages?.length) {
      initialized.current = true;
      sendMessage(initialMessage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Placeholder AI response — swap with real API call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `You said: "${text.trim()}". Connect your AI backend to replace this placeholder.`,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1200);
  }

  return (
    <div className="flex flex-col h-full w-full bg-background">

      {/* ── MESSAGES ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── BOTTOM INPUT ── */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm px-4 py-3 shrink-0">
        <div className="max-w-3xl mx-auto">
          <AppChatInput onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
}
