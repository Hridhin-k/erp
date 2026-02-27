"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Target,
  RefreshCw,
  BarChart2,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ComposedChart,
  Line,
} from "recharts";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { ActionBar } from "@/components/ui/ActionBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import type {
  AnalyticsKpi,
  ComparisonPoint,
  LeadSourceItem,
  PerformanceTimelinePoint,
  TeamMetricRow,
} from "@/lib/domain/analytics";

const DateRangePicker = dynamic(
  () =>
    import("@/components/ui/DateRangePicker").then((mod) => mod.DateRangePicker),
  { loading: () => null }
);

const iconMap = {
  target: Target,
  "refresh-cw": RefreshCw,
  "bar-chart-2": BarChart2,
  users: Users,
} as const;

type ComparisonTab = "teams" | "individuals" | "sources";

interface AnalyticsClientPageProps {
  kpiData: AnalyticsKpi[];
  timelineData: PerformanceTimelinePoint[];
  leadStatusData: LeadSourceItem[];
  performanceComparisonData: ComparisonPoint[];
  metricsData: TeamMetricRow[];
}

export function AnalyticsClientPage({
  kpiData,
  timelineData,
  leadStatusData,
  performanceComparisonData,
  metricsData,
}: AnalyticsClientPageProps) {
  const { user } = useAuth();
  const isTeamLead = user?.role === "team-lead";
  const isSalesAssociate = user?.role === "sales-associate";
  const calendarAnchorRef = useRef<HTMLDivElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [comparisonTab, setComparisonTab] = useState<ComparisonTab>("teams");

  const tabs: { id: ComparisonTab; label: string }[] = [
    { id: "teams", label: "Teams" },
    { id: "individuals", label: "Individuals" },
    { id: "sources", label: "Sources" },
  ];

  const salesPipelineData = [
    { name: "Assigned", value: 1, color: "#8f8f8f" },
    { name: "Contacted", value: 1, color: "#6f839f" },
    { name: "Interested", value: 2, color: "#0c234f" },
    { name: "Needs Follow-up", value: 1, color: "#2f8be6" },
    { name: "Confirmed", value: 1, color: "#70c3e6" },
  ];

  const salesWeeklyTrendData = [
    { day: "Mon", calls: 12, conversions: 1 },
    { day: "Tue", calls: 18, conversions: 2 },
    { day: "Wed", calls: 15, conversions: 1.5 },
    { day: "Thu", calls: 22, conversions: 3 },
    { day: "Fri", calls: 20, conversions: 2 },
  ];

  const salesPackageInterestData = [
    { name: "Thailand Adventure", value: 1.0 },
    { name: "Greek Islands", value: 0.63 },
    { name: "Singapore", value: 0.87 },
    { name: "Bali", value: 0.48 },
    { name: "Safari Adventure", value: 1.0 },
    { name: "Paris Luxury", value: 0.69 },
  ];

  return (
    <>
      <Header
        breadcrumb="Main"
        breadcrumbActive="Analytics"
        showSearch
        userName={user?.name}
      />

      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          {isTeamLead || isSalesAssociate ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-[var(--primary)]">
                  Welcome back, {isTeamLead ? "Team Lead" : "Sales Associate"}!
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
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-bold text-[var(--primary)]">
                  Analytics & Reports
                </h1>
                <p className="mt-1 text-sm text-[var(--primary-light)]">
                  Deep insights into sales performance and trends
                </p>
              </div>
              <ActionBar
                calendarRef={calendarAnchorRef}
                calendarOpen={calendarOpen}
                onCalendarOpenChange={setCalendarOpen}
                showAdd={false}
              />
            </>
          )}
        </div>

        {isTeamLead ? (
          <>
            <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-6 text-[30px] font-semibold text-[var(--primary)]">
                  Lead Distribution
                </h3>
                <div className="mx-auto h-[260px] max-w-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Interested", value: 5, color: "#0c234f" },
                          { name: "Contacted", value: 2, color: "#70c3e6" },
                          { name: "Confirmed", value: 1, color: "#b1def3" },
                          { name: "Lost", value: 0.001, color: "#b7b7b7" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={92}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {[
                          { name: "Interested", value: 5, color: "#0c234f" },
                          { name: "Contacted", value: 2, color: "#70c3e6" },
                          { name: "Confirmed", value: 1, color: "#b1def3" },
                          { name: "Lost", value: 0.001, color: "#b7b7b7" },
                        ].map((entry, index) => (
                          <Cell key={`distribution-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-[var(--primary)]">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#0c234f]" />
                    Interested:5
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#70c3e6]" />
                    Contacted:2
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#b1def3]" />
                    Confirmed:1
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#b7b7b7]" />
                    Lost:0
                  </span>
                </div>
              </Card>

              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-6 text-[30px] font-semibold text-[var(--primary)]">
                  Revenue by Associate
                </h3>
                <div className="h-[360px] min-h-[360px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "John", value: 50000 },
                        { name: "Maria", value: 0 },
                        { name: "Robert", value: 0 },
                        { name: "Lisa", value: 0 },
                        { name: "Ahmed", value: 0 },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(12,35,79,0.2)"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "var(--primary)", fontSize: 16 }}
                      />
                      <YAxis
                        domain={[0, 60000]}
                        tick={{ fill: "var(--primary)", fontSize: 16 }}
                      />
                      <Bar dataKey="value" fill="#70c3e6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="border-[var(--border-dark)]">
              <h3 className="mb-6 text-[30px] font-semibold text-[var(--primary)]">
                Associate Performance Index
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Associate</TableHead>
                    <TableHead>Total Leads</TableHead>
                    <TableHead>Avg. Deal Value</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead className="text-right">Target Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      initial: "J",
                      name: "John Davis",
                      leads: 7,
                      avgDeal: "$7112",
                      rate: "14.3%",
                    },
                    {
                      initial: "M",
                      name: "Maria Santos",
                      leads: 0,
                      avgDeal: "$0",
                      rate: "0.0%",
                    },
                    {
                      initial: "R",
                      name: "Robert Kumar",
                      leads: 0,
                      avgDeal: "$0",
                      rate: "0.0%",
                    },
                    {
                      initial: "L",
                      name: "Lisa Peterson",
                      leads: 0,
                      avgDeal: "$0",
                      rate: "0.0%",
                    },
                    {
                      initial: "A",
                      name: "Ahmed Ali",
                      leads: 0,
                      avgDeal: "$0",
                      rate: "0.0%",
                    },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="flex size-7 items-center justify-center rounded-full bg-black text-xs text-white">
                            {row.initial}
                          </span>
                          {row.name}
                        </div>
                      </TableCell>
                      <TableCell>{row.leads}</TableCell>
                      <TableCell>{row.avgDeal}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                      <TableCell className="text-right">
                        <div className="ml-auto max-w-[120px]">
                          <Progress value={85} />
                        </div>
                        <span className="text-sm text-[var(--primary)]">85%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        ) : isSalesAssociate ? (
          <>
            <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-5 text-[30px] font-semibold text-[var(--primary)]">
                  Pipeline Status
                </h3>
                <div className="mx-auto h-[220px] max-w-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesPipelineData}
                        cx="50%"
                        cy="50%"
                        innerRadius={48}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {salesPipelineData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2 text-sm text-[var(--primary)]">
                  {salesPipelineData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.name}
                      </span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-4 text-[30px] font-semibold text-[var(--primary)]">
                  Weekly Call vs. Conversion Trend
                </h3>
                <div className="h-[320px] min-h-[320px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesWeeklyTrendData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(12,35,79,0.2)"
                      />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: "var(--primary)", fontSize: 14 }}
                      />
                      <YAxis
                        yAxisId="left"
                        domain={[0, 24]}
                        tick={{ fill: "var(--primary)", fontSize: 14 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 3]}
                        tick={{ fill: "var(--primary)", fontSize: 14 }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="calls"
                        fill="#0c234f"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="conversions"
                        fill="#70c3e6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-4 text-[30px] font-semibold text-[var(--primary)]">
                  Package Interest Distribution
                </h3>
                <div className="h-[280px] min-h-[280px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesPackageInterestData}
                      layout="vertical"
                      margin={{ left: 20, right: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(12,35,79,0.2)"
                      />
                      <XAxis
                        type="number"
                        domain={[0, 1]}
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={120}
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                      />
                      <Bar dataKey="value" fill="#70c3e6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-4 text-[30px] font-semibold text-[var(--primary)]">
                  Monthly Target Progress
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-[var(--primary)]">
                      <span>Revenue Goal ($50,000)</span>
                      <span>$42,900</span>
                    </div>
                    <Progress value={85.8} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-[var(--primary)]">
                      <span>Daily Call Target (20)</span>
                      <span>12</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[var(--border-dark)] p-4">
                      <p className="text-sm text-[var(--primary)]">Efficiency Rate</p>
                      <p className="mt-1 text-4xl font-medium text-[var(--primary)]">25.0%</p>
                    </div>
                    <div className="rounded-xl border border-[var(--border-dark)] p-4">
                      <p className="text-sm text-[var(--primary)]">Avg Deal Value</p>
                      <p className="mt-1 text-4xl font-medium text-[var(--primary)]">$7150</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {kpiData.map((kpi) => {
                const Icon = iconMap[kpi.icon];
                return (
                  <Card key={kpi.label} className="bg-gray-50/50">
                    <div className="flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--accent)]/50">
                        <Icon className="size-6 text-[var(--primary)]" />
                      </div>
                      <div className="flex items-center gap-1">
                        {kpi.badge && (
                          <Badge variant="success" className="text-xs">
                            {kpi.badge}
                          </Badge>
                        )}
                        {kpi.trend === "up" && (
                          <TrendingUp className="size-4 text-[var(--success)]" />
                        )}
                        {kpi.trend === "down" && (
                          <TrendingDown className="size-4 text-red-600" />
                        )}
                        {typeof kpi.trend === "string" && !kpi.badge && (
                          <span className="text-xs text-[var(--muted)]">
                            {kpi.trend}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-[var(--primary)]">
                        {kpi.value}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--primary)]">
                        {kpi.label}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-4 text-lg font-semibold text-[var(--primary)]">
                  Performance Timeline
                </h3>
                <div className="mb-4 flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 text-xs">
                    <span className="size-2 rounded-full bg-[#7bd6fd]" />
                    Leads
                  </span>
                  <span className="flex items-center gap-2 text-xs">
                    <span className="size-2 rounded-full bg-[#274a8c]" />
                    Conversions
                  </span>
                  <span className="flex items-center gap-2 text-xs">
                    <span className="size-2 rounded-full bg-[var(--success)]" />
                    Revenue (K)
                  </span>
                </div>
                <div className="h-[280px] min-h-[280px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={timelineData}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7bd6fd" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#7bd6fd" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#274a8c" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#274a8c" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(12,35,79,0.1)"
                      />
                      <XAxis
                        dataKey="week"
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                      />
                      <YAxis
                        domain={[0, 60]}
                        tick={{ fill: "var(--primary)", fontSize: 12 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="#7bd6fd"
                        fill="url(#colorLeads)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="conversions"
                        stroke="#274a8c"
                        fill="url(#colorConv)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--success)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="border-[var(--border-dark)]">
                <h3 className="mb-6 text-lg font-semibold text-[var(--primary)]">
                  Lead Status Distribution
                </h3>
                <div className="flex flex-col items-center gap-6">
                  <div className="h-[180px] min-h-[180px] w-full max-w-[180px] min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={leadStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {leadStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid w-full max-w-[220px] grid-cols-2 gap-2">
                    {leadStatusData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-[var(--primary)]">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <Card className="mb-8 border-[var(--border-dark)]">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-[var(--primary)]">
                  Performance Comparison
                </h3>
                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={comparisonTab === tab.id ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setComparisonTab(tab.id)}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-[240px] min-h-[240px] w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceComparisonData}
                    layout="vertical"
                    margin={{ left: 20, right: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(12,35,79,0.1)"
                    />
                    <XAxis
                      type="number"
                      domain={[0, 8000]}
                      tick={{ fill: "var(--primary)", fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={140}
                      tick={{ fill: "var(--primary)", fontSize: 12 }}
                    />
                    <Bar dataKey="value" fill="#7bd6fd" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="overflow-hidden border-[var(--border-dark)]">
              <h3 className="mb-6 text-lg font-semibold text-[var(--primary)]">
                Detailed Performance Metrics
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#7bd6fd]/30">Team</TableHead>
                      <TableHead className="bg-[#7bd6fd]/30">Total Leads</TableHead>
                      <TableHead className="bg-[#7bd6fd]/30">Conversions</TableHead>
                      <TableHead className="bg-[#7bd6fd]/30">
                        Conversion Rate
                      </TableHead>
                      <TableHead className="bg-[#7bd6fd]/30">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metricsData.map((row) => (
                      <TableRow key={row.team}>
                        <TableCell className="font-medium">{row.team}</TableCell>
                        <TableCell>{row.leads}</TableCell>
                        <TableCell>{row.conversions}</TableCell>
                        <TableCell className="text-[var(--success)]">
                          {row.rate}
                        </TableCell>
                        <TableCell>{row.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
