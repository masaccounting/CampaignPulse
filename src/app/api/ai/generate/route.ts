import { NextResponse } from "next/server";
import { getIndustryCategory, getIndustryFallback } from "@/utils/industryTemplates";

interface GenerateRequestBody {
  type: "ideas" | "script" | "copy" | "brief";
  businessName?: string;
  industry?: string;
  whatYouSell?: string;
  targetAudience?: string;
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
    const {
      type,
      businessName,
      industry,
      whatYouSell,
      targetAudience,
      goal,
      channel,
      title,
      ideaSummary,
      tone,
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    const bName = businessName || "Our Business";
    const ind = industry || "Small Business / Local Service";
    const prod = whatYouSell || "our core services and products";
    const aud = targetAudience || "local clients and community members";
    const postTitle = title || "Featured Announcement";
    const postChannel = channel || "Social Media";
    const postGoal = goal || "Increase Sales";
    const postTone = tone || "Friendly and Approachable";
    const postAngle = ideaSummary || "Highlight our quality and invite clients";

    // Build the tailored prompt for Gemini
    let promptInstruction = "";
    if (type === "ideas") {
      promptInstruction = `Generate 3 distinct, high-impact creative content angles or ideas for this marketing post.
Return them as a numbered list (1, 2, 3), each with an engaging bold title and a 2-sentence explanation of the hook and visual direction.`;
    } else if (type === "script") {
      promptInstruction = `Write two video/audio ad scripts for this post:
1) A snappy 15-second hook & action script with bracketed [Visual / Audio Cues] and timed markers [0:00 - Hook], [0:05 - Action], [0:10 - CTA].
2) A compelling 30-second commercial script with clear storytelling, value proposition, and a strong call-to-action.`;
    } else if (type === "copy") {
      promptInstruction = `Write ready-to-post marketing copy for ${postChannel}:
- An attention-grabbing primary hook line.
- Engaging body text formatted with clean spacing.
- A strong call to action (CTA).
- 5 to 7 relevant, high-performing hashtags tailored to ${bName} and the ${ind} industry.`;
    } else {
      promptInstruction = `Provide a complete Creative Brief for this marketing post:
- Core Objective & Target Audience Takeaway
- Visual / Creative Direction & Recommended Asset Format
- Key Messaging & Tone of Voice
- Call to Action & Link / Landing Destination Guidance`;
    }

    const systemPrompt = `You are an elite marketing copywriter and creative director specializing in helping small businesses run high-converting campaigns.

Business Information:
- Business Name: ${bName}
- Industry: ${ind}
- Products / Services Offered: ${prod}
- Target Audience: ${aud}
- Tone of Voice: ${postTone}
- Campaign Goal: ${postGoal}
- Marketing Channel: ${postChannel}
- Post Title: ${postTitle}
- Concept / Angle: ${postAngle}

CRITICAL RULES:
1. You MUST tailor all content strictly to the business's industry (${ind}) and what it actually sells (${prod}).
2. NEVER mention bread, sourdough, baking, ovens, grains, farming, or restaurant/kitchen terminology unless this business is explicitly a bakery, cafe, or restaurant.
3. Every idea, script, copy, or brief must be realistic, highly relevant to ${bName}'s actual offerings, and directly actionable.

${promptInstruction}

Keep the output polished, clean, realistic, and directly actionable. Avoid fluff or corporate jargon.`;

    // Query Google Gemini using active models with fallback resilience
    if (apiKey) {
      const modelsToTry = [
        { model: "gemini-3.6-flash", withThinkingConfig: true },
        { model: "gemini-3.1-flash-lite", withThinkingConfig: true },
        { model: "gemini-flash-lite-latest", withThinkingConfig: false },
        { model: "gemini-3.8-flash", withThinkingConfig: true },
      ];

      for (const item of modelsToTry) {
        try {
          const genConfig: Record<string, unknown> = {
            temperature: 0.75,
            maxOutputTokens: 4096,
          };
          if (item.withThinkingConfig) {
            genConfig.thinkingConfig = { thinkingBudget: 0 };
          }

          let response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${item.model}:generateContent?key=${apiKey}`,
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
                generationConfig: genConfig,
              }),
            }
          );

          // Retry without thinkingConfig if the model doesn't support the field
          if (!response.ok && item.withThinkingConfig) {
            delete genConfig.thinkingConfig;
            response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${item.model}:generateContent?key=${apiKey}`,
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
                  generationConfig: genConfig,
                }),
              }
            );
          }

          if (response.ok) {
            const geminiData = await response.json();
            const candidate = geminiData?.candidates?.[0];
            const finishReason = candidate?.finishReason;
            const generatedText = candidate?.content?.parts?.[0]?.text;

            // Ensure response is fully completed and not truncated by token limits
            if (generatedText && finishReason !== "MAX_TOKENS") {
              return NextResponse.json({ result: generatedText });
            }
          }
        } catch {
          // Continue to next model if network or model fails
        }
      }
    }

    // Dynamic, industry-tailored fallback if Gemini API is unreachable or unconfigured
    const category = getIndustryCategory(industry, whatYouSell, businessName);
    const fallbackText = getIndustryFallback(
      type,
      category,
      bName,
      prod,
      postTitle,
      postChannel
    );

    return NextResponse.json({ result: fallbackText });
  } catch (error) {
    console.error("API error in /api/ai/generate:", error);
    return NextResponse.json(
      { error: "Failed to process AI generation request." },
      { status: 500 }
    );
  }
}
