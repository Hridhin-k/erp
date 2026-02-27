import "server-only";
import type {
  AnalyticsKpi,
  ComparisonPoint,
  DashboardKpi,
  LeadSourceItem,
  PerformanceTimelinePoint,
  RevenuePoint,
  TeamMetricRow,
  TeamPerformanceRow,
} from "@/lib/domain/analytics";

export const dashboardKpis: DashboardKpi[] = [
  { label: "Total Leads", value: "1,284", change: "+12.5%", icon: "users" },
  {
    label: "Conversion Rate",
    value: "24.2%",
    change: "+3.1%",
    icon: "target",
  },
  { label: "Revenue", value: "$42,500", change: "+18.2%", icon: "dollar-sign" },
  {
    label: "Active Teams",
    value: "12",
    change: "+18.2%",
    icon: "briefcase",
  },
];

export const dashboardRevenueData: RevenuePoint[] = [
  { day: "Mon", value: 2500 },
  { day: "Tue", value: 4500 },
  { day: "Wed", value: 8000 },
  { day: "Thu", value: 6000 },
  { day: "Fri", value: 5500 },
  { day: "Sat", value: 4000 },
  { day: "Sun", value: 3500 },
];

export const dashboardTeamPerformance: TeamPerformanceRow[] = [
  { name: "Ravi Mehta", leads: 0, calls: 0, interested: 0, conversion: 25 },
  { name: "Priya Joshi", leads: 0, calls: 0, interested: 0, conversion: 33 },
  { name: "Anil Kumar", leads: 0, calls: 0, interested: 0, conversion: 0 },
  { name: "Sunita Rao", leads: 0, calls: 0, interested: 0, conversion: 0 },
];

export const leadSourcesData: LeadSourceItem[] = [
  { name: "Website", value: 45, color: "#7bd6fd" },
  { name: "Google Ads", value: 25, color: "#274a8c" },
  { name: "Social", value: 20, color: "#0c234f" },
  { name: "WhatsApp", value: 8, color: "#1674fa" },
  { name: "Manual", value: 2, color: "#76b4ff" },
];

export const analyticsKpis: AnalyticsKpi[] = [
  { label: "Total Leads", value: "45", icon: "target", trend: "up" },
  { label: "Conversions", value: "1", icon: "refresh-cw", trend: "+12%" },
  {
    label: "Avg. Conversion Rate",
    value: "2.2%",
    icon: "bar-chart-2",
    trend: "down",
  },
  {
    label: "Active Team Members",
    value: "8",
    icon: "users",
    badge: "Active",
  },
];

export const performanceTimelineData: PerformanceTimelinePoint[] = [
  { week: "W41", leads: 20, conversions: 2, revenue: 15 },
  { week: "W42", leads: 25, conversions: 3, revenue: 22 },
  { week: "W43", leads: 18, conversions: 2, revenue: 18 },
  { week: "W44", leads: 30, conversions: 4, revenue: 28 },
  { week: "W45", leads: 28, conversions: 3, revenue: 25 },
  { week: "W46", leads: 35, conversions: 5, revenue: 32 },
  { week: "W47", leads: 40, conversions: 6, revenue: 38 },
  { week: "W48", leads: 45, conversions: 7, revenue: 42 },
  { week: "W49", leads: 50, conversions: 8, revenue: 48 },
  { week: "W50", leads: 55, conversions: 9, revenue: 52 },
  { week: "W51", leads: 58, conversions: 10, revenue: 55 },
  { week: "W52", leads: 45, conversions: 8, revenue: 50 },
];

export const leadStatusData: LeadSourceItem[] = [
  { name: "New", value: 35, color: "#7bd6fd" },
  { name: "Assigned", value: 1, color: "#64748b" },
  { name: "Contacted", value: 2, color: "#94a3b8" },
  { name: "Interested", value: 5, color: "#274a8c" },
  { name: "Confirmed", value: 1, color: "#0c234f" },
];

export const performanceComparisonData: ComparisonPoint[] = [
  { name: "Asia Pacific Team", value: 6500 },
  { name: "Europe Team", value: 0 },
  { name: "Americas Team", value: 0 },
];

export const metricsData: TeamMetricRow[] = [
  {
    team: "Asia Pacific Team",
    leads: 10,
    conversions: 1,
    rate: "10.0%",
    revenue: "$6,800",
  },
  { team: "Europe Team", leads: 0, conversions: 0, rate: "0.0%", revenue: "$0" },
  {
    team: "Americas Team",
    leads: 0,
    conversions: 0,
    rate: "0.0%",
    revenue: "$0",
  },
];
