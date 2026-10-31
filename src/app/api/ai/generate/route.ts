import { NextResponse } from "next/server";

interface GenerateRequestBody {
  type: "ideas" | "script" | "copy" | "brief";
  businessName?: string;
  goal?: string;
  channel?: string;
  title?: string;
  ideaSummary?: string;
  tone?: string;
  timestamp?: number;
}

export async function POST(req: Request) {
  try {
    const body: GenerateRequestBody = await req.json();
    const { type, businessName, goal, channel, title, ideaSummary, tone } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Build the tailored prompt for Gemini
    let promptInstruction = "";
    if (type === "ideas") {
      promptInstruction = `Generate 3 distinct, fresh creative content angles or ideas for this marketing post.
Return them as a numbered list (1, 2, 3), each with an engaging bold title and a 2-sentence explanation of the hook and visual direction.`;
    } else if (type === "script") {
      promptInstruction = `Write two video/audio ad scripts for this post:
1) A snappy 15-second hook & action script with bracketed [Visual / Audio Cues] and timed markers [0:00 - Hook], [0:05 - Action], [0:10 - CTA].
2) A compelling 30-second commercial script with clear storytelling, value proposition, and a strong call-to-action.`;
    } else if (type === "copy") {
      promptInstruction = `Write ready-to-post marketing copy for ${channel || "Social Media"}:
- An attention-grabbing primary hook line.
- Engaging body text formatted with clean spacing.
- A strong call to action (CTA).
- 5 to 7 relevant, high-performing hashtags tailored to the business and channel.`;
    } else {
      promptInstruction = `Provide a complete Creative Brief for this marketing post:
- Core Objective & Target Audience Takeaway
- Visual / Creative Direction & Recommended Asset Format
- Key Messaging & Tone of Voice
- Call to Action & Link / Landing Destination Guidance`;
    }

    const systemPrompt = `You are an elite marketing copywriter and creative director specializing in helping small businesses run high-converting campaigns.
Business Name: ${businessName || "Small Business"}
Tone: ${tone || "Friendly and Approachable"}
Campaign Goal: ${goal || "Increase Sales"}
Marketing Channel: ${channel || "Social Media"}
Post Title: ${title || "Featured Announcement"}
Concept / Angle: ${ideaSummary || "Highlight our quality and invite customers"}

${promptInstruction}

Keep the output polished, clean, realistic, and directly actionable. Avoid fluff or corporate jargon.`;

    // Query Google Gemini using the active gemini-3.8-flash model
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.85,
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (response.ok) {
          const geminiData = await response.json();
          const generatedText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            return NextResponse.json({ result: generatedText });
          }
        } else {
          console.error("Gemini 3.8 Flash returned error:", await response.text());
        }
      } catch (geminiError) {
        console.error("Failed to query Gemini API:", geminiError);
      }
    }

    // Dynamic variation fallback if Gemini is unreachable
    let fallbackText = "";
    const bName = businessName || "our business";
    const postTitle = title || "Featured Post";
    const seed = Math.floor(Math.random() * 3);

    if (type === "ideas") {
      if (seed === 0) {
        fallbackText = `1. The Early Morning Craft Ritual
Capture the 5:00 AM preparation at ${bName}. Macro close-ups of pure ingredients, gentle steam rising, and the rhythmic dedication of morning craft.

2. Behind Every Great Recipe is a Family Story
Feature the origin of our signature recipe. Explain why our team refuses to cut corners and how that passion reaches your table.

3. The "Taste Test" Customer Moment
Film real reactions as customers take their first bite at ${bName}. Authentic smiles and candid reviews build instant neighborhood trust.`;
      } else if (seed === 1) {
        fallbackText = `1. The 3-Ingredient Simplicity Showcase
Strip away the noise and highlight pure, wholesome local ingredients. Show side-by-side why natural quality always wins.

2. A Day in the Life of Our Kitchen
Fast-paced vertical reel showing early morning deliveries, mixing, baking, and the first warm batch hitting the counter.

3. The VIP Secret Drop
Tease a limited-edition weekend flavor that is only available while daily supplies last. Create healthy FOMO and morning urgency.`;
      } else {
        fallbackText = `1. Why We Choose Local Farm Partners
Spotlight the regional growers who supply our grains and produce. Show how supporting ${bName} directly strengthens our local community.

2. How to Enjoy It at Home (Pro Serving Tips)
Educate your audience with 3 quick tips to serve, store, or pair this item for the ultimate weekend breakfast experience.

3. Customer Favorite Spotlight
Dive into the backstory of our #1 best-seller and invite followers to comment their favorite flavor variation.`;
      }
    } else if (type === "script") {
      if (seed === 0) {
        fallbackText = `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook / Visual]: Fast macro pan across warm artisan texture.
Voiceover: "Most food on supermarket shelves has been sitting there for weeks. Not here."
[0:06 - Body]: Flour dusting the prep table as our baker scores the dough.
Voiceover: "At ${bName}, our ovens fire up at dawn with 100% natural ingredients."
[0:11 - Call to Action]: Address graphic pops on screen.
Voiceover: "Visit ${bName} on Elm Street or order ahead online for morning pickup."

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "Have you ever tasted the difference that real slow fermentation makes?"
[0:07 - Problem / Relatability]: "Store-bought baked goods are packed with preservatives and dough conditioners that leave you feeling heavy."
[0:15 - Solution / Brand]: "At ${bName}, we slow-ferment for 24 hours so every single loaf develops a crisp, crackly crust and an airy, digestible crumb."
[0:22 - Community Offer]: "Stop by this Tuesday through Saturday morning to taste a warm sample slice on us."
[0:27 - Final CTA]: "Experience real baking again at ${bName}!"`;
      } else {
        fallbackText = `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook / Visual]: Crisp audio of crust crackling as the bread is sliced open.
Voiceover: "Listen to that sound. That's what real sourdough is supposed to sound like."
[0:06 - Body]: Baker smiling and placing warm pastries into brown paper bags.
Voiceover: "Pure flour, water, salt, and 24 hours of artisan patience."
[0:11 - CTA]: Direct map link overlay.
Voiceover: "Start your morning right at ${bName}."

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "What does your ideal morning routine look like?"
[0:06 - Setting the Scene]: "Freshly ground espresso, morning sunshine, and the irresistible aroma of artisan pastries warm from the oven."
[0:15 - Craftsmanship]: "Every single item at ${bName} is made by hand with organic heritage grains from local family mills."
[0:22 - Call to Action]: "Skip the generic drive-thru this week. Treat yourself to real quality crafted right in your neighborhood."
[0:27 - Sign-off]: "See you tomorrow morning at ${bName}!"`;
      }
    } else if (type === "copy") {
      fallbackText = `There is no substitute for authentic craft. 🌿

At ${bName}, our morning starts before the sun comes up because we believe you deserve food made with care, honesty, and local ingredients.

Whether you're stopping by on your morning walk or picking up treats for family brunch, we can't wait to share our table with you.

✨ Fresh batches come out warm at 7:00 AM daily.
📍 Tap the link in our bio to view today's fresh menu or order ahead!

#${bName.replace(/\s+/g, "")} #ArtisanBaking #LocalGoodness #MadeWithLove #WeekendRitual #ShopSmall`;
    } else {
      if (seed === 0) {
        fallbackText = `CREATIVE BRIEF: ${postTitle.toUpperCase()}

1. Strategic Objective:
Drive neighborhood foot traffic and brand warmth by establishing ${bName} as the premier local choice for wholesome quality.

2. Target Audience:
Conscious consumers, morning commuters, and food enthusiasts who prioritize craftsmanship and clean ingredients over convenience.

3. Visual & Aesthetic Tone:
Warm earth tones, natural daylight, candid behind-the-scenes movement, and macro close-ups highlighting artisan texture.

4. Core Value Proposition:
- 100% natural, slow-crafted ingredients.
- Locally owned and deeply rooted in community.
- Welcoming in-store experience with fast online pickup options.`;
      } else {
        fallbackText = `CREATIVE BRIEF: ${postTitle.toUpperCase()} (ENGAGEMENT FOCUS)

1. Strategic Objective:
Increase social engagement, follower saves, and word-of-mouth recommendations by showing the authentic human team behind ${bName}.

2. Target Audience:
Local neighborhood foodies, weekend brunch lovers, and loyal regulars who appreciate transparency and culinary craft.

3. Visual Style & Sound:
Sensory ASMR video, natural baking sounds (kneading, scoring, steam), and genuine smiles from the kitchen team.

4. Call to Action:
Invite followers to comment their favorite morning ritual or save the post for weekend breakfast planning.`;
      }
    }

    return NextResponse.json({ result: fallbackText });
  } catch (error) {
    console.error("API error in /api/ai/generate:", error);
    return NextResponse.json(
      { error: "Failed to process AI generation request." },
      { status: 500 }
    );
  }
}
