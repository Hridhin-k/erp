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
        "absolute right-0 top-full z-50 mt-2 w-[200px] min-w-0 overflow-hidden rounded-[11.413px] bg-white p-4 shadow-[-1.802px_2.403px_14.657px_-4.205px_rgba(0,0,0,0.09)]",
        className
      )}
      data-name="FilterDropDown"
      data-node-id="139:2674"
    >
      {/* Lead Source */}
      <FilterSection
        title="Lead Source"
        options={leadSourceOptions}
        selected={leadSource}
        onSelect={setLeadSource}
      />
      {/* Status */}
      <FilterSection
        title="Status"
        options={statusOptions}
        selected={status}
        onSelect={setStatus}
      />
      {/* Sales Associate */}
      <FilterSection
        title="Sales Associate"
        options={salesAssociateOptions}
        selected={salesAssociate}
        onSelect={setSalesAssociate}
      />

      {/* Action buttons - 139:2718 Apply, 139:2719 Cancel */}
      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-[21.024px] min-w-0 rounded-[6.007px] border-[0.601px] border-solid border-[var(--primary)] bg-transparent px-3 py-1 text-[9.01px] font-normal text-[var(--primary)] hover:bg-[var(--primary)]/5"
          data-node-id="139:2719"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="h-[21.024px] min-w-0 rounded-[6.007px] border-0 bg-[var(--primary)] px-3 py-1 text-[9.01px] font-medium text-white hover:bg-[var(--primary-light)]"
          data-node-id="139:2718"
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
        className="mb-2 flex w-full items-center justify-between text-left"
      >
        <span className="text-[9.611px] font-medium text-[var(--primary)]">{title}</span>
        <ChevronDown
          className={cn("size-3 text-[var(--primary)] transition-transform", !expanded && "-rotate-90")}
        />
      </button>
      {expanded && (
        <div className="flex flex-col gap-1.5" role="radiogroup" aria-label={title}>
          {options.map((opt) => {
            const isSelected = selected === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onSelect(opt)}
                className="flex items-center gap-2 text-left"
                role="radio"
                aria-checked={isSelected}
              >
                <span
                  className={cn(
                    "flex size-[7px] shrink-0 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-[var(--primary)] bg-[var(--accent)]"
                      : "border-[var(--border-dark)] bg-white"
                  )}
                >
                  {isSelected && <span className="size-1 rounded-full bg-[var(--primary)]" />}
                </span>
                <span
                  className={cn(
                    "text-[9.01px] font-normal",
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
