"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Palette,
  User as UserIcon,
  Sparkles,
  LogOut
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Input,
  ThemeToggle
} from "@repo/ui"

import { User } from "@supabase/supabase-js"

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSignOut?: () => void;
}

const navItems = [
  { name: "Profile", icon: UserIcon },
  { name: "Appearance", icon: Palette },
]

export function SettingsModal({ open, onOpenChange, user, onSignOut }: SettingsModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("Profile")
  const [displayName, setDisplayName] = React.useState(user?.user_metadata?.full_name || "")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px] border-border/60 shadow-2xl rounded-2xl">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start min-h-[500px]">
          <Sidebar collapsible="none" className="hidden md:flex border-r border-border/50 bg-muted/10 w-56 shrink-0">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1 mt-2 px-2">
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === activeTab}
                          onClick={() => setActiveTab(item.name)}
                          className="px-3 py-2 rounded-lg data-[active=true]:bg-primary/10 data-[active=true]:text-primary text-muted-foreground hover:text-foreground font-medium transition-colors"
                        >
                          <item.icon className="size-4 mr-2" />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            {user && (
              <div className="px-3 pb-3 mt-auto flex flex-col gap-1.5">
                {/* Assuming free user here. If pro, render nothing */}
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2.5 font-medium bg-amber-500/10 text-amber-600 dark:text-amber-500 hover:bg-amber-500/20 transition-colors rounded-lg h-9"
                  onClick={() => {
                    onOpenChange(false);
                    router.push('/pricing');
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Upgrade plan
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2.5 font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors rounded-lg h-9"
                  onClick={() => {
                    if (onSignOut) onSignOut();
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </Button>
              </div>
            )}
          </Sidebar>
          <main className="flex h-[500px] flex-1 flex-col overflow-hidden bg-background">
            <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b border-border/30 bg-background/50 backdrop-blur-sm">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="font-semibold text-muted-foreground text-sm">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-sm text-foreground">{activeTab}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 pt-6">
              
              {activeTab === "Profile" && (
                <div className="space-y-6">
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-muted-foreground">Email (Read Only)</label>
                      <Input 
                        disabled 
                        value={user?.email || "No email provided"} 
                        className="bg-muted/50 h-9"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Display Name</label>
                      <Input 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="What should we call you?" 
                        className="h-9"
                      />
                    </div>
                    
                    <Button className="mt-2 h-9 px-6 rounded-full font-semibold">
                      Save Profile
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "Appearance" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-sm text-foreground">Theme</span>
                      <span className="text-sm text-muted-foreground">Change the appearance of Janata GPT.</span>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              )}

            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
