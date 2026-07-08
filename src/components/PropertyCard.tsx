"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bed,
  Bath,
  Car,
  Heart,
  MapPin,
  Maximize,
} from "lucide-react";
import type { Property } from "@/lib/supabase";

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `R${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  return `R${price.toLocaleString("en-ZA")}`;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const primaryImage =
    property.images?.find((img) => img.is_primary)?.url ??
    property.images?.[0]?.url;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Maximize className="w-10 h-10" />
          </div>
        )}

        {/* Type badge */}
        {property.status === "sold" ? (
          <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-red-600 text-white">
            Sold
          </span>
        ) : (
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              property.type === "sale" ? "bg-brand-600 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {property.type === "sale" ? "For Sale" : "To Rent"}
          </span>
        )}

        {/* Favorite toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorited((prev) => !prev);
          }}
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white transition-colors"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xl font-bold text-brand-600">
          {property.type === "rent"
            ? `${formatPrice(property.price)}/mo`
            : formatPrice(property.price)}
        </p>
        <h3 className="mt-1 text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
          {property.title}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Specs row */}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-brand-600" />
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-brand-600" />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Car className="w-4 h-4 text-brand-600" />
            {property.parking}
          </span>
          {property.floor_size && (
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-brand-600" />
              {property.floor_size}m&sup2;
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
