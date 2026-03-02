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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
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
  const { isOpen, close } = useSidebar();
  const role = user?.role ?? "admin";
  const navItems = roleNavMap[role];

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  function handleNavClick() {
    close();
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)]">
            <LayoutDashboard className="size-5 text-white" />
          </div>
          <div>
            <p className="text-[length:var(--text-base)] font-semibold text-white">
              Better Holiday
            </p>
            <p className="text-[length:var(--text-xs)] font-medium text-white">
              Lead Hub
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          className="flex size-8 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Main nav */}
      <nav className="mt-6 flex flex-col gap-1 px-3">
        <p className="mb-2 px-4 text-[length:var(--text-xs)] text-white/80">Main</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-[length:var(--text-base)] font-medium transition-[background-color,color,transform] duration-150 ease-out hover:translate-x-[2px]",
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
        <p className="mb-2 px-4 text-[length:var(--text-xs)] text-white/80">Settings</p>
        <Link
          href="/settings"
          onClick={handleNavClick}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-[length:var(--text-base)] text-white/90 transition-[background-color,color,transform] duration-150 ease-out hover:translate-x-[2px] hover:bg-white/10"
        >
          <Settings className="size-5 shrink-0" />
          Settings
        </Link>
        <Button
          type="button"
          variant="ghost"
          className="flex w-full items-center justify-start gap-3 rounded-xl px-4 py-3 text-left text-[length:var(--text-base)] font-normal"
          onClick={handleLogout}
        >
          <LogOut className="size-5 shrink-0" />
          Logout
        </Button>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — persistent */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-[var(--sidebar-width)] lg:bg-[var(--primary)]">
        {sidebarContent}
      </aside>

      {/* Mobile/Tablet overlay + drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fade-in-soft absolute inset-0 bg-black/50"
            onClick={close}
            aria-hidden="true"
          />
          <aside className="sidebar-slide-in absolute inset-y-0 left-0 w-[var(--sidebar-width)] max-w-[85vw] bg-[var(--primary)] shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
