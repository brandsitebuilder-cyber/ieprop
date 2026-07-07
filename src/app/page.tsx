import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Property } from '@/lib/supabase';
import PropertyCard from '@/components/property-card';
import SearchBar from '@/components/search-bar';
import AgentsStrip from '@/components/agents-strip';
import CalculatorsToggle from '@/components/calculators-toggle';

export const dynamic = 'force-dynamic';

async function getProperties() {
  try {
    const { data } = await supabase
      .from('ieprop_properties')
      .select(`*, images:ieprop_property_images(*), agent:ieprop_agents(*)`)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(8);
    return (data as Property[]) || [];
  } catch (e) {
    console.error('getProperties error:', e);
    return [];
  }
}

async function getAgents() {
  try {
    const { data } = await supabase.from('ieprop_agents').select('*').limit(4);
    return data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [properties, agents] = await Promise.all([getProperties(), getAgents()]);

  return (
    <div className="flex flex-col">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar />
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-gray-500">{properties.length} properties available</span>
            <button className="text-brand-700 font-medium hover:text-brand-800 transition-colors">
              Save this search
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured properties</h2>
            <p className="text-sm text-gray-500 mt-1">Hand-picked by our agents</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Sort by:</label>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>Newest first</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most bedrooms</option>
            </select>
          </div>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No properties found</p>
            <p className="text-sm mt-2">Check back soon for new listings.</p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link href="/properties" className="px-6 py-2.5 rounded-lg border-2 border-brand-600 text-brand-700 font-medium hover:bg-brand-50 transition-colors">
            View all properties
          </Link>
        </div>

        <AgentsStrip agents={agents} />
        <CalculatorsToggle />
      </div>
    </div>
  );
}
