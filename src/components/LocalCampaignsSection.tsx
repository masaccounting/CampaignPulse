"use client";

import { useState } from "react";
import Link from "next/link";

interface LocalCampaign {
  id: string;
  title: string;
  goal?: string;
  status?: string;
  duration_weeks?: number;
  start_date?: string;
  posts_per_week?: number;
  what_you_sell?: string;
  [key: string]: unknown;
}

export default function LocalCampaignsSection({ hasDbCampaigns }: { hasDbCampaigns: boolean }) {
  const [localCampaigns] = useState<LocalCampaign[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const demo = JSON.parse(localStorage.getItem("cp_demo_campaigns") || "[]");
      const user = JSON.parse(localStorage.getItem("cp_user_campaigns") || "[]");
      return [...user, ...demo];
    } catch {
      return [];
    }
  });

  if (hasDbCampaigns || localCampaigns.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-8 border-t border-[#F3E8E2]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#1F2937]">
            Saved In This Browser
          </h3>
          <p className="text-xs text-[#6B7280]">
            Campaigns created in demo mode or pending cloud sync
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0E7C86]/10 text-[#0E7C86]">
          {localCampaigns.length} Saved
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-3xl border border-[#F3E8E2] hover:border-[#0E7C86]/40 p-6 transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-[#0E7C86] uppercase tracking-wider text-[11px]">
                  {camp.goal || "Marketing Goal"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {camp.status || "Active"}
                </span>
              </div>

              <h4 className="text-lg font-bold text-[#1F2937] mb-2 leading-snug">
                {camp.title}
              </h4>

              <div className="space-y-1.5 text-xs text-[#4B5563] pt-3 border-t border-[#F3E8E2]">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Duration:</span>
                  <span className="font-medium">{camp.duration_weeks || 4} Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Start Date:</span>
                  <span className="font-medium">{camp.start_date || "Today"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Cadence:</span>
                  <span className="font-medium">{camp.posts_per_week || 4} posts / week</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F3E8E2]">
              <Link
                href={`/calendar/${camp.id}`}
                className="block w-full text-center py-2.5 rounded-xl font-bold text-xs text-white bg-[#0E7C86] hover:bg-[#0a5f67] transition-all"
              >
                Open Calendar &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

