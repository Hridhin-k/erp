import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  dashboardKpis,
  dashboardRevenueData,
  dashboardTeamPerformance,
  leadSourcesData,
} from "@/lib/mock/analytics";

const DashboardClientPage = dynamic(
  () => import("./DashboardClientPage").then((mod) => mod.DashboardClientPage),
  { loading: () => <div className="p-8 text-sm text-[var(--muted)]">Loading dashboard…</div> }
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard | Better Holiday Lead Hub",
    description: "Performance overview of leads, revenue, and team metrics.",
    openGraph: {
      title: "Dashboard | Better Holiday Lead Hub",
      description: "Performance overview of leads, revenue, and team metrics.",
    },
  };
}

export default function DashboardPage() {
  return (
    <DashboardClientPage
      kpiData={dashboardKpis}
      revenueData={dashboardRevenueData}
      teamPerformance={dashboardTeamPerformance}
      leadSources={leadSourcesData}
    />
  );
}
