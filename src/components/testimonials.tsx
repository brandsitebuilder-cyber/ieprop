'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Johan van Wyk',
    location: 'Paarl',
    rating: 5,
    text: 'Exceptional service from start to finish. They found us our dream home within two weeks and handled the entire bond process. Couldn&apos;t be happier.',
  },
  {
    name: 'Sarah & Mike Thompson',
    location: 'Cape Town',
    rating: 5,
    text: 'Professional, responsive, and truly cares about their clients. They negotiated a great price for our Sea Point apartment and made the process stress-free.',
  },
  {
    name: 'Lerato Mokoena',
    location: 'Stellenbosch',
    rating: 5,
    text: 'As a first-time buyer I was nervous, but the team guided me through every step. Amazing property knowledge and they found me the perfect townhouse. Highly recommend!',
  },
  {
    name: 'David Kruger',
    location: 'Somerset West',
    rating: 5,
    text: 'Sold our property in 3 weeks at full asking price. The marketing was outstanding and the agents kept us informed daily. Best estate agency experience we&apos;ve had.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          What Our Clients Say
        </h2>
        <p className="text-gray-500 mb-10">
          Trusted by families across South Africa
        </p>

        {/* Main testimonial */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-sm relative">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-6 max-w-2xl mx-auto">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          <p className="font-semibold text-gray-900">{t.name}</p>
          <p className="text-sm text-gray-500">{t.location}</p>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? 'bg-brand-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
