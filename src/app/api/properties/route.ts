import { NextRequest, NextResponse } from 'next/server';

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status') || 'active';
    const type = url.searchParams.get('type') || '';
    const limit = url.searchParams.get('limit') || '8';

    let propsQuery = `${SUPABASE_URL}/rest/v1/ieprop_properties?select=*&status=eq.${encodeURIComponent(status)}&order=created_at.desc&limit=${limit}`;
    if (type) {
      propsQuery += `&type=eq.${encodeURIComponent(type)}`;
    }

    const [propsRes, imagesRes, agentsRes] = await Promise.all([
      fetch(propsQuery, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/ieprop_property_images?select=*`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/ieprop_agents?select=*`, { headers }),
    ]);

    const properties = await propsRes.json();
    const images = await imagesRes.json();
    const agents = await agentsRes.json();

    const agentMap = new Map(agents.map((a: any) => [a.id, a]));
    const imageMap = new Map<number, any[]>();
    images.forEach((img: any) => {
      if (!imageMap.has(img.property_id)) imageMap.set(img.property_id, []);
      imageMap.get(img.property_id)!.push(img);
    });

    const result = properties.map((p: any) => ({
      ...p,
      images: (imageMap.get(p.id) || []).sort((a: any, b: any) => a.sort_order - b.sort_order),
      agent: agentMap.get(p.agent_id) || null,
    }));

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}
