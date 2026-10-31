import { NextResponse } from "next/server";

interface GenerateRequestBody {
  type: "ideas" | "script" | "copy" | "brief";
  businessName?: string;
  goal?: string;
  channel?: string;
  title?: string;
  ideaSummary?: string;
  tone?: string;
}

export async function POST(req: Request) {
  try {
    const body: GenerateRequestBody = await req.json();
    const { type, businessName, goal, channel, title, ideaSummary, tone } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Build the tailored prompt for Gemini
    let promptInstruction = "";
    if (type === "ideas") {
      promptInstruction = `Generate 3 distinct, creative content angles or ideas for this marketing post.
Return them as a numbered list (1, 2, 3), each with a bold title and a concise 2-sentence explanation of the hook and visual direction.`;
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

    // If Gemini API Key is configured, query Google Gemini REST API
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
                temperature: 0.7,
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
          console.error("Gemini API returned error:", await response.text());
        }
      } catch (geminiError) {
        console.error("Failed to query Gemini API:", geminiError);
      }
    }

    // High quality fallback generator when API key is unavailable or during network outage
    let fallbackText = "";
    const bName = businessName || "our business";
    const postTitle = title || "Featured Post";

    if (type === "ideas") {
      fallbackText = `1. The Artisan Craftsmanship Angle
Capture the morning preparation ritual at ${bName}. Focus on the raw ingredients, high energy, and the passion that goes into every batch.

2. The Customer Transformation Hook
Share a genuine quote or moment from a regular customer explaining how ${bName} makes their daily routine better or easier.

3. The Behind-the-Curtain Secret
Give viewers an exclusive peek into a technique or ingredient standard that supermarket or big-box competitors never bother to do.`;
    } else if (type === "script") {
      fallbackText = `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook / Visual]: Quick, fast-paced shot of our craft in motion at ${bName}.
Voiceover: "Tired of settling for generic options? Here is how we do things differently."
[0:06 - Body]: Warm lighting, fresh finished product being packaged with care.
Voiceover: "Handcrafted daily using only the highest quality ingredients."
[0:11 - Call to Action]: Text overlay showing address or website.
Voiceover: "Stop by ${bName} or tap the link below to experience the difference."

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "Have you ever wondered what makes real neighborhood quality so different?"
[0:07 - Problem / Relatability]: "Most people settle for mass-produced products that sit on store shelves for weeks without any personality or care."
[0:16 - Solution / Brand]: "At ${bName}, our morning begins before dawn so that everything you receive is fresh, wholesome, and crafted with genuine pride."
[0:24 - Offer & Urgency]: "This week, mention this video or order ahead online for a special first-visit treat!"
[0:28 - Final CTA]: "Visit ${bName} today — we can't wait to welcome you."`;
    } else if (type === "copy") {
      fallbackText = `Real quality has no shortcut. ✨

At ${bName}, we believe that taking extra time and using honest ingredients creates something you can truly taste and feel good about.

Whether you're treating yourself after a long week or sharing something special with the people you love, we're here to make every moment a little brighter.

📍 Visit us in store or tap the link in our bio to order ahead for pickup today!

#${bName.replace(/\s+/g, "")} #ShopSmall #LocalBusiness #QualityFirst #CommunityLove #Handcrafted`;
    } else {
      fallbackText = `CREATIVE BRIEF: ${postTitle.toUpperCase()}

1. Objective:
Drive immediate engagement and foot traffic / inquiries for ${bName} by emphasizing authenticity, freshness, and neighborhood charm.

2. Target Audience:
Local neighbors, busy professionals, and families seeking wholesome, trustworthy products over mass-market convenience.

3. Visual & Creative Format:
High-resolution vertical reel/photo with natural morning lighting, macro focus on textures, and genuine team smiles.

4. Core Messaging:
- Uncompromising ingredient and craft standards.
- Welcoming local atmosphere.
- Easy direct call-to-action (visit in person or order ahead online).`;
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

