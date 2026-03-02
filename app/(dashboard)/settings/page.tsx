import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Settings | Better Holiday Lead Hub",
    description: "Configure account and workspace preferences.",
    openGraph: {
      title: "Settings | Better Holiday Lead Hub",
      description: "Configure account and workspace preferences.",
    },
  };
}

export default function SettingsPage() {
  return (
    <>
      <Header breadcrumb="Main" breadcrumbActive="Settings" showSearch />
      <div className="page-padding">
        <h1 className="text-[length:var(--text-2xl)] font-bold text-[var(--primary)]">Settings</h1>
        <p className="mt-2 text-[length:var(--text-sm)] text-[var(--primary-light)]">
          Configure your account and preferences.
        </p>
      </div>
    </>
  );
}
