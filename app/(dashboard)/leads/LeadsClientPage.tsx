"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Users,
  TrendingUp,
  Heart,
  Clock,
  XCircle,
  Phone,
  Mail,
  Globe,
  Monitor,
  MessageCircle,
  Upload,
  Calendar,
  Filter,
  Download,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { ActionBar } from "@/components/ui/ActionBar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { LeadRowActions } from "@/features/leads/components/LeadRowActions";
import { cn } from "@/lib/utils";
import type { Lead, LeadKpi } from "@/lib/domain/lead";

const AddLeadModal = dynamic(
  () =>
    import("@/features/leads/components/AddLeadModal").then(
      (mod) => mod.AddLeadModal
    ),
  { loading: () => null }
);

const LeadDetailPanel = dynamic(
  () =>
    import("@/features/leads/components/LeadDetailPanel").then(
      (mod) => mod.LeadDetailPanel
    ),
  { loading: () => null }
);

const SalesCustomerProfileModal = dynamic(
  () =>
    import("@/features/leads/components/SalesCustomerProfileModal").then(
      (mod) => mod.SalesCustomerProfileModal
    ),
  { loading: () => null }
);

const DateRangePicker = dynamic(
  () =>
    import("@/components/ui/DateRangePicker").then((mod) => mod.DateRangePicker),
  { loading: () => null }
);

const kpiIconMap = {
  users: Users,
  "trending-up": TrendingUp,
  heart: Heart,
  clock: Clock,
  "x-circle": XCircle,
} as const;

const sourceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Website: Globe,
  "Social Media": Monitor,
  "Google Ads": Globe,
  WhatsApp: MessageCircle,
  Upload: Upload,
};

interface LeadsClientPageProps {
  leads: Lead[];
  kpis: LeadKpi[];
}

export function LeadsClientPage({ leads, kpis }: LeadsClientPageProps) {
  const { user } = useAuth();
  const isTeamLead = user?.role === "team-lead";
  const isSalesAssociate = user?.role === "sales-associate";
  const calendarAnchorRef = useRef<HTMLDivElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("Today");
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [viewingLeadId, setViewingLeadId] = useState<string | null>(null);

  return (
    <>
      <Header
        breadcrumb="Main"
        breadcrumbActive="Leads"
        showSearch
        userName={user?.name}
      />

      <div className="p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {isTeamLead ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-[var(--primary)]">
                  Welcome back, Team Lead!
                </h1>
                <p className="mt-1 text-sm text-[var(--primary-light)]">
                  Here&apos;s your team&apos;s performance overview for today
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-base font-medium text-[var(--primary)]">
                  Today
                </span>
                <div ref={calendarAnchorRef} className="relative">
                  <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5"
                    onClick={() => setCalendarOpen((open) => !open)}
                    aria-expanded={calendarOpen}
                    aria-haspopup="dialog"
                    aria-label="Open date picker"
                  >
                    <Calendar className="size-4" />
                  </button>
                  <DateRangePicker
                    open={calendarOpen}
                    onOpenChange={setCalendarOpen}
                    anchorRef={calendarAnchorRef}
                  />
                </div>
                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5"
                  aria-label="Filter leads"
                >
                  <Filter className="size-4" />
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-lg border border-[var(--primary)] px-4 text-[var(--primary)] hover:bg-[var(--primary)]/5"
                >
                  <Download className="size-4" />
                  Export Report
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-white hover:bg-[var(--primary-light)]"
                  onClick={() => setAddLeadOpen(true)}
                >
                  <PlusCircle className="size-4" />
                  Add Lead
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-bold text-[var(--primary)]">
                  Leads Overview
                </h1>
                <p className="mt-1 text-sm text-[var(--primary-light)]">
                  Master Lead Database
                </p>
              </div>
              <ActionBar
                todayActive={dateFilter === "Today"}
                onTodayClick={() => setDateFilter("Today")}
                calendarRef={calendarAnchorRef}
                calendarOpen={calendarOpen}
                onCalendarOpenChange={setCalendarOpen}
                onRangeChange={() => setDateFilter("Custom")}
                addLabel="Add Lead"
                onAddClick={() => setAddLeadOpen(true)}
              />
            </>
          )}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {kpis.map((kpi) => {
            const Icon = kpiIconMap[kpi.icon];
            return (
              <Card key={kpi.label}>
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-[14px] bg-[var(--accent)]/50">
                    <Icon className="size-6 text-[var(--primary)]" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-[var(--primary)]">
                    {kpi.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[var(--primary)]">
                    {kpi.value}
                  </p>
                  <p className={cn("mt-0.5 text-xs", kpi.subtitleColor)}>
                    {kpi.subtitle}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="overflow-hidden border-[var(--border-dark)]">
          <div className="border-b border-[var(--border)] px-5 py-4">
            <p className="text-sm font-medium text-[var(--primary)]">
              Showing {leads.length} of {leads.length} leads
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => {
                  const SourceIcon = sourceIcons[lead.source] ?? Globe;
                  return (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                            <Image
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`}
                              alt=""
                              width={32}
                              height={32}
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <span>{lead.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1.5 text-xs">
                            <Phone className="size-3" />
                            {lead.phone}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                            <Mail className="size-3" />
                            {lead.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1.5">
                          <SourceIcon className="size-3.5 text-[var(--muted)]" />
                          {lead.source}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={lead.status}>{lead.status}</Badge>
                      </TableCell>
                      <TableCell>{lead.assignedTo}</TableCell>
                      <TableCell className="text-[12px] text-[var(--muted)]">
                        {lead.created}
                      </TableCell>
                      <TableCell className="text-right">
                        <LeadRowActions
                          leadId={lead.id}
                          onView={(id) => setViewingLeadId(id)}
                          onEdit={(id) => {
                            console.log("Edit lead:", id);
                          }}
                          onDelete={(id) => {
                            console.log("Delete lead:", id);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <AddLeadModal
        open={addLeadOpen}
        onOpenChange={setAddLeadOpen}
        onAddLead={(lead) => console.log("Add lead:", lead)}
        onBulkUpload={(file) => console.log("Bulk upload:", file.name)}
      />

      <LeadDetailPanel
        open={!isSalesAssociate && !!viewingLeadId}
        onOpenChange={(open) => !open && setViewingLeadId(null)}
        lead={leads.find((l) => l.id === viewingLeadId) ?? null}
      />

      <SalesCustomerProfileModal
        open={isSalesAssociate && !!viewingLeadId}
        onOpenChange={(open) => !open && setViewingLeadId(null)}
        lead={leads.find((l) => l.id === viewingLeadId) ?? null}
      />
    </>
  );
}
