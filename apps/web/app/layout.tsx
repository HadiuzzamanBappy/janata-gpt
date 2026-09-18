import type { Metadata } from "next";
import { ThemeProvider } from "@repo/ui";
import "@repo/ui/styles/globals.css";

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "Advanced Agentic AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="bg-background text-foreground antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
