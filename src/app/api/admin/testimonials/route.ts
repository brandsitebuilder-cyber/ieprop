import { NextRequest, NextResponse } from "next/server";

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${URL}/rest/v1/ieprop_testimonials`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json(), { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, ...body } = await req.json();
  await fetch(`${URL}/rest/v1/ieprop_testimonials?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await fetch(`${URL}/rest/v1/ieprop_testimonials?id=eq.${id}`, { method: "DELETE", headers });
  return NextResponse.json({ ok: true });
}
