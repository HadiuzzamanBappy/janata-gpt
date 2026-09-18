import type { Metadata } from "next";
import { ThemeProvider } from "@repo/ui";
import {
  SidebarProvider,
  SidebarInset,
  TooltipProvider
} from "@repo/ui";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
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
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex flex-col overflow-hidden">
                <AppTopbar />
                <div className="flex flex-1 flex-col overflow-auto relative min-h-0">
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
