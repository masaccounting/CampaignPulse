"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function SignUpPage() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleInstantSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Please enter an email address.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await fetch("/api/auth/instant-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setErrorMsg("Failed to start account. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center mb-6" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-[#4B5563]">
          Instant, password-free access to start planning your campaign
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

          <form className="space-y-4" onSubmit={handleInstantSignUp}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <span>✓</span>
              <span>No password needed &mdash; instant, hassle-free sign in.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/25 disabled:opacity-50 transition-all"
            >
              {loading ? "Setting up..." : "Start Free &mdash; Instant Access"}
            </button>
          </form>

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
