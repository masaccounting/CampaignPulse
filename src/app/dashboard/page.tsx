import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getDemoEmail } from "@/utils/demo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalCampaignsSection from "@/components/LocalCampaignsSection";

export const dynamic = "force-dynamic";

interface DashboardProfile {
  business_name?: string;
  [key: string]: unknown;
}

interface DashboardCampaign {
  id: string;
  goal: string;
  status: string;
  title: string;
  what_you_sell?: string;
  target_audience_desc?: string;
  duration_weeks?: number;
  start_date?: string;
  posts_per_week?: number;
  calendar_items?: { count: number }[];
  [key: string]: unknown;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const guestSession = cookieStore.get("cp_guest_session")?.value;
  const guestEmail = cookieStore.get("cp_guest_email")?.value;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !guestSession) {
    redirect("/auth/login");
  }

  const effectiveEmail = user?.email || guestEmail || getDemoEmail();

  // Fetch user profile and existing campaigns if Supabase user exists
  let profile: DashboardProfile | null = null;
  let campaigns: DashboardCampaign[] = [];

  if (user) {
    const { data: p } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = p;

    const { data: c } = await supabase
      .from("campaigns")
      .select("*, calendar_items(count)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    campaigns = c || [];
  }

  const businessName = profile?.business_name || (guestSession ? "Outskill Demonstration Business" : "My Business");

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#F3E8E2] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
                CampaignPulse Dashboard
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight mt-1">
              {businessName}
            </h1>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Signed in as <strong className="text-[#4B5563]">{effectiveEmail}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/brand-profile"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-[#4B5563] bg-white border border-[#F3E8E2] hover:bg-[#F3E8E2] transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 text-[#0E7C86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Brand Profile
            </Link>
            <Link
              href="/wizard"
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/20 transition-all flex items-center gap-2"
            >
              <span>+</span>
              <span>New Campaign</span>
            </Link>
          </div>
        </div>

        {/* Campaign List Section */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1F2937]">
              Your Marketing Campaigns
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0E7C86]/10 text-[#0E7C86]">
              {campaigns?.length || 0} Total
            </span>
          </div>

          {campaigns && campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((camp: DashboardCampaign) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-3xl border border-[#F3E8E2] hover:border-[#0E7C86]/40 p-6 transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-semibold text-[#0E7C86] uppercase tracking-wider text-[11px]">
                        {camp.goal}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {camp.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1F2937] mb-2 leading-snug">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-[#6B7280] line-clamp-2 mb-4 leading-relaxed">
                      {camp.what_you_sell || camp.target_audience_desc || "Custom marketing plan."}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#4B5563] pt-3 border-t border-[#F3E8E2]">
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Duration:</span>
                        <span className="font-medium">{camp.duration_weeks} Weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Start Date:</span>
                        <span className="font-medium">{camp.start_date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Cadence:</span>
                        <span className="font-medium">{camp.posts_per_week} posts / week</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#F3E8E2] flex items-center justify-between">
                    <Link
                      href={`/calendar/${camp.id}`}
                      className="w-full text-center py-2.5 rounded-xl font-bold text-xs text-white bg-[#0E7C86] hover:bg-[#0a5f67] transition-all"
                    >
                      Open Calendar &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Friendly Empty State */
            <div className="bg-white rounded-3xl border border-[#F3E8E2] p-8 sm:p-14 text-center max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-3xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center text-3xl mx-auto mb-5">
                📅
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                No campaigns created yet
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-sm mx-auto mb-6 leading-relaxed">
                Ready to plan your next month of marketing? Answer a few quick questions in our wizard, and AI will build your custom marketing calendar.
              </p>
              <Link
                href="/wizard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/25 transition-all"
              >
                <span>+</span>
                <span>Create Your First Campaign</span>
              </Link>
            </div>
          )}

          {/* Local Campaigns Fallback for Demo Sessions */}
          <LocalCampaignsSection hasDbCampaigns={Boolean(campaigns && campaigns.length > 0)} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

