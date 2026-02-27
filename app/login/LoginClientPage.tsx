"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

export function LoginClientPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      router.replace("/dashboard");
    } else {
      setError(result.error ?? "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--primary)] px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3 text-white"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--primary-light)]">
            <LayoutDashboard className="size-6 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold">Better Holiday</p>
            <p className="text-sm font-medium text-white/90">Lead Hub</p>
          </div>
        </Link>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-xl">
          <h1 className="text-xl font-bold text-[var(--primary)]">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-[var(--primary-light)]">
            Enter your credentials to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <div
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <FormField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              leftIcon={<Mail className="size-4" />}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              leftIcon={<Lock className="size-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--muted)]">
            Demo accounts:{" "}
            <code className="rounded bg-gray-100 px-1">admin@holidaypanda.com</code>{" "}
            (Admin) /{" "}
            <code className="rounded bg-gray-100 px-1">password123</code> or{" "}
            <code className="rounded bg-gray-100 px-1">teamlead@holidaypanda.com</code>{" "}
            (Team Lead) /{" "}
            <code className="rounded bg-gray-100 px-1">password123</code> or{" "}
            <code className="rounded bg-gray-100 px-1">sales@holidaypanda.com</code>{" "}
            (Sales Associate) /{" "}
            <code className="rounded bg-gray-100 px-1">password123</code>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-white/70">
          Better Holiday Lead Hub © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
