"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/ui";
import { SmilePlus, Lightbulb, ChevronDown, Check } from "lucide-react";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [memoryType, setMemoryType] = useState<"default" | "project-only">("default");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-6 border-border/40 shadow-2xl rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-foreground">Create project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Project Name Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Project name</label>
            <div className="relative">
              <SmilePlus className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Copenhagen Trip"
                className="pl-9 h-10 bg-transparent border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary/50 text-sm rounded-lg"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="flex gap-3 p-3 rounded-lg bg-muted/40 text-xs text-muted-foreground border border-border/10">
            <Lightbulb className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Projects keep chats, files, and custom instructions in one place. Use them for ongoing work, or just to keep things tidy.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md">
                {memoryType === "default" ? "Default memory" : "Project-only memory"}
                <ChevronDown className="size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[320px] p-1 rounded-xl border-border/40 shadow-xl">
                <DropdownMenuItem 
                  className="flex flex-col items-start gap-0.5 p-2.5 cursor-pointer rounded-lg"
                  onClick={() => setMemoryType("default")}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold text-foreground">Default memory</span>
                    {memoryType === "default" && <Check className="size-4 text-foreground" />}
                  </div>
                  <span className="text-xs text-muted-foreground leading-snug">
                    This project can access memory from outside chats, and vice versa.
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex flex-col items-start gap-0.5 p-2.5 cursor-pointer rounded-lg"
                  onClick={() => setMemoryType("project-only")}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold text-foreground">Project-only memory</span>
                    {memoryType === "project-only" && <Check className="size-4 text-foreground" />}
                  </div>
                  <span className="text-xs text-muted-foreground leading-snug">
                    This project can only access its own memory. Its memory is hidden from outside chats.
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              disabled={!projectName.trim()}
              className="rounded-full px-5 h-9 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              Create project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
