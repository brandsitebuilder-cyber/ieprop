import Link from 'next/link';
import { Heart, Bed, Bath, Car, Maximize } from 'lucide-react';
import type { Property } from '@/lib/supabase';

export default function PropertyCard({ property }: { property: Property }) {
  const primaryImage =
    property.images?.find((img) => img.is_primary)?.url ??
    property.images?.[0]?.url ??
    null;

  const formatPrice = (price: number) => {
    if (price >= 1_000_000) {
      return `R ${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}m`;
    }
    return `R ${price.toLocaleString('en-ZA')}`;
  };

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-44 bg-gray-200">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Maximize className="w-8 h-8" />
            </div>
          )}
          {/* Badge */}
          <div className="absolute top-2 left-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                property.type === 'sale'
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {property.type === 'sale' ? 'FOR SALE' : 'TO RENT'}
            </span>
          </div>
          {/* Heart */}
          <button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
            }}
            aria-label="Save to favourites"
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Details */}
        <div className="p-3 space-y-1.5">
          <p className="text-lg font-bold text-brand-800">
            {formatPrice(property.price)}
            {property.type === 'rent' && (
              <span className="text-xs font-normal text-gray-400">/mo</span>
            )}
          </p>
          <p className="text-sm font-medium text-gray-900 truncate">
            {property.title}
          </p>
          <p className="text-xs text-gray-400 truncate">{property.location}</p>

          {/* Specs row */}
          <div className="flex items-center gap-3 pt-1 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Car className="w-3 h-3" />
              {property.parking}
            </span>
            {property.floor_size && (
              <span className="flex items-center gap-1">
                <Maximize className="w-3 h-3" />
                {property.floor_size} m²
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
