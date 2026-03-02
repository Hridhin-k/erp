"use client";

import { useRef, useEffect, useState, type RefObject } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export type DateRangePreset = "today" | "lastWeek" | "custom";

export interface DateRangePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef: RefObject<HTMLElement | null>;
  onRangeChange?: (startDate: Date, endDate: Date) => void;
  className?: string;
}

function formatDateForInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseInputToDate(value: string): Date {
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function DateRangePicker({
  open,
  onOpenChange,
  anchorRef,
  onRangeChange,
  className,
}: DateRangePickerProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState<DateRangePreset>("custom");
  const [startDate, setStartDate] = useState(formatDateForInput(new Date()));
  const [endDate, setEndDate] = useState(formatDateForInput(new Date()));

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

  function handlePresetClick(p: DateRangePreset) {
    setPreset(p);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let start: Date;
    let end: Date;
    if (p === "today") {
      start = new Date(today);
      end = new Date(today);
    } else if (p === "lastWeek") {
      end = new Date(today);
      start = new Date(today);
      start.setDate(start.getDate() - 6);
    } else {
      return;
    }
    setStartDate(formatDateForInput(start));
    setEndDate(formatDateForInput(end));
  }

  function handleApply() {
    const start = parseInputToDate(startDate);
    const end = parseInputToDate(endDate);
    onRangeChange?.(start, end);
    onOpenChange(false);
  }

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      tabIndex={-1}
      aria-label="Date range picker"
      className={cn(
        "fade-in-soft fixed inset-x-4 top-16 z-50 overflow-hidden rounded-[var(--radius-md)] bg-white p-4 shadow-lg sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[260px]",
        className
      )}
      data-name="DateRangePicker"
      data-node-id="139:2649"
    >
      {/* Preset buttons */}
      <div className="mb-4 flex gap-2">
        {(["today", "lastWeek", "custom"] as const).map((p) => (
          <Button
            key={p}
            type="button"
            variant={preset === p ? "primary" : "outline"}
            size="sm"
            className={cn(
              "h-auto min-w-0 rounded-[var(--radius-sm)] border px-3 py-2 text-[length:var(--text-xs)] font-medium",
              preset === p
                ? "border-transparent bg-[#bdeafe] text-[var(--primary)] hover:bg-[#bdeafe]"
                : "border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/5",
              "transition-[background-color,color,border-color,transform,box-shadow] duration-150 ease-out hover:-translate-y-[1px] hover:shadow-sm"
            )}
            onClick={() => p === "custom" ? setPreset("custom") : handlePresetClick(p)}
          >
            {p === "today" ? "Today" : p === "lastWeek" ? "Last Week" : "Custom"}
          </Button>
        ))}
      </div>

      <div className="mb-4 border-t border-[var(--border)]" />

      {/* Start Date */}
      <div className="mb-3 flex min-w-0 items-center gap-3">
        <label className="w-20 shrink-0 text-[length:var(--text-xs)] font-medium leading-normal text-[var(--primary)]">
          Start Date
        </label>
        <div className="relative min-w-0 flex-1">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onClick={() => setPreset("custom")}
            className="h-10 min-w-0 w-full rounded-[var(--radius-sm)] border border-[var(--primary)] bg-white px-3 pr-8 text-[length:var(--text-xs)] text-[var(--primary)] transition-[background-color,border-color,box-shadow] duration-150 ease-out hover:bg-[var(--primary)]/5 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          <CalendarIcon className="absolute right-2 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)] transition-colors duration-150 ease-out" />
        </div>
      </div>

      {/* End Date */}
      <div className="mb-5 flex min-w-0 items-center gap-3">
        <label className="w-20 shrink-0 text-[length:var(--text-xs)] font-medium leading-normal text-[var(--primary)]">
          End Date
        </label>
        <div className="relative min-w-0 flex-1">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onClick={() => setPreset("custom")}
            className="h-10 min-w-0 w-full rounded-[var(--radius-sm)] border border-[var(--primary)] bg-white px-3 pr-8 text-[length:var(--text-xs)] text-[var(--primary)] transition-[background-color,border-color,box-shadow] duration-150 ease-out hover:bg-[var(--primary)]/5 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          <CalendarIcon className="absolute right-2 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)] transition-colors duration-150 ease-out" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 min-w-0 rounded-[var(--radius-sm)] border border-[var(--primary)] bg-transparent px-4 text-[length:var(--text-xs)] font-medium text-[var(--primary)] hover:bg-[var(--primary)]/5"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="h-9 min-w-0 rounded-[var(--radius-sm)] border-0 bg-[var(--primary)] px-4 text-[length:var(--text-xs)] font-medium text-white hover:bg-[var(--primary-light)]"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
