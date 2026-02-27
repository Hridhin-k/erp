"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  dataNodeId?: string;
}

export function BaseModal({
  open,
  onOpenChange,
  ariaLabel,
  children,
  className,
  wrapperClassName,
  dataNodeId,
}: BaseModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fade-in-soft fixed inset-0 z-50 flex items-stretch justify-end bg-black/40",
        wrapperClassName
      )}
      onClick={() => onOpenChange(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        data-node-id={dataNodeId}
        className={cn(
          "modal-slide-in-right ml-auto h-full max-h-screen w-full overflow-y-auto bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
