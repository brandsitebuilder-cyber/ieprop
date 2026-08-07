import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/admin/login", "https://ieprop.vercel.app"));
  response.cookies.set("ieprop_admin", "", { maxAge: 0, path: "/" });
  return response;
}
