"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Button
} from "@repo/ui";
import { ChevronDown } from "lucide-react";

export function AppTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-3 w-full">
      <div className="flex items-center gap-2 pl-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-muted px-2 py-1.5 rounded-lg text-lg font-bold text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Janata GPT <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[320px] p-0 border-border bg-popover rounded-2xl overflow-hidden shadow-2xl ml-2">
            <div className="h-28 w-full bg-gradient-to-br from-primary via-primary/60 to-primary/20" />
            <div className="p-5 flex flex-col gap-2">
              <h3 className="font-bold text-popover-foreground text-lg leading-tight">Try advanced features for free</h3>
              <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                Get smarter responses, upload files, create images, and more by logging in.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Button className="rounded-full px-5 h-9 font-semibold">
                  Log in
                </Button>
                <Button variant="outline" className="rounded-full px-5 h-9 font-semibold">
                  Sign up for free
                </Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side auth buttons */}
      <div className="flex items-center gap-2 mr-2">
        <Button variant="ghost" className="rounded-full font-semibold px-4 h-9">
          Log in
        </Button>
        <Button className="rounded-full font-semibold px-4 h-9">
          Sign up
        </Button>
      </div>
    </header>
  );
}
