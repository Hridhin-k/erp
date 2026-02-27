import { Sidebar } from "@/components/layout/Sidebar";
import { AuthGuard } from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        <Sidebar />
        <main className="ml-[267px] min-h-screen">{children}</main>
      </div>
    </AuthGuard>
  );
}
