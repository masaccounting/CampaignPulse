import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getDemoEmail } from "@/utils/demo";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const demoEmail = getDemoEmail();
    const demoPassword = process.env.DEMO_PASSWORD;

    const supabase = await createClient();
    let supabaseSignedIn = false;

    // 1. Attempt Supabase authentication if credentials exist
    if (demoPassword) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      if (!error && data.user) {
        supabaseSignedIn = true;
      }
    }

    const response = NextResponse.json({
      success: true,
      email: demoEmail,
      supabaseSession: supabaseSignedIn,
    });

    // 2. Set server cookies for session preservation
    response.cookies.set("cp_guest_session", "active", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: false,
    });

    response.cookies.set("cp_guest_email", demoEmail, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: false,
    });

    return response;
  } catch (err: unknown) {
    console.error("Demo login error:", err);
    return NextResponse.json(
      { error: "Failed to initialize demo session" },
      { status: 500 }
    );
  }
}
