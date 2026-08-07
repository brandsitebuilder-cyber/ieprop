import { NextRequest, NextResponse } from "next/server";

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

// Get agents (public read)
export async function GET() {
  const res = await fetch(`${URL}/rest/v1/ieprop_agents?select=*&order=name.asc`, { headers });
  return NextResponse.json(await res.json());
}
