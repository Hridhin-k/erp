"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-white px-8 py-4">
      <div className="flex items-center  justify-between w-full">
        <p className="text-xs text-[var(--primary)]">
          {breadcrumb} /{" "}
          <span className="font-semibold">{breadcrumbActive}</span>
        </p>
        {showSearch && (
          <Input
            leftIcon={<Search className="size-4" />}
            placeholder="Search leads, quotes, customers..."
            className="w-[384px]"
          />
        )}
      </div>

      <div className="flex items-center gap-4">
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
          <div className="size-9 overflow-hidden rounded-full bg-gray-200">
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
    </header>
  );
}
