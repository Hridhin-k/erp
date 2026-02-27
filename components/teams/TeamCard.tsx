"use client";

import Image from "next/image";
import { Pencil, Trash2, Star, TrendingUp, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface TeamMember {
  name: string;
}

export interface TeamCardProps {
  name: string;
  memberCount: number;
  teamLead: {
    name: string;
  };
  conversion: string;
  revenue: string;
  members: TeamMember[];
  performance?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TeamCard({
  name,
  memberCount,
  teamLead,
  conversion,
  revenue,
  members,
  performance,
  onEdit,
  onDelete,
}: TeamCardProps) {
  return (
    <div
      className="flex w-full max-w-[353px] flex-col gap-4 rounded-2xl border border-[#a0a9ba] bg-white p-6"
      data-name="TeamCard"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#bdeafe]">
            <Users2 className="size-5 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--primary)]">
              {name}
            </h3>
            <p className="text-xs text-[var(--primary)]">
              {memberCount} {memberCount === 1 ? "member" : "members"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghostMuted"
            size="iconSm"
            aria-label="Edit team"
            onClick={onEdit}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghostDanger"
            size="iconSm"
            aria-label="Delete team"
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      {/* Team Lead */}
      <div className="flex items-center gap-3 rounded-xl border border-[#a0a9ba] p-3">
        <div className="relative size-9 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teamLead.name}`}
            alt={teamLead.name}
            width={36}
            height={36}
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-[var(--primary)]">
              {teamLead.name}
            </span>
            <Star className="size-3 shrink-0 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs font-medium text-[#ff6900]">Team Lead</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1 rounded-xl border border-[#a0a9ba] p-3">
          <p className="text-xs font-medium text-[var(--primary)]">Conversion</p>
          <p className="text-lg font-normal text-[var(--primary)]">{conversion}</p>
        </div>
        <div className="flex flex-1 flex-col gap-1 rounded-xl border border-[#a0a9ba] p-3">
          <p className="text-xs font-medium text-[var(--primary)]">Revenue</p>
          <p className="text-lg font-normal text-[var(--primary)]">{revenue}</p>
        </div>
      </div>

      {/* Team Members */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-[var(--primary)]">Team Members</p>
        {members.length > 0 ? (
          <div className="flex flex-col gap-3">
            {members.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                <div className="relative size-7 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                    alt={member.name}
                    width={28}
                    height={28}
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-[var(--primary)]">{member.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--primary)]">No members assigned</p>
        )}
      </div>

      {/* Performance */}
      <div
        className={cn(
          "flex items-center justify-between border-t border-[#a0a9ba] pt-2"
        )}
      >
        <p className="text-xs font-medium text-[var(--primary)]">Performance</p>
        {performance ? (
          <div className="flex items-center gap-1">
            <TrendingUp className="size-3 text-[var(--success)]" />
            <span className="text-xs font-medium text-[var(--success)]">
              {performance}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
