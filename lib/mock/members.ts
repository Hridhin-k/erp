import "server-only";
import type { Member } from "@/lib/domain/member";

export const membersData: Member[] = [
  {
    name: "Sarah Chen",
    email: "sarah@holidaypanda.com",
    role: "team-lead",
    team: "Asia Pacific Team",
  },
  {
    name: "John Davis",
    email: "john@holidaypanda.com",
    role: "associate",
    team: "Asia Pacific Team",
  },
  {
    name: "Maria Santos",
    email: "maria@holidaypanda.com",
    role: "associate",
    team: "Asia Pacific Team",
  },
  {
    name: "Robert Kumar",
    email: "robert@holidaypanda.com",
    role: "associate",
    team: "Asia Pacific Team",
  },
  {
    name: "Lisa Peterson",
    email: "lisa@holidaypanda.com",
    role: "associate",
    team: "Asia Pacific Team",
  },
  {
    name: "Ahmed Ali",
    email: "ahmed@holidaypanda.com",
    role: "associate",
    team: "Asia Pacific Team",
  },
  {
    name: "Marco Rossi",
    email: "marco@holidaypanda.com",
    role: "team-lead",
    team: "Europe Team",
  },
  {
    name: "Jessica Martinez",
    email: "jessica@holidaypanda.com",
    role: "team-lead",
    team: "Americas Team",
  },
];

export const roleLabels: Record<string, string> = {
  "team-lead": "Team Lead",
  associate: "Associate",
};
