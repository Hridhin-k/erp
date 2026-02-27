import type { Metadata } from "next";
import { LogoutClientPage } from "./LogoutClientPage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Logout | Better Holiday Lead Hub",
    description: "Signing out of your account.",
    openGraph: {
      title: "Logout | Better Holiday Lead Hub",
      description: "Signing out of your account.",
    },
  };
}

export default function LogoutPage() {
  return <LogoutClientPage />;
}
