import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json();
    const { campaign, items, campaignId } = body;

    if (!campaign) {
      return NextResponse.json({ error: "Missing campaign data" }, { status: 400 });
    }

    if (user) {
      // 1. Ensure campaign exists/updates in Supabase database
      const { data: savedCamp, error: campError } = await supabase
        .from("campaigns")
        .upsert({
          id: campaignId && !campaignId.startsWith("demo-") ? campaignId : undefined,
          user_id: user.id,
          title: campaign.title || "My Marketing Campaign",
          business_name: campaign.business_name || "My Business",
          industry: campaign.industry || null,
          what_you_sell: campaign.what_you_sell || null,
          target_audience_desc: campaign.target_audience_desc || null,
          brand_tone: campaign.brand_tone || "Friendly",
          goal: campaign.goal || "Increase Sales",
          custom_goal: campaign.custom_goal || null,
          budget_level: campaign.budget_level || "low",
          start_date: campaign.start_date || new Date().toISOString().split("T")[0],
          duration_weeks: campaign.duration_weeks || 4,
          posts_per_week: campaign.posts_per_week || 4,
          status: "active",
        })
        .select()
        .single();

      if (campError) {
        console.error("Supabase campaign save error:", campError);
        return NextResponse.json({ error: campError.message }, { status: 500 });
      }

      const activeCampaignId = savedCamp.id;

      // 2. Save items if provided
      if (items && Array.isArray(items) && items.length > 0) {
        const toInsert = items.map((it, idx) => ({
          campaign_id: activeCampaignId,
          user_id: user.id,
          post_date: it.post_date,
          channel: it.channel,
          content_type: it.content_type,
          title: it.title,
          idea_summary: it.idea_summary,
          status: it.status || "Draft",
          order_index: idx,
        }));

        await supabase.from("calendar_items").delete().eq("campaign_id", activeCampaignId);
        await supabase.from("calendar_items").insert(toInsert);
      }

      return NextResponse.json({ success: true, campaignId: activeCampaignId, userSaved: true });
    }

    // Guest / Demo mode: success response for client storage
    return NextResponse.json({ success: true, guest: true });
  } catch (err: unknown) {
    console.error("Save campaign error:", err);
    return NextResponse.json(
      { error: "Internal server error while saving campaign" },
      { status: 500 }
    );
  }
}

