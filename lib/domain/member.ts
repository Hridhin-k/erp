export type MemberRole = "team-lead" | "associate";

export interface Member {
  name: string;
  email: string;
  role: MemberRole;
  team: string;
}
