"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  BarChart3,
  Settings,
  LogOut,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/team", label: "Team", icon: UsersRound },
  { href: "/members", label: "Members", icon: UserCircle },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

const roleNavMap = {
  admin: mainNavItems,
  "team-lead": [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ],
  "sales-associate": [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ],
} as const;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const role = user?.role ?? "admin";
  const navItems = roleNavMap[role];

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[267px] bg-[var(--primary)]">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 pt-6">
          <div className="flex size-10 items-center justify-center rounded-[10px] bg-[var(--primary-light)]">
            <LayoutDashboard className="size-5 text-white" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">Better Holiday</p>
            <p className="text-xs font-medium text-white">Lead Hub</p>
          </div>
        </div>

        {/* Main nav */}
        <nav className="mt-6 flex flex-col gap-1 px-3">
          <p className="mb-2 px-4 text-xs text-white/80">Main</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-[var(--primary-light)] text-white"
                    : "text-white/90 hover:bg-white/10"
                )}
              >
                <Icon className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <nav className="mt-auto flex flex-col gap-1 border-t border-white/10 px-3 py-4">
          <p className="mb-2 px-4 text-xs text-white/80">Settings</p>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-base text-white/90 hover:bg-white/10"
          >
            <Settings className="size-5 shrink-0" />
            Settings
          </Link>
          <Button
            type="button"
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-xl px-4 py-3 text-left text-base font-normal"
            onClick={handleLogout}
          >
            <LogOut className="size-5 shrink-0" />
            Logout
          </Button>
        </nav>
      </div>
    </aside>
  );
}
