/**
 * Resolves the canonical site URL without trailing slashes.
 * Prioritizes NEXT_PUBLIC_SITE_URL, then browser origin, then production default.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }
  return "https://campaignpulse.vercel.app";
}

