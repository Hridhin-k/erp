import "server-only";
import type { Team } from "@/lib/domain/team";

export const teamsData: Team[] = [
  {
    name: "Asia Pacific Team",
    memberCount: 5,
    teamLead: { name: "Sarah Chen" },
    conversion: "14.2%",
    revenue: "$385K",
    members: [
      { name: "Robert Kumar" },
      { name: "Maria" },
      { name: "John Davis" },
    ],
    performance: "+12% this month",
  },
  {
    name: "Europe Team",
    memberCount: 0,
    teamLead: { name: "Marco Rossi" },
    conversion: "12.8%",
    revenue: "$342K",
    members: [],
    performance: undefined,
  },
];
