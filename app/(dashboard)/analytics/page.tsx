import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  analyticsKpis,
  leadStatusData,
  metricsData,
  performanceComparisonData,
  performanceTimelineData,
} from "@/lib/mock/analytics";

const AnalyticsClientPage = dynamic(
  () => import("./AnalyticsClientPage").then((mod) => mod.AnalyticsClientPage),
  { loading: () => <div className="p-8 text-sm text-[var(--muted)]">Loading analytics…</div> }
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Analytics | Better Holiday Lead Hub",
    description: "Deep insights into sales, conversions, and team performance.",
    openGraph: {
      title: "Analytics | Better Holiday Lead Hub",
      description: "Deep insights into sales, conversions, and team performance.",
    },
  };
}

export default function AnalyticsPage() {
  return (
    <AnalyticsClientPage
      kpiData={analyticsKpis}
      timelineData={performanceTimelineData}
      leadStatusData={leadStatusData}
      performanceComparisonData={performanceComparisonData}
      metricsData={metricsData}
    />
  );
}
