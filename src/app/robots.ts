import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://campaignpulse.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/*",
          "/calendar",
          "/calendar/*",
          "/brand-profile",
          "/brand-profile/*",
          "/api",
          "/api/*",
          "/auth/callback",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

