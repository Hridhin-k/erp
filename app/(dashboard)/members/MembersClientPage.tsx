"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Users, Mail } from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { ActionBar } from "@/components/ui/ActionBar";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { MemberRowActions } from "@/features/members/components/MemberRowActions";
import type { Member } from "@/lib/domain/member";

type TabId = "all" | "team-leads" | "associates";

const MemberDetailPanel = dynamic(
  () =>
    import("@/features/members/components/MemberDetailPanel").then(
      (mod) => mod.MemberDetailPanel
    ),
  { loading: () => null }
);

const AddMemberModal = dynamic(
  () =>
    import("@/features/members/components/AddMemberModal").then(
      (mod) => mod.AddMemberModal
    ),
  { loading: () => null }
);

interface MembersClientPageProps {
  members: Member[];
  roleLabels: Record<string, string>;
}

export function MembersClientPage({
  members,
  roleLabels,
}: MembersClientPageProps) {
  const { user } = useAuth();
  const calendarAnchorRef = useRef<HTMLDivElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [viewingMemberEmail, setViewingMemberEmail] = useState<string | null>(
    null
  );

  const viewingMember = viewingMemberEmail
    ? members.find((m) => m.email === viewingMemberEmail) ?? null
    : null;

  const filteredMembers =
    activeTab === "all"
      ? members
      : activeTab === "team-leads"
        ? members.filter((m) => m.role === "team-lead")
        : members.filter((m) => m.role === "associate");

  const tabs: { id: TabId; label: string }[] = [
    { id: "all", label: "All Members" },
    { id: "team-leads", label: "Team Leads" },
    { id: "associates", label: "Associates" },
  ];

  return (
    <>
      <Header
        breadcrumb="Main"
        breadcrumbActive="Members"
        showSearch
        userName={user?.name}
      />

      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary)]">
              Members Management
            </h1>
            <p className="mt-1 text-sm text-[var(--primary-light)]">
              Create and manage sales teams with dedicated team leads
            </p>
          </div>

          <ActionBar
            calendarRef={calendarAnchorRef}
            calendarOpen={calendarOpen}
            onCalendarOpenChange={setCalendarOpen}
            addLabel="Add Member"
            onAddClick={() => setAddMemberOpen(true)}
          />
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-[var(--primary)]">
          <Tabs
            tabs={tabs}
            activeId={activeTab}
            onTabChange={(id) => setActiveTab(id as TabId)}
          />
          <p className="text-sm text-[var(--primary)]">
            {filteredMembers.length} members
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#a0a9ba]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[309px]">Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                          alt={member.name}
                          width={40}
                          height={40}
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-medium text-[var(--primary)]">
                          {member.name}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                          <Mail className="size-3" />
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.role}>
                      {roleLabels[member.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Users className="size-4 text-[var(--muted)]" />
                      {member.team}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <MemberRowActions
                      memberEmail={member.email}
                      onView={(email) => setViewingMemberEmail(email)}
                      onEdit={(email) => console.log("Edit member:", email)}
                      onDelete={(email) => console.log("Delete member:", email)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddMemberModal
        open={addMemberOpen}
        onOpenChange={setAddMemberOpen}
        onAddMember={(member) => console.log("Add member:", member)}
      />

      <MemberDetailPanel
        open={!!viewingMember}
        onOpenChange={(open) => {
          if (!open) setViewingMemberEmail(null);
        }}
        member={viewingMember}
      />
    </>
  );
}
