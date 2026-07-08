'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { MapPin, Bed, Bath, Car } from 'lucide-react';

const FEATURED_VIDEO = 'https://videos.pexels.com/video-files/3255275/3255275-hd_1920_1080_30fps.mp4';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay blocked — show fallback image
      setVideoError(true);
    });
    video.addEventListener('error', () => setVideoError(true));
  }, []);

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-navy-900">
      {/* Video or fallback image */}
      {videoError ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FALLBACK_IMAGE})` }}
        />
      ) : (
        <video
          ref={videoRef}
          src={FEATURED_VIDEO}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />

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
          A rare opportunity: this north-facing penthouse on Clifton&apos;s Platinum Mile with 180-degree ocean views. Floor-to-ceiling glass walls, wraparound terrace, and private plunge pool.
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
