"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Instant 1-Click Access (No Password Required)
  async function handleInstantAccess(demoEmail = "support@outskill.com") {
    setLoading(true);
    setErrorMsg(null);
    try {
      // 1. Set server cookie session
      await fetch("/api/auth/instant-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail }),
      });

      // 2. Also attempt Supabase sign-in if available
      try {
        await supabase.auth.signInAnonymously();
      } catch (e) {
        // Fallback gracefully to instant session
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setErrorMsg("Failed to start session. Please try again.");
      setLoading(false);
    }
  }

  // Password-Free Email Access
  async function handleEmailContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Please enter an email address.");
      return;
    }
    await handleInstantAccess(email.trim());
  }

  // Optional traditional password login
  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Also set cookie session
        await fetch("/api/auth/instant-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.user.email }),
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg("Unable to connect with password. Use 1-Click Instant Access instead.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center mb-6" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Welcome to CampaignPulse
        </h2>
        <p className="mt-2 text-sm text-[#4B5563]">
          Fast, password-free access for small-business owners and judges
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-[#0E7C86]/5 rounded-3xl border border-[#F3E8E2] space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <span className="font-bold">Notice: </span>
              {errorMsg}
            </div>
          )}

          {/* Primary Action: 1-Click Instant Demo Access */}
          <div className="p-5 rounded-2xl bg-[#0E7C86]/10 border border-[#0E7C86]/25 text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0E7C86] text-white text-xs font-bold uppercase tracking-wider">
              Recommended &bull; No Password Required
            </span>
            <h3 className="text-base font-bold text-[#1F2937]">
              Instant Access (Demo &amp; Judge Mode)
            </h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Click below to jump directly into the dashboard with our pre-configured demo account (<strong className="text-[#1F2937]">support@outskill.com</strong>).
            </p>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleInstantAccess("support@outskill.com")}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Entering app...</span>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Enter With 1-Click (No Password)</span>
                </>
              )}
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#F3E8E2] w-full"></div>
            <span className="bg-white px-3 text-xs text-[#9CA3AF] uppercase font-semibold">
              Or your email
            </span>
            <div className="border-t border-[#F3E8E2] w-full"></div>
          </div>

          {/* Password-Free Email Sign-In */}
          <form onSubmit={handleEmailContinue} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-1.5"
              >
                Enter Your Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-[#1F2937] bg-white border border-[#D1D5DB] hover:bg-[#F3E8E2] transition-all"
            >
              Continue With This Email &rarr;
            </button>
          </form>

          {/* Optional Password Accordion */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="text-xs text-[#6B7280] hover:text-[#0E7C86] underline"
            >
              {showPasswordForm ? "Hide password field" : "Have a Supabase password? Click to expand"}
            </button>

            {showPasswordForm && (
              <form onSubmit={handlePasswordLogin} className="mt-4 pt-4 border-t border-[#F3E8E2] space-y-3 text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-[#4B5563] hover:bg-[#374151]"
                >
                  Log In With Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
