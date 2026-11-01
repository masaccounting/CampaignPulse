"use client";

import { useState } from "react";
import Link from "next/link";

export interface SamplePost {
  id: string;
  day: string; // e.g. "Mon, May 4"
  dateKey: string; // e.g. "2026-05-04"
  weekNum: number; // 1, 2, 3, 4
  channel: "Instagram" | "Email" | "Facebook" | "Google Ads";
  channelColor: string;
  channelDot: string;
  type: string;
  title: string;
  idea: string;
  status: "Ready" | "Draft";
  statusColor: string;
  modalContent: {
    ideas: string[];
    script: {
      fifteenSec: string;
      thirtySec: string;
    };
    caption: {
      text: string;
      hashtags: string[];
    };
  };
}

export const SAMPLE_POSTS: SamplePost[] = [
  // --- WEEK 1: May 4 – May 10, 2026 ---
  {
    id: "sample-1",
    day: "Mon, May 4",
    dateKey: "2026-05-04",
    weekNum: 1,
    channel: "Instagram",
    channelColor: "bg-pink-100 text-pink-700 border-pink-200",
    channelDot: "bg-pink-500",
    type: "Reel / Video",
    title: "Behind-the-Scenes Sourdough Prep",
    idea: "Show the 5:00 AM artisan kneading process with uplifting music to build morning craving.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Timelapse from bulk rise to scoring the sourdough ear with morning bakery ambient sound.",
        "Side-by-side comparison of 24-hour slow ferment crumb vs grocery bread.",
        "Quick answer video: Why our 3-ingredient wild yeast loaves never leave you feeling heavy.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Flour, water, salt, wild yeast. That's literally all. [0:05 - Visual]: Scoring the dough with razor precision and sliding into a 500° hearth. [0:11 - CTA]: Fresh sourdough loaves come out warm every morning at 7:00 AM at Bella Artisan.",
        thirtySec:
          "[0:00 - Hook]: Ever wonder why real bakery sourdough tastes so much better than plastic bag bread? [0:08 - Body]: Here at Bella, our loaves ferment for a full 24 hours. The crust gets that signature caramelized crackle while the crumb stays pillowy soft. [0:20 - Offer]: Pick up a warm boule this Tuesday through Friday before 10 AM and get a free mini herb butter tub. [0:26 - CTA]: Visit Bella Artisan Bakery on Elm Street!",
      },
      caption: {
        text: "The 5:00 AM rhythm never gets old. 🥖 Three simple ingredients, wild local yeast, and 24 hours of slow fermentation. Your morning toast deserves better than store-shelf white bread.",
        hashtags: ["#ArtisanSourdough", "#BellaBakery", "#SlowFerment", "#LocalBakeryLove", "#MorningRitual"],
      },
    },
  },
  {
    id: "sample-2",
    day: "Wed, May 6",
    dateKey: "2026-05-06",
    weekNum: 1,
    channel: "Email",
    channelColor: "bg-blue-100 text-blue-700 border-blue-200",
    channelDot: "bg-blue-500",
    type: "VIP Newsletter",
    title: "VIP Weekend Tasting Invitation",
    idea: "Exclusive 15% discount code for subscriber club members on new seasonal pastries.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Secret VIP tasting hour on Saturday 8:00–9:00 AM before the public doors open.",
        "Early vote newsletter allowing subscribers to pick our June seasonal muffin flavor.",
        "Founder note recounting the recipe inspiration from a pastry masterclass in France.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Check your inbox, Bella VIPs! [0:05 - Visual]: Unboxing the brand new Lavender Lemon Tart. [0:10 - CTA]: Show your secret member code at checkout for 15% off this weekend only.",
        thirtySec:
          "[0:00 - Hook]: Being on the Bella VIP list has its perks. [0:07 - Body]: This morning we sent an exclusive invite to our May Tasting Weekend. You'll get first access to our flaky Raspberry Almond Galettes and Lavender Lemon Tarts. [0:20 - Offer]: Use your member code 'SPRINGFLOUR' to claim 15% off your entire box. [0:26 - CTA]: Not on the list? Sign up at our counter or tap the link in bio!",
      },
      caption: {
        text: "VIP inbox surprise! ✨ Our spring pastry menu is officially here. Check your email for this weekend's secret 15% off pass on all seasonal tarts and galettes.",
        hashtags: ["#BellaVIP", "#SpringPastries", "#LocalBakery", "#BakeryClub", "#LemonLavender"],
      },
    },
  },
  {
    id: "sample-3",
    day: "Fri, May 8",
    dateKey: "2026-05-08",
    weekNum: 1,
    channel: "Facebook",
    channelColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    channelDot: "bg-indigo-500",
    type: "Community Post",
    title: "Mother's Day Pre-Orders Open",
    idea: "Highlight artisan gift boxes with early pickup reservations for local families.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Photo gallery of the Deluxe Mother's Day Brunch Box with fresh flowers and brioche.",
        "Reminder that Sunday morning lines wrap around the block — reserve pick-up slot early.",
        "Staff spotlight: What each baker is baking for their own mom this Sunday.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Don't show up empty-handed this Sunday! [0:05 - Visual]: Ribbon being tied around the Mother's Day Brioche & Macaron box. [0:10 - CTA]: Reserve your Sunday pickup online before orders close tonight.",
        thirtySec:
          "[0:00 - Hook]: Moms deserve way more than a supermarket card this Sunday. [0:08 - Body]: Surprise her with breakfast in bed from Bella. Our Mother's Day Brunch Box includes 4 fresh chocolate croissants, a vanilla bean brioche loaf, and handmade raspberry macarons. [0:21 - Urgency]: Only 40 pickup slots left for Sunday morning. [0:26 - CTA]: Pre-order on our Facebook shop or call 555-BELLA today!",
      },
      caption: {
        text: "Mother's Day is this Sunday, May 10! 💐 Treat the woman who does it all to breakfast in bed. Pre-orders for our limited-edition Brunch Box close Friday at midnight.",
        hashtags: ["#MothersDayBrunch", "#BellaBakery", "#ShopLocal", "#BreakfastInBed", "#ArtisanPastries"],
      },
    },
  },
  {
    id: "sample-4",
    day: "Sun, May 10",
    dateKey: "2026-05-10",
    weekNum: 1,
    channel: "Instagram",
    channelColor: "bg-pink-100 text-pink-700 border-pink-200",
    channelDot: "bg-pink-500",
    type: "Story / Celebration",
    title: "Mother's Day Fresh Brioche Celebration",
    idea: "Celebrate neighborhood moms with flower giveaways and warm vanilla bean brioche.",
    status: "Draft",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    modalContent: {
      ideas: [
        "Live morning bakery buzz story showing pickups and moms smiling with fresh pastries.",
        "Poll sticker: 'Sweet or Savory breakfast in bed today?'",
        "Heartfelt founder tribute to all mothers and maternal figures in our community.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Happy Mother's Day from our kitchen to your home! [0:06 - Visual]: Slicing into warm golden brioche with fresh berries. [0:10 - Warm Wish]: Thank you to every mom who brightens our local community.",
        thirtySec:
          "[0:00 - Hook]: Happy Mother's Day, neighbors! [0:06 - Scene]: The bakery smells of cinnamon, vanilla bean, and fresh lavender blossoms today. [0:15 - Community Note]: Every mom who stops in this morning gets a complimentary fresh peony stem with her coffee. [0:24 - CTA]: We're open until 2:00 PM today. Come celebrate with us!",
      },
      caption: {
        text: "To all the mothers, grandmothers, and mother-figures: Happy Mother's Day! 🌸 Free fresh peony stem with any morning coffee purchase today while supplies last.",
        hashtags: ["#HappyMothersDay", "#BellaArtisan", "#LocalCommunity", "#MotherhoodCelebration", "#SundayBrunch"],
      },
    },
  },

  // --- WEEK 2: May 11 – May 17, 2026 ---
  {
    id: "sample-5",
    day: "Tue, May 12",
    dateKey: "2026-05-12",
    weekNum: 2,
    channel: "Instagram",
    channelColor: "bg-pink-100 text-pink-700 border-pink-200",
    channelDot: "bg-pink-500",
    type: "Carousel",
    title: "Sourdough Crumb Shot & 4 Recipe Ideas",
    idea: "Educational carousel showcasing French toast, garlic toast, and panzanella using leftover sourdough.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Never toss stale bread: 4 gourmet recipes that make day-3 sourdough taste incredible.",
        "Step-by-step photography of golden brioche French toast with maple pecans.",
        "Customer tips: What our regulars do with the heel of the loaf.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Stop throwing away sourdough heels! [0:05 - Visual]: Golden crunchy garlic croutons being tossed with olive oil. [0:10 - CTA]: Swipe through for 4 simple zero-waste kitchen recipes.",
        thirtySec:
          "[0:00 - Hook]: Got sourdough bread that's a few days old? [0:07 - Body]: Because our sourdough is made without chemical preservatives, it firms up naturally after 3-4 days. That makes it the ultimate base for crunchy panzanella salad or rich brioche French toast. [0:20 - Tip]: Swipe left to grab our head baker's personal 5-minute garlic toast technique. [0:27 - CTA]: Save this post for your next weekend breakfast!",
      },
      caption: {
        text: "Never let great sourdough go to waste! 🍞 4 foolproof ways to turn day-3 sourdough into five-star meals. Swipe through and save for your weekend kitchen inspiration.",
        hashtags: ["#ZeroWasteKitchen", "#SourdoughLove", "#BellaRecipes", "#BreadLovers", "#KitchenTips"],
      },
    },
  },
  {
    id: "sample-6",
    day: "Thu, May 14",
    dateKey: "2026-05-14",
    weekNum: 2,
    channel: "Email",
    channelColor: "bg-blue-100 text-blue-700 border-blue-200",
    channelDot: "bg-blue-500",
    type: "Newsletter",
    title: "Meet Our Local Organic Flour Mill",
    idea: "Storytelling spotlight on the family-owned regional mill that grinds our heritage grains.",
    status: "Draft",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    modalContent: {
      ideas: [
        "Interview with mill operator John on stone-milling versus commercial roller mills.",
        "Explaining why nutrient-dense heritage grains give our bread that nutty, golden profile.",
        "Subscriber question of the week: Is unbleached flour actually healthier?",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Where does Bella flour actually come from? [0:05 - Visual]: Stone grinders rotating slowly at Green Valley Mill 30 miles away. [0:10 - CTA]: Read the full founder story in today's email newsletter.",
        thirtySec:
          "[0:00 - Hook]: The secret to extraordinary bread is knowing who grew the wheat. [0:08 - Body]: 80% of our flour comes from Green Valley Mill just an hour north of us. They grind whole wheat berries slowly so the healthy oils and vitamins never burn off. [0:20 - Connection]: When you buy a loaf at Bella, you're directly supporting regional sustainable farms. [0:27 - CTA]: Join our email family to get the complete farm-to-table story!",
      },
      caption: {
        text: "Real ingredients have names and faces. 🌾 We're proud to source our organic heritage grains from Green Valley Mill. Read this week's newsletter to learn why stone-ground flour makes all the difference.",
        hashtags: ["#FarmToTable", "#LocalGrains", "#StoneGroundFlour", "#BellaArtisan", "#SustainableFood"],
      },
    },
  },
  {
    id: "sample-7",
    day: "Fri, May 15",
    dateKey: "2026-05-15",
    weekNum: 2,
    channel: "Facebook",
    channelColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    channelDot: "bg-indigo-500",
    type: "Community Event",
    title: "Saturday Farmers Market Announcement",
    idea: "Share booth location, early-bird pastry bundles, and coffee pairing for downtown market day.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Map graphic showing Booth #12 at Central Square with parking highlights.",
        "First 25 market visitors receive a complimentary mini cardamom bun with any purchase.",
        "Sneak peek photo of the bakery van loaded with warm boxes at 6:30 AM.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Central Square Farmers Market tomorrow morning! [0:05 - Visual]: Golden croissants stacked tall in market wooden crates. [0:10 - CTA]: Booth #12 starting at 8:00 AM sharp. Come say hi!",
        thirtySec:
          "[0:00 - Hook]: Sunny Saturday morning forecast means one thing: Farmers Market! [0:07 - Body]: We're bringing 120 warm sourdough boules, fresh cinnamon morning buns, and artisan baguettes straight to Central Square. [0:19 - Promotion]: First 25 market customers get a free cardamom swirl bun with their order. [0:26 - CTA]: Find us at Booth #12 next to the fountain from 8 AM till noon!",
      },
      caption: {
        text: "See you at the Central Square Farmers Market this Saturday! ☀️ Find Booth #12 for fresh-baked croissants, warm sourdough, and free cardamom swirls for the first 25 neighbors.",
        hashtags: ["#FarmersMarket", "#CentralSquare", "#BellaBakery", "#WeekendMarket", "#MorningPastries"],
      },
    },
  },
  {
    id: "sample-8",
    day: "Sat, May 16",
    dateKey: "2026-05-16",
    weekNum: 2,
    channel: "Google Ads",
    channelColor: "bg-amber-100 text-amber-800 border-amber-200",
    channelDot: "bg-amber-500",
    type: "Local Search Ad",
    title: "'Artisan Pastries & Coffee Near Me' Campaign",
    idea: "High-intent geo-targeted ad for weekend brunch goers looking for local bakery treats.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Target keywords: 'fresh bakery near me', 'best sourdough bread downtown', 'coffee and croissants'.",
        "Callout extensions: 'Organic Local Grains', 'Baked Fresh Every 5 AM', 'Curbside Pickup Available'.",
        "Sitelinks to Menu, Weekend Specials, and Google Maps Navigation.",
      ],
      script: {
        fifteenSec:
          "[Headline]: Fresh Artisan Pastries — Baked Fresh Daily at 5 AM. [Body]: Rated 4.9 Stars by 450+ Neighbors. [Call to Action]: Order Ahead or Get Directions on Elm Street.",
        thirtySec:
          "[Headline 1]: Best Artisan Sourdough Bakery Downtown. [Headline 2]: Warm Pastries & Espresso Ready in 5 Mins. [Description 1]: 100% organic regional grains fermented for 24 hours. Taste the difference slow baking makes. [Description 2]: Convenient 5-minute parking spots right out front. Open Saturdays & Sundays at 7:00 AM. [URL Display]: BellaArtisanBakery.com/Weekend-Brunch",
      },
      caption: {
        text: "Google Search Sponsored Ad Copy: 'Looking for real bakery sourdough and flaky French croissants? Stop by Bella Artisan on Elm Street. 4.9 Stars with 450+ verified local reviews.'",
        hashtags: ["#GoogleAds", "#LocalSearch", "#BellaBakery", "#BakeryDowntown", "#FreshCoffee"],
      },
    },
  },

  // --- WEEK 3: May 18 – May 24, 2026 ---
  {
    id: "sample-9",
    day: "Mon, May 18",
    dateKey: "2026-05-18",
    weekNum: 3,
    channel: "Instagram",
    channelColor: "bg-pink-100 text-pink-700 border-pink-200",
    channelDot: "bg-pink-500",
    type: "Reel / Tutorial",
    title: "How to Store Artisan Bread (No Plastic Bag!)",
    idea: "Quick 20s educational reel on using linen bags or beeswax wraps to preserve crust crunch.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Show why airtight plastic suffocates the crust and turns crispy bread rubbery.",
        "Demonstrate the cut-side down wooden board method for 48-hour freshness.",
        "Freezer guide: How to pre-slice sourdough and pop directly into a hot toaster.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Never put warm artisan bread in plastic! [0:05 - Visual]: Placing the cut loaf face-down on a wooden butcher block. [0:10 - CTA]: Keep your crust crackly for days with these 2 simple kitchen hacks.",
        thirtySec:
          "[0:00 - Hook]: The #1 mistake people make with bakery sourdough is locking it in a ziplock bag. [0:08 - Problem]: Plastic traps internal steam, making that crisp crust soggy within hours. [0:17 - Solution]: Instead, store it cut-side down on a wooden board, or wrap loosely in a breathable linen cloth. [0:25 - Bonus]: To freeze, slice it first and toast directly from frozen!",
      },
      caption: {
        text: "Save your crust! 🔪 Plastic bags turn crispy sourdough rubbery. Here is how our bakers keep loaves fresh, crunchy, and delicious at home without single-use plastic.",
        hashtags: ["#BreadStorage", "#KitchenHacks", "#SourdoughTips", "#BellaBakery", "#BakingKnowledge"],
      },
    },
  },
  {
    id: "sample-10",
    day: "Wed, May 20",
    dateKey: "2026-05-20",
    weekNum: 3,
    channel: "Email",
    channelColor: "bg-blue-100 text-blue-700 border-blue-200",
    channelDot: "bg-blue-500",
    type: "Promo Email",
    title: "Memorial Day Picnic Pre-Orders Open",
    idea: "Promote holiday barbecue burger buns, brioche rolls, and strawberry shortcake kits.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "BBQ Brioche Bun 8-Packs with toasted sesame seeds.",
        "DIY Strawberry Shortcake Kit with handmade buttermilk biscuits and whipped cream.",
        "Order cutoff deadline notice: Reserve by Thursday May 21 for guaranteed Saturday pickup.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Level up your Memorial Day barbecue! [0:05 - Visual]: Stacking a juicy grilled burger on a golden butter-toasted brioche bun. [0:10 - CTA]: Reserve your Memorial Day Picnic bundles online today.",
        thirtySec:
          "[0:00 - Hook]: Great burgers deserve great buns. [0:07 - Body]: Memorial Day weekend is almost here, and grocery store buns fall apart on the grill. Bella's handcrafted brioche burger buns are sturdy, buttery, and hold up to every sauce. [0:20 - Kits]: We've also bundled our DIY Strawberry Shortcake kits with farm-fresh berries. [0:27 - CTA]: Pre-order your holiday packs now before baking slots fill up!",
      },
      caption: {
        text: "Memorial Day weekend is right around the corner! 🍔 Don't settle for soggy grocery buns. Pre-order our hand-rolled brioche burger buns and strawberry shortcake kits now.",
        hashtags: ["#MemorialDayBBQ", "#BriocheBuns", "#BurgerLovers", "#BellaBakery", "#PicnicSeason"],
      },
    },
  },
  {
    id: "sample-11",
    day: "Fri, May 22",
    dateKey: "2026-05-22",
    weekNum: 3,
    channel: "Facebook",
    channelColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    channelDot: "bg-indigo-500",
    type: "Community Poll",
    title: "Vote: What's Your Must-Have Cookout Pastry?",
    idea: "Engage neighborhood followers in choosing the special featured flavor for holiday weekend.",
    status: "Draft",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    modalContent: {
      ideas: [
        "Poll option 1: Classic Cherry Almond Galette vs Option 2: Lemon Blueberry Hand Pies.",
        "Offer a free 4-pack to one random voter who leaves a comment.",
        "Drive community comments and algorithm visibility ahead of Saturday morning sales.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: You decide what we bake this holiday weekend! [0:05 - Visual]: Cherry Galette on left vs Blueberry Hand Pie on right. [0:10 - CTA]: Cast your vote in the comments below!",
        thirtySec:
          "[0:00 - Hook]: Help our bakers pick our featured Memorial Day holiday pastry! [0:07 - Contender 1]: Contender one: Our golden flaky Cherry Almond Galette made with dark organic cherries. [0:15 - Contender 2]: Contender two: Crisp Lemon Blueberry Hand Pies with wild Maine blueberries. [0:23 - Giveaway]: Comment below with your pick — we're gifting a 4-pack to one lucky neighbor tomorrow morning!",
      },
      caption: {
        text: "We need your help! 🍒 vs 🫐 Cast your vote in the comments: Should we bake Cherry Almond Galettes or Lemon Blueberry Hand Pies for Memorial Day weekend? Winner announced tomorrow morning!",
        hashtags: ["#CommunityVote", "#BakeryPoll", "#BellaFamily", "#HolidayBaking", "#LocalLove"],
      },
    },
  },
  {
    id: "sample-12",
    day: "Sat, May 23",
    dateKey: "2026-05-23",
    weekNum: 3,
    channel: "Google Ads",
    channelColor: "bg-amber-100 text-amber-800 border-amber-200",
    channelDot: "bg-amber-500",
    type: "Search Ad",
    title: "Memorial Day Cookout Brioche Buns Campaign",
    idea: "Target searches for 'brioche hamburger buns', 'fresh bakery dinner rolls', 'holiday cookout food'.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Search queries: 'best burger buns downtown', 'fresh hot dog rolls', 'Memorial Day bakery pickup'.",
        "Highlight next-day pickup and curbside convenience.",
        "Emphasize real butter, no artificial corn syrups or preservatives.",
      ],
      script: {
        fifteenSec:
          "[Headline]: Handcrafted Brioche Buns For Memorial Day. [Body]: Real Butter & Organic Flour. Perfect for BBQ & Grilling. [CTA]: Order 8-Packs Online for Saturday Pickup.",
        thirtySec:
          "[Headline 1]: Upgrade Your Cookout With Artisan Brioche Buns. [Headline 2]: Baked Daily in Small Batches. [Description 1]: Rich, buttery, and firm enough to hold every barbecue burger without turning soggy. [Description 2]: Reserve online in 60 seconds and pick up warm on Elm Street. Convenient parking available. [URL]: BellaArtisanBakery.com/Memorial-Day-Buns",
      },
      caption: {
        text: "Google Ads Sponsored Text: 'Memorial Day Grill Master Secret: Handcrafted Brioche Burger & Sausage Rolls from Bella Artisan. Stop by today or order 8-packs online.'",
        hashtags: ["#GoogleSearchAds", "#CookoutPrep", "#MemorialDayWeekend", "#ArtisanBuns", "#LocalBakery"],
      },
    },
  },

  // --- WEEK 4: May 25 – May 31, 2026 ---
  {
    id: "sample-13",
    day: "Mon, May 25",
    dateKey: "2026-05-25",
    weekNum: 4,
    channel: "Facebook",
    channelColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    channelDot: "bg-indigo-500",
    type: "Memorial Day Honor & Hours",
    title: "Memorial Day Hours & Free Coffee for Veterans",
    idea: "Honoring fallen service members; special 7 AM – 1 PM holiday hours with complimentary coffee for veterans.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "A respectful message of gratitude for fallen service members and their families.",
        "Free drip coffee and mini scone for all active military personnel and veterans.",
        "Clear reminder of special holiday hours (7:00 AM – 1:00 PM).",
      ],
      script: {
        fifteenSec:
          "[0:00 - Tone]: Warm, respectful and community-centered. [0:05 - Visual]: American flag outside bakery door and coffee pouring into paper cups. [0:10 - Message]: Today we remember and honor. Free morning coffee for all veterans from 7 to 1.",
        thirtySec:
          "[0:00 - Message]: On this Memorial Day, the Bella Artisan family pauses to remember and honor the brave men and women who gave their lives in service. [0:11 - Hospitality]: To all active military and veterans in our neighborhood, please accept a warm cup of coffee and morning pastry on us today as a token of gratitude. [0:22 - Hours]: We are open for holiday breakfast and picnic pickups until 1:00 PM.",
      },
      caption: {
        text: "Today we remember, honor, and give thanks for the service members who made the ultimate sacrifice for our freedom. 🇺🇸 Open today 7:00 AM – 1:00 PM. Complimentary coffee and fresh pastry for all veterans.",
        hashtags: ["#MemorialDay", "#HonoringOurHeroes", "#VeteransAppreciation", "#BellaBakery", "#CommunityFirst"],
      },
    },
  },
  {
    id: "sample-14",
    day: "Wed, May 27",
    dateKey: "2026-05-27",
    weekNum: 4,
    channel: "Instagram",
    channelColor: "bg-pink-100 text-pink-700 border-pink-200",
    channelDot: "bg-pink-500",
    type: "Customer Spotlight Reel",
    title: "Customer Review: 'The Only Bread My Stomach Loves'",
    idea: "Share a heartwarming customer testimonial video on why long-fermented sourdough feels gentle.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Customer quote overlay: 'I haven't eaten bread in 5 years without bloating until I found Bella.'",
        "Baker explains the science of prebiotic lactic acid bacteria breaking down gluten proteins.",
        "Callout to try a free sample slice during your next visit.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: 'I thought I had to give up sandwiches forever...' [0:05 - Customer]: '...until my doctor explained real wild sourdough.' [0:10 - Baker]: Come taste a slice on Elm Street and see why long fermentation changes everything.",
        thirtySec:
          "[0:00 - Hook]: Thought bread was the enemy? You might just be eating the wrong wheat. [0:08 - Quote]: Maria left us this review: 'I suffered from gluten sensitivity for years until I tried Bella's 24-hour sourdough. Zero bloating, incredible energy.' [0:20 - Why]: Because our starter ferments for 24 hours, enzymes pre-digest complex starches naturally. [0:27 - Invitation]: Stop by our counter for a free warm taste test anytime!",
      },
      caption: {
        text: "'The only bread my stomach loves.' ❤️ We hear this from customers every single week. When flour is fermented slowly with wild cultures, real bread becomes nourishment, not a gut ache.",
        hashtags: ["#DigestiveHealth", "#RealBread", "#SourdoughScience", "#HappyCustomers", "#BellaArtisan"],
      },
    },
  },
  {
    id: "sample-15",
    day: "Fri, May 29",
    dateKey: "2026-05-29",
    weekNum: 4,
    channel: "Email",
    channelColor: "bg-blue-100 text-blue-700 border-blue-200",
    channelDot: "bg-blue-500",
    type: "VIP Newsletter",
    title: "June Flavor Teaser: Summer Berry Brioche",
    idea: "Announce June seasonal menu items and invite subscribers to pre-order before launch.",
    status: "Draft",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    modalContent: {
      ideas: [
        "Summer preview: Blackberry Meyer Lemon Brioche and Honey Peach Scones.",
        "Early subscriber reservation link with double loyalty points for June orders.",
        "Behind-the-scenes recipe test photos with messy kitchen flour dust.",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: Say goodbye to spring, summer flavor is dropping! [0:05 - Visual]: Fresh blackberries bubbling out of warm flaky brioche dough. [0:10 - CTA]: Check your email for June early access booking.",
        thirtySec:
          "[0:00 - Hook]: Summer berries have arrived at our local farm partners! [0:07 - Body]: Starting next Monday, June 1st, Bella is rolling out our Blackberry Meyer Lemon Brioche and Honey Peach Scones. [0:19 - Reward]: Email club members get double loyalty points on every June order placed this weekend. [0:27 - CTA]: Tap the email link to reserve your first summer pastry box!",
      },
      caption: {
        text: "Summer flavor alert! ☀️ Blackberry Meyer Lemon Brioche and Honey Peach Scones arrive Monday, June 1st. VIP email subscribers: check your inbox for first-order perks!",
        hashtags: ["#SummerMenu", "#BerryPastries", "#BellaBakery", "#JunePreview", "#SweetSummer"],
      },
    },
  },
  {
    id: "sample-16",
    day: "Sun, May 31",
    dateKey: "2026-05-31",
    weekNum: 4,
    channel: "Instagram",
    channelColor: "bg-pink-100 text-pink-700 border-pink-200",
    channelDot: "bg-pink-500",
    type: "Photo & Reflection",
    title: "End of Spring Campaign Thank You",
    idea: "Celebrate 2,400 warm loaves baked this month and thank the community for supporting local artisan baking.",
    status: "Ready",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    modalContent: {
      ideas: [
        "Montage of customers carrying brown paper bags out into the morning sunshine.",
        "Stats graphic: 2,400 loaves, 1,800 croissants, and 300 new neighbors welcomed.",
        "Teaser question: What flavor should we introduce for July 4th weekend?",
      ],
      script: {
        fifteenSec:
          "[0:00 - Hook]: 2,400 loaves of warm sourdough baked this May! [0:05 - Visual]: Team high-five covered in flour. [0:10 - Gratitude]: Thank you for supporting your local downtown bakery family.",
        thirtySec:
          "[0:00 - Hook]: What a whirlwind of a May at Bella Artisan Bakery. [0:07 - Milestone]: Together we baked over 2,400 loaves of artisan bread, poured 3,000 espresso shots, and welcomed hundreds of new faces to our counter. [0:18 - Team Gratitude]: None of this happens without our dedicated morning bakers and the greatest neighborhood on earth. [0:26 - CTA]: Thank you for shopping small and supporting local craft!",
      },
      caption: {
        text: "2,400 loaves baked with love this May! 🍞✨ Thank you to every single neighbor who stopped in for a warm loaf or morning coffee. On to sweet summer baking in June!",
        hashtags: ["#ThankYouNeighbors", "#ShopSmall", "#BellaArtisanBakery", "#LocalCraft", "#BakeryMilestone"],
      },
    },
  },
];

export default function SampleCalendarPreview() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeView, setActiveView] = useState<"month" | "week" | "list">("month");
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<SamplePost | null>(null);
  const [modalTab, setModalTab] = useState<"ideas" | "script" | "caption">("ideas");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredPosts =
    activeFilter === "all"
      ? SAMPLE_POSTS
      : SAMPLE_POSTS.filter(
          (post) => post.channel.toLowerCase() === activeFilter.toLowerCase()
        );

  const weekFilteredPosts = filteredPosts.filter((p) => p.weekNum === activeWeek);

  function copyText(text: string, key: string) {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-[#F3E8E2] p-6 sm:p-8 shadow-xl shadow-[#0E7C86]/5">
      {/* Sample Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F3E8E2] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E7C86]"></span>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0E7C86]">
              Interactive Sample Preview
            </p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mt-1">
            Bella Artisan Bakery &mdash; Spring Launch Campaign
          </h3>
          <p className="text-xs text-[#4B5563] mt-0.5">
            Goal: Increase Local Foot Traffic &bull; Duration: 4 Weeks &bull; 4 Posts/Week (16 Posts Total)
          </p>
        </div>

        {/* View Switcher: Interactive Buttons */}
        <div className="flex items-center bg-[#FFF9F5] border border-[#F3E8E2] rounded-xl p-1 self-start sm:self-auto gap-1">
          <button
            type="button"
            aria-pressed={activeView === "month"}
            onClick={() => setActiveView("month")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[36px] flex items-center justify-center ${
              activeView === "month"
                ? "bg-white text-[#0E7C86] shadow-sm font-bold"
                : "text-[#4B5563] hover:text-[#1F2937]"
            }`}
          >
            Month Grid
          </button>
          <button
            type="button"
            aria-pressed={activeView === "week"}
            onClick={() => setActiveView("week")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[36px] flex items-center justify-center ${
              activeView === "week"
                ? "bg-white text-[#0E7C86] shadow-sm font-bold"
                : "text-[#4B5563] hover:text-[#1F2937]"
            }`}
          >
            Week View
          </button>
          <button
            type="button"
            aria-pressed={activeView === "list"}
            onClick={() => setActiveView("list")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[36px] flex items-center justify-center ${
              activeView === "list"
                ? "bg-white text-[#0E7C86] shadow-sm font-bold"
                : "text-[#4B5563] hover:text-[#1F2937]"
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Filter Tabs + Mobile Indicator */}
      <div className="relative py-4 border-b border-[#F3E8E2]/60">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-medium pb-1 no-scrollbar">
          <span className="text-[#4B5563] font-semibold pr-1 whitespace-nowrap">Filter channel:</span>
          {["all", "Instagram", "Email", "Facebook", "Google Ads"].map((ch) => (
            <button
              type="button"
              key={ch}
              aria-pressed={activeFilter === ch}
              onClick={() => setActiveFilter(ch)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap min-h-[44px] cursor-pointer flex items-center justify-center text-xs font-medium ${
                activeFilter === ch
                  ? "bg-[#0E7C86] text-white font-bold shadow-sm"
                  : "bg-[#FFF9F5] text-[#374151] hover:bg-[#F3E8E2] border border-[#F3E8E2]"
              }`}
            >
              {ch === "all" ? "All Channels (16)" : ch}
            </button>
          ))}
        </div>
        {/* Soft edge fade for mobile discovering horizontal scroll */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
      </div>

      {/* Week Selector Bar (When in 'week' view) */}
      {activeView === "week" && (
        <div className="flex items-center gap-2 py-3 bg-[#FFF9F5] rounded-2xl px-4 mt-4 border border-[#F3E8E2]">
          <span className="text-xs font-semibold text-[#1F2937]">Select Week:</span>
          {[1, 2, 3, 4].map((wk) => (
            <button
              type="button"
              key={wk}
              aria-pressed={activeWeek === wk}
              onClick={() => setActiveWeek(wk)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[36px] transition-colors ${
                activeWeek === wk
                  ? "bg-[#0E7C86] text-white font-bold"
                  : "bg-white text-[#374151] border border-[#F3E8E2] hover:bg-[#F3E8E2]"
              }`}
            >
              Week {wk} (May {wk === 1 ? "4–10" : wk === 2 ? "11–17" : wk === 3 ? "18–24" : "25–31"})
            </button>
          ))}
        </div>
      )}

      {/* VIEW 1: MONTH GRID (4 Columns x 4 Weeks) */}
      {activeView === "month" && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3 text-xs text-[#4B5563]">
            <span>Showing all 4 weeks of May 2026</span>
            <span className="font-semibold text-[#0E7C86]">
              {filteredPosts.length} posts matching filter
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPosts.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FFF9F5] hover:bg-white rounded-2xl border border-[#F3E8E2] hover:border-[#0E7C86]/50 p-4 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Day & Status */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-[#1F2937]">{item.day}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${item.statusColor}`}
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
                    <span className="text-xs text-[#4B5563] font-medium truncate">
                      {item.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#0E7C86] transition-colors leading-snug mb-2">
                    {item.title}
                  </h4>

                  {/* Idea text */}
                  <p className="text-xs text-[#374151] leading-relaxed line-clamp-3">
                    {item.idea}
                  </p>
                </div>

                {/* Interactive AI Preview Drawer Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPost(item)}
                  className="pt-3 mt-3 border-t border-[#F3E8E2] flex items-center justify-between text-xs text-[#0E7C86] font-semibold hover:underline w-full text-left cursor-pointer min-h-[36px]"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#0E7C86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI Copy &amp; Scripts
                  </span>
                  <span className="text-[#0E7C86]">&rarr;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: WEEK ROWS */}
      {activeView === "week" && (
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between mb-3 text-xs text-[#4B5563]">
            <span>
              Week {activeWeek} of 4 &bull; May {activeWeek === 1 ? "4–10" : activeWeek === 2 ? "11–17" : activeWeek === 3 ? "18–24" : "25–31"}, 2026
            </span>
            <span className="font-semibold text-[#0E7C86]">
              {weekFilteredPosts.length} posts scheduled
            </span>
          </div>

          {weekFilteredPosts.length === 0 ? (
            <div className="p-8 text-center bg-[#FFF9F5] rounded-2xl border border-[#F3E8E2] text-xs text-[#4B5563]">
              No posts in Week {activeWeek} matching the &ldquo;{activeFilter}&rdquo; filter. Select &ldquo;All Channels&rdquo; to see all scheduled content.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weekFilteredPosts.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFF9F5] hover:bg-white rounded-2xl border border-[#F3E8E2] hover:border-[#0E7C86]/50 p-5 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold text-[#1F2937] text-sm">{item.day}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${item.channelColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.channelDot}`}></span>
                        {item.channel}
                      </span>
                      <span className="text-xs text-[#4B5563] font-medium">{item.type}</span>
                    </div>

                    <h4 className="font-bold text-base text-[#1F2937] mb-2">{item.title}</h4>
                    <p className="text-xs text-[#374151] leading-relaxed mb-4">{item.idea}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPost(item)}
                    className="w-full pt-3 border-t border-[#F3E8E2] flex items-center justify-between text-xs text-[#0E7C86] font-semibold hover:underline min-h-[40px] cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      View AI-Generated Copy &amp; 30s Ad Script
                    </span>
                    <span>&rarr;</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: SIMPLE LIST */}
      {activeView === "list" && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#F3E8E2]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF9F5] border-b border-[#F3E8E2] text-[#4B5563] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Channel &amp; Format</th>
                  <th className="py-3 px-4">Post Title &amp; Creative Hook</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Sample Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E8E2] bg-white">
                {filteredPosts.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FFF9F5]/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#1F2937] whitespace-nowrap">
                      {item.day}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${item.channelColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.channelDot}`}></span>
                        {item.channel}
                      </span>
                      <span className="block text-xs text-[#4B5563] mt-0.5">{item.type}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1F2937] text-xs">{item.title}</div>
                      <div className="text-xs text-[#374151] line-clamp-1 mt-0.5">{item.idea}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedPost(item)}
                        className="text-[#0E7C86] font-semibold hover:underline px-2 py-1 rounded-lg hover:bg-[#0E7C86]/10 transition-colors cursor-pointer"
                      >
                        Preview Copy &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Callout Footer */}
      <div className="mt-6 pt-5 border-t border-[#F3E8E2] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFF9F5]/70 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B5B]/15 text-[#FF6B5B] flex items-center justify-center font-bold">
            ⚡
          </div>
          <p className="text-xs text-[#374151] max-w-xl">
            This interactive preview is a demonstration. Click below to create your own custom marketing calendar tailored to your business.
          </p>
        </div>
        <Link
          href="/auth/signup"
          className="whitespace-nowrap px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#0E7C86] hover:bg-[#0a5f67] transition-all min-h-[44px] flex items-center justify-center shadow-md shadow-[#0E7C86]/20"
        >
          Create Your Own Calendar &rarr;
        </Link>
      </div>

      {/* SAMPLE AI OUTPUT MODAL / DRAWER */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#F3E8E2] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#F3E8E2]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${selectedPost.channelColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedPost.channelDot}`}></span>
                    {selectedPost.channel}
                  </span>
                  <span className="text-xs text-[#4B5563] font-medium">{selectedPost.day}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${selectedPost.statusColor}`}>
                    {selectedPost.status}
                  </span>
                </div>
                <h3 id="sample-modal-title" className="text-lg sm:text-xl font-bold text-[#1F2937]">
                  {selectedPost.title}
                </h3>
                <p className="text-xs text-[#4B5563] mt-0.5">
                  Static sample output generated for Bella Artisan Bakery (no AI credits used on preview)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Close sample preview modal"
                className="w-8 h-8 rounded-full bg-[#FFF9F5] border border-[#F3E8E2] text-[#4B5563] hover:text-[#1F2937] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 pt-4 pb-3 border-b border-[#F3E8E2] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setModalTab("ideas")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  modalTab === "ideas"
                    ? "bg-[#0E7C86] text-white"
                    : "bg-[#FFF9F5] text-[#374151] hover:bg-[#F3E8E2]"
                }`}
              >
                Content Angles (3)
              </button>
              <button
                type="button"
                onClick={() => setModalTab("script")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  modalTab === "script"
                    ? "bg-[#0E7C86] text-white"
                    : "bg-[#FFF9F5] text-[#374151] hover:bg-[#F3E8E2]"
                }`}
              >
                15s / 30s Ad Scripts
              </button>
              <button
                type="button"
                onClick={() => setModalTab("caption")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  modalTab === "caption"
                    ? "bg-[#0E7C86] text-white"
                    : "bg-[#FFF9F5] text-[#374151] hover:bg-[#F3E8E2]"
                }`}
              >
                Ready Caption &amp; Tags
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="flex-1 overflow-y-auto py-4 text-xs space-y-4">
              {modalTab === "ideas" && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[#1F2937]">
                    3 Tailored Content Angles for this Post:
                  </p>
                  {selectedPost.modalContent.ideas.map((idea, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#F3E8E2] flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0E7C86] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs text-[#1F2937] leading-relaxed">{idea}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyText(idea, `idea-${i}`)}
                        className="text-xs text-[#0E7C86] font-semibold hover:underline shrink-0 cursor-pointer min-h-[32px] px-2"
                      >
                        {copiedKey === `idea-${i}` ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {modalTab === "script" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#F3E8E2]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-[#0E7C86] uppercase tracking-wider">
                        15-Second Hook &amp; Reel Script
                      </span>
                      <button
                        type="button"
                        onClick={() => copyText(selectedPost.modalContent.script.fifteenSec, "script-15")}
                        className="text-xs text-[#0E7C86] font-semibold hover:underline cursor-pointer"
                      >
                        {copiedKey === "script-15" ? "Copied!" : "Copy 15s Script"}
                      </button>
                    </div>
                    <p className="text-xs text-[#1F2937] leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-[#F3E8E2]">
                      {selectedPost.modalContent.script.fifteenSec}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#F3E8E2]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-[#0E7C86] uppercase tracking-wider">
                        30-Second Commercial / Video Script
                      </span>
                      <button
                        type="button"
                        onClick={() => copyText(selectedPost.modalContent.script.thirtySec, "script-30")}
                        className="text-xs text-[#0E7C86] font-semibold hover:underline cursor-pointer"
                      >
                        {copiedKey === "script-30" ? "Copied!" : "Copy 30s Script"}
                      </button>
                    </div>
                    <p className="text-xs text-[#1F2937] leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-[#F3E8E2]">
                      {selectedPost.modalContent.script.thirtySec}
                    </p>
                  </div>
                </div>
              )}

              {modalTab === "caption" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#FFF9F5] border border-[#F3E8E2]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-[#0E7C86] uppercase tracking-wider">
                        Ready-to-Post Social Caption
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          copyText(
                            `${selectedPost.modalContent.caption.text}\n\n${selectedPost.modalContent.caption.hashtags.join(" ")}`,
                            "caption-full"
                          )
                        }
                        className="text-xs text-[#0E7C86] font-semibold hover:underline cursor-pointer"
                      >
                        {copiedKey === "caption-full" ? "Copied All!" : "Copy Full Caption"}
                      </button>
                    </div>
                    <p className="text-xs text-[#1F2937] leading-relaxed bg-white p-3 rounded-lg border border-[#F3E8E2] mb-3">
                      {selectedPost.modalContent.caption.text}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPost.modalContent.caption.hashtags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white border border-[#F3E8E2] text-xs font-medium text-[#0E7C86]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#F3E8E2] flex items-center justify-between">
              <span className="text-xs text-[#4B5563]">
                Want personalized copy for your actual brand?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#4B5563] hover:bg-[#FFF9F5] border border-[#F3E8E2] cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E7C86] hover:bg-[#0a5f67] transition-all"
                >
                  Start Free Planner &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
