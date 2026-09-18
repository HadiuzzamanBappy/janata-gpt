"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@repo/ui";
import { AuthForm } from "./auth-form";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "login" | "register";
}

export function AuthModal({ open, onOpenChange, defaultMode = "login" }: AuthModalProps) {
  // We can pass defaultMode to AuthForm, or just let AuthForm handle toggling internally (Wait, AuthForm currently hardcodes mode via props, but we can pass defaultMode).
  // Currently AuthForm uses `Link` to toggle modes by navigating. 
  // If we want it to work in a modal without navigating away, we might need AuthModal to manage the mode state, OR just pass `mode="login"` and let them navigate to `/auth/register`.
  // Actually, the user just said "make it as auth modal". Let's just rename it and keep the same prop signature for now.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 sm:p-8 border-border rounded-3xl gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Authenticate</DialogTitle>
          <DialogDescription>
            Log in or sign up to continue your session, access history, and use advanced features.
          </DialogDescription>
        </DialogHeader>
        
        <AuthForm mode={defaultMode} />
      </DialogContent>
    </Dialog>
  );
}
