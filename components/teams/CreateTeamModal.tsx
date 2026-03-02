"use client";

import { useState, useCallback } from "react";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BaseModal } from "@/components/ui/BaseModal";

export interface TeamFormData {
  name: string;
  teamLeadId: string;
}

export interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (team: TeamFormData) => void;
  teamLeads?: { id: string; name: string }[];
  mode?: "create" | "edit";
  initialData?: TeamFormData;
  /** @deprecated Use onSubmit instead */
  onCreateTeam?: (team: TeamFormData) => void;
}

export function CreateTeamModal({
  open,
  onOpenChange,
  onSubmit,
  onCreateTeam,
  teamLeads = [],
  mode = "create",
  initialData,
}: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState(initialData?.name ?? "");
  const [teamLeadId, setTeamLeadId] = useState(initialData?.teamLeadId ?? "");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isEdit = mode === "edit";

  const resetForm = useCallback(() => {
    setTeamName("");
    setTeamLeadId("");
    setDropdownOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    resetForm();
  }, [onOpenChange, resetForm]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!teamName.trim()) return;
    const data = { name: teamName.trim(), teamLeadId };
    onSubmit?.(data);
    onCreateTeam?.(data);
    handleClose();
  }

  const selectedLead = teamLeads.find((l) => l.id === teamLeadId);

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      ariaLabel={isEdit ? "Edit Team" : "Create New Team"}
      className={cn(
        "max-w-[480px] rounded-2xl border-[0.8px] bg-white",
        isEdit ? "border-black" : "border-[var(--primary)]"
      )}
      dataNodeId={isEdit ? "139:2835" : "139:2798"}
    >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 pb-[0.8px]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--primary)]">
              {isEdit ? "Edit Team" : "Create New Team"}
            </h2>
            {!isEdit && (
              <button
                type="button"
                onClick={handleClose}
                className="flex size-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* Team Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="teamName"
                className="text-sm font-medium text-[var(--primary)]"
              >
                Team Name *
              </label>
              <input
                id="teamName"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g., North America Team"
                required
                className={cn(
                  "h-11 w-full rounded-xl border-[0.8px] border-[#a0a9ba] px-4 text-base text-[var(--primary)] placeholder:text-[#a1a9b7] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]",
                  isEdit ? "bg-[#eee]" : "bg-[rgba(198,198,198,0.29)]"
                )}
              />
            </div>

            {/* Team Lead */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--primary)]">
                Team Lead *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn(
                    "flex h-11 w-full items-center justify-between rounded-xl border-[0.8px] border-[#a0a9ba] px-4 text-base text-[var(--primary)]",
                    isEdit ? "bg-[#efefef]" : "bg-[rgba(198,198,198,0.29)]"
                  )}
                >
                  <span className={cn(!selectedLead && "text-[#a1a9b7]")}>
                    {selectedLead?.name || "Select team lead"}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-[var(--primary)]" />
                </button>
                {dropdownOpen && teamLeads.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-xl border border-[#a0a9ba] bg-white py-1 shadow-lg">
                    {teamLeads.map((lead) => (
                      <button
                        key={lead.id}
                        type="button"
                        onClick={() => {
                          setTeamLeadId(lead.id);
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[var(--primary)] hover:bg-[var(--primary)]/5"
                      >
                        {lead.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!isEdit && teamLeads.length === 0 && (
                <p className="text-xs text-[var(--primary)]">
                  No available team leads. Please create a user with
                  &ldquo;Team Lead&rdquo; role first.
                </p>
              )}
            </div>

            {/* Tips / Quick Actions */}
            <div className={cn(
              "flex flex-col gap-2 rounded-xl border-[0.8px] border-[#a0a9ba] px-4 py-4",
              isEdit ? "bg-[#eee]" : "bg-[rgba(198,198,198,0.29)]"
            )}>
              <p className="text-xs text-[var(--primary)]">
                {isEdit ? "Quick Actions:" : "Team Creation Tips:"}
              </p>
              <ul className="flex flex-col gap-1 text-xs text-[var(--primary)]">
                {isEdit ? (
                  <>
                    <li>• Reassigning a lead will update their team context immediately</li>
                    <li>• Team member history is preserved during renames</li>
                  </>
                ) : (
                  <>
                    <li>• The team lead will be able to assign leads to team members</li>
                    <li>• You can add members to this team from the Members section</li>
                    <li>• Team performance metrics will be calculated automatically</li>
                  </>
                )}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 py-4 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="h-11 flex-1 rounded-xl"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="h-11 flex-1 rounded-xl"
              >
                {isEdit ? "Save Changes" : "Create Team"}
              </Button>
            </div>
          </div>
        </form>
    </BaseModal>
  );
}
