"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";

export default function BrandProfilePage() {
  const supabase = createClient();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [whatYouSell, setWhatYouSell] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [brandTone, setBrandTone] = useState("Friendly");
  const [targetAudience, setTargetAudience] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setBusinessName(data.business_name || "");
          setIndustry(data.industry || "");
          setWhatYouSell(data.what_you_sell || "");
          setLocation(data.location || "");
          setWebsite(data.website || "");
          setBrandTone(data.brand_tone || "Friendly");
          setTargetAudience(data.target_audience || "");
        }
      }
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          business_name: businessName,
          industry,
          what_you_sell: whatYouSell,
          location,
          website,
          brand_tone: brandTone,
          target_audience: targetAudience,
        })
        .eq("id", user.id);
    }

    setSaved(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between pb-6 border-b border-[#F3E8E2] mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
              Settings
            </span>
            <h1 className="text-3xl font-extrabold text-[#1F2937] mt-1">
              Your Brand Profile
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Saved details will auto-fill whenever you launch a new campaign wizard.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="text-xs font-semibold text-[#4B5563] hover:text-[#0E7C86]"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        {saved && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold">
            ✓ Brand profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#F3E8E2] p-6 sm:p-10 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Bella Artisan Bakery"
              className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                Industry
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Bakery &amp; Coffee"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Austin, Texas"
                className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              What You Sell (Main Offerings)
            </label>
            <textarea
              rows={3}
              value={whatYouSell}
              onChange={(e) => setWhatYouSell(e.target.value)}
              placeholder="e.g. Artisan sourdough bread, French croissants, organic pastries."
              className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              Target Audience Overview
            </label>
            <textarea
              rows={2}
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Local food lovers and morning commuters seeking fresh bakery items."
              className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1F2937] mb-1.5">
              Brand Tone
            </label>
            <select
              value={brandTone}
              onChange={(e) => setBrandTone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-sm text-[#1F2937] bg-[#FFF9F5]/40"
            >
              <option value="Friendly">Friendly (Warm, welcoming, and approachable)</option>
              <option value="Professional">Professional (Authoritative, clear, trustworthy)</option>
              <option value="Playful">Playful (Fun, witty, and energetic)</option>
              <option value="Luxury">Luxury (Sophisticated, refined, premium)</option>
              <option value="Bold">Bold (Direct, confident, inspiring)</option>
              <option value="Calm">Calm (Reassuring, peaceful, gentle)</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#6B7280]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-md shadow-[#0E7C86]/20"
            >
              {loading ? "Saving..." : "Save Brand Profile"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

