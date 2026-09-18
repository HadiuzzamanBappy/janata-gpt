import { SidebarProvider, SidebarTrigger } from "@repo/ui";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen overflow-hidden bg-[#212121]">
        {/* Mobile Header / Trigger */}
        <div className="md:hidden flex items-center h-14 px-4 border-b border-white/10 bg-[#212121]">
          <SidebarTrigger className="text-white" />
          <div className="ml-2 font-medium text-white">ChatGPT</div>
        </div>
        
        {/* Main Chat Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
