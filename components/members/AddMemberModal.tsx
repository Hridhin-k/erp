"use client";

import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BaseModal } from "@/components/ui/BaseModal";

const ROLES = [
  { id: "team-lead", label: "Team Lead" },
  { id: "associate", label: "Sales Associate" },
];

export interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember?: (member: {
    fullName: string;
    email: string;
    role: string;
    team?: string;
  }) => void;
  teams?: string[];
}

export function AddMemberModal({
  open,
  onOpenChange,
  onAddMember,
  teams = ["Asia Pacific Team", "Europe Team", "Americas Team"],
}: AddMemberModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);

  const resetForm = useCallback(() => {
    setFullName("");
    setEmail("");
    setRole("");
    setTeam("");
    setRoleOpen(false);
    setTeamOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    resetForm();
  }, [onOpenChange, resetForm]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !role) return;
    onAddMember?.({
      fullName: fullName.trim(),
      email: email.trim(),
      role,
      team: team || undefined,
    });
    handleClose();
  }

  const selectedRole = ROLES.find((r) => r.id === role);

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      ariaLabel="Add New Member"
      className="max-w-[480px] rounded-2xl border-[0.8px] border-[#a0a9ba] bg-white"
      dataNodeId="139:2967"
    >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 pb-[0.8px]">
          {/* Header */}
          <h2 className="text-xl font-semibold text-[var(--primary)]">
            Add New Member
          </h2>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="memberName"
                className="text-sm font-medium text-[var(--primary)]"
              >
                Full Name *
              </label>
              <input
                id="memberName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className="h-11 w-full rounded-xl border-[0.8px] border-[#a0a9ba] bg-[rgba(198,198,198,0.21)] px-4 text-base text-[var(--primary)] placeholder:text-[var(--primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="memberEmail"
                className="text-sm font-medium text-[var(--primary)]"
              >
                Email *
              </label>
              <input
                id="memberEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@holidaypanda.com"
                required
                className="h-11 w-full rounded-xl border-[0.8px] border-[#a0a9ba] bg-[rgba(198,198,198,0.21)] px-4 text-base text-[var(--primary)] placeholder:text-[var(--primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--primary)]">
                Role *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setRoleOpen(!roleOpen);
                    setTeamOpen(false);
                  }}
                  className="flex h-11 w-full items-center justify-between rounded-xl border-[0.8px] border-[#a0a9ba] bg-[rgba(198,198,198,0.21)] px-4 text-base text-[var(--primary)]"
                >
                  <span className={cn(!selectedRole && "text-[var(--primary)]/50")}>
                    {selectedRole?.label || "Select role"}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-[var(--primary)]" />
                </button>
                {roleOpen && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-auto rounded-xl border border-[#a0a9ba] bg-white py-1 shadow-lg">
                    {ROLES.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          setRole(r.id);
                          setRoleOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[var(--primary)] hover:bg-[var(--primary)]/5"
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Assign to Team */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--primary)]">
                Assign to Team (Optional)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setTeamOpen(!teamOpen);
                    setRoleOpen(false);
                  }}
                  className="flex h-11 w-full items-center justify-between rounded-xl border-[0.8px] border-[#a0a9ba] bg-[rgba(198,198,198,0.21)] px-4 text-base text-[var(--primary)]"
                >
                  <span className={cn(!team && "text-[var(--primary)]/50")}>
                    {team || "Select team"}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-[var(--primary)]" />
                </button>
                {teamOpen && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-xl border border-[#a0a9ba] bg-white py-1 shadow-lg">
                    {teams.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setTeam(t);
                          setTeamOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[var(--primary)] hover:bg-[var(--primary)]/5"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="flex flex-col gap-2 rounded-xl border-[0.8px] border-[#a0a9ba] bg-[#f3f3f3] px-4 py-4">
              <p className="text-xs text-[var(--primary)]">
                ℹ️ Member Roles:
              </p>
              <ul className="flex flex-col gap-1 text-xs text-[var(--primary)]">
                <li>
                  • <span className="font-bold">Team Lead</span>: Can assign leads to team members and view team analytics
                </li>
                <li>
                  • <span className="font-bold">Sales Associate</span>: Can follow up on assigned leads and update lead status
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 py-4 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="h-11 flex-1 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="h-11 flex-1 rounded-md"
              >
                Add Member
              </Button>
            </div>
          </div>
        </form>
    </BaseModal>
  );
}
