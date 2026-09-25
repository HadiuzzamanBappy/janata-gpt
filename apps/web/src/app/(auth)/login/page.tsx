import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Log In - Janata GPT",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
