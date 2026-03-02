"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { ActionBar } from "@/components/ui/ActionBar";
import { TeamCard } from "@/features/teams/components/TeamCard";
import type { TeamFormData } from "@/features/teams/components/CreateTeamModal";
import type { Team } from "@/lib/domain/team";

const CreateTeamModal = dynamic(
  () =>
    import("@/features/teams/components/CreateTeamModal").then(
      (mod) => mod.CreateTeamModal
    ),
  { loading: () => null }
);

interface TeamClientPageProps {
  teams: Team[];
}

export function TeamClientPage({ teams }: TeamClientPageProps) {
  const { user } = useAuth();
  const calendarAnchorRef = useRef<HTMLDivElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamFormData | null>(null);

  return (
    <>
      <Header
        breadcrumb="Main"
        breadcrumbActive="Team"
        showSearch
        userName={user?.name}
      />

      <div className="page-padding">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:mb-8">
          <div>
            <h1 className="text-[length:var(--text-2xl)] font-bold text-[var(--primary)]">
              Teams Management
            </h1>
            <p className="mt-1 text-[length:var(--text-sm)] text-[var(--primary-light)]">
              Create and manage sales teams with dedicated team leads
            </p>
          </div>
          <ActionBar
            calendarRef={calendarAnchorRef}
            calendarOpen={calendarOpen}
            onCalendarOpenChange={setCalendarOpen}
            addLabel="Create Team"
            onAddClick={() => setCreateTeamOpen(true)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team.name}
              {...team}
              onEdit={() =>
                setEditingTeam({ name: team.name, teamLeadId: "" })
              }
              onDelete={() => console.log("Delete team:", team.name)}
            />
          ))}
        </div>
      </div>

      <CreateTeamModal
        key={`create-${createTeamOpen ? "open" : "closed"}`}
        open={createTeamOpen}
        onOpenChange={setCreateTeamOpen}
        mode="create"
        onSubmit={(team) => console.log("Create team:", team)}
      />

      <CreateTeamModal
        key={`edit-${editingTeam?.name ?? "none"}`}
        open={!!editingTeam}
        onOpenChange={(open) => {
          if (!open) setEditingTeam(null);
        }}
        mode="edit"
        initialData={editingTeam ?? undefined}
        onSubmit={(team) => console.log("Save team:", team)}
      />
    </>
  );
}
