"use client";

import { useState } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@repo/ui";
import {
  ChevronDown,
  MoreHorizontal,
  List,
  Folder,
  Check,
  Share2,
  Pencil,
  Pin,
  Archive,
  Trash2,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ChatList({ 
  isAuth, 
  sessions = [] 
}: { 
  isAuth?: boolean; 
  sessions?: { id: string; title: string | null }[] 
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  if (!isAuth) return null;

  const renderChatItems = (chats: { id: string; title: string | null }[]) => (
    <SidebarMenu>
      {chats.map((chat) => {
        const isActive = pathname === `/chat/${chat.id}`;
        return (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton
              tooltip={chat.title || "New Chat"}
              isActive={isActive}
              className="h-9 pr-14"
              render={<Link href={`/chat/${chat.id}`} />}
            >
              <span className="truncate">{chat.title || "New Chat"}</span>
            </SidebarMenuButton>

            {/* Gradient fade + action buttons */}
            <div className="
              absolute right-0 inset-y-0 flex items-center overflow-hidden rounded-r-md
              opacity-0 group-hover/menu-item:opacity-100
              transition-opacity
            ">
              <div className="w-8 h-full bg-gradient-to-r from-transparent to-sidebar-accent/80" />
              <div className="flex items-center bg-sidebar-accent/80 h-full pr-1 gap-0.5 rounded-r-md">
                <button
                  type="button"
                  title="Pin chat"
                  className="flex aspect-square w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <Pin className="size-3.5" />
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex aspect-square w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors outline-none"
                    title="More options"
                  >
                    <MoreHorizontal className="size-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" sideOffset={6} className="w-44 rounded-xl shadow-lg border-border/60">
                    <DropdownMenuItem className="cursor-pointer gap-2.5 py-2">
                      <Share2 className="size-4" /><span>Share</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2.5 py-2">
                      <Pencil className="size-4" /><span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer gap-2.5 py-2">
                      <Pin className="size-4" /><span>Pin chat</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2.5 py-2">
                      <Archive className="size-4" /><span>Archive</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="size-4" /><span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <>
      <SidebarGroup className="pt-4 group/chat-list">
        {/* Collapsed View: Single Icon with Dropdown */}
        <SidebarMenu className="hidden group-data-[collapsible=icon]:flex">
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton tooltip="Chats" render={<DropdownMenuTrigger />}>
                <MessageSquare />
              </SidebarMenuButton>
              <DropdownMenuContent side="right" align="start" sideOffset={12} className="w-64 rounded-xl shadow-lg border-border/60 p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mb-1">
                  Recents
                </div>
                {renderChatItems(sessions.slice(0, 5))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Expanded View: Full Chat List */}
        <div className="group-data-[collapsible=icon]:hidden flex flex-col gap-0.5">
          {/* Section Header */}
          <div className="flex items-center justify-between px-2 mb-2 text-sidebar-foreground/70">
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm font-semibold cursor-pointer hover:text-sidebar-foreground transition-colors select-none"
            >
              Recents{" "}
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${!isExpanded ? "-rotate-90" : ""}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="p-1 rounded-md hover:bg-sidebar-accent cursor-pointer text-muted-foreground hover:text-sidebar-foreground transition-colors">
                    <MoreHorizontal className="size-4 outline-none" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 rounded-xl shadow-md border-border/50"
                >
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Organize chats
                  </div>
                  <DropdownMenuItem className="cursor-pointer gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <List className="size-4" />
                      <span>In one list</span>
                    </div>
                    <Check className="size-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <Folder className="size-4" />
                    <span>By project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Chat Items */}
          {isExpanded && renderChatItems(sessions)}
        </div>
      </SidebarGroup>
    </>
  );
}
