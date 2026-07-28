'use client';

import Link from 'next/link';
import { MapPin, Bed, Bath, Car } from 'lucide-react';

export default function HeroVideo() {
  return (
    <section className="relative w-full h-[65vh] min-h-[400px] max-h-[650px] overflow-hidden bg-navy-900">
      {/* Local video — instant playback, no delay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/video/hero-poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/25 to-navy-900/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          Luxury Family Home
        </h1>
        <p className="text-gray-300 flex items-center gap-1 text-sm sm:text-base mb-3">
          <MapPin className="w-4 h-4" />
          Clubville, Middelburg
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-brand-300 mb-4">
          R 4 775 000
        </p>
        <p className="text-gray-400 text-sm max-w-lg mb-4 line-clamp-2">
          6-bedroom family home on a 1200m² stand. Multiple living areas, gourmet kitchen, covered entertainment patio with pool, study, staff quarters, and 6 garages.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
          <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> 6</span>
          <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> 4</span>
          <span className="flex items-center gap-1"><Car className="w-4 h-4" /> 6</span>
        </div>
        <Link
          href="/properties/clubville-luxury-family-home"
          className="inline-flex px-6 py-3 rounded-lg text-sm font-semibold bg-white text-navy-900 hover:bg-brand-100 transition-colors w-fit"
        >
          View this property
        </Link>
      </div>
    </section>
  );
}
