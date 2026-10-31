"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";

interface CalendarItem {
  id: string;
  post_date: string;
  channel: string;
  content_type: string;
  title: string;
  idea_summary: string;
  status: "Draft" | "Ready" | "Posted";
  notes?: string;
}

interface CampaignData {
  id?: string;
  title?: string;
  goal?: string;
  brand_tone?: string;
  online_channels?: string[];
  duration_weeks?: number;
  posts_per_week?: number;
  start_date?: string;
  [key: string]: unknown;
}

export default function CalendarPage() {
  const params = useParams();
  const campaignId = params?.id as string;
  const supabase = createClient();

  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [activeView, setActiveView] = useState<"month" | "week" | "list">("month");
  const [filterChannel, setFilterChannel] = useState("all");
  const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);

  // Per-item AI tool states
  const [activeTab, setActiveTab] = useState<"ideas" | "script" | "copy" | "brief">("ideas");
  const [aiLoading, setAiLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generate calendar items based on duration, channels, and cadence
  async function generateInitialCalendar(camp: CampaignData) {
    setGeneratingAI(true);
    const channels = camp.online_channels && camp.online_channels.length > 0
      ? camp.online_channels
      : ["Instagram", "Facebook", "Email", "Google Ads"];
    const weeks = camp.duration_weeks || 4;
    const postsPerWeek = camp.posts_per_week || 3;
    const startDate = new Date(camp.start_date || new Date());

    const generated: CalendarItem[] = [];
    let itemId = 1;

    const postTemplates: Record<string, { type: string; titles: string[]; ideas: string[] }> = {
      Instagram: {
        type: "Reel / Video",
        titles: [
          "Behind-the-Scenes Preparation",
          "Customer Favorite Spotlight",
          "Weekly Recipe Secret & Technique",
          "Weekend Special Preview",
        ],
        ideas: [
          "Capture the morning artisan craft with uplifting music and pure ingredients.",
          "Highlight our signature item with customer quotes and glowing smiles.",
          "A 20-second quick visual tip showing how we achieve crisp perfection.",
          "High-energy video showing what is coming out of the oven this weekend.",
        ],
      },
      Email: {
        type: "Newsletter",
        titles: [
          "VIP Community Exclusive Perk",
          "Weekend Reservation & Tasting Guide",
          "Seasonal Special Announcement",
          "A Note From Our Founder",
        ],
        ideas: [
          "Reward subscribers with a special 15% VIP code valid through Sunday.",
          "Curated weekend menu preview with easy click-to-order links.",
          "Announce new seasonal flavors arriving this month.",
          "A warm personal story sharing our passion for wholesome local quality.",
        ],
      },
      Facebook: {
        type: "Community Post",
        titles: [
          "Local Event & Gathering Announcement",
          "Customer Story of the Week",
          "Neighborhood Special Hours",
          "Family Pre-Order Package Announcement",
        ],
        ideas: [
          "Share our weekend gathering hours and invite local families to visit.",
          "Celebrate a longtime regular with a warm photo and kind words.",
          "Community update with easy parking directions and special morning hours.",
          "Early reservations for holiday family packages with pick-up times.",
        ],
      },
      "Google Ads": {
        type: "Search Ad",
        titles: [
          "Top-Rated Local Artisan Treats",
          "Fresh Daily Morning Pickup Promo",
          "Specialty Weekend Orders",
        ],
        ideas: [
          "Target active searches for artisan bakery treats within 5-mile radius.",
          "Target morning commuters looking for fresh breakfast takeout.",
          "Target event and celebration keyword queries in the local area.",
        ],
      },
      TikTok: {
        type: "Short Video",
        titles: ["Dough Rising Satisfying Timelapse", "Fast Kitchen Prep Trend"],
        ideas: [
          "Hypnotic 15-second ASMR sourdough scoring and baking video.",
          "Fun trending audio paired with early 5:00 AM bakery lighting.",
        ],
      },
      LinkedIn: {
        type: "Company Update",
        titles: ["Behind Our Small Business Growth", "Why We Choose Local Sourcing"],
        ideas: [
          "Reflections on building a resilient small business rooted in community.",
          "Highlighting our local farm suppliers and sustainable practices.",
        ],
      },
      Blog: {
        type: "Article",
        titles: ["The Health Benefits of Natural Fermentation", "A Guide to Artisan Baking"],
        ideas: [
          "Educational blog post exploring slow fermentation and gut health.",
          "A beginner-friendly guide to choosing the best wholesome flours.",
        ],
      },
    };

    for (let w = 0; w < weeks; w++) {
      for (let p = 0; p < postsPerWeek; p++) {
        const postDate = new Date(startDate);
        // Distribute posts across week
        const dayOffset = Math.floor((p * 7) / postsPerWeek) + (w * 7);
        postDate.setDate(postDate.getDate() + dayOffset);

        const channel = channels[(w * postsPerWeek + p) % channels.length];
        const tmpl = postTemplates[channel] || postTemplates.Instagram;
        const titleIdx = (w + p) % tmpl.titles.length;

        generated.push({
          id: `item-${Date.now()}-${itemId++}`,
          post_date: postDate.toISOString().split("T")[0],
          channel,
          content_type: tmpl.type,
          title: tmpl.titles[titleIdx],
          idea_summary: tmpl.ideas[titleIdx],
          status: p === 0 ? "Ready" : "Draft",
        });
      }
    }

    setItems(generated);

    // Save to storage
    if (campaignId?.startsWith("demo-")) {
      localStorage.setItem(`cp_items_${campaignId}`, JSON.stringify(generated));
    } else {
      // Save to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const toInsert = generated.map((it, idx) => ({
          campaign_id: campaignId,
          user_id: user.id,
          post_date: it.post_date,
          channel: it.channel,
          content_type: it.content_type,
          title: it.title,
          idea_summary: it.idea_summary,
          status: it.status,
          order_index: idx,
        }));
        await supabase.from("calendar_items").insert(toInsert);
      }
    }

    setGeneratingAI(false);
    setLoading(false);
  }

  // Load or generate calendar items
  useEffect(() => {
    async function loadCampaignAndItems() {
      setLoading(true);

      // Check if it's a guest demo campaign or Supabase campaign
      let camp: CampaignData | null = null;
      let existingItems: CalendarItem[] = [];

      if (campaignId?.startsWith("demo-")) {
        const demoCampaigns = JSON.parse(localStorage.getItem("cp_demo_campaigns") || "[]");
        camp = demoCampaigns.find((c: CampaignData) => c.id === campaignId) || {
          title: "Bella Artisan Bakery Spring Campaign",
          business_name: "Bella Artisan Bakery",
          goal: "Increase Sales",
          start_date: new Date().toISOString().split("T")[0],
          duration_weeks: 4,
          posts_per_week: 4,
          online_channels: ["Instagram", "Email", "Facebook", "Google Ads"],
        };
        existingItems = JSON.parse(localStorage.getItem(`cp_items_${campaignId}`) || "[]");
      } else {
        const { data: c } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", campaignId)
          .single();
        camp = c;

        if (camp) {
          const { data: i } = await supabase
            .from("calendar_items")
            .select("*")
            .eq("campaign_id", campaignId)
            .order("post_date", { ascending: true });
          existingItems = i || [];
        }
      }

      setCampaign(camp);

      if (existingItems && existingItems.length > 0) {
        setItems(existingItems);
        setLoading(false);
      } else if (camp) {
        // Auto-generate realistic marketing calendar items if empty
        generateInitialCalendar(camp);
      } else {
        setLoading(false);
      }
    }

    loadCampaignAndItems();
  }, [campaignId]);

  function getChannelColor(channel: string) {
    switch (channel) {
      case "Instagram":
        return { pill: "bg-pink-100 text-pink-700 border-pink-200", dot: "bg-pink-500" };
      case "Email":
        return { pill: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" };
      case "Facebook":
        return { pill: "bg-indigo-100 text-indigo-700 border-indigo-200", dot: "bg-indigo-500" };
      case "Google Ads":
        return { pill: "bg-amber-100 text-amber-800 border-amber-200", dot: "bg-amber-500" };
      case "TikTok":
        return { pill: "bg-purple-100 text-purple-700 border-purple-200", dot: "bg-purple-500" };
      case "LinkedIn":
        return { pill: "bg-sky-100 text-sky-800 border-sky-200", dot: "bg-sky-600" };
      case "YouTube":
        return { pill: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" };
      default:
        return { pill: "bg-emerald-100 text-emerald-800 border-emerald-200", dot: "bg-emerald-500" };
    }
  }

  const filteredItems =
    filterChannel === "all"
      ? items
      : items.filter((it) => it.channel.toLowerCase() === filterChannel.toLowerCase());

  // AI Tool Generator handler
  async function generateAITool(type: "ideas" | "script" | "copy" | "brief") {
    if (!selectedItem) return;
    setAiLoading(true);
    setActiveTab(type);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          businessName: campaign?.business_name,
          goal: campaign?.goal,
          channel: selectedItem.channel,
          title: selectedItem.title,
          ideaSummary: selectedItem.idea_summary,
          tone: campaign?.brand_tone || "Friendly",
          timestamp: Date.now(),
        }),
      });

      const data = await res.json();
      if (data.result) {
        setGeneratedContent((prev: Record<string, string>) => ({
          ...prev,
          [type]: data.result,
        }));
      }
    } catch (e) {
      console.error("AI Generation error:", e);
    } finally {
      setAiLoading(false);
    }
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#1F2937]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F3E8E2] gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="text-xs text-[#0E7C86] font-semibold hover:underline">
                &larr; All Campaigns
              </Link>
              <span className="text-xs text-[#9CA3AF]">&bull;</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
                {campaign?.goal || "Marketing Campaign"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight mt-1">
              {campaign?.title || "Campaign Marketing Calendar"}
            </h1>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {items.length} Posts &bull; {campaign?.duration_weeks || 4} Weeks &bull; Tone: {campaign?.brand_tone || "Friendly"}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center bg-white border border-[#F3E8E2] rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setActiveView("month")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === "month"
                    ? "bg-[#0E7C86] text-white shadow-sm"
                    : "text-[#4B5563] hover:bg-[#FFF9F5]"
                  }`}
              >
                Month
              </button>
              <button
                onClick={() => setActiveView("week")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === "week"
                    ? "bg-[#0E7C86] text-white shadow-sm"
                    : "text-[#4B5563] hover:bg-[#FFF9F5]"
                  }`}
              >
                Week
              </button>
              <button
                onClick={() => setActiveView("list")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === "list"
                    ? "bg-[#0E7C86] text-white shadow-sm"
                    : "text-[#4B5563] hover:bg-[#FFF9F5]"
                  }`}
              >
                List
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#4B5563] bg-white border border-[#F3E8E2] hover:bg-[#F3E8E2]"
            >
              🖨️ Export / Print
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto text-xs">
          <span className="text-[#6B7280] font-medium pr-1">Filter channel:</span>
          {["all", "Instagram", "Facebook", "Email", "Google Ads", "TikTok", "LinkedIn"].map((ch) => (
            <button
              key={ch}
              onClick={() => setFilterChannel(ch)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${filterChannel === ch
                  ? "bg-[#0E7C86] text-white font-bold"
                  : "bg-white text-[#4B5563] border border-[#F3E8E2] hover:bg-[#FFF9F5]"
                }`}
            >
              {ch === "all" ? "All Channels" : ch}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading || generatingAI ? (
          <div className="bg-white rounded-3xl border border-[#F3E8E2] p-16 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full border-4 border-[#0E7C86]/20 border-t-[#0E7C86] animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-[#1F2937]">
              {generatingAI ? "Google Gemini AI is crafting your dated calendar..." : "Loading campaign calendar..."}
            </h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Calculating posting cadences, writing hooks, and scheduling channel themes.
            </p>
          </div>
        ) : (
          /* Main Calendar Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Grid / List Area */}
            <div className={`${selectedItem ? "lg:col-span-2" : "lg:col-span-3"}`}>
              {activeView === "month" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map((item) => {
                    const cColor = getChannelColor(item.channel);
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedItem(item);
                          setGeneratedContent({});
                        }}
                        className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between ${isSelected
                            ? "border-[#0E7C86] ring-2 ring-[#0E7C86]/20 shadow-md"
                            : "border-[#F3E8E2] hover:border-[#0E7C86]/40"
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-2.5">
                            <span className="font-bold text-[#1F2937]">
                              {item.post_date}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${item.status === "Ready"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 mb-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${cColor.pill}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${cColor.dot}`}></span>
                              {item.channel}
                            </span>
                            <span className="text-[10px] text-[#6B7280] truncate">
                              {item.content_type}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-[#1F2937] leading-snug line-clamp-2 mb-1.5">
                            {item.title}
                          </h4>

                          <p className="text-[11px] text-[#4B5563] leading-relaxed line-clamp-3">
                            {item.idea_summary}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#F3E8E2] flex items-center justify-between text-[11px] text-[#0E7C86] font-semibold">
                          <span>✨ AI Copy &amp; Scripts</span>
                          <span>&rarr;</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* List View */}
              {activeView === "list" && (
                <div className="bg-white rounded-3xl border border-[#F3E8E2] overflow-hidden shadow-sm">
                  <div className="divide-y divide-[#F3E8E2]">
                    {filteredItems.map((item) => {
                      const cColor = getChannelColor(item.channel);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedItem(item);
                            setGeneratedContent({});
                          }}
                          className="p-4 sm:p-5 hover:bg-[#FFF9F5] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-[#1F2937]">
                                {item.post_date}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${cColor.pill}`}
                              >
                                {item.channel}
                              </span>
                              <span className="text-xs text-[#6B7280]">
                                {item.content_type}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-[#1F2937]">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#4B5563]">
                              {item.idea_summary}
                            </p>
                          </div>

                          <button className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#0E7C86] bg-[#0E7C86]/10 whitespace-nowrap">
                            Generate Copy &rarr;
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Week View */}
              {activeView === "week" && (
                <div className="space-y-6">
                  {Array.from({ length: campaign?.duration_weeks || 4 }).map((_, wIdx) => {
                    const weekItems = items.slice(
                      wIdx * (campaign?.posts_per_week || 3),
                      (wIdx + 1) * (campaign?.posts_per_week || 3)
                    );
                    return (
                      <div key={wIdx} className="bg-white rounded-3xl border border-[#F3E8E2] p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0E7C86] mb-3">
                          Week {wIdx + 1}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {weekItems.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedItem(item)}
                              className="p-3.5 rounded-xl border border-[#F3E8E2] bg-[#FFF9F5] cursor-pointer hover:border-[#0E7C86]"
                            >
                              <div className="text-xs font-semibold text-[#1F2937] mb-1">
                                {item.post_date} &bull; {item.channel}
                              </div>
                              <h4 className="text-xs font-bold text-[#1F2937] line-clamp-1">
                                {item.title}
                              </h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* AI Side Panel for Selected Item */}
            {selectedItem && (
              <div className="bg-white rounded-3xl border border-[#F3E8E2] p-6 shadow-xl sticky top-24 self-start">
                <div className="flex items-start justify-between pb-4 border-b border-[#F3E8E2] mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E7C86]">
                      {selectedItem.channel} &bull; {selectedItem.post_date}
                    </span>
                    <h3 className="text-base font-bold text-[#1F2937] mt-0.5 leading-snug">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1 rounded-lg text-[#9CA3AF] hover:text-[#1F2937]"
                  >
                    ✕
                  </button>
                </div>

                {/* AI Tools Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[#FFF9F5] rounded-xl border border-[#F3E8E2] mb-4 text-xs font-semibold">
                  <button
                    onClick={() => generateAITool("ideas")}
                    className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "ideas"
                        ? "bg-[#0E7C86] text-white shadow-sm"
                        : "text-[#4B5563] hover:text-[#1F2937]"
                      }`}
                  >
                    3 Ideas
                  </button>
                  <button
                    onClick={() => generateAITool("script")}
                    className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "script"
                        ? "bg-[#0E7C86] text-white shadow-sm"
                        : "text-[#4B5563] hover:text-[#1F2937]"
                      }`}
                  >
                    Ad Script
                  </button>
                  <button
                    onClick={() => generateAITool("copy")}
                    className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "copy"
                        ? "bg-[#0E7C86] text-white shadow-sm"
                        : "text-[#4B5563] hover:text-[#1F2937]"
                      }`}
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => generateAITool("brief")}
                    className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "brief"
                        ? "bg-[#0E7C86] text-white shadow-sm"
                        : "text-[#4B5563] hover:text-[#1F2937]"
                      }`}
                  >
                    Brief
                  </button>
                </div>

                {/* Content Generator Area */}
                {aiLoading ? (
                  <div className="py-12 text-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#0E7C86]/20 border-t-[#0E7C86] animate-spin mx-auto mb-2"></div>
                    <p className="text-xs text-[#6B7280]">
                      Generating tailored {activeTab} with Gemini AI...
                    </p>
                  </div>
                ) : generatedContent[activeTab] ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F3E8E2] text-xs text-[#1F2937] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                      {typeof generatedContent[activeTab] === "string"
                        ? generatedContent[activeTab]
                        : JSON.stringify(generatedContent[activeTab], null, 2)}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            typeof generatedContent[activeTab] === "string"
                              ? generatedContent[activeTab]
                              : JSON.stringify(generatedContent[activeTab], null, 2),
                            activeTab
                          )
                        }
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E7C86] hover:bg-[#0a5f67]"
                      >
                        {copiedKey === activeTab ? "✓ Copied!" : "📋 Copy to Clipboard"}
                      </button>
                      <button
                        type="button"
                        onClick={() => generateAITool(activeTab)}
                        className="text-xs text-[#0E7C86] font-semibold hover:underline flex items-center gap-1 cursor-pointer min-h-[36px] px-2 rounded-lg hover:bg-[#0E7C86]/10 transition-colors"
                      >
                        🔄 Regenerate
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-xs text-[#6B7280]">
                      Click below to let Google Gemini draft custom {activeTab} for this {selectedItem.channel} post.
                    </p>
                    <button
                      onClick={() => generateAITool(activeTab)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0E7C86] hover:bg-[#0a5f67] shadow-sm"
                    >
                      Generate {activeTab.toUpperCase()} &rarr;
                    </button>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-[#F3E8E2] text-[10px] text-[#9CA3AF] text-center">
                  AI-generated draft: review before publishing.
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

