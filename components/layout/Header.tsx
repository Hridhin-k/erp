"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Bell, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSidebar } from "@/contexts/SidebarContext";

const NotificationsPanel = dynamic(
  () =>
    import("@/components/ui/NotificationsPanel").then(
      (mod) => mod.NotificationsPanel
    ),
  { loading: () => null }
);

interface HeaderProps {
  breadcrumb?: string;
  breadcrumbActive?: string;
  showSearch?: boolean;
  userName?: string;
}

export function Header({
  breadcrumb = "Main",
  breadcrumbActive = "Dashboard",
  showSearch = true,
  userName,
}: HeaderProps) {
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        {/* Left: hamburger + breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghostMuted"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </Button>
          <p className="truncate text-[length:var(--text-xs)] text-[var(--primary)]">
            {breadcrumb} /{" "}
            <span className="font-semibold">{breadcrumbActive}</span>
          </p>
        </div>

        {/* Center: search (desktop) */}
        {showSearch && (
          <div className="hidden flex-1 justify-center md:flex">
            <Input
              leftIcon={<Search className="size-4" />}
              placeholder="Search leads, quotes, customers..."
              className="max-w-sm lg:max-w-md"
            />
          </div>
        )}

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile search toggle */}
          {showSearch && (
            <Button
              variant="ghostMuted"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={() => setSearchExpanded((s) => !s)}
              aria-label="Toggle search"
            >
              {searchExpanded ? (
                <X className="size-5 text-[var(--primary)]" />
              ) : (
                <Search className="size-5 text-[var(--primary)]" />
              )}
            </Button>
          )}

          <div ref={notificationsRef} className="relative">
            <Button
              variant="ghostMuted"
              size="icon"
              className="relative rounded-full border-0 bg-transparent shadow-none"
              onClick={() => setNotificationsOpen((o) => !o)}
              aria-expanded={notificationsOpen}
              aria-haspopup="dialog"
            >
              <Bell className="size-5 text-[var(--primary)]" />
              <Badge
                variant="notification"
                className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px]"
              >
                4
              </Badge>
            </Button>
            <NotificationsPanel
              open={notificationsOpen}
              onOpenChange={setNotificationsOpen}
              anchorRef={notificationsRef}
            />
          </div>

          <div className="relative">
            <div className="size-8 overflow-hidden rounded-full bg-gray-200 sm:size-9">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName ?? "user"}`}
                alt={userName ?? "User"}
                width={36}
                height={36}
                sizes="36px"
                className="object-cover"
              />
            </div>
            <Badge
              variant="success"
              dot
              className="absolute bottom-0 right-0 size-2.5"
            />
          </div>
        </div>
      </div>

      {/* Mobile expanded search bar */}
      {showSearch && searchExpanded && (
        <div className="mt-3 md:hidden">
          <Input
            leftIcon={<Search className="size-4" />}
            placeholder="Search leads, quotes, customers..."
            className="w-full"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
