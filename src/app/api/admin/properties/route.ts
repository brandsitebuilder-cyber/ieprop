import { NextRequest, NextResponse } from "next/server";

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

// CREATE property
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${URL}/rest/v1/ieprop_properties`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// UPDATE property
export async function PUT(req: NextRequest) {
  try {
    const { id, ...body } = await req.json();
    const res = await fetch(`${URL}/rest/v1/ieprop_properties?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// DELETE property
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");
    await fetch(`${URL}/rest/v1/ieprop_properties?id=eq.${id}`, {
      method: "DELETE",
      headers,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
