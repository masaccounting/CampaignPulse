import { ImageResponse } from "next/og";

export const alt = "CampaignPulse — AI Marketing Calendar for Small Businesses";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#FFF9F5",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#0E7C86",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "28px",
              fontWeight: 800,
              marginRight: "16px",
            }}
          >
            P
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "44px",
              fontWeight: 900,
              color: "#1F2937",
              letterSpacing: "-0.02em",
            }}
          >
            Campaign<span style={{ color: "#0E7C86" }}>Pulse</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 900,
              color: "#1F2937",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
              marginBottom: "20px",
            }}
          >
            Your Marketing Calendar, Planned &amp; Written by AI in Minutes.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#4B5563",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Turn basic business details into an editable, ready-to-post calendar with social copy, ad scripts, and creative briefs.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            color: "#0E7C86",
            fontWeight: 700,
          }}
        >
          <span style={{ marginRight: "32px" }}>• Month, Week &amp; List Views</span>
          <span style={{ marginRight: "32px" }}>• 4 AI Copy Generators</span>
          <span>• Small Business Focused</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
