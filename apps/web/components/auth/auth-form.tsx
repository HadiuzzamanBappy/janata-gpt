"use client";

import { useState } from "react";
import { Button, Input } from "@repo/ui";
import { Loader2, Mail, Lock } from "lucide-react";
import { createSupabaseBrowserClient } from "@repo/auth/client";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [currentMode, setCurrentMode] = useState<"login" | "register">(mode);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    const supabase = createSupabaseBrowserClient();
    
    const redirectUrl = `${window.location.origin}/api/auth/callback`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const supabase = createSupabaseBrowserClient();

    if (currentMode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          data: {
            full_name: name,
          }
        }
      });
      
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Check your email to confirm your account!");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/");
        router.refresh();
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full mx-auto">
      <div className="flex flex-col gap-1.5 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {currentMode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentMode === "login" 
            ? "Log in to get smarter responses and save history." 
            : "Sign up to get smarter responses and save your history."}
        </p>
      </div>

      <div className="w-full flex flex-col gap-4">
        {errorMsg && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg text-center font-medium">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 text-sm text-emerald-500 bg-emerald-500/10 rounded-lg text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-3.5">
          {currentMode === "register" && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10"
              />
            </div>
          )}
          
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9 h-10"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
              {currentMode === "login" && (
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input 
                id="password" 
                type="password"
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 h-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-10 font-semibold mt-1" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (currentMode === "login" ? "Sign In" : "Sign Up")}
          </Button>
        </form>

        <div className="relative my-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/60"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full relative h-10"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {/* Google G Logo SVG */}
              <svg className="absolute left-4 w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </>
          )}
        </Button>
      </div>
      
      <p className="text-sm text-center text-muted-foreground mt-2">
        {currentMode === "login" ? (
          <>
            Don't have an account?{" "}
            <button 
              type="button"
              onClick={() => setCurrentMode("register")}
              className="text-foreground hover:underline font-medium"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button 
              type="button"
              onClick={() => setCurrentMode("login")}
              className="text-foreground hover:underline font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
