"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Users,
  Target,
  DollarSign,
  Briefcase,
  Calendar,
  Filter,
  Download,
  UserPlus,
  PlusCircle,
  Plus,
  Eye,
  MoreVertical,
  Mail,
  Activity,
  Phone,
  TrendingUp,
  CheckCircle,
  Globe,
  Monitor,
  MessageCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { ActionBar } from "@/components/ui/ActionBar";
import { Card } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type {
  DashboardKpi,
  LeadSourceItem,
  RevenuePoint,
  TeamPerformanceRow,
} from "@/lib/domain/analytics";

const DateRangePicker = dynamic(
  () =>
    import("@/components/ui/DateRangePicker").then((mod) => mod.DateRangePicker),
  { loading: () => null }
);

const AddLeadModal = dynamic(
  () =>
    import("@/features/leads/components/AddLeadModal").then(
      (mod) => mod.AddLeadModal
    ),
  { loading: () => null }
);

const AssignLeadsModal = dynamic(
  () =>
    import("@/features/leads/components/AssignLeadsModal").then(
      (mod) => mod.AssignLeadsModal
    ),
  { loading: () => null }
);

const LogActivityModal = dynamic(
  () =>
    import("@/features/leads/components/LogActivityModal").then(
      (mod) => mod.LogActivityModal
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

const LeadSourcesChart = dynamic(
  () =>
    import("@/features/analytics/components/LeadSourcesChart").then(
      (mod) => mod.LeadSourcesChart
    ),
  { ssr: false, loading: () => <div className="h-[280px] w-full" /> }
);

const iconMap = {
  users: Users,
  target: Target,
  "dollar-sign": DollarSign,
  briefcase: Briefcase,
} as const;

interface TeamLeadKpi {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  progress?: number;
  subLabel?: string;
}

const teamLeadKpis: TeamLeadKpi[] = [
  {
    label: "Leads Awaiting Allocation",
    value: "40",
    icon: Briefcase,
  },
  {
    label: "Team Conversion Rate",
    value: "60.0%",
    icon: Target,
    trend: "+2.1%",
    progress: 60,
  },
  {
    label: "Monthly Forecast",
    value: "$74K",
    icon: DollarSign,
    subLabel: "10 active leads",
  },
  {
    label: "Team Members",
    value: "5",
    icon: Users,
    subLabel: "6 total in team",
  },
];

const teamForecastData = [
  { name: "John", value: 42000 },
  { name: "Maria", value: 20000 },
  { name: "Robert", value: 50000 },
  { name: "Lisa", value: 6000 },
  { name: "Ahmed", value: 11000 },
];

const liveActivityRows = [
  { name: "John Davis", calls: 12, conv: 3, dealValue: "$28,400" },
  { name: "Maria Santos", calls: 9, conv: 2, dealValue: "$22,100" },
  { name: "Robert Kumar", calls: 8, conv: 2, dealValue: "$18,750" },
  { name: "Lisa Peterson", calls: 6, conv: 1, dealValue: "$17,200" },
  { name: "Ahmed Ali", calls: 5, conv: 1, dealValue: "$12,800" },
];

interface SalesAssociateKpi {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

const salesAssociateKpis: SalesAssociateKpi[] = [
  { label: "Follow-ups Due Today", value: "3", icon: Calendar },
  { label: "Conversions Today", value: "3", icon: CheckCircle },
  { label: "My Forecast", value: "$43K", icon: DollarSign },
  { label: "Active Leads", value: "6", icon: UserPlus },
];

type SalesLeadStatus = "new" | "assigned" | "interested" | "follow-up";
type SalesLeadSource = "Website" | "Social Media" | "Google Ads" | "WhatsApp";

interface SalesAssociateLeadRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: SalesLeadSource;
  status: SalesLeadStatus;
  assignedTo: string;
  created: string;
}

const salesAssociateLeads: SalesAssociateLeadRow[] = [
  {
    id: "L001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    source: "Website",
    status: "new",
    assignedTo: "Ravi Mehta",
    created: "4 Dec 2025, 09:30 am",
  },
  {
    id: "L002",
    name: "Priya Sharma",
    phone: "+91 98765 43211",
    email: "priya.sharma@email.com",
    source: "Social Media",
    status: "new",
    assignedTo: "Ravi Mehta",
    created: "4 Dec 2025, 10:15 am",
  },
  {
    id: "L003",
    name: "Amit Patel",
    phone: "+91 98765 43212",
    email: "amit.patel@email.com",
    source: "Google Ads",
    status: "assigned",
    assignedTo: "Ravi Mehta",
    created: "3 Dec 2025, 02:20 pm",
  },
  {
    id: "L004",
    name: "Sneha Reddy",
    phone: "+91 98765 43213",
    email: "sneha.reddy@email.com",
    source: "WhatsApp",
    status: "interested",
    assignedTo: "Ravi Mehta",
    created: "2 Dec 2025, 11:00 am",
  },
  {
    id: "L005",
    name: "Vikram Singh",
    phone: "+91 98765 43214",
    email: "vikram.singh@email.com",
    source: "Website",
    status: "follow-up",
    assignedTo: "Ravi Mehta",
    created: "1 Dec 2025, 04:30 pm",
  },
];

const sourceIconMap: Record<SalesLeadSource, React.ComponentType<{ className?: string }>> = {
  Website: Globe,
  "Social Media": Monitor,
  "Google Ads": Globe,
  WhatsApp: MessageCircle,
};

interface DashboardClientPageProps {
  kpiData: DashboardKpi[];
  revenueData: RevenuePoint[];
  teamPerformance: TeamPerformanceRow[];
  leadSources: LeadSourceItem[];
}

export function DashboardClientPage({
  kpiData,
  revenueData,
  teamPerformance,
  leadSources,
}: DashboardClientPageProps) {
  const { user } = useAuth();
  const isTeamLead = user?.role === "team-lead";
  const isSalesAssociate = user?.role === "sales-associate";
  const displayName = isTeamLead
    ? "Team Lead"
    : isSalesAssociate
      ? "Sales Associate"
      : user?.name ?? "User";
  const calendarAnchorRef = useRef<HTMLDivElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [assignLeadsOpen, setAssignLeadsOpen] = useState(false);
  const [logActivityOpen, setLogActivityOpen] = useState(false);
  const [viewingSalesLeadId, setViewingSalesLeadId] = useState<string | null>(null);
  const selectedSalesLead =
    salesAssociateLeads.find((lead) => lead.id === viewingSalesLeadId) ?? null;

  return (
    <>
      <Header
        breadcrumb="Main"
        breadcrumbActive="Dashboard"
        showSearch
        userName={displayName}
      />

      <div className="p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary)]">
              Welcome back, {displayName}!
            </h1>
            <p className="mt-1 text-sm text-[var(--primary-light)]">
              Here&apos;s your team&apos;s performance overview for today
            </p>
          </div>
          {isTeamLead ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base font-medium text-[var(--primary)]">
                Today
              </span>
              <div ref={calendarAnchorRef} className="relative">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setCalendarOpen((open) => !open)}
                  aria-expanded={calendarOpen}
                  aria-haspopup="dialog"
                >
                  <Calendar className="size-4" />
                </Button>
                <DateRangePicker
                  open={calendarOpen}
                  onOpenChange={setCalendarOpen}
                  anchorRef={calendarAnchorRef}
                />
              </div>
              <Button variant="secondary" size="icon" aria-label="Filter">
                <Filter className="size-4" />
              </Button>
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Download className="size-4" />}
              >
                Export Report
              </Button>
              <Button
                variant="primary"
                size="md"
                leftIcon={<UserPlus className="size-4" />}
                onClick={() => setAssignLeadsOpen(true)}
              >
                Assign Leads
              </Button>
              <Button
                variant="primary"
                size="md"
                leftIcon={<PlusCircle className="size-4" />}
                onClick={() => setAddLeadOpen(true)}
              >
                Add Lead
              </Button>
            </div>
          ) : isSalesAssociate ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base font-medium text-[var(--primary)]">
                Today
              </span>
              <div ref={calendarAnchorRef} className="relative">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setCalendarOpen((open) => !open)}
                  aria-expanded={calendarOpen}
                  aria-haspopup="dialog"
                >
                  <Calendar className="size-4" />
                </Button>
                <DateRangePicker
                  open={calendarOpen}
                  onOpenChange={setCalendarOpen}
                  anchorRef={calendarAnchorRef}
                />
              </div>
              <Button variant="secondary" size="icon" aria-label="Filter">
                <Filter className="size-4" />
              </Button>
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Download className="size-4" />}
              >
                Export Report
              </Button>
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Plus className="size-4" />}
                onClick={() => setLogActivityOpen(true)}
              >
                Log Activity
              </Button>
              <Button
                variant="primary"
                size="md"
                leftIcon={<PlusCircle className="size-4" />}
                onClick={() => setAddLeadOpen(true)}
              >
                Add Lead
              </Button>
            </div>
          ) : (
            <ActionBar
              todayLabel="Today"
              todayActive
              calendarRef={calendarAnchorRef}
              calendarOpen={calendarOpen}
              onCalendarOpenChange={setCalendarOpen}
              onRangeChange={(start, end) => {
                console.log("Date range:", start, end);
              }}
              addLabel="Add Lead"
              onAddClick={() => setAddLeadOpen(true)}
            />
          )}
        </div>

        {isTeamLead ? (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamLeadKpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <Card key={kpi.label} className="border-[var(--border-dark)]">
                    <div className="flex items-start justify-between">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent)]/50">
                        <Icon className="size-5 text-[var(--primary)]" />
                      </div>
                      {kpi.trend ? (
                        <div className="flex items-center gap-1 text-xs text-[var(--success)]">
                          <TrendingUp className="size-3" />
                          {kpi.trend}
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-4">
                      <p className="text-4xl font-medium text-[var(--primary)]">
                        {kpi.value}
                      </p>
                      <p className="mt-1 text-sm text-[var(--primary)]">
                        {kpi.label}
                      </p>
                      {kpi.progress ? (
                        <div className="mt-3 max-w-[190px]">
                          <Progress value={kpi.progress} />
                        </div>
                      ) : null}
                      {kpi.subLabel ? (
                        <p className="mt-2 text-xs text-[var(--primary)]/90">
                          {kpi.subLabel}
                        </p>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
              <Card className="border-[var(--border-dark)]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[var(--primary)]">
                    Team Sales Forecast
                  </h3>
                  <span className="text-sm text-[var(--primary)]">Today</span>
                </div>
                <div className="h-[250px] min-h-[250px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamForecastData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(12,35,79,0.18)"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                      />
                      <YAxis
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                        domain={[0, 60000]}
                      />
                      <Bar
                        dataKey="value"
                        fill="#7bd6fd"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-[#ececec] px-4 py-3">
                  <span className="text-sm font-medium text-[var(--primary)]">
                    Total Team Pipeline:
                  </span>
                  <span className="text-xl font-medium text-[var(--primary)]">
                    $43K
                  </span>
                </div>
              </Card>

              <Card className="border-[var(--border-dark)]">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="size-5 text-[var(--primary)]" />
                    <h3 className="text-base font-semibold text-[var(--primary)]">
                      Live Activity Monitor
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--primary)]">
                    <span className="size-2 rounded-full bg-[#1dd526]" />
                    Real-time
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Associate</TableHead>
                      <TableHead>Calls</TableHead>
                      <TableHead>Conv.</TableHead>
                      <TableHead className="text-right">Deal Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liveActivityRows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-8 overflow-hidden rounded-full bg-[#a0a9ba]">
                              <Image
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name}`}
                                alt={row.name}
                                width={32}
                                height={32}
                                sizes="32px"
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm">{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="rounded bg-[rgba(72,242,108,0.29)] px-2 py-1 text-sm text-[#3dd05d]">
                            {row.calls}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="rounded bg-[#bdeafe] px-2 py-1 text-sm text-[var(--primary)]">
                            {row.conv}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{row.dealValue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </>
        ) : isSalesAssociate ? (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {salesAssociateKpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <Card key={kpi.label} className="border-[var(--border-dark)]">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent)]/50">
                      <Icon className="size-5 text-[var(--primary)]" />
                    </div>
                    <div className="mt-4">
                      <p className="text-4xl font-medium text-[var(--primary)]">
                        {kpi.value}
                      </p>
                      <p className="mt-1 text-sm text-[var(--primary)]">
                        {kpi.label}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="border-[var(--border-dark)]">
              <h3 className="mb-5 text-base font-semibold text-[var(--primary)]">
                My Leads
              </h3>
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
                  {salesAssociateLeads.map((row) => {
                    const SourceIcon = sourceIconMap[row.source];
                    return (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1.5 text-xs">
                              <Phone className="size-3 text-[var(--success)]" />
                              {row.phone}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                              <Mail className="size-3" />
                              {row.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-2">
                            <span className="flex size-6 items-center justify-center rounded-full bg-[var(--accent)]/40">
                              <SourceIcon className="size-3 text-[var(--primary)]" />
                            </span>
                            {row.source}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={row.status}>{row.status}</Badge>
                        </TableCell>
                        <TableCell>{row.assignedTo}</TableCell>
                        <TableCell className="text-xs text-[var(--muted)]">
                          {row.created}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="secondary"
                              size="icon"
                              aria-label={`View ${row.name}`}
                              onClick={() => setViewingSalesLeadId(row.id)}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <button
                              type="button"
                              className="inline-flex size-8 items-center justify-center rounded-md text-[var(--primary)] transition-colors hover:bg-[var(--accent)]/20"
                              aria-label="More lead actions"
                            >
                              <MoreVertical className="size-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {kpiData.map((kpi) => {
                const Icon = iconMap[kpi.icon];
                return (
                  <Card key={kpi.label}>
                    <div className="flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-[14px] bg-[var(--accent)]/50">
                        <Icon className="size-6 text-[var(--primary)]" />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--success)]">
                        <TrendingUp className="size-4" />
                        {kpi.change}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-[var(--primary)]">
                        {kpi.label}
                      </p>
                      <p className="mt-1 text-2xl font-bold text-[var(--primary)]">
                        {kpi.value}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-6 text-lg font-semibold text-[var(--primary)]">
                  Revenue Forecast
                </h3>
                <div className="h-[280px] min-h-[280px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--accent)"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--accent)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(12,35,79,0.1)"
                      />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                      />
                      <YAxis
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                        domain={[0, 10000]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <LeadSourcesChart
                data={leadSources}
                className="border-[var(--border-dark)]"
              />
            </div>

            <Card className="border-[var(--border-dark)]">
              <h3 className="mb-5 text-base font-bold text-[var(--primary)]">
                Team Performance Summary
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sales Associate</TableHead>
                    <TableHead>Total Leads</TableHead>
                    <TableHead>Calls Today</TableHead>
                    <TableHead>Interested</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamPerformance.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.leads}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Phone className="size-3.5 text-[var(--success)]" />
                          <span className="text-[var(--success)]">{row.calls}</span>
                        </div>
                      </TableCell>
                      <TableCell>{row.interested}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <Progress value={row.conversion} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        )}
      </div>

      <AddLeadModal
        open={addLeadOpen}
        onOpenChange={setAddLeadOpen}
        onAddLead={(lead) => console.log("Add lead:", lead)}
        onBulkUpload={(file) => console.log("Bulk upload:", file.name)}
      />

      <AssignLeadsModal
        open={assignLeadsOpen}
        onOpenChange={setAssignLeadsOpen}
      />

      <LogActivityModal
        open={logActivityOpen}
        onOpenChange={setLogActivityOpen}
      />

      <SalesCustomerProfileModal
        open={isSalesAssociate && !!viewingSalesLeadId}
        onOpenChange={(open) => !open && setViewingSalesLeadId(null)}
        lead={selectedSalesLead}
      />
    </>
  );
}
