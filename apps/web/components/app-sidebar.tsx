"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@repo/ui"
import { Button } from "@repo/ui"

import { LogIn, Sparkles, Search } from "lucide-react"
import { MainMenu } from "./main-menu"
import { ChatList } from "./chat-list"
import { LoginModal } from "./login-modal"
import { ChatSearchModal } from "./chat-search-modal"
import { User } from "@supabase/supabase-js"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: User | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const isAuth = !!user;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey) && isAuth) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isAuth]);

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between group/brand">
            <SidebarMenuButton tooltip="Janata GPT" render={<a href="#" />} className="px-1.5 hover:bg-transparent cursor-default w-auto group-data-[collapsible=icon]:hidden">
              <Sparkles className="size-5" />
              <span className="font-semibold text-base tracking-tight">Janata GPT</span>
            </SidebarMenuButton>
            <div className="flex items-center gap-0.5 group-data-[collapsible=icon]:mx-auto">
              {isAuth && (
                <SidebarMenuButton 
                  tooltip="Search (Ctrl+K)" 
                  onClick={() => setIsSearchOpen(true)}
                  className="w-8 h-8 p-0 flex items-center justify-center group-data-[collapsible=icon]:hidden hover:bg-muted"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                </SidebarMenuButton>
              )}
              <SidebarTrigger />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainMenu isAuth={isAuth} onLoginClick={() => setIsLoginModalOpen(true)} />
        <ChatList isAuth={isAuth} />
      </SidebarContent>
      {!isAuth && (
        <SidebarFooter className="p-0">
          <div className="p-4 flex flex-col gap-4 group-data-[collapsible=icon]:hidden bg-sidebar-accent/50 border border-sidebar-border rounded-xl m-2 mt-0">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-semibold text-sm text-foreground tracking-tight">Get responses tailored to you</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Log in to get answers based on saved chats, plus create images and upload files.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full rounded-full font-semibold bg-background shadow-sm hover:bg-muted"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </Button>
          </div>

          <SidebarMenu className="hidden group-data-[collapsible=icon]:flex px-2 pb-2">
            <SidebarMenuItem>
              <SidebarMenuButton 
                tooltip="Log in" 
                className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-400/10 transition-colors"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <LogIn />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
      <SidebarRail />
      
      <LoginModal 
        open={isLoginModalOpen} 
        onOpenChange={setIsLoginModalOpen} 
      />
      <ChatSearchModal 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
      />
    </Sidebar>
  )
}
