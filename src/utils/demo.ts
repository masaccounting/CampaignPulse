/**
 * Demo Account Utilities
 * Centralized helpers to identify and protect the demo account from modification.
 */

export const DEFAULT_DEMO_EMAIL = "demo@campaignpulse.app";

export function getDemoEmail(): string {
  return (process.env.DEMO_EMAIL || DEFAULT_DEMO_EMAIL).toLowerCase().trim();
}

export function isDemoEmail(email?: string | null): boolean {
  if (!email) return false;
  const current = email.toLowerCase().trim();
  const configured = getDemoEmail();
  
  // Matches configured demo email, default demo address, or historical test address
  return (
    current === configured ||
    current === DEFAULT_DEMO_EMAIL ||
    current === "support@outskill.com"
  );
}

