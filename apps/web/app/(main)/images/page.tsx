"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Button
} from "@repo/ui";
import { AppChatInput } from "@/components/chat-input";
import {
  Plus,
  Paperclip,
  Library,
  Image as ImageIcon,
  PenLine,
  Globe,
  MapPin,
  Telescope,
  Cpu,
  LineChart
} from "lucide-react";

const TOOLS = [
  { icon: <Paperclip className="size-4" />, name: "Add photos & files", desc: "Upload from computer" },
  { icon: <Library className="size-4" />, name: "Add from library", desc: "Browse and search your files" },
  { icon: <ImageIcon className="size-4 text-blue-400" />, name: "Create image", desc: "Visualize anything" },
  { icon: <PenLine className="size-4 text-emerald-400" />, name: "Sketch", desc: "Draw and attach an image" },
  { icon: <Globe className="size-4 text-cyan-400" />, name: "Web search", desc: "Find real-time news and info" },
  { icon: <MapPin className="size-4 text-blue-500" />, name: "Maps", desc: "Find Nearby Places" },
  { icon: <Telescope className="size-4 text-indigo-400" />, name: "Deep research", desc: "Get a detailed report" },
  { icon: <Cpu className="size-4 text-gray-500" />, name: "OpenAI Platform", desc: "Manage OpenAI API keys and view organization billing and API usage." },
  { icon: <LineChart className="size-4 text-pink-500" />, name: "Visualize", desc: "Create visualizations and interactive tools" },
];

const IMAGE_DATA = [
  { title: "Stickers", img: "/images/stickers.jpg" },
  { title: "Photosynthesis as a diagram", img: "/images/stickers.jpg" },
  { title: "Map of ancient Rome", img: "/images/stickers.jpg" },
  { title: "Timeline of the Civil War", img: "/images/stickers.jpg" },
  { title: "Plant cell diagram", img: "/images/stickers.jpg" },
  { title: "Cozy reading nook for my room", img: "/images/stickers.jpg" },
  { title: "Skateboard stickers based on hobbies", img: "/images/stickers.jpg" },
  { title: "Vintage punk band poster", img: "/images/stickers.jpg" },
];

export default function ImagesPage() {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-background">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-4 py-6 md:px-8">
      {/* Header */}
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-6">Images</h1>

      {/* Input Bar */}
      <div className="w-full mb-10">
        <AppChatInput
          placeholder="Describe a new image"
          customAttachmentButton={
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
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2 opacity-50" />
                <div className="px-3 pb-1">
                  <span className="text-xs text-muted-foreground">Type to search plugins, files, folders & skills</span>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
      </div>

      {/* Trending Section */}
      <div className="w-full">
        <Button variant="secondary" className="rounded-full px-5 h-8 text-sm font-semibold mb-6">
          Trending
        </Button>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {IMAGE_DATA.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-end aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-border/10"
            >
              {/* Background Image - Reusing the successfully generated stickers image since API rate limited */}
              {/* In production, we would map over distinct generated images. */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-muted transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.img})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

              {/* Text Content */}
              <div className="relative z-10 p-4">
                <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
