'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Property } from '@/lib/supabase';
import PropertyCard from '@/components/property-card';
import AgentsStrip from '@/components/agents-strip';
import CalculatorsToggle from '@/components/calculators-toggle';

export default function HomeContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [propsRes, agentsRes] = await Promise.all([
          supabase.from('ieprop_properties')
            .select(`*, images:ieprop_property_images(*), agent:ieprop_agents(*)`)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(8),
          supabase.from('ieprop_agents').select('*').limit(4),
        ]);
        setProperties((propsRes.data as Property[]) || []);
        setAgents(agentsRes.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured properties</h2>
          <p className="text-sm text-gray-500 mt-1">Hand-picked by our agents</p>
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
  );
}
