import { NextResponse } from "next/server";

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

// Get testimonials (public read, active only)
export async function GET() {
  const res = await fetch(`${URL}/rest/v1/ieprop_testimonials?select=*&is_active=eq.true&order=created_at.desc`, { headers });
  return NextResponse.json(await res.json());
}
