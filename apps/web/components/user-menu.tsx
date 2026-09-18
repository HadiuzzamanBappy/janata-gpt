"use client";

import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui";
import { LogOut, User as UserIcon } from "lucide-react";
import { createSupabaseBrowserClient } from "@repo/auth/client";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    // We can use process.env here directly since this is a Client Component in apps/web
    const supabase = createSupabaseBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh(); // Still refresh to ensure server components clear their state
  };

  // Google adds avatar URL to user_metadata.avatar_url
  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name;
  const initial = fullName ? fullName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none rounded-full focus-visible:ring-2 focus-visible:ring-ring shrink-0">
        <Avatar className="w-9 h-9 border border-border/50 hover:opacity-90 transition-opacity">
          <AvatarImage src={avatarUrl} alt={fullName || "User"} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1 rounded-xl">
        <div className="px-2 py-2 flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground truncate">
            {fullName || "User"}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {user.email}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg px-2 py-1.5" onClick={() => {}}>
          <UserIcon className="w-4 h-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer gap-2 rounded-lg px-2 py-1.5 text-red-500 focus:text-red-600 focus:bg-red-500/10 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-400/10" 
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
