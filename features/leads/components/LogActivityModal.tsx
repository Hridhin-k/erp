"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BaseModal } from "@/components/ui/BaseModal";

const leadOptions = [
  "L001 - Rajesh Kumar",
  "L002 - Priya Sharma",
  "L003 - Amit Patel",
  "L004 - Sneha Reddy",
  "L005 - Vikram Singh",
];

const activityTypeOptions = ["Call", "Email", "Meeting", "WhatsApp", "Follow-up"];
const outcomeOptions = [
  "Connected",
  "No Answer",
  "Interested",
  "Not Interested",
  "Follow-up Required",
  "Converted",
];

export interface LogActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogActivityModal({ open, onOpenChange }: LogActivityModalProps) {
  const [lead, setLead] = useState("");
  const [activityType, setActivityType] = useState("");
  const [outcome, setOutcome] = useState("");
  const [notes, setNotes] = useState("");
  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSave = useCallback(() => {
    console.log("Log activity:", { lead, activityType, outcome, notes });
    onOpenChange(false);
  }, [lead, activityType, outcome, notes, onOpenChange]);

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      ariaLabel="Log Activity"
      className="max-w-full rounded-2xl border border-[var(--border-dark)] bg-white p-4 sm:max-w-[85vw] sm:p-6 md:max-w-[70vw] lg:max-w-[510px]"
      dataNodeId="139:7049"
    >
      <h2 className="text-[length:var(--text-2xl)] font-semibold text-[var(--primary)] sm:text-[length:var(--text-3xl)]">Log Activity</h2>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-[var(--primary)]">Lead</label>
          <select
            value={lead}
            onChange={(event) => setLead(event.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--border-dark)] bg-[var(--surface-input)] px-3 text-sm text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          >
            <option value="">Select lead...</option>
            {leadOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-[var(--primary)]">Activity Type</label>
          <select
            value={activityType}
            onChange={(event) => setActivityType(event.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--border-dark)] bg-[var(--surface-input)] px-3 text-sm text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          >
            <option value="">Select activity type...</option>
            {activityTypeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-[var(--primary)]">Outcome</label>
          <select
            value={outcome}
            onChange={(event) => setOutcome(event.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--border-dark)] bg-[var(--surface-input)] px-3 text-sm text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          >
            <option value="">Select outcome...</option>
            {outcomeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-[var(--primary)]">Notes</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add notes about this interaction..."
            rows={3}
            className="w-full rounded-xl border border-[var(--border-dark)] bg-[var(--surface-input)] px-4 py-3 text-base text-[var(--primary)] placeholder:text-black/50 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 pt-4 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="h-11 flex-1 rounded-xl"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          className="h-11 flex-1 rounded-xl"
          onClick={handleSave}
        >
          Save Activity
        </Button>
      </div>
    </BaseModal>
  );
}
