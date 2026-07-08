'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MapPin, Bed, Bath, Car } from 'lucide-react';

const SLIDES = [
  'https://www.hartlandestate.co.za/wp-content/uploads/2023/08/Bespoke-1.jpg',
  'https://www.hartlandestate.co.za/wp-content/uploads/2023/08/Bespoke-2.jpg',
  'https://www.hartlandestate.co.za/wp-content/uploads/2023/08/Bespoke-3.jpg',
  'https://www.hartlandestate.co.za/wp-content/uploads/2023/08/Bespoke-4.jpg',
];

const VIDEO_ID = 'Vc8Hy9uIbSM';
const INTERVAL = 5000;

export default function HeroVideo() {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // After 6s, switch from slides to video
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (showVideo) return;
    const timer = setInterval(nextSlide, INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide, showVideo]);

  return (
    <section className="relative w-full h-[65vh] min-h-[400px] max-h-[650px] overflow-hidden bg-navy-900">
      {/* YouTube video — show after 6s delay */}
      <div className="absolute inset-0" style={{ opacity: showVideo ? 1 : 0 }}>
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            width: '100vw',
            height: '56.25vw',
            minHeight: '100%',
            minWidth: '177.78vh',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          allow="autoplay; encrypted-media"
          title="Featured property"
        />
      </div>

      {/* Slides — initial state */}
      <div className="absolute inset-0" style={{ opacity: showVideo ? 0 : 1 }}>
        {SLIDES.map((url, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${url})`,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 700ms ease-in-out',
            }}
          />
        ))}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/25 to-navy-900/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-500 text-white w-fit mb-3">
          Featured Property
        </span>
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
