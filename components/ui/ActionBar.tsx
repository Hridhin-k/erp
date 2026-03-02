"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Calendar, Download, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

const DateRangePicker = dynamic(
  () =>
    import("@/components/ui/DateRangePicker").then((mod) => mod.DateRangePicker),
  { loading: () => null }
);

const FilterDropdown = dynamic(
  () =>
    import("@/components/ui/FilterDropdown").then((mod) => mod.FilterDropdown),
  { loading: () => null }
);

export interface ActionBarProps {
  todayLabel?: string;
  todayActive?: boolean;
  onTodayClick?: () => void;
  calendarRef: React.RefObject<HTMLDivElement | null>;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  onRangeChange?: (start: Date, end: Date) => void;
  filterRef?: React.RefObject<HTMLDivElement | null>;
  filterOpen?: boolean;
  onFilterOpenChange?: (open: boolean) => void;
  onFilterApply?: (filters: {
    leadSource?: string;
    status?: string;
    salesAssociate?: string;
  }) => void;
  onExportClick?: () => void;
  addLabel?: string;
  onAddClick?: () => void;
  showAdd?: boolean;
}

export function ActionBar({
  todayLabel = "Today",
  todayActive = true,
  onTodayClick,
  calendarRef,
  calendarOpen,
  onCalendarOpenChange,
  onRangeChange,
  filterRef: filterRefProp,
  filterOpen: filterOpenProp,
  onFilterOpenChange: onFilterOpenChangeProp,
  onFilterApply,
  onExportClick,
  addLabel = "Add Lead",
  onAddClick,
  showAdd = true,
}: ActionBarProps) {
  const filterAnchorRef = useRef<HTMLDivElement>(null);
  const filterRef = filterRefProp ?? filterAnchorRef;
  const [filterOpenInternal, setFilterOpenInternal] = useState(false);
  const filterOpen = filterOpenProp ?? filterOpenInternal;
  const setFilterOpen =
    onFilterOpenChangeProp ??
    ((open: boolean) => setFilterOpenInternal(open));

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <Button
        variant={todayActive ? "primary" : "secondary"}
        size="md"
        onClick={onTodayClick}
        className="text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)]"
      >
        {todayLabel}
      </Button>
      <div ref={calendarRef} className="relative">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => onCalendarOpenChange(!calendarOpen)}
          aria-expanded={calendarOpen}
          aria-haspopup="dialog"
        >
          <Calendar className="size-4" />
        </Button>
        <DateRangePicker
          open={calendarOpen}
          onOpenChange={onCalendarOpenChange}
          anchorRef={calendarRef}
          onRangeChange={onRangeChange}
        />
      </div>
      <div ref={filterRef} className="relative">
        <Button
          variant="secondary"
          size="icon"
          onClick={() =>
          onFilterOpenChangeProp ? onFilterOpenChangeProp(!filterOpen) : setFilterOpen(!filterOpen)
        }
          aria-expanded={filterOpen}
          aria-haspopup="dialog"
        >
          <Filter className="size-4" />
        </Button>
        <FilterDropdown
          open={filterOpen}
          onOpenChange={onFilterOpenChangeProp ?? setFilterOpen}
          anchorRef={filterRef}
          onApply={onFilterApply}
        />
      </div>
      <Button
        variant="secondary"
        size="md"
        leftIcon={<Download className="size-4" />}
        onClick={onExportClick}
        className="text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)]"
      >
        <span className="hidden sm:inline">Export Report</span>
        <span className="sm:hidden">Export</span>
      </Button>
      {showAdd && (
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="size-4" />}
          onClick={onAddClick}
          className="text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)]"
        >
          {addLabel}
        </Button>
      )}
    </div>
  );
}
