import type { Metadata } from "next";
import "@repo/ui/styles/globals.css";

export const metadata: Metadata = {
  title: "Picobot",
  description: "Advanced Agentic Coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
