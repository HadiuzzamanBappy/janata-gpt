"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@repo/ui"
import { Button } from "@repo/ui"

import { SquarePen, Search, Image as ImageIcon, Blocks, Telescope, Sparkles, LogIn } from "lucide-react"

// Sidebar tools data
const data = {
  tools: [
    {
      title: "New chat",
      url: "#",
      icon: SquarePen,
    },
    {
      title: "Search chats",
      url: "#",
      icon: Search,
    },
    {
      title: "Images",
      url: "#",
      icon: ImageIcon,
    },
    {
      title: "Plugins",
      url: "/plugins",
      icon: Blocks,
    },
    {
      title: "Deep research",
      url: "#",
      icon: Telescope,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between group/brand">
            <SidebarMenuButton tooltip="Janata GPT" render={<a href="#" />} className="px-1.5 hover:bg-transparent cursor-default w-auto group-data-[collapsible=icon]:hidden">
              <Sparkles className="size-5" />
              <span className="font-semibold text-base tracking-tight">Janata GPT</span>
            </SidebarMenuButton>
            <SidebarTrigger className="group-data-[collapsible=icon]:mx-auto" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1.5">
            {data.tools.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  render={<a href={item.url} className="font-medium" />}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-0">
        <div className="p-4 flex flex-col gap-4 group-data-[collapsible=icon]:hidden bg-sidebar-accent/50 border border-sidebar-border rounded-xl m-2 mt-0">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-semibold text-sm text-foreground tracking-tight">Get responses tailored to you</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Log in to get answers based on saved chats, plus create images and upload files.
            </p>
          </div>
          <Button variant="outline" className="w-full rounded-full font-semibold bg-background shadow-sm hover:bg-muted">
            Log in
          </Button>
        </div>

        <SidebarMenu className="hidden group-data-[collapsible=icon]:flex px-2 pb-2">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log in" className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-400/10 transition-colors">
              <LogIn />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
