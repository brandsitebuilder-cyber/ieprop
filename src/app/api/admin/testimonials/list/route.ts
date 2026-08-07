import { NextResponse } from "next/server";

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

// Get ALL testimonials for admin
export async function GET() {
  const res = await fetch(`${URL}/rest/v1/ieprop_testimonials?select=*&order=created_at.desc`, { headers });
  return NextResponse.json(await res.json());
}
