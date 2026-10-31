import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Validates that the redirect path is strictly internal/relative
 * to prevent open redirect vulnerabilities.
 */
function getSafeRedirectPath(candidate: string | null): string {
  if (!candidate) return "/dashboard";
  // Must start with single '/', not '//' or '/\' or have protocol ':'
  if (
    candidate.startsWith("/") &&
    !candidate.startsWith("//") &&
    !candidate.startsWith("/\\") &&
    !candidate.includes(":")
  ) {
    return candidate;
  }
  return "/dashboard";
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next");
  const safeNext = getSafeRedirectPath(rawNext);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  // If code exchange failed or expired, return to login with notice
  return NextResponse.redirect(
    `${origin}/auth/login?error=Invalid+or+expired+authentication+link.+Please+try+again.`
  );
}
