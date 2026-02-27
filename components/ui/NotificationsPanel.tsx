"use client";

import { useRef, useEffect } from "react";
import { Heart, Phone, CalendarClock, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  userName: string;
  action: string;
  leadName: string;
  timeAgo: string;
  variant: "interested" | "contacted" | "follow-up";
}

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    userName: "Sarah Johnson",
    action: "marked as interested",
    leadName: "Robert Chen",
    timeAgo: "5 min ago",
    variant: "interested",
  },
  {
    id: "2",
    userName: "Mike Peterson",
    action: "contacted",
    leadName: "Emily Davis",
    timeAgo: "12 min ago",
    variant: "contacted",
  },
  {
    id: "3",
    userName: "Sarah Johnson",
    action: "marked as interested",
    leadName: "John Smith",
    timeAgo: "18 min ago",
    variant: "interested",
  },
  {
    id: "4",
    userName: "Lisa Wong",
    action: "scheduled follow-up",
    leadName: "Alex Kumar",
    timeAgo: "25 min ago",
    variant: "follow-up",
  },
];

export interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  activities?: ActivityItem[];
  className?: string;
}

const variantStyles = {
  interested: {
    cardBg: "bg-[rgba(123,214,253,0.19)]",
    iconBg: "bg-[var(--accent)]",
    Icon: Heart,
  },
  contacted: {
    cardBg: "bg-[rgba(72,242,108,0.19)]",
    iconBg: "bg-[#48f26c]",
    Icon: Phone,
  },
  "follow-up": {
    cardBg: "bg-[#e6f7ff]",
    iconBg: "bg-[var(--accent)]",
    Icon: CalendarClock,
  },
};

export function NotificationsPanel({
  open,
  onOpenChange,
  anchorRef,
  activities = defaultActivities,
  className,
}: NotificationsPanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        !popoverRef.current?.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onOpenChange(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") onOpenChange(false);
      };
      document.addEventListener("keydown", onKeyDown);
      popoverRef.current?.focus();
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [open, onOpenChange, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      tabIndex={-1}
      aria-label="Recent activities"
      className={cn(
        "fade-in-soft absolute right-0 top-full z-50 mt-2 w-[400px] overflow-hidden rounded-[14px] border-[1.067px] border-solid border-[#e5e7eb] bg-white pb-[1.067px] pt-[25.067px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]",
        className
      )}
      data-name="Notifications"
      data-node-id="139:188"
    >
      {/* Header */}
      <div className="flex h-[48px] shrink-0 items-center justify-between px-[25.067px]">
        <div>
          <h3 className="text-base font-semibold leading-6 text-[var(--primary)]" data-node-id="139:192">
            Recent Activities
          </h3>
          <p className="text-sm font-medium leading-5 text-[var(--primary-light)]" data-node-id="139:194">
            Real-time updates from your team
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#fae9e9] transition-colors hover:bg-[#f5d5d5]"
          aria-label="Close notifications"
          data-node-id="139:195"
        >
          <X className="size-5 text-red-600" />
        </button>
      </div>

      {/* Activity list */}
      <div className="flex max-h-[464px] flex-col gap-4 overflow-y-auto px-[25.067px] pb-6 pt-6">
        {activities.map((activity) => {
          const { cardBg, iconBg, Icon } = variantStyles[activity.variant];
          return (
            <div
              key={activity.id}
              className={cn(
                "flex gap-4 rounded-[10px] px-4 pt-4 pb-4 transition-[background-color,transform] duration-150 ease-out hover:translate-x-[1px]",
                cardBg
              )}
            >
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full",
                  iconBg
                )}
              >
                <Icon
                  className={cn(
                    "size-5 text-[var(--primary)]",
                    activity.variant === "interested" && "fill-[var(--primary)]"
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base leading-6 text-[var(--primary)]">
                  <span className="font-semibold">{activity.userName}</span>{" "}
                  <span className="font-normal text-[var(--primary-light)]">
                    {activity.action}
                  </span>
                </p>
                <p className="text-base font-medium leading-6 text-[var(--primary)]">
                  Lead: {activity.leadName}
                </p>
                <p className="text-sm font-medium leading-5 text-[var(--primary)]">
                  {activity.timeAgo}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
