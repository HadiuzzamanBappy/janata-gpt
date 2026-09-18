"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "@repo/ui";
import { ChevronDown, ArrowLeft, Sparkles, Share, MoreHorizontal, Files, Pin, Archive, Trash2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { LoginModal } from "./login-modal";
import { useState } from "react";

export function AppTopbar({ user }: { user?: User | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Show back button on detail pages (e.g. /plugins/[id])
  const isDetailPage = /^\/plugins\/.+/.test(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 px-3 w-full bg-transparent">
      <div className="flex items-center gap-2 pl-2">
        {isDetailPage ? (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : !user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-muted px-2 py-1.5 rounded-lg text-lg font-bold text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Janata GPT <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[320px] p-0 border-border bg-popover rounded-2xl overflow-hidden shadow-2xl ml-2">
              <div className="h-28 w-full bg-gradient-to-br from-primary via-primary/60 to-primary/20" />
              <div className="p-5 flex flex-col gap-2">
                {user ? (
                  <>
                    <h3 className="font-bold text-popover-foreground text-lg leading-tight">Janata GPT Pro</h3>
                    <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                      You are using the free tier. Upgrade to access advanced models, create images, and more.
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button className="rounded-full px-5 h-9 font-semibold w-full">
                        Upgrade plan
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-popover-foreground text-lg leading-tight">Try advanced features for free</h3>
                    <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                      Get smarter responses, upload files, create images, and more by logging in.
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button className="rounded-full px-5 h-9 font-semibold" onClick={() => setIsLoginModalOpen(true)}>
                        Log in
                      </Button>
                      <Button variant="outline" className="rounded-full px-5 h-9 font-semibold" onClick={() => setIsLoginModalOpen(true)}>
                        Sign up for free
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      {/* Right side auth buttons */}
      <div className="flex items-center gap-1.5 mr-2">
        {user ? (
          <>
            <Button variant="ghost" className="rounded-full font-semibold px-4 h-9 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-400/10">
              <Sparkles className="size-4 mr-2" />
              Upgrade plan
            </Button>
            <Button variant="ghost" className="rounded-full font-semibold px-4 h-9 text-muted-foreground hover:text-foreground">
              <Share className="size-4 mr-2" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/80 hover:bg-muted text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-border/60 p-1">
                <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium">
                  <Files className="size-4 text-muted-foreground" />
                  View files in chat
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium">
                  <Pin className="size-4 text-muted-foreground" />
                  Pin chat
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium">
                  <Archive className="size-4 text-muted-foreground" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 font-medium text-destructive focus:text-destructive focus:bg-destructive/10">
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" className="rounded-full font-semibold px-4 h-9" onClick={() => setIsLoginModalOpen(true)}>
              Log in
            </Button>
            <Button className="rounded-full font-semibold px-4 h-9" onClick={() => setIsLoginModalOpen(true)}>
              Sign up
            </Button>
          </>
        )}
      </div>

      <LoginModal
        open={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
      />
    </header>
  );
}
