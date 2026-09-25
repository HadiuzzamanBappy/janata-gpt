"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useChat, Chat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { AppChatInput } from "@/components/chat/chat-input";
import {
  Sparkles,
  Copy,
  Pencil,
  RefreshCw,
  MoreHorizontal,
  BookOpen,
  GitMerge,
  Volume2,
  ThumbsUp,
  ThumbsDown,
  Check,
  Share,
  Files,
  Pin,
  Archive,
  Trash2,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button
} from "@repo/ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@repo/ui/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

/** Extract plain text from any message (ai@7 uses parts[], fallback to content). */
function getMsgText(msg: UIMessage): string {
  if (msg.parts && msg.parts.length > 0) {
    return msg.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { type: "text"; text: string }).text)
      .join("");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (msg as any).content ?? "";
}

const SUGGESTIONS = [
  "What can you do?",
  "Help me write a cover letter",
  "Explain quantum computing simply",
  "Create a weekly meal plan",
];

export function NewChatView() {
  const router = useRouter();

  function handleSend(text: string) {
    if (!text.trim()) return;
    const chatId = crypto.randomUUID().slice(0, 8);
    router.push(`/chat/${chatId}?q=${encodeURIComponent(text.trim())}`);
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-background">
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

export type ChatAlert = {
  id: string;
  type: "info" | "promo" | "error";
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
};

export function ChatSessionView({
  sessionId,
  initialMessage,
  existingMessages,
}: {
  sessionId?: string;
  initialMessage?: string;
  existingMessages?: UIMessage[];
}) {
  // In ai@7, api + body are configured on DefaultChatTransport, not ChatInit
  const chatInstance = useMemo(
    () =>
      new Chat({
        id: sessionId ?? "new-chat",
        messages: existingMessages ?? [],
        transport: new DefaultChatTransport({
          api: "/api/chat",
          body: { sessionId },
        }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionId]
  );

  const { messages, sendMessage, status, setMessages } = useChat({ chat: chatInstance });

  const isLoading = status === "streaming" || status === "submitted";

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeAlert, setActiveAlert] = useState<ChatAlert | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialMessage && !initialized.current && !existingMessages?.length) {
      initialized.current = true;
      handleSend(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSend(text: string) {
    if (!text.trim()) return;

    void sendMessage({
      text: text.trim(),
    });

    const newUserMsgCount = messages.filter((m) => m.role === "user").length + 1;

    if (newUserMsgCount === 5) {
      setActiveAlert({
        id: "limit_reached",
        type: "error",
        title: "Usage limit reached",
        description: "You've hit the free tier message limit. Upgrade to Pro to continue chatting.",
        actionText: "Upgrade to Pro",
        onAction: () => console.log("Open upgrade modal"),
      });
    } else if (newUserMsgCount === 2) {
      setActiveAlert({
        id: "promo_plus",
        type: "promo",
        title: "Improve accuracy for technical work",
        description: "Upgrade to Plus and use increased reasoning to debug code, work through systems, and solve math or science problems.",
        actionText: "Get Plus",
        onAction: () => console.log("Open plus upgrade"),
      });
    }
  }

  function handleSaveEdit(id: string) {
    if (!editContent.trim()) {
      setEditingMessageId(null);
      return;
    }
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, parts: [{ type: "text" as const, text: editContent.trim() }] }
          : m
      )
    );
    setEditingMessageId(null);
  }

  function handleCopy(id: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-background">
      {/* ── CHAT ACTIONS ── */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 pointer-events-auto">
        <Button variant="ghost" className="rounded-full font-semibold px-4 h-9 text-muted-foreground hover:text-foreground">
          <Share className="size-4 mr-2" />Share
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/80 hover:bg-muted text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-border/60 p-1">
            <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium"><Files className="size-4 text-muted-foreground" />View files in chat</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium"><Pin className="size-4 text-muted-foreground" />Pin chat</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium"><Archive className="size-4 text-muted-foreground" />Archive</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="size-4" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── MESSAGES ── */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="max-w-3xl mx-auto px-4 pt-8 pb-48 flex flex-col gap-6 w-full">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 group ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex flex-col gap-1 w-full max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                {editingMessageId === msg.id ? (
                  <div className="flex flex-col gap-3 w-full bg-muted/60 p-4 rounded-3xl mt-2">
                    <TextareaAutosize
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-transparent text-foreground text-sm resize-none outline-none leading-relaxed"
                      minRows={2}
                      autoFocus
                    />
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <Button variant="ghost" className="h-8 px-4 rounded-full text-xs font-semibold" onClick={() => setEditingMessageId(null)}>Cancel</Button>
                      <Button className="h-8 px-4 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleSaveEdit(msg.id)}>Send</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`text-sm leading-relaxed ${msg.role === "user" ? "px-4 py-3 rounded-2xl bg-primary text-primary-foreground rounded-br-sm" : "text-foreground pt-1 flex flex-col gap-2 w-full"}`}>
                      {msg.role === "user" ? (
                        getMsgText(msg)
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
                              const match = /language-(\w+)/.exec(className || "");
                              return !inline && match ? (
                                <SyntaxHighlighter {...props} style={vscDarkPlus} language={match[1]} PreTag="div" className="rounded-lg my-2 border border-border/50 text-xs">
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code {...props} className={cn("bg-muted px-1.5 py-0.5 rounded-md font-mono text-[0.85em]", className)}>{children}</code>
                              );
                            },
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-7">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            h1: ({ children }) => <h1 className="text-2xl font-bold mb-2 mt-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-bold mb-2 mt-4">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-3">{children}</h3>,
                          }}
                        >
                          {getMsgText(msg)}
                        </ReactMarkdown>
                      )}
                    </div>

                    {/* CTA Actions */}
                    <div className={`flex items-center gap-1 mt-0.5 transition-opacity text-muted-foreground ${msg.role === "user" ? "justify-end opacity-0 group-hover:opacity-100" : "justify-start opacity-100"}`}>
                      <button className="p-1.5 hover:bg-muted hover:text-foreground rounded-full transition-colors" title="Copy" onClick={() => handleCopy(msg.id, getMsgText(msg))}>
                        {copiedId === msg.id ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                      </button>
                      {msg.role === "user" ? (
                        <button onClick={() => { setEditContent(getMsgText(msg)); setEditingMessageId(msg.id); }} className="p-1.5 hover:bg-muted hover:text-foreground rounded-full transition-colors" title="Edit">
                          <Pencil className="size-3.5" />
                        </button>
                      ) : (
                        <>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="p-1.5 hover:bg-muted hover:text-foreground rounded-full transition-colors outline-none flex items-center gap-0.5" title="Feedback">
                              <ThumbsUp className="size-3.5" /><ThumbsDown className="size-3.5 mt-1" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-44 rounded-xl shadow-lg border-border/60" sideOffset={8}>
                              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2"><ThumbsUp className="size-4 text-muted-foreground" /><span>Good response</span></DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2"><ThumbsDown className="size-4 text-muted-foreground" /><span>Bad response</span></DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <button className="p-1.5 hover:bg-muted hover:text-foreground rounded-full transition-colors" title="Regenerate"><RefreshCw className="size-3.5" /></button>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="p-1.5 hover:bg-muted hover:text-foreground rounded-full transition-colors outline-none" title="More options">
                              <MoreHorizontal className="size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48 rounded-xl shadow-lg border-border/60">
                              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2"><BookOpen className="size-4 text-muted-foreground" /><span>View sources</span></DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2"><GitMerge className="size-4 text-muted-foreground" /><span>Branch in new chat</span></DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2"><Volume2 className="size-4 text-muted-foreground" /><span>Read aloud</span></DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="text-sm text-foreground pt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── BOTTOM INPUT ── */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-2 pointer-events-none bg-transparent flex justify-center">
        <div className="max-w-3xl w-full flex flex-col gap-2 pointer-events-auto">
          {activeAlert && (
            <div className={`w-full border rounded-2xl p-3 flex items-start justify-between gap-4 shadow-sm ${activeAlert.type === "error" ? "bg-destructive/10 border-destructive/20" : "bg-muted border-border/50"}`}>
              <div className="flex flex-col gap-0.5">
                <span className={`text-sm font-semibold ${activeAlert.type === "error" ? "text-destructive" : "text-foreground"}`}>{activeAlert.title}</span>
                <span className={`text-sm ${activeAlert.type === "error" ? "text-destructive/90" : "text-muted-foreground"}`}>{activeAlert.description}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {activeAlert.actionText && (
                  <Button className={`rounded-full h-8 px-4 text-xs font-semibold ${activeAlert.type === "error" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                    onClick={() => { activeAlert.onAction?.(); setActiveAlert(null); }}>
                    {activeAlert.actionText}
                  </Button>
                )}
                <button className={`p-1 transition-colors ${activeAlert.type === "error" ? "text-destructive hover:text-destructive/80" : "text-muted-foreground hover:text-foreground"}`} onClick={() => setActiveAlert(null)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          <AppChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
