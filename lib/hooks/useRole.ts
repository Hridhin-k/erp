"use client";

import { useAuth } from "@/contexts/AuthContext";

export function useRole() {
  const { user } = useAuth();
  const role = user?.role ?? "admin";

  return {
    user,
    role,
    isAdmin: role === "admin",
    isTeamLead: role === "team-lead",
    isSalesAssociate: role === "sales-associate",
    roleDisplayName:
      role === "team-lead"
        ? "Team Lead"
        : role === "sales-associate"
          ? "Sales Associate"
          : user?.name ?? "User",
  };
}
