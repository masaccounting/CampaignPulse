import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/utils/url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CampaignPulse | AI Marketing Campaign Planner for Small Businesses",
    template: "%s | CampaignPulse",
  },
  description:
    "Turn a short business brief into an editable marketing calendar with AI-written content ideas, ad scripts, campaign copy, and creative briefs. Built for small-business owners.",
  keywords: [
    "marketing calendar",
    "small business marketing",
    "AI marketing planner",
    "social media calendar",
    "ad scripts",
    "content planning",
  ],
  authors: [{ name: "CampaignPulse Team" }],
  creator: "CampaignPulse",
  openGraph: {
    title: "CampaignPulse | AI Marketing Campaign Planner for Small Businesses",
    description:
      "Turn a short business brief into an editable marketing calendar with AI-written content ideas, ad scripts, campaign copy, and creative briefs. Built for small-business owners.",
    url: siteUrl,
    siteName: "CampaignPulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampaignPulse | AI Marketing Campaign Planner for Small Businesses",
    description:
      "Turn a short business brief into an editable marketing calendar with AI-written content ideas, ad scripts, campaign copy, and creative briefs. Built for small-business owners.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF9F5] text-[#1F2937]">
        {/* Skip to Content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0E7C86] focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
