import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Log In - Janata GPT",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md p-8 sm:p-10 bg-card border border-border shadow-sm rounded-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
