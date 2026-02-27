import type { Metadata } from "next";
import { LoginClientPage } from "./LoginClientPage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login | Better Holiday Lead Hub",
    description: "Sign in to access the ERP dashboard.",
    openGraph: {
      title: "Login | Better Holiday Lead Hub",
      description: "Sign in to access the ERP dashboard.",
    },
  };
}

export default function LoginPage() {
  return <LoginClientPage />;
}
