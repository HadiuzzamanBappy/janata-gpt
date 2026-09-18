"use client";

import { Button } from "@repo/ui";
import { Sparkles, Plus, Image as ImageIcon, PenLine, Globe, Mic, Headphones } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#212121] text-zinc-300">
      
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-4 w-full absolute top-0 left-0 right-0 z-10">
        <div className="flex-1 md:flex hidden">
           {/* Sidebar toggle is in layout */}
           <span className="text-xl font-semibold text-white ml-2">ChatGPT</span>
        </div>
        
        <div className="flex justify-center flex-1">
          <div className="flex bg-[#2F2F2F] p-1 rounded-full border border-white/5 shadow-sm">
            <button className="px-6 py-1.5 text-sm font-medium bg-[#424242] text-white rounded-full shadow-sm">
              Chat
            </button>
            <button className="px-6 py-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 rounded-full transition-colors flex items-center gap-1">
              <Plus className="w-3 h-3" /> Work
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-3">
           <Button variant="ghost" size="sm" className="hidden md:flex text-indigo-400 hover:text-indigo-300 hover:bg-white/5 h-8 gap-1.5 rounded-full px-3">
             <Sparkles className="w-4 h-4" />
             <span className="font-medium">Upgrade plan</span>
           </Button>
           <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-200 rounded-full">
             <div className="w-4 h-4 border-2 border-current rounded-full" />
           </Button>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center pt-14 pb-48 px-4">
        <h1 className="text-3xl font-semibold text-white mb-8">
          Ready when you are.
        </h1>

        {/* Action Pills */}
        <div className="flex flex-col gap-3 w-full max-w-2xl px-4 md:px-0 opacity-80">
          <button className="flex items-center gap-3 p-3 text-sm text-zinc-300 hover:text-white bg-transparent hover:bg-[#2F2F2F] transition-colors rounded-xl border border-transparent hover:border-white/5 w-fit">
            <ImageIcon className="w-4 h-4" />
            Create an image
          </button>
          <button className="flex items-center gap-3 p-3 text-sm text-zinc-300 hover:text-white bg-transparent hover:bg-[#2F2F2F] transition-colors rounded-xl border border-transparent hover:border-white/5 w-fit">
            <PenLine className="w-4 h-4" />
            Write or edit
          </button>
          <button className="flex items-center gap-3 p-3 text-sm text-zinc-300 hover:text-white bg-transparent hover:bg-[#2F2F2F] transition-colors rounded-xl border border-transparent hover:border-white/5 w-fit">
            <Globe className="w-4 h-4" />
            Search the web
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent">
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center bg-[#2F2F2F] rounded-full border border-white/10 shadow-lg px-2 h-[52px]">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-zinc-400 hover:text-white rounded-full">
               <Plus className="w-5 h-5" />
            </Button>
            <input 
              type="text" 
              placeholder="Ask anything" 
              className="flex-1 bg-transparent border-0 outline-none text-white px-2 placeholder:text-zinc-500 text-sm focus:ring-0"
            />
            <div className="flex items-center gap-1 pr-1 shrink-0">
               <Button variant="ghost" size="sm" className="hidden sm:flex h-8 gap-1.5 px-3 rounded-full text-zinc-400 hover:text-white hover:bg-white/5">
                 <Globe className="w-4 h-4" />
                 <span className="text-xs font-medium">Think</span>
               </Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white rounded-full">
                 <Mic className="w-4 h-4" />
               </Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 bg-[#424242] text-white hover:bg-[#525252] rounded-full shadow-sm ml-1">
                 <Headphones className="w-4 h-4" />
               </Button>
            </div>
          </div>
          <div className="text-center mt-3">
             <span className="text-[11px] text-zinc-500">ChatGPT can make mistakes. Check important info.</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
