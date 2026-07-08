'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MapPin, Bed, Bath, Car } from 'lucide-react';

// Fallback slides if video fails to load
const SLIDES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
];

// Cinematic Palm Beach Penthouse tour (1:27, 4K, no talking)
const VIDEO_ID = 'jPkBJY1KI_Q';

const INTERVAL = 5000;

export default function HeroVideo() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
      setFading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (videoLoaded) return; // Don't rotate slides when video is playing
    const timer = setInterval(nextSlide, INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide, videoLoaded]);

  return (
    <section className="relative w-full h-[65vh] min-h-[400px] max-h-[650px] overflow-hidden bg-navy-900">
      {/* YouTube video embed */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
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
          onLoad={() => setVideoLoaded(true)}
        />
      </div>

      {/* Fallback image slides (shown while video loads or if it fails) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}>
        {SLIDES.map((url, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${url})`,
              opacity: i === current ? (fading ? 0 : 1) : 0,
            }}
          />
        ))}
        {/* Dots — only show during slideshow */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 300); }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Dark overlay — slightly lighter when video is playing */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        videoLoaded
          ? 'bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-navy-900/20'
          : 'bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/30'
      }`} />

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
