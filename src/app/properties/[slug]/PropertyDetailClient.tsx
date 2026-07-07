'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Property } from '@/lib/supabase';
import ImageGallery from './ImageGallery';
import EnquiryForm from './EnquiryForm';
import AgentCard from './AgentCard';
import PropertyCalculator from './PropertyCalculator';
import { Bed, Bath, Car, Maximize, MapPin, Check, Loader2 } from 'lucide-react';

function formatPrice(price: number, type: string): string {
  if (price >= 1_000_000) {
    return `R${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  return `R${price.toLocaleString('en-ZA')}`;
}

export default function PropertyDetailClient() {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/properties/${slug}`);
        if (!res.ok) { setProperty(null); return; }
        const data = await res.json();
        if (data) {
          if (data.images) data.images.sort((a: any, b: any) => a.sort_order - b.sort_order);
          setProperty(data as Property);
        } else {
          setProperty(null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
        <p className="text-gray-500 mb-4">The property you're looking for doesn't exist or has been removed.</p>
        <a href="/properties" className="text-brand-600 hover:text-brand-700 font-medium">Browse All Properties →</a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-brand-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/properties" className="hover:text-brand-600">Properties</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{property.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={property.images ?? []} title={property.title} />

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-2 ${property.type === 'sale' ? 'bg-brand-100 text-brand-700' : 'bg-blue-100 text-blue-700'}`}>
                {property.type === 'sale' ? 'For Sale' : 'To Rent'}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-gray-500"><MapPin className="w-4 h-4" />{property.location}</p>
            </div>
            <p className="text-3xl font-bold text-brand-600">{formatPrice(property.price, property.type)}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={<Bed className="w-5 h-5" />} label="Bedrooms" value={property.bedrooms} />
            <StatCard icon={<Bath className="w-5 h-5" />} label="Bathrooms" value={property.bathrooms} />
            <StatCard icon={<Car className="w-5 h-5" />} label="Parking" value={property.parking} />
            {property.floor_size ? (
              <StatCard icon={<Maximize className="w-5 h-5" />} label="Floor Size" value={`${property.floor_size}m²`} />
            ) : property.erf_size ? (
              <StatCard icon={<Maximize className="w-5 h-5" />} label="Erf Size" value={`${property.erf_size}m²`} />
            ) : null}
          </div>

          {property.description && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <div className="prose prose-gray max-w-none text-gray-600 whitespace-pre-line">{property.description}</div>
            </section>
          )}

          {property.features && property.features.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />{feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Location</h2>
            <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <iframe title={`Map of ${property.location}`} src="https://www.openstreetmap.org/export/embed.html?bbox=27.9%2C-26.3%2C28.3%2C-26.0&amp;layer=mapnik" className="w-full h-64 border-0" loading="lazy" />
              <div className="p-3 text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-4 h-4" />{property.location}</div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <EnquiryForm propertyId={property.id} propertyTitle={property.title} />
          <PropertyCalculator price={property.price} type={property.type} />
          {property.agent && <AgentCard agent={property.agent} />}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 mb-2">{icon}</div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
