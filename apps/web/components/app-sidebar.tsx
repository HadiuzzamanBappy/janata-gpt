"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Avatar,
  AvatarFallback,
  Button
} from "@repo/ui";
import { 
  SquarePen, 
  Search, 
  Image as ImageIcon,
  Library,
  Clock,
  Puzzle,
  FolderDot,
  Code2,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="bg-[#171717] text-zinc-300 border-r-0">
      <SidebarHeader className="pt-4 px-3">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" className="justify-start gap-2 h-10 px-3 w-full text-zinc-200 hover:bg-[#212121] hover:text-white rounded-xl">
            <SquarePen className="w-5 h-5" />
            <span className="font-medium">New chat</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-zinc-400 hover:bg-[#212121] hover:text-white rounded-xl ml-2">
             <Search className="w-5 h-5" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="#" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9">
                  <ImageIcon className="w-4 h-4 mr-2" /> Images
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="#" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9">
                  <Library className="w-4 h-4 mr-2" /> Library
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="#" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9">
                  <Clock className="w-4 h-4 mr-2" /> Scheduled
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="#" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9">
                  <Puzzle className="w-4 h-4 mr-2" /> Plugins
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="#" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9">
                  <FolderDot className="w-4 h-4 mr-2" /> Projects
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="#" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9">
                  <Code2 className="w-4 h-4 mr-2" /> Codex
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="#" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9">
                  <MoreHorizontal className="w-4 h-4 mr-2" /> More
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recents */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-zinc-500 px-2 h-6">Recents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/c/1" />} className="hover:bg-[#212121] hover:text-white rounded-lg h-9 text-sm truncate pr-2">
                  Create ChatGPT Clone Document
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center gap-2 bg-[#212121] p-2 rounded-xl border border-white/5">
          <Avatar className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0">
             <AvatarFallback className="text-white text-xs bg-orange-600">HB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
             <span className="text-sm font-medium text-zinc-200 truncate leading-tight">Hadiuzzaman Ba...</span>
             <span className="text-[10px] text-zinc-500 font-medium">Free</span>
          </div>
          <Button size="sm" variant="secondary" className="h-7 text-xs bg-zinc-700 hover:bg-zinc-600 text-white rounded-full px-3 shrink-0">
            Upgrade
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
