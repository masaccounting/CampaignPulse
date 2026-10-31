import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CampaignPulse — AI Marketing Calendar",
    short_name: "CampaignPulse",
    description: "Turn details about your small business into a ready-to-post AI marketing campaign calendar.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF9F5",
    theme_color: "#0E7C86",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

