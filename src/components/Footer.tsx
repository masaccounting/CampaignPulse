import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#F3E8E2] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#4B5563] max-w-sm">
              The AI campaign planner designed specifically for small-business owners. Turn simple details into an actionable, ready-to-publish marketing calendar in minutes.
            </p>
            {process.env.NEXT_PUBLIC_SHOW_JUDGE_MODE === "true" && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF9F5] border border-[#F3E8E2] text-xs font-medium text-[#0E7C86]">
                <span className="w-2 h-2 rounded-full bg-[#0E7C86]"></span>
                Outskill AI Accelerator Hackathon Project
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Product Links">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-3">
              Product
            </p>
            <ul className="space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <Link href="/#how-it-works" className="hover:text-[#0E7C86] min-h-[44px] inline-flex items-center">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#sample-calendar" className="hover:text-[#0E7C86] min-h-[44px] inline-flex items-center">
                  Sample Calendar
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#0E7C86] min-h-[44px] inline-flex items-center">
                  Features &amp; Tools
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-[#0E7C86] min-h-[44px] inline-flex items-center">
                  Create Free Account
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal & Trust */}
          <nav aria-label="Legal and Trust Links">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-3">
              Trust &amp; Legal
            </p>
            <ul className="space-y-2.5 text-sm text-[#4B5563]">
              <li>
                <Link href="/privacy" className="hover:text-[#0E7C86] min-h-[44px] inline-flex items-center">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0E7C86] min-h-[44px] inline-flex items-center">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-xs text-[#9CA3AF] block pt-1">
                  AI drafts require human review before publishing.
                </span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-[#F3E8E2] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#4B5563]">
          <p>&copy; 2026 CampaignPulse. Built with care for small businesses.</p>
          <p>Powered by Next.js, Supabase &amp; Google Gemini AI.</p>
        </div>
      </div>
    </footer>
  );
}

