"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BaseModal } from "@/components/ui/BaseModal";

interface PendingLead {
  id: string;
  name: string;
  packageName: string;
  source: string;
  email: string;
  amount: string;
}

interface AssociateOption {
  id: string;
  label: string;
}

interface AssignLeadsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultPendingLeads: PendingLead[] = [
  {
    id: "l1",
    name: "Michael Thompson",
    packageName: "Bali Package",
    source: "Website",
    email: "michael@email.com",
    amount: "$4,200",
  },
  {
    id: "l2",
    name: "Emma Williams",
    packageName: "Europe Tour",
    source: "Google Ads",
    email: "emma@email.com",
    amount: "$8,500",
  },
  {
    id: "l3",
    name: "David Chen",
    packageName: "Japan Trip",
    source: "Referral",
    email: "david@email.com",
    amount: "$6,300",
  },
  {
    id: "l4",
    name: "Sophie Brown",
    packageName: "Thailand Holiday",
    source: "Social Media",
    email: "sophie@email.com",
    amount: "$5,800",
  },
  {
    id: "l5",
    name: "James Wilson",
    packageName: "Maldives Escape",
    source: "Website",
    email: "james@email.com",
    amount: "$7,200",
  },
];

const associateOptions: AssociateOption[] = [
  { id: "john", label: "John Davis (12 calls today)" },
  { id: "maria", label: "Maria Santos (9 calls today)" },
  { id: "robert", label: "Robert Kumar (8 calls today)" },
  { id: "lisa", label: "Lisa Peterson (6 calls today)" },
  { id: "ahmed", label: "Ahmed Ali (5 calls today)" },
];

export function AssignLeadsModal({ open, onOpenChange }: AssignLeadsModalProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  const titleCount = useMemo(() => defaultPendingLeads.length, []);

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      ariaLabel="Assign Leads to Team Members"
      className="max-w-full rounded-2xl border border-[#a0a9ba] bg-white p-4 shadow-[var(--shadow-modal)] sm:max-w-[85vw] sm:p-6 md:max-w-[70vw] lg:max-w-[768px]"
      dataNodeId="139:4881"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-[length:var(--text-xl)] font-medium text-[var(--primary)] sm:text-[length:var(--text-2xl)]">
          Assign Leads to Team Members ({titleCount})
        </h2>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
          aria-label="Close assign leads panel"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="max-h-[calc(100vh-180px)] space-y-3 overflow-y-auto pr-1 sm:max-h-[min(740px,calc(100vh-200px))]">
        {defaultPendingLeads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-xl border border-[#a0a9ba] bg-white p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-medium text-[var(--primary)]">
                  {lead.name}
                </p>
                <p className="text-sm text-[var(--primary)]">{lead.packageName}</p>
                <p className="text-xs text-[var(--primary)]">
                  Source: {lead.source} {lead.email}
                </p>
              </div>
              <p className="text-xl font-normal text-[var(--primary)]">
                {lead.amount}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <select
                value={assignments[lead.id] ?? ""}
                onChange={(e) =>
                  setAssignments((prev) => ({ ...prev, [lead.id]: e.target.value }))
                }
                className={cn(
                  "h-11 w-full rounded-xl border border-[#a0a9ba] bg-[var(--surface-input)] px-3 text-sm text-[var(--primary)] sm:flex-1",
                  "focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                )}
              >
                <option value="">Select Associate...</option>
                {associateOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="h-11 shrink-0 rounded-xl px-5"
                onClick={() => {
                  const selected = assignments[lead.id];
                  if (!selected) return;
                  const selectedAssociate = associateOptions.find(
                    (option) => option.id === selected
                  );
                  console.log("Assign lead", lead.id, "to", selectedAssociate?.label);
                }}
              >
                Assign
              </Button>
            </div>
          </div>
        ))}
      </div>
    </BaseModal>
  );
}
