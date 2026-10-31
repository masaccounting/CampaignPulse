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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            business_name: businessName,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Save initial business name into profiles table if provided
        if (businessName.trim()) {
          await supabase
            .from("profiles")
            .update({ business_name: businessName.trim() })
            .eq("id", data.user.id);
        }

        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center mb-6" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          Create your free account
        </h2>
        <p className="mt-2 text-sm text-[#4B5563]">
          Start planning your AI marketing campaigns in minutes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-[#0E7C86]/5 rounded-3xl border border-[#F3E8E2]">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <span className="font-bold">Error: </span>
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSignUp}>
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
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#1F2937] mb-1.5"
              >
                Create Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] bg-[#FFF9F5]/40"
              />
              <p className="mt-1 text-xs text-[#6B7280]">
                Must be at least 6 characters.
              </p>
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
                  Creating account...
                </>
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-[#6B7280]">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-[#0E7C86]">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-[#0E7C86]">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-6 text-center text-xs text-[#4B5563] pt-4 border-t border-[#F3E8E2]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[#0E7C86] hover:underline"
            >
              Log in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

