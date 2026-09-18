import { AppChatInput } from "@/components/app-chat-input";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl flex flex-col items-center gap-8 -mt-20">
        
        {/* Heading */}
        <h1 className="text-3xl font-medium text-foreground tracking-tight">
          Where should we begin?
        </h1>

        {/* Input Bar */}
        <AppChatInput />

        {/* Suggestion Pill */}
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-full hover:bg-muted transition-colors">
          What can you do?
        </button>

      </div>
    </div>
  );
}
