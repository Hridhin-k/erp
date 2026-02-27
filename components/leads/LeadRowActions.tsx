"use client";

import { useRef, useState } from "react";
import { Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LeadActionsDropdown } from "@/components/ui/LeadActionsDropdown";

interface LeadRowActionsProps {
  leadId: string;
  onView?: (leadId: string) => void;
  onEdit?: (leadId: string) => void;
  onDelete?: (leadId: string) => void;
}

export function LeadRowActions({
  leadId,
  onView,
  onEdit,
  onDelete,
}: LeadRowActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="ghostMuted"
        size="iconSm"
        aria-label="View lead"
        onClick={() => onView?.(leadId)}
      >
        <Eye className="size-4" />
      </Button>
      <div ref={anchorRef} className="relative">
        <Button
          type="button"
          variant="ghostMuted"
          size="iconSm"
          aria-label="More options"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen((o) => !o)}
        >
          <MoreVertical className="size-4" />
        </Button>
        <LeadActionsDropdown
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
          anchorRef={anchorRef}
          onEdit={() => onEdit?.(leadId)}
          onDelete={() => onDelete?.(leadId)}
        />
      </div>
    </div>
  );
}
