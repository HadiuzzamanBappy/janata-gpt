import type { Metadata } from "next";
import { ThemeProvider, TooltipProvider } from "@repo/ui";
import "@repo/ui/globals.css";

export const metadata: Metadata = {
  title: "JanataGPT",
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
          <TooltipProvider delay={0}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
