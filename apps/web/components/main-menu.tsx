"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  { title: "Images", url: "#", icon: ImageIcon },
  { title: "Library", url: "#", icon: Library },
  { title: "Scheduled", url: "#", icon: Clock },
  { title: "Plugins", url: "/plugins", icon: Blocks },
  { title: "Projects", url: "#", icon: FolderGit2 },
];

const nonAuthMenu = [
  { title: "New chat", url: "/", icon: SquarePen },
  { title: "Search chats", url: "#", icon: Search },
  { title: "Images", url: "#", icon: ImageIcon },
  { title: "Plugins", url: "/plugins", icon: Blocks },
  { title: "Deep research", url: "#", icon: Telescope },
];

export function MainMenu({ isAuth }: { isAuth?: boolean }) {
  const pathname = usePathname();
  const menuItems = isAuth ? authMenu : nonAuthMenu;

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-1.5">
        {menuItems.map((item) => {
          const isActive =
            item.url !== "#" &&
            (item.url === "/"
              ? pathname === "/"
              : pathname.startsWith(item.url));

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
