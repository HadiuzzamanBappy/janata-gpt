"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@repo/ui";
import { LoginForm } from "./login-form";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8 sm:p-10 border-border rounded-3xl gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Log in to Janata GPT</DialogTitle>
          <DialogDescription>
            Log in to continue your session, access history, and use advanced features.
          </DialogDescription>
        </DialogHeader>
        
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
