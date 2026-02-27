"use client";

import { useRef, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RefObject } from "react";

export interface LeadActionsDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef: RefObject<HTMLElement | null>;
  onEdit?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  deleteLabel?: string;
  className?: string;
}

export function LeadActionsDropdown({
  open,
  onOpenChange,
  anchorRef,
  onEdit,
  onDelete,
  editLabel = "Edit Lead",
  deleteLabel = "Delete Lead",
  className,
}: LeadActionsDropdownProps) {
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
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") onOpenChange(false);
      };
      document.addEventListener("keydown", handleEscape);
      popoverRef.current?.focus();
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [open, onOpenChange, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      role="menu"
      tabIndex={-1}
      aria-label="Lead actions"
      className={cn(
        "absolute right-0 top-full z-50 mt-1 min-w-[197px] overflow-hidden rounded-[6px] border-[0.8px] border-solid border-black/[0.08] bg-white py-1 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]",
        className
      )}
      data-name="LeadActionsDropdown"
      data-node-id="139:2770"
    >
      <button
        type="button"
        onClick={() => {
          onEdit?.();
          onOpenChange(false);
        }}
        className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/5"
        role="menuitem"
        data-node-id="139:2771"
      >
        <Pencil className="size-4 shrink-0" />
        {editLabel}
      </button>
      <button
        type="button"
        onClick={() => {
          onDelete?.();
          onOpenChange(false);
        }}
        className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm font-medium text-[#ff5151] transition-colors hover:bg-red-50"
        role="menuitem"
        data-node-id="139:2776"
      >
        <Trash2 className="size-4 shrink-0" />
        {deleteLabel}
      </button>
    </div>
  );
}
