"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Calendar,
  Crown,
  Globe,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  Smile,
  User,
  Users2,
  X,
  Zap,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface SalesCustomerProfileModalProps {
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

export function SalesCustomerProfileModal({
  open,
  onOpenChange,
  lead,
}: SalesCustomerProfileModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nationality, setNationality] = useState("");

  const displayLead = lead ?? {
    id: "L001",
    name: "Robert Wilson",
    email: "robert@example.com",
    phone: "+1 555 123 4567",
    source: "Website",
    status: "Interested",
  };

  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setFullName(displayLead.name);
    setStatus(displayLead.status);
    setOccupation("Business Consultant");
    setNationality("USA");
  }, [displayLead.name, displayLead.status]);
  const handleSaveChanges = useCallback(() => {
    setIsEditing(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;
    setFullName(displayLead.name);
    setStatus(displayLead.status);
    setOccupation("Business Consultant");
    setNationality("USA");
  }, [open, displayLead.name, displayLead.status]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={handleClose} aria-hidden />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Customer Profile"
          tabIndex={-1}
          className="flex h-[92vh] w-full max-w-[760px] flex-col overflow-hidden border border-[var(--border-dark)] bg-white"
          data-node-id="150:483"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[var(--border-dark)] px-6 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex size-6 items-center justify-center rounded-full bg-[#fae9e9] text-red-500"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <h2 className="text-2xl font-semibold text-[var(--primary)]">
                {isEditing ? "Editing Profile" : "Customer Profile"}
              </h2>
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-md px-3"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="h-9 rounded-md px-3"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-md px-3"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="rounded-2xl border border-[var(--border-dark)] bg-white p-4 sm:p-5">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="flex size-20 items-center justify-center rounded-2xl bg-[#d3d3d3] text-3xl font-bold text-black">
                    {displayLead.name.charAt(0)}
                  </div>
                  <span className="absolute bottom-0 right-0 size-4 rounded-full bg-[var(--success)] ring-2 ring-white" />
                </div>
                {isEditing ? (
                  <div className="mt-4 grid w-full gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[var(--muted)]">Full Name</label>
                      <input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        className="h-9 w-full rounded-xl border border-[var(--border-dark)] bg-[#d3d3d3] px-3 text-sm text-[var(--primary)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[var(--muted)]">Status</label>
                      <input
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        className="h-9 w-full rounded-xl border border-[var(--border-dark)] bg-[#d3d3d3] px-3 text-sm text-[var(--primary)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[var(--muted)]">Occupation</label>
                      <input
                        value={occupation}
                        onChange={(event) => setOccupation(event.target.value)}
                        className="h-9 w-full rounded-xl border border-[var(--border-dark)] bg-[#d3d3d3] px-3 text-sm text-[var(--primary)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[var(--muted)]">Nationality</label>
                      <input
                        value={nationality}
                        onChange={(event) => setNationality(event.target.value)}
                        className="h-9 w-full rounded-xl border border-[var(--border-dark)] bg-[#d3d3d3] px-3 text-sm text-[var(--primary)] focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-4 flex items-center gap-2">
                      <h3 className="text-[32px] font-semibold text-[var(--primary)]">{displayLead.name}</h3>
                      <span className="rounded-full bg-[rgba(255,221,158,0.79)] px-2 py-0.5 text-[10px] font-bold uppercase text-[#6e5307]">
                        Bronze
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-[var(--primary)]">
                      <span className="flex items-center gap-1"><Globe className="size-3.5" /> USA</span>
                      <span className="flex items-center gap-1"><Briefcase className="size-3.5" /> Business Consultant</span>
                      <span className="flex items-center gap-1"><Smile className="size-3.5" /> Positive Tone</span>
                    </div>
                  </>
                )}
                <div className="mt-4 grid w-full grid-cols-3 gap-2 sm:gap-3">
                  <Button variant="primary" className="h-16 rounded-xl">
                    <span className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wide text-[#bdeafe]">
                      <Phone className="size-4" />
                      Call
                    </span>
                  </Button>
                  <Button variant="primary" className="h-16 rounded-xl">
                    <span className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wide text-[#bdeafe]">
                      <MessageCircle className="size-4" />
                      WhatsApp
                    </span>
                  </Button>
                  <Button variant="primary" className="h-16 rounded-xl">
                    <span className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wide text-[#bdeafe]">
                      <Mail className="size-4" />
                      Email
                    </span>
                  </Button>
                </div>
                {isEditing ? (
                  <div className="mt-4 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
                    {["Source", "Status", "Tier", "Tone"].map((label) => (
                      <div key={label}>
                        <p className="text-[10px] font-bold uppercase text-[var(--muted)]">{label}</p>
                        <div className="mt-1 h-8 rounded-xl border border-[var(--border-dark)] bg-[#d3d3d3]" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 grid w-full grid-cols-4 gap-4 text-center">
                    <div><p className="text-[10px] font-bold uppercase text-[var(--muted)]">Source</p><p className="text-sm text-[var(--accent)]">{displayLead.source}</p></div>
                    <div><p className="text-[10px] font-bold uppercase text-[var(--muted)]">Status</p><p className="text-sm text-[var(--success)]">{displayLead.status}</p></div>
                    <div><p className="text-[10px] font-bold uppercase text-[var(--muted)]">Tier</p><p className="text-sm text-[#6e5307]">Bronze</p></div>
                    <div><p className="text-[10px] font-bold uppercase text-[var(--muted)]">Tone</p><p className="text-sm text-[var(--accent)]">Neutral</p></div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border-dark)] p-4">
                <div className="mb-3 flex items-center gap-2"><Users2 className="size-4 text-[var(--primary)]" /><h4 className="text-xs font-bold uppercase tracking-wide text-[var(--primary)]">Family Structure</h4></div>
                {isEditing ? (
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="mb-1 text-[10px] text-[var(--primary)]">Travel Group</p>
                      <div className="h-2 rounded bg-[#d3d3d3]/70" />
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] text-[var(--primary)]">Special Occasion</p>
                      <div className="h-2 rounded bg-[#d3d3d3]/70" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-lg bg-[#d3d3d3]/60 px-2 py-2"><span>Travel Group</span><strong>Family of 4</strong></div>
                    <div className="flex items-center justify-between rounded-lg bg-[#d3d3d3]/60 px-2 py-2"><span>Special Occasion</span><strong>None</strong></div>
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-[var(--border-dark)] p-4">
                <div className="mb-3 flex items-center gap-2"><Zap className="size-4 text-[var(--primary)]" /><h4 className="text-xs font-bold uppercase tracking-wide text-[var(--primary)]">Negotiation Insight</h4></div>
                {isEditing ? (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between"><span>Primary Trigger</span><div className="h-2 w-24 rounded bg-[#d3d3d3]/70" /></div>
                    <div className="flex items-center justify-between"><span>Price Sensitivity</span><strong className="text-[var(--primary)]">Moderate</strong></div>
                    <div className="flex items-center justify-between"><span>Pref. Contact</span><strong className="text-[var(--primary)]">WhatsApp</strong></div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-lg bg-[#d3d3d3]/60 px-2 py-2"><span>Primary Trigger</span><strong>Luxury</strong></div>
                    <div className="flex items-center justify-between rounded-lg bg-[#d3d3d3]/60 px-2 py-2"><span>Price Sensitivity</span><strong>Moderate</strong></div>
                    <div className="flex items-center justify-between rounded-lg bg-[#d3d3d3]/60 px-2 py-2"><span>Pref. Contact</span><strong>WhatsApp</strong></div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--primary)]">Travel & Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {["Adventure", "Luxury", "Family", "Solo", "Fine Dining", "Beachfront", "Private Guide", "Business Class", "Veg", "Non-Veg"].map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--accent)] px-2 py-1 text-[10px] text-[var(--primary)]">{tag}</span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--primary)]">Past Tours History</h4>
                <span className="flex items-center gap-1 text-xs text-[var(--primary)]"><Crown className="size-3.5" /> VIP Client</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-dark)] bg-white p-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-full bg-[var(--accent)]/30"><Globe className="size-4 text-[var(--primary)]" /></span>
                    <div><p className="text-sm font-medium text-[var(--primary)]">Swiss Alps Luxury Tour</p><p className="flex gap-3 text-[10px] text-[var(--muted)]"><span className="flex items-center gap-1"><Calendar className="size-3" />Oct 2023</span><span className="flex items-center gap-1"><User className="size-3" />4 Pax</span></p></div>
                  </div>
                  <div className="text-right"><p className="text-sm font-semibold text-[var(--primary)]">$4,500</p><p className="text-[10px] text-[var(--muted)]">PAID VIA CARD</p></div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-dark)] bg-white p-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-full bg-[var(--accent)]/30"><Globe className="size-4 text-[var(--primary)]" /></span>
                    <div><p className="text-sm font-medium text-[var(--primary)]">Bali Beach Retreat</p><p className="flex gap-3 text-[10px] text-[var(--muted)]"><span className="flex items-center gap-1"><Calendar className="size-3" />Jun 2023</span><span className="flex items-center gap-1"><User className="size-3" />2 Pax</span></p></div>
                  </div>
                  <div className="text-right"><p className="text-sm font-semibold text-[var(--primary)]">$3,200</p><p className="text-[10px] text-[var(--muted)]">PAID VIA CARD</p></div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--border-dark)] p-4">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--primary)]">Communication Intelligence</h4>
              <div className="space-y-3">
                <div className="rounded-xl border border-[var(--border-dark)] bg-white p-3">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-[var(--accent)]/30"><User className="size-3.5 text-[var(--primary)]" /></span>
                      <div>
                        <p className="text-xs font-semibold text-[var(--primary)]">Sarah Lead (Team Lead)</p>
                        <p className="text-[10px] text-[var(--muted)]">Today, 10:45 AM</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--primary)]">Spoke about the Swiss tour. Customer is very keen on the Glacier Express and prefers premium hotel options.</p>
                </div>
                <div className="rounded-xl border border-[var(--border-dark)] bg-white p-3">
                  <div className="flex items-start gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-[var(--accent)]/30"><Monitor className="size-3.5 text-[var(--primary)]" /></span>
                    <div>
                      <p className="text-xs font-semibold text-[var(--primary)]">System Notification</p>
                      <p className="text-[10px] text-[var(--muted)]">2 days ago</p>
                      <p className="mt-1 text-xs text-[var(--primary)]">Inquiry received for "Luxury Alpine Escape" via Website.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <textarea
                    rows={3}
                    placeholder="Log a call note or interaction detail..."
                    className="w-full rounded-xl border border-[var(--border-dark)] bg-[#f8fafc] px-4 py-3 text-sm text-[var(--primary)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button variant="primary" size="sm" className="rounded-md px-4">
                      Post Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
