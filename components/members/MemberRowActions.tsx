"use client";

import { useRef, useState } from "react";
import { Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LeadActionsDropdown } from "@/components/ui/LeadActionsDropdown";

interface MemberRowActionsProps {
  memberEmail: string;
  onView?: (email: string) => void;
  onEdit?: (email: string) => void;
  onDelete?: (email: string) => void;
}

export function MemberRowActions({
  memberEmail,
  onView,
  onEdit,
  onDelete,
}: MemberRowActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="ghostMuted"
        size="iconSm"
        aria-label="View member"
        onClick={() => onView?.(memberEmail)}
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
          onEdit={() => onEdit?.(memberEmail)}
          onDelete={() => onDelete?.(memberEmail)}
          editLabel="Edit Member"
          deleteLabel="Delete Member"
        />
      </div>
    </div>
  );
}
