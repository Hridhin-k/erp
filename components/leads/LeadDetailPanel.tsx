"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Globe,
  Briefcase,
  Smile,
  Phone,
  MessageCircle,
  Mail,
  Users2,
  Zap,
  Calendar,
  User,
  Crown,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface LeadDetailPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    source: string;
    status: string;
  } | null;
}

export function LeadDetailPanel({
  open,
  onOpenChange,
  lead,
}: LeadDetailPanelProps) {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const panelRef = useRef<HTMLDivElement>(null);

  const displayLead = lead ?? {
    id: "L001",
    name: "Robert Wilson",
    email: "robert@example.com",
    phone: "+1 555 123 4567",
    source: "Website",
    status: "Interested",
  };

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

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
        aria-label="Lead Details"
        tabIndex={-1}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[672px] flex-col bg-[#f8fafc] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        data-node-id="139:3019"
      >
      {/* Header - 139:3020 / 139:3287 */}
      <div className="flex h-[86px] shrink-0 items-center justify-between border-b border-[var(--primary)] bg-white px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--primary)]/5"
            aria-label="Close"
          >
            <X className="size-5 text-[var(--primary)]" />
          </button>
          <h2 className="text-xl font-bold text-[var(--primary)]">
            {mode === "view" ? "Customer Intelligence" : "Editing Profile"}
          </h2>
        </div>
        <div className="flex gap-2">
          {mode === "view" ? (
            <Button
              variant="outline"
              size="sm"
              className="h-[37.6px] rounded-[6px] border-[var(--primary)] text-sm font-bold"
              onClick={() => setMode("edit")}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-[37.6px] rounded-[6px] border-[var(--primary)] text-sm font-bold"
                onClick={() => setMode("view")}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-[37.6px] rounded-[6px] text-sm font-bold shadow-sm"
                onClick={() => setMode("view")}
              >
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Profile card - 139:3032 */}
        <div className="mb-6 rounded-[24px] border-[0.8px] border-[var(--border-dark)] bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="flex size-24 items-center justify-center rounded-2xl bg-gray-200 text-3xl font-bold text-[var(--primary)]">
                {displayLead.name.charAt(0)}
              </div>
              <span className="absolute bottom-0 right-0 size-4 rounded-full bg-[var(--success)] ring-2 ring-white" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-[var(--primary)]">
                  {displayLead.name}
                </h3>
                <span className="rounded-full bg-[rgba(255,221,158,0.79)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6e5307]">
                  Bronze
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="flex items-center gap-1.5 rounded-[10px] bg-white/10 px-2.5 py-1 text-xs text-[var(--primary)]">
                  <Globe className="size-3.5" />
                  USA
                </span>
                <span className="flex items-center gap-1.5 rounded-[10px] bg-white/10 px-2.5 py-1 text-xs text-[var(--primary)]">
                  <Briefcase className="size-3.5" />
                  Business Consultant
                </span>
                <span className="flex items-center gap-1.5 rounded-[10px] bg-white/10 px-2.5 py-1 text-xs text-[var(--primary)]">
                  <Smile className="size-4" />
                  Positive Tone
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                className="h-[63px] flex-1 rounded-[16px] py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <Phone className="size-5 text-[#bdeafe]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#bdeafe]">
                    Call
                  </span>
                </div>
              </Button>
              <Button
                variant="primary"
                className="h-[63px] flex-1 rounded-[16px] py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <MessageCircle className="size-5 text-[#bdeafe]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#bdeafe]">
                    WhatsApp
                  </span>
                </div>
              </Button>
              <Button
                variant="primary"
                className="h-[63px] flex-1 rounded-[16px] py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <Mail className="size-5 text-[#bdeafe]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#bdeafe]">
                    Email
                  </span>
                </div>
              </Button>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-xs text-[var(--muted)]">SOURCE</p>
                <p className="text-sm font-medium text-[var(--primary)]">
                  {displayLead.source}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">STATUS</p>
                <p className="text-sm font-medium text-[var(--success)]">
                  {displayLead.status}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">TIER</p>
                <p className="text-sm font-medium text-[#6e5307]">Bronze</p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">TONE</p>
                <p className="text-sm font-medium text-[var(--accent)]">
                  Neutral
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Family Structure & Negotiation - 139:3032 */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-[0.8px] border-[var(--border-dark)] bg-gray-50/50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Users2 className="size-5 text-[var(--primary)]" />
              <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--primary)]">
                Family Structure
              </h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="rounded-lg bg-gray-200 px-2 py-1 text-[var(--primary)]">
                  Travel Group
                </span>
                <span className="rounded-lg bg-gray-300 px-2 py-1 text-[var(--primary)]">
                  Family of 4
                </span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg bg-gray-200 px-2 py-1 text-[var(--primary)]">
                  Special Occasion
                </span>
                <span className="rounded-lg bg-gray-300 px-2 py-1 text-[var(--primary)]">
                  None
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-[0.8px] border-[var(--border-dark)] bg-gray-50/50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="size-5 text-[var(--primary)]" />
              <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--primary)]">
                Negotiation Insight
              </h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="rounded-lg bg-gray-200 px-2 py-1 text-[var(--primary)]">
                  Primary Trigger
                </span>
                <span className="rounded-lg bg-gray-300 px-2 py-1 text-[var(--primary)]">
                  Luxury
                </span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg bg-gray-200 px-2 py-1 text-[var(--primary)]">
                  Price Sensitivity
                </span>
                <span className="rounded-lg bg-gray-300 px-2 py-1 text-[var(--primary)]">
                  Moderate
                </span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg bg-gray-200 px-2 py-1 text-[var(--primary)]">
                  Pref. Contact
                </span>
                <span className="rounded-lg bg-gray-300 px-2 py-1 text-[var(--primary)]">
                  WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Travel & Preferences */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--primary)]">
            Travel & Preferences
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Adventure", "Luxury", "Family", "Solo", "Fine Dining", "Beachfront", "Private Guide", "Business Class", "Veg", "Non-Veg"].map(
              (tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    ["Luxury", "Family", "Business Class", "Veg"].includes(tag)
                      ? "bg-[var(--accent)]/30 text-[var(--primary)]"
                      : "border border-[var(--accent)] bg-white text-[var(--primary)]"
                  )}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Past Tours */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--primary)]">
              Past Tours History
            </h4>
            <span className="flex items-center gap-1 text-sm text-[var(--primary)]">
              <Crown className="size-4" />
              VIP Repeat Client
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-dark)] bg-gray-50/50 p-4">
              <div className="flex items-center gap-3">
                <Globe className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="font-medium text-[var(--primary)]">
                    Swiss Alps Luxury Tour
                  </p>
                  <div className="flex gap-4 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" /> Oct 2023
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="size-3" /> 4 Pax
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[var(--primary)]">$4,500</p>
                <p className="text-xs text-[var(--muted)]">PAID VIA CARD</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-dark)] bg-gray-50/50 p-4">
              <div className="flex items-center gap-3">
                <Globe className="size-5 text-[var(--accent)]" />
                <div>
                  <p className="font-medium text-[var(--primary)]">
                    Bali Beach Retreat
                  </p>
                  <div className="flex gap-4 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" /> Jun 2023
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="size-3" /> 2 Pax
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[var(--primary)]">$3,200</p>
                <p className="text-xs text-[var(--muted)]">PAID VIA CARD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Intelligence */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--primary)]">
            Communication Intelligence
          </h4>
          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--border-dark)] bg-white p-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[var(--accent)]/30">
                    <User className="size-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--primary)]">
                      Sarah Lead (Team Lead)
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      Today, 10:45 AM
                    </p>
                  </div>
                </div>
              </div>
              <p className="mb-2 text-sm text-[var(--primary)]">
                Spoke about the Swiss tour. Customer is very keen on the Glacier
                Express. Note: They are price sensitive regarding the flight
                upgrades but will pay premium for hotels.
              </p>
              <div className="flex gap-2">
                <span className="rounded-md bg-[var(--accent)]/30 px-2 py-0.5 text-xs text-[var(--primary)]">
                  High Buying Intent
                </span>
                <span className="rounded-md bg-[var(--accent)]/30 px-2 py-0.5 text-xs text-[var(--primary)]">
                  Negotiation Open
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border-dark)] bg-white p-4">
              <div className="flex gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-[var(--accent)]/30">
                  <Monitor className="size-4 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--primary)]">
                    System Notification
                  </p>
                  <p className="text-xs text-[var(--muted)]">2 days ago</p>
                  <p className="mt-1 text-sm text-[var(--primary)]">
                    Inquiry received for &quot;Luxury Alpine Escape&quot; via
                    Website.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border-dark)] bg-gray-50/50 p-4">
              <textarea
                placeholder="Log a call note or interaction detail..."
                rows={4}
                className="w-full resize-none rounded-lg border border-[var(--border-dark)] bg-white px-4 py-3 text-sm text-[var(--primary)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
              <div className="mt-2 flex justify-end">
                <Button variant="primary" size="sm">
                  Post Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
