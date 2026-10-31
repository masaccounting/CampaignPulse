import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("cp_guest_session");
  response.cookies.delete("cp_guest_email");
  return response;
}

