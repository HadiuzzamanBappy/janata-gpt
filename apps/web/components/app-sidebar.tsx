"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@repo/auth/client"

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
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui"
import { Button } from "@repo/ui"

import { LogIn, Sparkles, LogOut, Settings } from "lucide-react"
import { MainMenu } from "./main-menu"
import { ChatList } from "./chat-list"
import { LoginModal } from "./login-modal"
import { ChatSearchModal } from "./chat-search-modal"
import { SettingsModal } from "./settings-modal"
import { User } from "@supabase/supabase-js"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: User | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const isAuth = !!user;
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

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
          <SidebarMenuItem className="relative flex items-center justify-between group/brand h-10">
            <SidebarMenuButton
              tooltip="Janata GPT"
              render={<a href="#" />}
              className="w-auto px-1.5 hover:bg-transparent cursor-default group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            >
              <Sparkles className="size-5 transition-opacity group-data-[collapsible=icon]:group-hover/brand:opacity-0" />
              <span className="font-semibold text-base tracking-tight group-data-[collapsible=icon]:hidden">Janata GPT</span>
            </SidebarMenuButton>

            <div className="flex items-center group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:group-hover/brand:opacity-100 group-data-[collapsible=icon]:group-hover/brand:pointer-events-auto transition-opacity">
              <SidebarTrigger />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainMenu
          isAuth={isAuth}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSearchClick={() => setIsSearchOpen(true)}
        />
        <ChatList isAuth={isAuth} />
      </SidebarContent>
      {isAuth && (
        <SidebarFooter className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger 
              render={
                <Button
                  variant="ghost"
                  className="w-full h-12 justify-start gap-2.5 px-2 rounded-lg hover:bg-muted font-medium overflow-hidden group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 outline-none"
                />
              }
            >
              <Avatar className="w-8 h-8 shrink-0 border border-border/50">
                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {user.user_metadata?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold text-foreground truncate w-full">{user.user_metadata?.full_name || "User"}</span>
                <span className="text-xs text-muted-foreground truncate w-full">{user.email}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="top" 
              sideOffset={8} 
              align="center"
              className="w-56 rounded-xl border-border/40 shadow-xl bg-popover p-1"
            >
              <DropdownMenuItem 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-muted"
              >
                <Settings className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-border/40" />
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-destructive/10 text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="size-4" />
                <span className="font-medium text-sm">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      )}
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
      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        user={user || null}
      />
    </Sidebar>
  )
}
