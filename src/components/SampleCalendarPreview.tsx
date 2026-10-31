"use client";

import { useState } from "react";
import Link from "next/link";

export default function SampleCalendarPreview() {
  const [activeFilter, setActiveFilter] = useState("all");

  const sampleItems = [
    {
      day: "Mon, May 4",
      channel: "Instagram",
      channelColor: "bg-pink-100 text-pink-700 border-pink-200",
      channelDot: "bg-pink-500",
      type: "Reel / Video",
      title: "Behind-the-Scenes Sourdough Prep",
      idea: "Show the 5:00 AM kneading process with uplifting music to build morning craving.",
      status: "Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      day: "Wed, May 6",
      channel: "Email",
      channelColor: "bg-blue-100 text-blue-700 border-blue-200",
      channelDot: "bg-blue-500",
      type: "Newsletter",
      title: "VIP Weekend Tasting Invitation",
      idea: "Exclusive 15% discount code for subscriber club members on new seasonal pastries.",
      status: "Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      day: "Fri, May 8",
      channel: "Facebook",
      channelColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
      channelDot: "bg-indigo-500",
      type: "Community Post",
      title: "Mother's Day Pre-Orders Open",
      idea: "Highlight artisan gift boxes with early pickup reservations for local families.",
      status: "Draft",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      day: "Sat, May 9",
      channel: "Google Ads",
      channelColor: "bg-amber-100 text-amber-800 border-amber-200",
      channelDot: "bg-amber-500",
      type: "Local Search Ad",
      title: "'Fresh Bakery Near Me' Promo",
      idea: "Target radius around bakery for weekend breakfast and coffee searches.",
      status: "Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? sampleItems
      : sampleItems.filter(
          (item) => item.channel.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="bg-white rounded-3xl border border-[#F3E8E2] p-6 sm:p-8 shadow-xl shadow-[#0E7C86]/5">
      {/* Sample Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F3E8E2] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E7C86]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
              Interactive Sample Preview
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mt-1">
            Bella Artisan Bakery &mdash; Spring Launch Campaign
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Goal: Increase Local Foot Traffic &bull; Duration: 4 Weeks &bull; 4 Posts/Week
          </p>
        </div>

        {/* View Switcher mockup */}
        <div className="flex items-center bg-[#FFF9F5] border border-[#F3E8E2] rounded-xl p-1 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#0E7C86] shadow-sm">
            Month
          </span>
          <span className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280]">
            Week
          </span>
          <span className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280]">
            List
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto text-xs font-medium">
        <span className="text-[#6B7280] pr-1">Filter channel:</span>
        {["all", "Instagram", "Email", "Facebook", "Google Ads"].map((ch) => (
          <button
            key={ch}
            onClick={() => setActiveFilter(ch)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === ch
                ? "bg-[#0E7C86] text-white font-semibold"
                : "bg-[#FFF9F5] text-[#4B5563] hover:bg-[#F3E8E2]"
            }`}
          >
            {ch === "all" ? "All Channels" : ch}
          </button>
        ))}
      </div>

      {/* Calendar Item Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="group bg-[#FFF9F5] hover:bg-white rounded-2xl border border-[#F3E8E2] hover:border-[#0E7C86]/40 p-4 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Day & Status */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-[#1F2937]">{item.day}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Channel Pill */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium border ${item.channelColor}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.channelDot}`}></span>
                  {item.channel}
                </span>
                <span className="text-[11px] text-[#6B7280] font-medium truncate">
                  {item.type}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#0E7C86] transition-colors leading-snug mb-2">
                {item.title}
              </h4>

              {/* Idea text */}
              <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3">
                {item.idea}
              </p>
            </div>

            {/* Simulated Action row */}
            <div className="pt-4 mt-4 border-t border-[#F3E8E2]/80 flex items-center justify-between text-[11px] text-[#0E7C86] font-medium">
              <span className="inline-flex items-center gap-1 group-hover:underline">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Copy &amp; Scripts
              </span>
              <span className="text-[#9CA3AF]">&rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Callout Footer */}
      <div className="mt-6 pt-5 border-t border-[#F3E8E2] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFF9F5]/70 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B5B]/15 text-[#FF6B5B] flex items-center justify-center font-bold">
            ⚡
          </div>
          <p className="text-xs text-[#4B5563]">
            <strong className="text-[#1F2937]">Fully Editable:</strong> Drag dates, rewrite titles, click any post to generate custom ad scripts, captions, and creative briefs.
          </p>
        </div>
        <Link
          href="/auth/signup"
          className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E7C86] hover:bg-[#0a5f67] transition-all"
        >
          Create Your Own Calendar &rarr;
        </Link>
      </div>
    </div>
  );
}

