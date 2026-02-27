import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { teamsData } from "@/lib/mock/teams";

const TeamClientPage = dynamic(
  () => import("./TeamClientPage").then((mod) => mod.TeamClientPage),
  { loading: () => <div className="p-8 text-sm text-[var(--muted)]">Loading teams…</div> }
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Teams | Better Holiday Lead Hub",
    description: "Create and manage sales teams and team leads.",
    openGraph: {
      title: "Teams | Better Holiday Lead Hub",
      description: "Create and manage sales teams and team leads.",
    },
  };
}

export default function TeamPage() {
  return <TeamClientPage teams={teamsData} />;
}
