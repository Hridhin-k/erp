import { Sidebar } from "@/components/layout/Sidebar";
import { AuthGuard } from "@/components/AuthGuard";
import { SidebarProvider } from "@/contexts/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="min-h-screen bg-white">
          <Sidebar />
          <main className="min-h-screen lg:ml-[var(--sidebar-width)]">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
