export type LeadStatus =
  | "new"
  | "assigned"
  | "interested"
  | "follow-up"
  | "not-interested";

export type LeadSource =
  | "Website"
  | "Social Media"
  | "Google Ads"
  | "WhatsApp"
  | "Upload";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  created: string;
}

export interface LeadKpi {
  label: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  icon: "users" | "trending-up" | "heart" | "clock" | "x-circle";
}
