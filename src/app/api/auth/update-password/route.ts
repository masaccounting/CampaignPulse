import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { isDemoEmail } from "@/utils/demo";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Session expired or invalid. Please request a new password reset link." },
        { status: 401 }
      );
    }

    // SERVER-SIDE PROTECTION: Prevent modifying demo account
    if (isDemoEmail(user.email)) {
      return NextResponse.json(
        { error: "Action forbidden: The demo account password cannot be modified." },
        { status: 403 }
      );
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred while updating password." },
      { status: 500 }
    );
  }
}
