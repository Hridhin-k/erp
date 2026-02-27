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
        "absolute right-0 top-full z-50 mt-2 min-w-0 w-[240px] overflow-hidden rounded-[11.413px] bg-white p-4 shadow-[-1.802px_2.403px_14.657px_-4.205px_rgba(0,0,0,0.09)]",
        className
      )}
      data-name="DateRangePicker"
      data-node-id="139:2649"
    >
      {/* Preset buttons - 139:2592 selected, 139:2591 unselected */}
      <div className="mb-4 flex gap-2">
        <Button
          type="button"
          variant={preset === "today" ? "primary" : "outline"}
          size="sm"
          className={cn(
            "h-auto min-w-0 rounded-[6.007px] border-[0.601px] border-solid px-3 py-1.5 text-[9.01px] font-medium",
            preset === "today"
              ? "border-transparent bg-[#bdeafe] text-[var(--primary)] hover:bg-[#bdeafe]"
              : "border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/5"
          )}
          onClick={() => handlePresetClick("today")}
        >
          Today
        </Button>
        <Button
          type="button"
          variant={preset === "lastWeek" ? "primary" : "outline"}
          size="sm"
          className={cn(
            "h-auto min-w-0 rounded-[6.007px] border-[0.601px] border-solid px-3 py-1.5 text-[9.01px] font-medium",
            preset === "lastWeek"
              ? "border-transparent bg-[#bdeafe] text-[var(--primary)] hover:bg-[#bdeafe]"
              : "border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/5"
          )}
          onClick={() => handlePresetClick("lastWeek")}
        >
          Last Week
        </Button>
        <Button
          type="button"
          variant={preset === "custom" ? "primary" : "outline"}
          size="sm"
          className={cn(
            "h-auto min-w-0 rounded-[6.007px] border-[0.601px] border-solid px-3 py-1.5 text-[9.01px] font-medium",
            preset === "custom"
              ? "border-transparent bg-[#bdeafe] text-[var(--primary)] hover:bg-[#bdeafe]"
              : "border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/5"
          )}
          onClick={() => setPreset("custom")}
        >
          Custom
        </Button>
      </div>

      {/* Divider */}
      <div className="mb-4 border-t border-[var(--border)]" />

      {/* Start Date - 139:2588 input, 139:2599 label style */}
      <div className="mb-3 flex min-w-0 items-center gap-3">
        <label
          className="w-20 shrink-0 text-[9.01px] font-medium leading-normal text-[var(--primary)]"
          data-node-id="139:2599"
        >
          Start Date
        </label>
        <div
          className="relative min-w-0 flex-1"
          data-node-id="139:2588"
        >
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onClick={() => setPreset("custom")}
            className="h-[34px] min-w-0 w-full rounded-[6.007px] border-[0.601px] border-solid border-[var(--primary)] bg-white px-3 pr-8 text-[9.01px] text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          <CalendarIcon className="absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-[var(--muted)]" />
        </div>
      </div>

      {/* End Date - 139:2594 input, 139:2599 label style */}
      <div className="mb-5 flex min-w-0 items-center gap-3">
        <label
          className="w-20 shrink-0 text-[9.01px] font-medium leading-normal text-[var(--primary)]"
          data-node-id="139:2599"
        >
          End Date
        </label>
        <div
          className="relative min-w-0 flex-1"
          data-node-id="139:2594"
        >
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onClick={() => setPreset("custom")}
            className="h-[34px] min-w-0 w-full rounded-[6.007px] border-[0.601px] border-solid border-[var(--primary)] bg-white px-3 pr-8 text-[9.01px] text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
          <CalendarIcon className="absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-[var(--muted)]" />
        </div>
      </div>

      {/* Action buttons - 139:2591 Cancel, 139:2593 Apply */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-auto min-w-0 rounded-[6.007px] border-[0.601px] border-solid border-[var(--primary)] bg-transparent px-3 py-1.5 text-[9.01px] font-medium text-[var(--primary)] hover:bg-[var(--primary)]/5"
          data-node-id="139:2591"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="h-auto min-w-0 rounded-[6.007px] border-0 bg-[var(--primary)] px-3 py-1.5 text-[9.01px] font-medium text-white hover:bg-[var(--primary-light)]"
          data-node-id="139:2593"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
