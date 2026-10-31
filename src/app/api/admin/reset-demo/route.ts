import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getDemoEmail } from "@/utils/demo";

export const dynamic = "force-dynamic";

// Known demo posts (16 posts across May 4 - May 31, 2026)
export const DEMO_POSTS = [
  // Week 1 (May 4 - May 10, 2026)
  {
    post_date: "2026-05-04",
    channel: "Instagram",
    content_type: "Reel / Video",
    title: "Behind-the-Scenes Sourdough Prep",
    idea_summary: "Show the 5:00 AM kneading process with uplifting music to build morning craving.",
    status: "Ready",
  },
  {
    post_date: "2026-05-06",
    channel: "Email",
    content_type: "Newsletter",
    title: "VIP Weekend Tasting Invitation",
    idea_summary: "Exclusive 15% discount code for subscriber club members on new seasonal pastries.",
    status: "Ready",
  },
  {
    post_date: "2026-05-08",
    channel: "Facebook",
    content_type: "Community Post",
    title: "Mother's Day Pre-Orders Open",
    idea_summary: "Highlight artisan gift boxes with early pickup reservations for local families.",
    status: "Draft",
  },
  {
    post_date: "2026-05-10", // Mother's Day Sunday
    channel: "Instagram",
    content_type: "Story",
    title: "Happy Mother's Day Warm Wishes",
    idea_summary: "A warm celebration message featuring morning pastry box pickups and bakery bustle.",
    status: "Ready",
  },
  // Week 2 (May 11 - May 17, 2026)
  {
    post_date: "2026-05-12",
    channel: "Facebook",
    content_type: "Photo & Story",
    title: "Meet Our Local Miller & Flour Story",
    idea_summary: "Spotlight on Texas stone-ground grains that make our loaves nutritious and distinct.",
    status: "Ready",
  },
  {
    post_date: "2026-05-14",
    channel: "Email",
    content_type: "Weekly Digest",
    title: "This Weekend's Special Croissant Flavors",
    idea_summary: "Announce almond-pistachio and dark chocolate raspberry weekend specials.",
    status: "Ready",
  },
  {
    post_date: "2026-05-15",
    channel: "Instagram",
    content_type: "Carousel",
    title: "How to Keep Your Sourdough Fresh for 5 Days",
    idea_summary: "Helpful guide on slicing, cloth storage, and freezing tips that builds customer trust.",
    status: "Draft",
  },
  {
    post_date: "2026-05-16",
    channel: "Google Ads",
    content_type: "Local Search Ad",
    title: "Weekend Breakfast Takeout — Austin",
    idea_summary: "Capture high-intent searches within 4 miles of bakery for hot coffee & treats.",
    status: "Ready",
  },
  // Week 3 (May 18 - May 24, 2026)
  {
    post_date: "2026-05-19",
    channel: "Instagram",
    content_type: "Reel / Video",
    title: "The Sound of Crust: Fresh Out of Oven",
    idea_summary: "Sensory ASMR video tapping freshly baked baguettes hot from the deck oven.",
    status: "Ready",
  },
  {
    post_date: "2026-05-21",
    channel: "Facebook",
    content_type: "Event Announcement",
    title: "Kids Breadmaking Workshop Announcement",
    idea_summary: "Inviting families to our monthly Sunday afternoon hands-on dough session.",
    status: "Draft",
  },
  {
    post_date: "2026-05-22",
    channel: "Email",
    content_type: "Flash Offer",
    title: "Memorial Day Weekend Picnic Packs",
    idea_summary: "Early booking for sandwich baguettes, brioche buns, and party pastry platters.",
    status: "Ready",
  },
  {
    post_date: "2026-05-23",
    channel: "Google Ads",
    content_type: "Search Ad",
    title: "Memorial Day Holiday Bread & Pastries",
    idea_summary: "Targeting picnic and BBQ party planners looking for artisan catering in Austin.",
    status: "Ready",
  },
  // Week 4 (May 25 - May 31, 2026)
  {
    post_date: "2026-05-25", // Memorial Day Monday
    channel: "Instagram",
    content_type: "Community Post",
    title: "Memorial Day Holiday Hours & Gratitude",
    idea_summary: "Honoring the holiday, sharing morning hours, and thanking neighborhood patrons.",
    status: "Ready",
  },
  {
    post_date: "2026-05-27",
    channel: "Facebook",
    content_type: "Photo & Poll",
    title: "Vote on June's Next Seasonal Tart Flavor",
    idea_summary: "Engage followers between blackberry lemon vs peach vanilla lavender.",
    status: "Draft",
  },
  {
    post_date: "2026-05-29",
    channel: "Email",
    content_type: "Monthly Roundup",
    title: "May Favorites & A Sneak Peek at Summer",
    idea_summary: "Celebrate top customer stories from May and announce upcoming iced coffee flight.",
    status: "Ready",
  },
  {
    post_date: "2026-05-30",
    channel: "Instagram",
    content_type: "Reel / Video",
    title: "Saturday Morning Neighborhood Rush",
    idea_summary: "High-energy clips of the line out the door, smiles, and latte art in morning sun.",
    status: "Ready",
  },
];

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // Verify authorization if CRON_SECRET is set
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const demoEmail = getDemoEmail();
    const supabase = await createClient();

    // Check if demo user exists in profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", demoEmail)
      .single();

    if (!profile) {
      return NextResponse.json(
        {
          message: "Demo profile not found in Supabase. Check DEMO_EMAIL configuration.",
          demoEmail,
        },
        { status: 200 }
      );
    }

    const demoUserId = profile.id;

    // 1. Restore Brand Profile
    await supabase
      .from("profiles")
      .update({
        business_name: "Bella Artisan Bakery",
        industry: "Food & Beverage / Artisan Bakery",
        what_you_sell: "Organic sourdough bread, French croissants, and specialty seasonal pastries.",
        location: "Austin, Texas",
        website: "https://bellabakeryexample.com",
        brand_tone: "Friendly",
        target_audience: "Local neighborhood food lovers, busy professionals, and weekend brunch-goers.",
      })
      .eq("id", demoUserId);

    // 2. Remove existing campaigns and calendar items for demo user
    await supabase.from("campaigns").delete().eq("user_id", demoUserId);

    // 3. Create fresh demo campaign
    const { data: campaign, error: cErr } = await supabase
      .from("campaigns")
      .insert({
        user_id: demoUserId,
        title: "Bella Artisan Bakery Spring Re-opening Campaign",
        business_name: "Bella Artisan Bakery",
        industry: "Food & Beverage / Artisan Bakery",
        what_you_sell: "Organic sourdough bread, French croissants, and specialty seasonal pastries.",
        location: "Austin, Texas",
        brand_tone: "Friendly",
        target_audience_desc: "Local neighborhood food lovers and families seeking wholesome baked goods.",
        audience_age_range: "25 - 54",
        audience_interests: "Artisan food, local farmers markets, clean ingredients, morning coffee.",
        audience_problem: "Tired of bland commercial bread and wanting wholesome, daily-baked items.",
        online_channels: ["Instagram", "Facebook", "Email", "Google Ads"],
        goal: "Increase Sales",
        custom_goal: "Boost weekend breakfast foot traffic and promote seasonal morning pastry boxes.",
        budget_level: "low",
        start_date: "2026-05-04",
        duration_weeks: 4,
        end_date: "2026-05-31",
        posts_per_week: 4,
        status: "active",
      })
      .select()
      .single();

    if (cErr) throw cErr;

    // 4. Insert the 16 calendar items
    const itemsToInsert = DEMO_POSTS.map((post, idx) => ({
      campaign_id: campaign.id,
      user_id: demoUserId,
      post_date: post.post_date,
      channel: post.channel,
      content_type: post.content_type,
      title: post.title,
      idea_summary: post.idea_summary,
      status: post.status,
      order_index: idx,
    }));

    await supabase.from("calendar_items").insert(itemsToInsert);

    return NextResponse.json({
      success: true,
      message: "Demo account successfully restored to known state.",
      campaignId: campaign.id,
      itemsCount: itemsToInsert.length,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to reset demo";
    console.error("Reset demo error:", err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
