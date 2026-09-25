"use client";

import { ReactNode } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Input, Button } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  action?: ReactNode;
  centered?: boolean;
  showBackButton?: boolean;
}

export function PageHeader({
  title,
  description,
  searchPlaceholder,
  onSearch,
  action,
  centered,
  showBackButton,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6",
        centered && "flex-col items-center justify-center text-center w-full"
      )}
    >
      <div className={cn("flex flex-col gap-1.5", centered && "items-center")}>
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 rounded-full -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" />
            </Button>
          )}
          {title && (
            <h1
              className={cn(
                "font-bold tracking-tight text-foreground",
                centered ? "text-3xl sm:text-4xl" : "text-2xl"
              )}
            >
              {title}
            </h1>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      {(searchPlaceholder || action) && (
        <div
          className={cn(
            "flex items-center gap-3 w-full sm:w-auto",
            centered && "justify-center mt-2"
          )}
        >
          {searchPlaceholder && (
            <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-9 w-full sm:w-64 bg-muted/40 border-border/50 rounded-full h-10"
              />
            </div>
          )}
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
    </div>
  );
}
