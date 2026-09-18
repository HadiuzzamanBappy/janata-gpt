"use client";

import { Dialog, DialogContent, DialogTitle } from "@repo/ui";
import { Search, MessageSquare } from "lucide-react";
import { demoChats } from "@/lib/chats";
import { useState } from "react";

interface ChatSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatSearchModal({ open, onOpenChange }: ChatSearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredChats = demoChats.filter((chat) =>
    chat.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden rounded-xl border-border bg-popover max-w-2xl sm:max-w-2xl gap-0 shadow-2xl">
        <DialogTitle className="sr-only">Search Chats</DialogTitle>
        <div className="flex items-center px-4 py-3 border-b border-border/50">
          <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
          <input
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-base h-8"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredChats.length > 0 ? (
            <div className="flex flex-col">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                Recent chats
              </div>
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted text-left transition-colors text-sm text-foreground group"
                >
                  <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                  <span className="truncate flex-1 font-medium">{chat.title}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              No chats found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
