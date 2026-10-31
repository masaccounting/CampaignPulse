import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the CampaignPulse privacy policy and data protection practices.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-[#F3E8E2] p-8 sm:p-12 shadow-sm space-y-6">
          <div className="border-b border-[#F3E8E2] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
              Legal
            </span>
            <h1 className="text-3xl font-extrabold text-[#1F2937] mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Last Updated: October 31, 2026
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F3E8E2] text-xs text-[#6B7280]">
            <em>Notice: This policy is a draft and will be finalised before public launch. (TODO: Supply final legal privacy text).</em>
          </div>

          <div className="space-y-4 text-sm text-[#4B5563] leading-relaxed">
            <p>
              Welcome to <strong>CampaignPulse</strong>. This Privacy Policy describes how we handle information in our AI campaign planning tool for small businesses.
            </p>
            <h2 className="text-base font-bold text-[#1F2937] pt-2">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when creating an account, saving a brand profile, or generating a marketing campaign. This includes your business name, marketing goals, target audience descriptions, and email address.
            </p>
            <h2 className="text-base font-bold text-[#1F2937] pt-2">
              2. How We Use Information &amp; AI Processing
            </h2>
            <p>
              Your business brief is securely processed by Google Gemini to construct your custom calendar and draft marketing copy. We do not sell your personal data or business plans to third parties.
            </p>
            <h2 className="text-base font-bold text-[#1F2937] pt-2">
              3. Data Security
            </h2>
            <p>
              Your data is stored in secure Supabase Postgres databases protected by Row-Level Security (RLS), ensuring only authenticated owners can access their campaigns.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
