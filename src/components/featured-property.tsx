"use client";

import { useState } from "react";
import { MapPin, Bed, Bath, Car, Play } from "lucide-react";

const IMAGES = [
  "/properties/featured/379037145.jpg",
  "/properties/featured/379037146.jpg",
  "/properties/featured/379037147.jpg",
  "/properties/featured/379037148.jpg",
  "/properties/featured/379037149.jpg",
  "/properties/featured/379037150.jpg",
  "/properties/featured/379037151.jpg",
  "/properties/featured/379037152.jpg",
  "/properties/featured/379037153.jpg",
  "/properties/featured/379037154.jpg",
  "/properties/featured/379037155.jpg",
  "/properties/featured/379037156.jpg",
  "/properties/featured/379037157.jpg",
  "/properties/featured/379037158.jpg",
];

const VIDEO_ID = "CboOPFrQIvI";

export default function FeaturedProperty() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Section heading */}
      <div className="mb-6">
        <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-500 text-white mb-2">
          Featured Property
        </span>
        <h2 className="text-2xl font-bold text-gray-900">
          4 Bedroom House for Sale in Sonneveld
        </h2>
        <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
          <MapPin className="w-4 h-4" />
          Sonneveld, Brakpan
        </p>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        {/* Main large image */}
        <div className="md:col-span-2 relative overflow-hidden rounded-xl bg-gray-100">
          {showVideo ? (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={IMAGES[activeImage]}
              alt="Featured property"
              className="w-full aspect-[16/10] object-cover cursor-pointer"
              onClick={() => {
                const next = (activeImage + 1) % IMAGES.length;
                setActiveImage(next);
              }}
            />
          )}
        </div>

        {/* Side thumbnails */}
        <div className="hidden md:flex flex-col gap-2">
          {IMAGES.slice(0, 2).map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setShowVideo(false);
                setActiveImage(i);
              }}
              className="relative flex-1 overflow-hidden rounded-xl bg-gray-100 group"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              {i === 1 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1.5 rounded-full">
                    +{IMAGES.length - 2} more
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery tabs */}
      <div className="flex items-center gap-1 mb-6">
        {IMAGES.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setShowVideo(false);
              setActiveImage(i);
            }}
            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
              !showVideo && activeImage === i
                ? "border-brand-500"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
        <button
          onClick={() => setShowVideo(true)}
          className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex items-center justify-center bg-navy-800 text-white transition-colors ${
            showVideo ? "border-brand-500" : "border-transparent hover:border-gray-300"
          }`}
        >
          <Play className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-400 ml-2">+{IMAGES.length - 4} photos</span>
      </div>

      {/* Property details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Price & Stats */}
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-3xl font-bold text-gray-900">R 17 000 000</span>
            <div className="flex items-center gap-5 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand" /> 4 Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-brand" /> 5 Baths
              </span>
              <span className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-brand" /> 17 Parking
              </span>
              <span className="text-gray-400">528 m²</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Complete independence. Uncompromising luxury. One extraordinary address.
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              The moment you see it, you understand. Set behind the private gates of one of
              Sonneveld&apos;s most sought-after boomed enclaves, this 528m² residence makes an
              immediate impression — and then keeps surprising you long after you&apos;ve walked through
              the door. A grand double-door entrance opens into a soaring atrium, and from there the
              home unfolds with a rare combination of scale, warmth, and genuine liveability.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 gap-x-6 text-sm text-gray-600">
            {[
              "Pool",
              "Garden",
              "Flatlet",
              "Study",
              "Pet Friendly",
              "Furnished",
              "Fibre Internet",
              "Borehole",
              "Gas Geyser",
              "Solar Panels",
              "Solar Geyser",
              "Backup Battery/Inverter",
            ].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar — Agent / CTA */}
        <div className="bg-navy-50 rounded-xl p-6 border border-navy-100 self-start">
          <h4 className="font-semibold text-gray-900 mb-4">Interested in this property?</h4>
          <a
            href="https://wa.me/27765151248"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-colors mb-2"
          >
            WhatsApp Agent
          </a>
          <a
            href="tel:+27765151248"
            className="block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Call Agent
          </a>
          <p className="text-xs text-gray-400 text-center mt-4">
            Listed by Oelof Stander — ieProp
          </p>
        </div>
      </div>
    </section>
  );
}
