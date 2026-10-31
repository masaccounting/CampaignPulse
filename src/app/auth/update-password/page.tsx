"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/client";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function verifySession() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setHasValidSession(true);
        } else {
          setHasValidSession(false);
        }
      } catch {
        setHasValidSession(false);
      } finally {
        setCheckingSession(false);
      }
    }
    verifySession();
  }, [supabase.auth]);

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify and re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to update password.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 2000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center mb-6" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Set New Password
        </h2>
        <p className="mt-2 text-sm text-[#4B5563]">
          Choose a secure password for your CampaignPulse account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-[#0E7C86]/5 rounded-3xl border border-[#F3E8E2]">
          {checkingSession ? (
            <div className="py-8 text-center text-sm text-[#6B7280]">
              <div className="w-8 h-8 rounded-full border-2 border-[#0E7C86]/20 border-t-[#0E7C86] animate-spin mx-auto mb-3"></div>
              Verifying security link...
            </div>
          ) : !hasValidSession ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl font-bold">
                ⚠️
              </div>
              <h3 className="text-lg font-bold text-[#1F2937]">
                Invalid or Expired Link
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                This password reset link is invalid or has already expired. Password reset links can only be used once for security.
              </p>
              <div className="pt-4">
                <Link
                  href="/auth/forgot-password"
                  className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E7C86] hover:bg-[#0a5f67]"
                >
                  Request a New Link &rarr;
                </Link>
              </div>
            </div>
          ) : success ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-[#1F2937]">
                Password Updated!
              </h3>
              <p className="text-xs text-[#4B5563]">
                Your new password has been saved. Redirecting you to your dashboard...
              </p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleUpdatePassword}>
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                  <span className="font-bold">Error: </span>
                  {errorMsg}
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#1F2937] mb-1.5"
                >
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
                />
                <p className="mt-1 text-xs text-[#6B7280]">
                  Must be at least 8 characters long.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-[#1F2937] mb-1.5"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Updating password..." : "Set New Password"}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/auth/login"
                  className="text-xs font-semibold text-[#4B5563] hover:text-[#0E7C86]"
                >
                  &larr; Cancel and return to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
