"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@repo/ui";
import {
  Filter,
  Check,
  Plus,
  Mic,
  ArrowUp,
  ChevronDown,
  Sun,
  BookOpen,
  Tag,
  Music,
  PartyPopper,
  Paperclip,
  Library,
  Image as ImageIcon,
  Globe,
  MapPin,
  Telescope,
  Cpu,
  LineChart,
} from "lucide-react";

const RECOMMENDED_TASKS = [
  {
    icon: <Sun className="size-6 text-yellow-500" />,
    title: "Daily brief",
    description: "Personalized daily briefing with updates about the topics that I care about most",
  },
  {
    icon: <BookOpen className="size-6 text-blue-400" />,
    title: "Weekend long read",
    description: "Every Saturday, find me an exceptional recent long read based on my interests",
  },
  {
    icon: <Tag className="size-6 text-orange-300" />,
    title: "Sale monitor",
    description: "Watch my favorite stores and let me know when there's a good sale",
  },
  {
    icon: <Music className="size-6 text-purple-400" />,
    title: "Concert alerts",
    description: "Let me know when artists I like announce concerts near me",
  },
  {
    icon: <PartyPopper className="size-6 text-pink-400" />,
    title: "Weekend ideas",
    description: "Every Thursday, send me ideas for things to do nearby this weekend",
  },
];

const TOOLS = [
  { icon: <Paperclip className="size-4" />, name: "Add photos & files", desc: "Upload from computer" },
  { icon: <Library className="size-4" />, name: "Add from library", desc: "Browse and search your files" },
  { icon: <ImageIcon className="size-4 text-blue-400" />, name: "Create image", desc: "Visualize anything" },
  { icon: <Globe className="size-4 text-cyan-400" />, name: "Web search", desc: "Find real-time news and info" },
  { icon: <MapPin className="size-4 text-blue-500" />, name: "Maps", desc: "Find Nearby Places" },
  { icon: <Telescope className="size-4 text-indigo-400" />, name: "Deep research", desc: "Get a detailed report" },
  { icon: <Cpu className="size-4 text-gray-500" />, name: "OpenAI Platform", desc: "Manage OpenAI API keys and view organization billing and API usage." },
  { icon: <LineChart className="size-4 text-pink-500" />, name: "Visualize", desc: "Create visualizations and interactive tools" },
  { icon: <Music className="size-4 text-purple-500" />, name: "JamBase", desc: "Go See Live Music!", action: "Connect" },
];

export default function ScheduledPage() {
  const [filter, setFilter] = useState<"Active" | "Paused" | "Completed">("Active");

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-4 py-8 md:px-8">
      {/* Header */}
      <div className="flex items-start justify-between w-full mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Scheduled</h1>
          <p className="text-muted-foreground text-sm">Ask ChatGPT to schedule tasks, set reminders, or monitor for updates.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-muted/20 text-sm font-semibold hover:bg-muted/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <Filter className="size-3.5" />
            {filter}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl border-border/40 shadow-xl">
            {(["Active", "Paused", "Completed"] as const).map((f) => (
              <DropdownMenuItem 
                key={f}
                className="flex items-center justify-between p-2.5 cursor-pointer rounded-lg font-medium"
                onClick={() => setFilter(f)}
              >
                {f}
                {filter === f && <Check className="size-4 text-foreground" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Input Bar */}
      <div className="relative group flex items-center bg-muted/30 hover:bg-muted/50 transition-colors border border-border/40 rounded-full px-2 h-14 mb-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2.5 rounded-full hover:bg-muted/80 text-muted-foreground transition-colors outline-none">
            <Plus className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={8} className="w-[600px] p-2 rounded-2xl border-border/40 shadow-2xl bg-popover max-h-[400px] overflow-y-auto">
            <DropdownMenuGroup className="flex flex-col gap-0.5">
              {TOOLS.map((tool, idx) => (
                <DropdownMenuItem key={idx} className="flex items-center gap-3 p-2.5 cursor-pointer rounded-xl group/item">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-muted/50 shrink-0">
                    {tool.icon}
                  </div>
                  <div className="flex items-center gap-2 flex-1 overflow-hidden">
                    <span className="font-semibold text-sm whitespace-nowrap">{tool.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{tool.desc}</span>
                  </div>
                  {tool.action && (
                    <span className="text-xs font-semibold text-muted-foreground group-hover/item:text-foreground transition-colors">
                      {tool.action}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2 opacity-50" />
            <div className="px-3 pb-1">
              <span className="text-xs text-muted-foreground">Type to search plugins, files, folders & skills</span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <input 
          className="flex-1 bg-transparent px-2 text-foreground placeholder:text-muted-foreground/70 outline-none text-[15px]" 
          placeholder="Schedule a task" 
        />
        
        <div className="flex items-center gap-1.5 shrink-0">
          <button className="p-2 rounded-full hover:bg-muted/80 text-foreground transition-colors" title="Voice input">
            <Mic className="size-5" />
          </button>
          <button className="flex items-center justify-center size-9 bg-muted/60 text-muted-foreground rounded-full hover:bg-muted transition-colors mr-0.5" title="Submit">
            <ArrowUp className="size-5" />
          </button>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="w-full">
        <button className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2 outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary/50">
          Recommended <ChevronDown className="size-4" />
        </button>
        
        <div className="flex flex-col">
          {RECOMMENDED_TASKS.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between py-4 border-b border-border/20 group hover:bg-muted/10 px-2 -mx-2 rounded-xl transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center shrink-0">
                  {task.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground text-sm">{task.title}</span>
                  <span className="text-muted-foreground text-sm">{task.description}</span>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors sm:opacity-0 group-hover:opacity-100 outline-none">
                <Plus className="size-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
