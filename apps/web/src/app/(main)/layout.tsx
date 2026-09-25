import {
  SidebarProvider,
  SidebarInset,
} from "@repo/ui";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@repo/auth/server";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState === "false" ? false : true;

  // Fetch live chat sessions for the sidebar
  let chatSessions: { id: string; title: string | null }[] = [];
  if (user) {
    const { data } = await supabase
      .from('chat_sessions')
      .select('id, title')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    chatSessions = data || [];
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user} chatSessions={chatSessions} />
      <SidebarInset className="flex flex-col overflow-hidden bg-background">
        <div className="flex flex-1 flex-col overflow-hidden w-full relative">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
