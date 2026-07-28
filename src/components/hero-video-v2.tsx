'use client';

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
    </section>
  );
}
