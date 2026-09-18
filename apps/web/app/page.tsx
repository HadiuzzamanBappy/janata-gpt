import { Button } from "@repo/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to Picobot</h1>
      <p className="text-muted-foreground mb-8">
        Your new web application is ready to go.
      </p>
      <Button>Get Started</Button>
    </main>
  );
}
