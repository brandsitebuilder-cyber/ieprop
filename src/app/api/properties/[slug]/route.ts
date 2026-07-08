import { NextRequest, NextResponse } from 'next/server';

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const propsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/ieprop_properties?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { headers }
    );
    const properties = await propsRes.json();
    if (!properties.length) return NextResponse.json(null, { status: 404 });

    const property = properties[0];
    const [imagesRes, agentsRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/ieprop_property_images?select=*&property_id=eq.${property.id}&order=sort_order.asc`, { headers }),
      property.agent_id
        ? fetch(`${SUPABASE_URL}/rest/v1/ieprop_agents?select=*&id=eq.${property.agent_id}&limit=1`, { headers })
        : Promise.resolve({ json: () => [] } as any),
    ]);

    const images = await imagesRes.json();
    const agents = await agentsRes.json();

    return NextResponse.json({
      ...property,
      images,
      agent: agents[0] || null,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
