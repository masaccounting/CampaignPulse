"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
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
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  function prefillJudgeDemo() {
    setEmail("support@outskill.com");
    setPassword("Outskill2026!");
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center mb-6" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-[#4B5563]">
          Log in to manage and view your marketing campaigns
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-[#0E7C86]/5 rounded-3xl border border-[#F3E8E2]">
          {/* Judge / Hackathon Quick Demo Box */}
          <div className="mb-6 p-4 rounded-2xl bg-[#0E7C86]/10 border border-[#0E7C86]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
                🎓 Outskill Judge Demo
              </span>
              <button
                type="button"
                onClick={prefillJudgeDemo}
                className="text-xs font-semibold text-[#0E7C86] underline hover:opacity-80"
              >
                Auto-fill demo credentials
              </button>
            </div>
            <p className="text-xs text-[#4B5563] mt-1.5 leading-relaxed">
              Judges can click <strong>&ldquo;Auto-fill demo credentials&rdquo;</strong> to test with our confirmed demonstration account.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <span className="font-bold">Error: </span>
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
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
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-[#0E7C86] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#4B5563]">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-[#0E7C86] hover:underline"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

