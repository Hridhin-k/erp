export interface TeamMember {
  name: string;
}

export interface Team {
  name: string;
  memberCount: number;
  teamLead: {
    name: string;
  };
  conversion: string;
  revenue: string;
  members: TeamMember[];
  performance?: string;
}
