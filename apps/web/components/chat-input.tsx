"use client";

import { useState, useRef, useEffect } from "react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  cn
} from "@repo/ui";
import { Plus, ArrowUp, Paperclip, Globe, Image as ImageIcon, Telescope, FilePlus2 } from "lucide-react";

export function AppChatInput({ onSend }: { onSend?: (text: string) => void }) {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    if (!input.trim()) return;
    onSend?.(input.trim());
    setInput("");
  }

  // Auto-resize and expansion logic
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // MEASUREMENT PHASE
    // 1. Temporarily disable transitions so layout changes are synchronous and measureable
    const prevTransition = el.style.transition;
    el.style.transition = 'none';
    
    const prevPadding = el.style.padding;
    const prevHeight = el.style.height;
    
    // 2. Force collapsed padding to accurately measure if text naturally wraps to 2+ lines
    // Equivalent to py-[10px] px-[48px]
    el.style.padding = '10px 48px'; 
    el.style.height = '0px'; // Force shrink
    
    // 3. Check if text wraps based on natural height
    const collapsedScrollHeight = el.scrollHeight;
    
    // A single line is ~44px (10px + 10px + 24px line-height). If it wraps, it exceeds 46px.
    const shouldExpand = collapsedScrollHeight > 46 || input.includes('\n');
    setIsExpanded(shouldExpand);
    
    // 4. Measure the final height based on what the target state WILL be
    el.style.padding = shouldExpand ? '12px 12px 48px 12px' : '10px 48px'; // p-3 pb-12 vs py-[10px] px-[48px]
    el.style.height = '0px';
    const finalHeight = el.scrollHeight;
    
    // CLEANUP PHASE
    // Restore all original styles so React/Tailwind handles the rendering
    el.style.padding = prevPadding; 
    el.style.height = prevHeight;
    
    // Force a reflow so the browser applies the restored state BEFORE re-enabling transitions
    void el.offsetHeight;
    el.style.transition = prevTransition;
    
    // Apply final height smoothly
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = `${finalHeight}px`;
      }
    });
  }, [input]);

  const AttachmentButton = (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<div />}>
            <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-muted-foreground/20 rounded-full transition-colors shrink-0 outline-none cursor-pointer">
              <Plus className="w-5 h-5" />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Attach</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="start" sideOffset={12} className="w-[280px] p-2 bg-popover border-border rounded-xl shadow-lg">
        <DropdownMenuItem className="gap-3 py-3 px-3 cursor-pointer text-foreground rounded-lg hover:bg-muted font-medium">
          <Paperclip className="w-5 h-5" />
          <span>Add photos</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3 py-3 px-3 cursor-pointer text-foreground rounded-lg hover:bg-muted font-medium">
          <Globe className="w-5 h-5" />
          <span>Web search</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-2 bg-border/50" />
        
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
          Log in to use...
        </div>
        
        <DropdownMenuItem disabled className="gap-3 py-3 px-3 text-muted-foreground/50 rounded-lg font-medium">
          <ImageIcon className="w-5 h-5" />
          <span>Create image</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="gap-3 py-3 px-3 text-muted-foreground/50 rounded-lg font-medium">
          <Telescope className="w-5 h-5" />
          <span>Deep research</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="gap-3 py-3 px-3 text-muted-foreground/50 rounded-lg font-medium">
          <FilePlus2 className="w-5 h-5" />
          <span>Add files</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const SendButton = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={handleSend}
          className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer",
          input.trim().length > 0 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/30"
        )}>
          <ArrowUp className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          <p>Send message</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className={cn(
      "w-full relative bg-muted/50 hover:bg-muted border border-border/50 transition-all duration-300 ease-in-out",
      isExpanded ? "rounded-3xl shadow-sm" : "rounded-full"
    )}>
      
      <textarea 
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        placeholder="Ask Janata GPT"
        rows={1}
        className={cn(
          "w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-base resize-none overflow-hidden transition-all duration-300 ease-in-out block",
          isExpanded ? "p-3 pb-12" : "py-[10px] pl-[48px] pr-[48px]"
        )}
        style={{ 
          whiteSpace: "pre-wrap"
        }}
      />
      
      <div className="absolute left-[6px] bottom-[6px] z-10 flex items-center justify-center">
        {AttachmentButton}
      </div>
      
      <div className="absolute right-[6px] bottom-[6px] z-10 flex items-center justify-center">
        {SendButton}
      </div>
    </div>
  );
}
