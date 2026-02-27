import { redirect } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Better Holiday Lead Hub",
    description: "Static ERP dashboard built with Next.js App Router.",
    openGraph: {
      title: "Better Holiday Lead Hub",
      description: "Static ERP dashboard built with Next.js App Router.",
    },
  };
}

export default function Home() {
  redirect("/dashboard");
}
