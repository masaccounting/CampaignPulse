/**
 * Script to reset demo user in Supabase to known state
 * Usage: npx tsx scripts/reset-demo.ts
 */

import { createClient } from "@supabase/supabase-js";
import { DEMO_POSTS } from "../src/app/api/admin/reset-demo/route";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const demoEmail = process.env.DEMO_EMAIL || "demo@campaignpulse.app";

async function run() {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in environment.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log(`Resetting demo state for: ${demoEmail}`);

  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", demoEmail)
    .single();

  if (pErr || !profile) {
    console.warn(`Profile for ${demoEmail} not found. Please ensure user is registered in Supabase.`);
    return;
  }

  const userId = profile.id;

  // Restore profile
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
    .eq("id", userId);

  // Clean campaigns
  await supabase.from("campaigns").delete().eq("user_id", userId);

  // Insert campaign
  const { data: camp, error: cErr } = await supabase
    .from("campaigns")
    .insert({
      user_id: userId,
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

  if (cErr) {
    console.error("Failed to insert campaign:", cErr);
    return;
  }

  // Insert items
  const items = DEMO_POSTS.map((p, idx) => ({
    campaign_id: camp.id,
    user_id: userId,
    post_date: p.post_date,
    channel: p.channel,
    content_type: p.content_type,
    title: p.title,
    idea_summary: p.idea_summary,
    status: p.status,
    order_index: idx,
  }));

  const { error: iErr } = await supabase.from("calendar_items").insert(items);
  if (iErr) {
    console.error("Failed to insert items:", iErr);
    return;
  }

  console.log(`Demo reset completed successfully! Inserted 1 campaign and ${items.length} calendar items.`);
}

run().catch(console.error);

