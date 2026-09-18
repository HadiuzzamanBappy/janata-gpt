"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Button,
} from "@repo/ui";
import {
  SquarePen,
  Search,
  Image as ImageIcon,
  Blocks,
  Telescope,
  Library,
  Clock,
  FolderGit2,
} from "lucide-react";

// Sidebar tools data
const authMenu = [
  { title: "New chat", url: "/", icon: SquarePen },
  { title: "Search chats", url: "#", icon: Search },
  { title: "Images", url: "#", icon: ImageIcon },
  { title: "Library", url: "#", icon: Library },
  { title: "Scheduled", url: "/scheduled", icon: Clock },
  { title: "Plugins", url: "/plugins", icon: Blocks },
  { title: "Projects", url: "/projects", icon: FolderGit2 },
];

const nonAuthMenu = [
  { title: "New chat", url: "/", icon: SquarePen },
  { title: "Search chats", url: "#", icon: Search },
  { title: "Images", url: "#", icon: ImageIcon },
  { title: "Plugins", url: "/plugins", icon: Blocks },
  { title: "Deep research", url: "#", icon: Telescope },
];

export function MainMenu({ isAuth, onLoginClick, onSearchClick }: { isAuth?: boolean; onLoginClick?: () => void; onSearchClick?: () => void }) {
  const pathname = usePathname();
  const menuItems = isAuth ? authMenu : nonAuthMenu;

  return (
    <SidebarGroup className="pt-2">
      <SidebarMenu>
        {menuItems.map((item) => {
          const isActive =
            item.url === "#"
              ? false
              : (item.url === "/"
              ? pathname === "/"
              : pathname.startsWith(item.url));

          const isRestricted = !isAuth && item.title !== "New chat" && item.title !== "Plugins";

          if (isRestricted) {
            return (
              <SidebarMenuItem key={item.title}>
                <DropdownMenu>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    render={<DropdownMenuTrigger />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  <DropdownMenuContent side="right" align="start" sideOffset={12} className="w-[320px] p-0 border-border bg-popover rounded-2xl overflow-hidden shadow-2xl">
                    <div className="h-28 w-full bg-gradient-to-br from-primary via-primary/60 to-primary/20" />
                    <div className="p-5 flex flex-col gap-2">
                      <h3 className="font-bold text-popover-foreground text-lg leading-tight">Try advanced features for free</h3>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                        Get smarter responses, upload files, create images, and more by logging in.
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button className="rounded-full px-5 h-9 font-semibold" onClick={onLoginClick}>
                          Log in
                        </Button>
                        <Button variant="outline" className="rounded-full px-5 h-9 font-semibold" onClick={onLoginClick}>
                          Sign up for free
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          }

          if (item.title === "Search chats" && isAuth) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={onSearchClick}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive}
                render={
                  <Link
                    href={item.url}
                    className="font-medium"
                    prefetch={item.url !== "#"}
                  />
                }
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
