import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { membersData, roleLabels } from "@/lib/mock/members";

const MembersClientPage = dynamic(
  () => import("./MembersClientPage").then((mod) => mod.MembersClientPage),
  { loading: () => <div className="p-8 text-sm text-[var(--muted)]">Loading members…</div> }
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Members | Better Holiday Lead Hub",
    description: "Manage team members, roles, and assignments.",
    openGraph: {
      title: "Members | Better Holiday Lead Hub",
      description: "Manage team members, roles, and assignments.",
    },
  };
}

export default function MembersPage() {
  return <MembersClientPage members={membersData} roleLabels={roleLabels} />;
}
