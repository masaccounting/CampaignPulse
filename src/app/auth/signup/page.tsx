"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  function isValidEmail(val: string): boolean {
    const trimmed = val.trim();
    // Validate email format requiring an @ and a dot in the domain part
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(trimmed);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address with a complete domain (e.g., name@business.com).");
      return;
    }

    if (usePassword) {
      if (password.length < 8) {
        setErrorMsg("Password must be at least 8 characters long.");
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: password,
          options: {
            data: {
              business_name: businessName.trim() || undefined,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        // If user is returned without a confirmed session, Supabase has email confirmation enabled
        if (data.user && !data.session) {
          setEmailConfirmationRequired(true);
          setLoading(false);
          return;
        }

        // Successfully created and signed in
        await fetch("/api/auth/instant-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });

        router.push("/dashboard");
        router.refresh();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to create account. Please try again.";
        setErrorMsg(msg);
        setLoading(false);
      }
    } else {
      // 1-Click Fast Instant Signup
      setLoading(true);
      try {
        await fetch("/api/auth/instant-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });

        router.push("/dashboard");
        router.refresh();
      } catch {
        setErrorMsg("Failed to start account. Please try again.");
        setLoading(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center mb-6" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-[#4B5563]">
          Instant access to start planning your marketing campaign
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-[#0E7C86]/5 rounded-3xl border border-[#F3E8E2] space-y-5">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <span className="font-bold">Error: </span>
              {errorMsg}
            </div>
          )}

          {emailConfirmationRequired ? (
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-lg font-bold">
                ✉️
              </div>
              <h3 className="font-bold text-base text-[#1F2937]">Check Your Email</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                We sent a confirmation link to <strong className="text-[#1F2937]">{email}</strong>. Please click the link in your email to verify your account and activate your campaign dashboard.
              </p>
              <Link
                href="/auth/login"
                className="inline-block mt-2 text-xs font-bold text-[#0E7C86] hover:underline"
              >
                Return to Login &rarr;
              </Link>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-semibold text-[#1F2937] mb-1.5"
                >
                  Business Name <span className="font-normal text-[#6B7280]">(Optional)</span>
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Bella Artisan Bakery"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#1F2937] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
                />
                <p className="text-[11px] text-[#6B7280] mt-1">
                  Must include a domain name (e.g. name@company.com).
                </p>
              </div>

              {usePassword ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#1F2937]"
                    >
                      Create Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setUsePassword(false)}
                      className="text-xs text-[#0E7C86] hover:underline"
                    >
                      Use 1-Click login instead
                    </button>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
                  />
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    Minimum 8 characters required.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>No password needed &mdash; fast 1-click access.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUsePassword(true)}
                    className="font-bold text-[#0E7C86] underline shrink-0 cursor-pointer ml-2"
                  >
                    Add password
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/25 disabled:opacity-50 transition-all min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                {loading
                  ? "Setting up..."
                  : usePassword
                  ? "Create Account with Password"
                  : "Start Free — Instant Access"}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#F3E8E2] text-center text-xs text-[#4B5563]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[#0E7C86] hover:underline"
            >
              Go to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
