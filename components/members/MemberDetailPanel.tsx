"use client";

import { useEffect, useRef } from "react";
import {
  X,
  Phone,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Users2,
  Mail,
  Crown,
} from "lucide-react";
import Image from "next/image";

export interface MemberDetailPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: {
    name: string;
    email: string;
    role: "team-lead" | "associate";
    team: string;
    callsToday?: number;
    conversions?: number;
    totalRevenue?: string;
    conversionRate?: string;
    conversionTarget?: string;
    conversionPercent?: number;
    dailyCalls?: number;
    dailyCallQuota?: number;
    dailyCallPercent?: number;
    productivityTrend?: string;
    memberSince?: string;
  } | null;
}

const roleLabels: Record<string, string> = {
  "team-lead": "Team Lead",
  associate: "Associate",
};

export function MemberDetailPanel({
  open,
  onOpenChange,
  member,
}: MemberDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !member) return;
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, member, onOpenChange]);

  if (!open || !member) return null;

  const {
    name,
    email,
    role,
    team,
    callsToday = 0,
    conversions = 0,
    totalRevenue = "$0",
    conversionRate = "12.5%",
    conversionTarget = "15%",
    conversionPercent = 83,
    dailyCalls = 0,
    dailyCallQuota = 25,
    dailyCallPercent = 0,
    productivityTrend = "+8% productivity this week",
    memberSince = "Dec 2024",
  } = member;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Member Details"
        tabIndex={-1}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[672px] flex-col bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        data-node-id="139:2870"
      >
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-[#c6c6c6]">
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                  alt={name}
                  width={64}
                  height={64}
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-[var(--primary)]">
                  {name}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#ffeadb] px-2 py-0.5 text-xs font-medium text-[#ff6900]">
                    <Crown className="size-3" />
                    {roleLabels[role] ?? role}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--primary)]">
                    <Mail className="size-3" />
                    {email}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex size-10 items-center justify-center rounded-xl bg-[rgba(255,81,81,0.13)] transition-colors hover:bg-[rgba(255,81,81,0.25)]"
              aria-label="Close"
            >
              <X className="size-5 text-red-500" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 px-6">
            <StatCard
              icon={<Phone className="size-4 text-[var(--primary)]" />}
              label="Calls Today"
              value={String(callsToday)}
            />
            <StatCard
              icon={<CheckCircle2 className="size-4 text-[var(--primary)]" />}
              label="Conversions"
              value={String(conversions)}
            />
            <StatCard
              icon={<DollarSign className="size-4 text-[var(--primary)]" />}
              label="Total Revenue"
              value={totalRevenue}
            />
          </div>

          {/* Performance Summary */}
          <div className="mt-6 flex flex-col gap-4 px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[1.4px] text-[var(--primary)]">
                Performance Summary
              </h3>
              <span className="flex items-center gap-2 text-xs text-[var(--success)]">
                <TrendingUp className="size-4" />
                {productivityTrend}
              </span>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border-[0.8px] border-[#a0a9ba] p-4">
              {/* Conversion Rate */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--primary)]">
                    Conversion Rate Target
                  </span>
                  <span className="text-xs text-[var(--primary)]">
                    {conversionRate} / {conversionTarget}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#bdeafe]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)]"
                    style={{ width: `${Math.min(conversionPercent, 100)}%` }}
                  />
                </div>
              </div>

              {/* Daily Call Quota */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--primary)]">
                    Daily Call Quota
                  </span>
                  <span className="text-xs text-[var(--primary)]">
                    {dailyCalls} / {dailyCallQuota}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--primary)]">
                  <div
                    className="h-full rounded-full bg-[#ad46ff]"
                    style={{ width: `${Math.min(dailyCallPercent, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 px-6 pb-6">
            <div className="flex flex-col gap-2 rounded-2xl border-[0.8px] border-[#a0a9ba] bg-[#bdeafe] p-4">
              <span className="text-xs font-bold uppercase text-[var(--primary)]">
                Assigned Team
              </span>
              <span className="flex items-center gap-2 text-sm text-[var(--primary)]">
                <Users2 className="size-4" />
                {team}
              </span>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border-[0.8px] border-[#a0a9ba] bg-[#bdeafe] p-4">
              <span className="text-xs font-bold uppercase text-[var(--primary)]">
                Member Since
              </span>
              <span className="text-sm text-[var(--primary)]">
                {memberSince}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-[#a0a9ba] p-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-bold uppercase tracking-[0.6px] text-[var(--primary)]">
          {label}
        </span>
      </div>
      <p className="text-2xl text-[var(--primary)]">{value}</p>
    </div>
  );
}
