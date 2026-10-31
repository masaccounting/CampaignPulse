import { NextResponse } from "next/server";
import { getDemoEmail } from "@/utils/demo";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = body.email?.trim() || getDemoEmail();

    const response = NextResponse.json({ success: true, email });

    // Set cookie for 7 days
    response.cookies.set("cp_guest_session", "active", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    response.cookies.set("cp_guest_email", email, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
