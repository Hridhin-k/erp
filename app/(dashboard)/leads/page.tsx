import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { leadKpis, leadsData } from "@/lib/mock/leads";

const LeadsClientPage = dynamic(
  () => import("./LeadsClientPage").then((mod) => mod.LeadsClientPage),
  { loading: () => <div className="p-8 text-sm text-[var(--muted)]">Loading leads…</div> }
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Leads | Better Holiday Lead Hub",
    description: "Track lead lifecycle, assignments, and source performance.",
    openGraph: {
      title: "Leads | Better Holiday Lead Hub",
      description: "Track lead lifecycle, assignments, and source performance.",
    },
  };
}

export default function LeadsPage() {
  return <LeadsClientPage leads={leadsData} kpis={leadKpis} />;
}
