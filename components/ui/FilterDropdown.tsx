"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { RefObject } from "react";

const leadSourceOptions = [
  "Website",
  "Instagram",
  "Facebook",
  "Google Ads",
  "Uploads",
  "All Source",
  "Whatsapp",
] as const;

const statusOptions = [
  "All Status",
  "Interested",
  "Not Interested",
  "New",
  "Follow-Up",
  "Un Assigned",
] as const;

const salesAssociateOptions = ["Ravi Mehta", "Priya Joshi", "Anil Kumar", "Sunita Rao"] as const;

export interface FilterDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef: RefObject<HTMLElement | null>;
  onApply?: (filters: {
    leadSource?: string;
    status?: string;
    salesAssociate?: string;
  }) => void;
  className?: string;
}

export function FilterDropdown({
  open,
  onOpenChange,
  anchorRef,
  onApply,
  className,
}: FilterDropdownProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [leadSource, setLeadSource] = useState<string>("Website");
  const [status, setStatus] = useState<string>("All Status");
  const [salesAssociate, setSalesAssociate] = useState<string>("Priya Joshi");

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

  function handleApply() {
    onApply?.({ leadSource, status, salesAssociate });
    onOpenChange(false);
  }

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      tabIndex={-1}
      aria-label="Lead filters"
      className={cn(
        "fade-in-soft fixed inset-x-4 top-16 z-50 max-h-[80vh] overflow-y-auto rounded-[var(--radius-md)] bg-white p-4 shadow-lg sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[220px]",
        className
      )}
      data-name="FilterDropDown"
      data-node-id="139:2674"
    >
      <FilterSection
        title="Lead Source"
        options={leadSourceOptions}
        selected={leadSource}
        onSelect={setLeadSource}
      />
      <FilterSection
        title="Status"
        options={statusOptions}
        selected={status}
        onSelect={setStatus}
      />
      <FilterSection
        title="Sales Associate"
        options={salesAssociateOptions}
        selected={salesAssociate}
        onSelect={setSalesAssociate}
      />

      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 min-w-0 rounded-[var(--radius-sm)] border border-[var(--primary)] bg-transparent px-3 text-[length:var(--text-xs)] font-normal text-[var(--primary)] hover:bg-[var(--primary)]/5"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="h-9 min-w-0 rounded-[var(--radius-sm)] border-0 bg-[var(--primary)] px-3 text-[length:var(--text-xs)] font-medium text-white hover:bg-[var(--primary-light)]"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b border-[var(--border)] pb-3 last:border-0 last:pb-0 [&:not(:last-child)]:mb-3">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mb-2 flex w-full items-center justify-between rounded-md px-1 py-1 text-left transition-colors duration-150 ease-out hover:bg-[var(--primary)]/5"
      >
        <span className="text-[length:var(--text-xs)] font-medium text-[var(--primary)]">{title}</span>
        <ChevronDown
          className={cn("size-4 text-[var(--primary)] transition-transform", !expanded && "-rotate-90")}
        />
      </button>
      {expanded && (
        <div className="flex flex-col gap-1" role="radiogroup" aria-label={title}>
          {options.map((opt) => {
            const isSelected = selected === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onSelect(opt)}
                className="flex items-center gap-2.5 rounded-md px-1 py-1.5 text-left transition-[background-color,color,transform] duration-150 ease-out hover:translate-x-[1px] hover:bg-[var(--primary)]/5"
                role="radio"
                aria-checked={isSelected}
              >
                <span
                  className={cn(
                    "flex size-3.5 shrink-0 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-[var(--primary)] bg-[var(--accent)]"
                      : "border-[var(--border-dark)] bg-white"
                  )}
                >
                  {isSelected && <span className="size-1.5 rounded-full bg-[var(--primary)]" />}
                </span>
                <span
                  className={cn(
                    "text-[length:var(--text-xs)] font-normal",
                    isSelected ? "text-[var(--primary)]" : "text-[var(--border-dark)]"
                  )}
                >
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
