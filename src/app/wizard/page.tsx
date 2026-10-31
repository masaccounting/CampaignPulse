"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";

export default function WizardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  // Step 1: Business Brief
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [whatYouSell, setWhatYouSell] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [brandTone, setBrandTone] = useState("Friendly");
  const [saveToBrandProfile, setSaveToBrandProfile] = useState(true);

  // Step 2: Target Audience
  const [targetAudienceDesc, setTargetAudienceDesc] = useState("");
  const [audienceAgeRange, setAudienceAgeRange] = useState("25 - 45");
  const [audienceInterests, setAudienceInterests] = useState("");
  const [audienceProblem, setAudienceProblem] = useState("");

  // Step 3: Campaign Goal & Budget
  const [goal, setGoal] = useState("Increase Sales");
  const [customGoal, setCustomGoal] = useState("");
  const [budgetLevel, setBudgetLevel] = useState("low");

  // Step 4: Duration & Channels
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [durationWeeks, setDurationWeeks] = useState(4);
  const [postsPerWeek, setPostsPerWeek] = useState(4);
  const [campaignChannels, setCampaignChannels] = useState<string[]>([
    "Instagram",
    "Email",
    "Facebook",
  ]);

  // Load saved Brand Profile on mount if available
  useEffect(() => {
    async function loadBrandProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (profile && profile.business_name) {
          setBusinessName(profile.business_name || "");
          setIndustry(profile.industry || "");
          setWhatYouSell(profile.what_you_sell || "");
          setLocation(profile.location || "");
          setWebsite(profile.website || "");
          if (profile.brand_tone) setBrandTone(profile.brand_tone);
          if (profile.target_audience) setTargetAudienceDesc(profile.target_audience);
        }
      }
    }
    loadBrandProfile();
  }, []);

  // "Try an Example" pre-fill button
  function fillSampleAnswers() {
    setBusinessName("Bella Artisan Bakery");
    setIndustry("Food & Beverage / Artisan Bakery");
    setWhatYouSell("Organic sourdough bread, French croissants, and specialty seasonal pastries.");
    setLocation("Austin, Texas");
    setWebsite("https://bellabakeryexample.com");
    setBrandTone("Friendly");

    setTargetAudienceDesc("Local neighborhood food lovers, busy professionals, and weekend brunch-goers.");
    setAudienceAgeRange("25 - 54");
    setAudienceInterests("Artisan food, local farmers markets, morning coffee rituals, clean ingredients.");
    setAudienceProblem("Tired of bland grocery store bread and wanting freshly baked, wholesome treats.");

    setGoal("Increase Sales");
    setCustomGoal("Drive weekend breakfast foot traffic and promote seasonal morning pastry boxes.");
    setBudgetLevel("low");

    setDurationWeeks(4);
    setPostsPerWeek(4);
    setCampaignChannels(["Instagram", "Email", "Facebook", "Google Ads"]);
  }

  function toggleChannel(channel: string) {
    if (campaignChannels.includes(channel)) {
      if (campaignChannels.length > 1) {
        setCampaignChannels(campaignChannels.filter((c) => c !== channel));
      }
    } else {
      setCampaignChannels([...campaignChannels, channel]);
    }
  }

  async function handleFinish(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Calculate End Date
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(end.getDate() + durationWeeks * 7);
      const endDate = end.toISOString().split("T")[0];

      const campaignTitle = `${businessName || "My Business"} ${goal} Campaign`;

      // Get user or guest
      const { data: { user } } = await supabase.auth.getUser();

      const campaignPayload = {
        title: campaignTitle,
        business_name: businessName || "My Business",
        industry,
        what_you_sell: whatYouSell,
        location,
        brand_tone: brandTone,
        target_audience_desc: targetAudienceDesc,
        audience_age_range: audienceAgeRange,
        audience_interests: audienceInterests,
        audience_problem: audienceProblem,
        online_channels: campaignChannels,
        goal,
        custom_goal: customGoal,
        budget_level: budgetLevel,
        start_date: startDate,
        duration_weeks: durationWeeks,
        end_date: endDate,
        posts_per_week: postsPerWeek,
        status: "active",
      };

      let campaignId = "";

      if (user) {
        // Save to Supabase
        const { data: newCampaign, error: campErr } = await supabase
          .from("campaigns")
          .insert({
            ...campaignPayload,
            user_id: user.id,
          })
          .select()
          .single();

        if (campErr) throw campErr;
        campaignId = newCampaign.id;

        // Optionally update Brand Profile
        if (saveToBrandProfile) {
          await supabase
            .from("profiles")
            .update({
              business_name: businessName,
              industry,
              what_you_sell: whatYouSell,
              location,
              website,
              brand_tone: brandTone,
              target_audience: targetAudienceDesc,
            })
            .eq("id", user.id);
        }
      } else {
        // Guest Demo Mode: Save locally
        const guestId = "demo-" + Date.now();
        campaignId = guestId;
        const existingDemo = JSON.parse(localStorage.getItem("cp_demo_campaigns") || "[]");
        existingDemo.unshift({ ...campaignPayload, id: guestId });
        localStorage.setItem("cp_demo_campaigns", JSON.stringify(existingDemo));
      }

      // Proceed to Calendar view (Stage 4)
      router.push(`/calendar/${campaignId}`);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to create campaign. Please try again.";
      setErrorMsg(message);
      setLoading(false);
    }
  }

  const toneOptions = [
    { label: "Friendly", desc: "Warm, welcoming, and approachable" },
    { label: "Professional", desc: "Authoritative, clear, and trustworthy" },
    { label: "Playful", desc: "Fun, witty, and energetic" },
    { label: "Luxury", desc: "Sophisticated, elegant, and refined" },
    { label: "Bold", desc: "Direct, confident, and inspiring" },
    { label: "Calm", desc: "Reassuring, peaceful, and gentle" },
  ];

  const goalOptions = [
    { title: "Increase Sales", desc: "Promote products, special offers, and boost revenue", icon: "💰" },
    { title: "Brand Awareness", desc: "Introduce your business and reach new local audiences", icon: "📢" },
    { title: "Get Leads", desc: "Collect inquiries, consultation requests, or sign-ups", icon: "🎯" },
    { title: "Promote an Event", desc: "Build excitement for an upcoming workshop, sale, or grand opening", icon: "🎉" },
    { title: "Launch a Product", desc: "Debut an exciting new item or service line", icon: "🚀" },
    { title: "Win Back Customers", desc: "Re-engage past patrons with loyalty perks and updates", icon: "❤️" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top Header & "Try an Example" */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F3E8E2] gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
              Campaign Generator &bull; Step {step} of 4
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mt-1">
              {step === 1 && "Business Brief"}
              {step === 2 && "Target Audience"}
              {step === 3 && "Campaign Goal & Budget"}
              {step === 4 && "Duration & Channels"}
            </h1>
          </div>

          <button
            type="button"
            onClick={fillSampleAnswers}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-bold text-[#0E7C86] bg-[#0E7C86]/10 hover:bg-[#0E7C86]/20 transition-all flex items-center gap-1.5"
          >
            <span>✨</span>
            <span>Try an example</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#E5E7EB] h-2.5 rounded-full overflow-hidden mb-8">
          <div
            className="bg-[#0E7C86] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            <strong>Error: </strong>
            {errorMsg}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-[#F3E8E2] p-6 sm:p-10 shadow-xl shadow-[#0E7C86]/5">
          {/* STEP 1: BUSINESS BRIEF */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Bella Artisan Bakery"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Industry / Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Bakery &amp; Coffee Shop"
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Austin, Texas (or Online / Worldwide)"
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  What do you sell? (Main Offerings) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={whatYouSell}
                  onChange={(e) => setWhatYouSell(e.target.value)}
                  placeholder="e.g. Fresh daily sourdough, handmade French pastries, and specialty espresso drinks."
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  Website / Social Handle <span className="text-xs font-normal text-[#6B7280]">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="e.g. https://instagram.com/bellabakery"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Brand Tone of Voice
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {toneOptions.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setBrandTone(t.label)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        brandTone === t.label
                          ? "border-[#0E7C86] bg-[#0E7C86]/10 text-[#0E7C86] font-bold"
                          : "border-[#E5E7EB] bg-[#FFF9F5]/40 text-[#4B5563] hover:bg-[#F3E8E2]"
                      }`}
                    >
                      <div className="text-sm font-bold">{t.label}</div>
                      <div className="text-[11px] text-[#6B7280] font-normal leading-tight mt-0.5">
                        {t.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 text-xs text-[#4B5563] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveToBrandProfile}
                    onChange={(e) => setSaveToBrandProfile(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0E7C86] focus:ring-[#0E7C86]"
                  />
                  <span>Save this business brief to my Brand Profile for future campaigns</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: TARGET AUDIENCE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  Who is your target audience? *
                </label>
                <textarea
                  rows={2}
                  required
                  value={targetAudienceDesc}
                  onChange={(e) => setTargetAudienceDesc(e.target.value)}
                  placeholder="e.g. Local neighborhood foodies, families seeking wholesome breakfast treats, and coffee enthusiasts."
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Target Age Range
                  </label>
                  <input
                    type="text"
                    value={audienceAgeRange}
                    onChange={(e) => setAudienceAgeRange(e.target.value)}
                    placeholder="e.g. 25 - 45 (or All Ages)"
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Key Interests / Passions
                  </label>
                  <input
                    type="text"
                    value={audienceInterests}
                    onChange={(e) => setAudienceInterests(e.target.value)}
                    placeholder="e.g. Artisan coffee, local baking, healthy living"
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  Main Problem or Desire You Solve for Them
                </label>
                <textarea
                  rows={2}
                  value={audienceProblem}
                  onChange={(e) => setAudienceProblem(e.target.value)}
                  placeholder="e.g. They want high-quality, authentic baked goods with pure ingredients rather than processed store alternatives."
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                />
              </div>
            </div>
          )}

          {/* STEP 3: CAMPAIGN GOAL & BUDGET */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-3">
                  Choose Your Main Campaign Goal *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goalOptions.map((g) => (
                    <button
                      key={g.title}
                      type="button"
                      onClick={() => setGoal(g.title)}
                      className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                        goal === g.title
                          ? "border-[#0E7C86] bg-[#0E7C86]/10 text-[#0E7C86] shadow-sm"
                          : "border-[#E5E7EB] bg-[#FFF9F5]/40 text-[#4B5563] hover:bg-[#F3E8E2]"
                      }`}
                    >
                      <span className="text-2xl">{g.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-[#1F2937]">{g.title}</div>
                        <div className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{g.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                  Custom Goal Details <span className="text-xs font-normal text-[#6B7280]">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="e.g. Double Saturday morning pastry box sales before Mother's Day"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Budget Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "none", label: "Organic ($0)", desc: "Free social & email" },
                    { id: "low", label: "Low", desc: "Under $500" },
                    { id: "medium", label: "Medium", desc: "$500 - $2,000" },
                    { id: "high", label: "High", desc: "$2,000+" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetLevel(b.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        budgetLevel === b.id
                          ? "border-[#0E7C86] bg-[#0E7C86]/10 text-[#0E7C86] font-bold"
                          : "border-[#E5E7EB] bg-[#FFF9F5]/40 text-[#4B5563] hover:bg-[#F3E8E2]"
                      }`}
                    >
                      <div className="text-xs font-bold">{b.label}</div>
                      <div className="text-[10px] text-[#6B7280]">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DURATION & CHANNELS */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                    Posting Frequency
                  </label>
                  <select
                    value={postsPerWeek}
                    onChange={(e) => setPostsPerWeek(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
                  >
                    <option value={2}>2 posts per week (Gentle)</option>
                    <option value={3}>3 posts per week (Balanced)</option>
                    <option value={4}>4 posts per week (Recommended)</option>
                    <option value={5}>5 posts per week (Active)</option>
                    <option value={7}>7 posts per week (Daily Sprint)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Campaign Duration
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[1, 2, 4, 8, 12].map((weeks) => (
                    <button
                      key={weeks}
                      type="button"
                      onClick={() => setDurationWeeks(weeks)}
                      className={`py-3 px-2 rounded-xl text-center border font-bold text-sm transition-all ${
                        durationWeeks === weeks
                          ? "border-[#0E7C86] bg-[#0E7C86] text-white shadow-sm"
                          : "border-[#E5E7EB] bg-[#FFF9F5]/40 text-[#4B5563] hover:bg-[#F3E8E2]"
                      }`}
                    >
                      {weeks} {weeks === 1 ? "Week" : "Weeks"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Channels to Include in Calendar *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    "Instagram",
                    "Facebook",
                    "Email",
                    "TikTok",
                    "LinkedIn",
                    "Google Ads",
                    "YouTube",
                    "Blog",
                  ].map((ch) => {
                    const isSelected = campaignChannels.includes(ch);
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => toggleChannel(ch)}
                        className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-[#0E7C86] bg-[#0E7C86]/10 text-[#0E7C86] font-bold"
                            : "border-[#E5E7EB] bg-[#FFF9F5]/40 text-[#4B5563] hover:bg-[#F3E8E2]"
                        }`}
                      >
                        <span className="text-xs">{ch}</span>
                        {isSelected && <span className="text-xs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0E7C86]/10 border border-[#0E7C86]/20 text-xs text-[#0E7C86] space-y-1">
                <div className="font-bold">Summary:</div>
                <p className="text-[#4B5563]">
                  {durationWeeks} Weeks &bull; {durationWeeks * postsPerWeek} Total Scheduled Content Items &bull; Channels: {campaignChannels.join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-[#F3E8E2] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F3E8E2] transition-all"
              >
                &larr; Back
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="text-xs font-semibold text-[#6B7280] hover:text-[#1F2937]"
              >
                Cancel
              </Link>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !businessName.trim()) {
                    setErrorMsg("Please enter a business name (or click 'Try an example' above).");
                    return;
                  }
                  setErrorMsg(null);
                  setStep(step + 1);
                }}
                className="px-7 py-3 rounded-xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/25 transition-all"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-lg shadow-[#0E7C86]/30 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <span>Generating Calendar with AI...</span>
                ) : (
                  <>
                    <span>Generate Marketing Calendar</span>
                    <span>&rarr;</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

