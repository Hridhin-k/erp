export interface DashboardKpi {
  label: string;
  value: string;
  change: string;
  icon: "users" | "target" | "dollar-sign" | "briefcase";
}

export interface RevenuePoint {
  day: string;
  value: number;
}

export interface TeamPerformanceRow {
  name: string;
  leads: number;
  calls: number;
  interested: number;
  conversion: number;
}

export interface LeadSourceItem {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsKpi {
  label: string;
  value: string;
  icon: "target" | "refresh-cw" | "bar-chart-2" | "users";
  trend?: "up" | "down" | string;
  badge?: string;
}

export interface PerformanceTimelinePoint {
  week: string;
  leads: number;
  conversions: number;
  revenue: number;
}

export interface ComparisonPoint {
  name: string;
  value: number;
}

export interface TeamMetricRow {
  team: string;
  leads: number;
  conversions: number;
  rate: string;
  revenue: string;
}
