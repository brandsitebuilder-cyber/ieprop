'use client';

import Link from 'next/link';
import { MapPin, Bed, Bath, Car } from 'lucide-react';

export default function HeroVideo() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-navy-900">
      {/* Background image with zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-[heroZoom_20s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/30" />

      {/* Subtle video-like shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-[shimmer_3s_ease-in-out_infinite]" />

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-500 text-white w-fit mb-3">
          Featured Property
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          Clifton Beach Penthouse
        </h1>
        <p className="text-gray-300 flex items-center gap-1 text-sm sm:text-base mb-3">
          <MapPin className="w-4 h-4" />
          Clifton, Cape Town
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-brand-300 mb-4">
          R 24 500 000
        </p>
        <p className="text-gray-400 text-sm max-w-lg mb-4 line-clamp-2">
          180-degree ocean views. Floor-to-ceiling glass, wraparound terrace, private plunge pool. Four bedroom suites with designer finishes.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
          <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> 4</span>
          <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> 4</span>
          <span className="flex items-center gap-1"><Car className="w-4 h-4" /> 2</span>
        </div>
        <Link
          href="/properties/clifton-beach-penthouse"
          className="inline-flex px-6 py-3 rounded-lg text-sm font-semibold bg-white text-navy-900 hover:bg-brand-100 transition-colors w-fit"
        >
          View this property
        </Link>
      </div>
    </section>
  );
}
