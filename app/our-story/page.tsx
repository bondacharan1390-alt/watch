'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function OurStoryPage() {
  return (
    <div className="pt-28 pb-24 bg-chrono-950 text-chrono-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block">
            The CHARAN Heritage • Le Locle
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-chrono-ivory">
            The Chronicle of Eternity
          </h1>
          <p className="text-sm sm:text-base text-chrono-ivory-muted leading-relaxed font-light">
            Born among the snow-covered pine forests of the Canton of Neuchâtel, CHARAN was established with a singular objective: to elevate the measurement of time into an enduring form of mechanical fine art.
          </p>
        </div>

        {/* Hero Brand Image */}
        <div className="relative w-full h-80 sm:h-[480px] rounded-3xl overflow-hidden bg-chrono-900 border border-chrono-border mb-20 shadow-2xl">
          <Image
            src="/images/watch-celestial.jpg"
            alt="CHARAN atelier workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chrono-950 via-chrono-950/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-chrono-gold block">
                Atelier Principal
              </span>
              <p className="font-serif text-xl sm:text-2xl font-bold text-chrono-ivory">
                Le Locle, Switzerland
              </p>
            </div>
            <span className="text-xs font-mono text-chrono-ivory-muted">
              47°03′N 06°44′E • Altitude 945m
            </span>
          </div>
        </div>

        {/* Story Paragraphs & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl font-bold text-chrono-ivory">
              Where Time Refuses to Stand Still
            </h2>
            <p className="text-sm text-chrono-ivory-muted leading-relaxed font-light">
              For generations, the watchmakers of Le Locle spent winter months locked in isolation by heavy Alpine snows, perfecting delicate escapements by oil lamplight. This quiet, obsessive concentration birthed modern chronometry.
            </p>
            <p className="text-sm text-chrono-ivory-muted leading-relaxed font-light">
              Today, CHARAN bridges that ancestral heritage with avant-garde computer-modeled fluid dynamics and 3D precision metallurgy. While our tools have evolved, the human reverence for the escapement remains untouched.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 border-l border-chrono-border pl-6 lg:pl-10 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-chrono-gold font-bold">1958 — The Foundation</span>
              <h4 className="font-serif text-base font-bold text-chrono-ivory">The First Manual Calibre</h4>
              <p className="text-chrono-ivory-muted leading-relaxed">
                Artisan horologist François-Henri Vane opens the original atelier in Neuchâtel, engineering ultra-thin manual-wind movements for continental scholars.
              </p>
            </div>

            <div className="space-y-1 pt-4 border-t border-chrono-border/60">
              <span className="text-chrono-gold font-bold">1982 — Chronometric Records</span>
              <h4 className="font-serif text-base font-bold text-chrono-ivory">Observatory Precision Honors</h4>
              <p className="text-chrono-ivory-muted leading-relaxed">
                Awarded top honors at the Geneva Astronomical Observatory chronometer trials for deviation under 0.04 seconds per day.
              </p>
            </div>

            <div className="space-y-1 pt-4 border-t border-chrono-border/60">
              <span className="text-chrono-gold font-bold">2026 — The 3D Digital Atelier</span>
              <h4 className="font-serif text-base font-bold text-chrono-ivory">Haute Horlogerie for a Connected World</h4>
              <p className="text-chrono-ivory-muted leading-relaxed">
                CHARAN launches the world's most immersive 3D watch customizer, allowing collectors worldwide to configure in real-time with PBR reflections and bespoke laser engraving.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-2xl bg-chrono-900 border border-chrono-border p-8 lg:p-12 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block">
            Become Part of the Provenance
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-chrono-ivory">
            Commission Your Heirloom Today
          </h3>
          <p className="text-sm text-chrono-ivory-muted max-w-lg mx-auto leading-relaxed">
            Every piece is made to order and catalogued into the official CHARAN registry with guaranteed lifetime provenance.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/customize"
              className="px-8 py-3.5 rounded-xl bg-chrono-gold text-chrono-950 font-bold text-xs uppercase font-mono tracking-wider hover:bg-chrono-gold-light transition-colors"
            >
              Enter 3D Customizer Studio
            </Link>
            <Link
              href="/collections"
              className="px-8 py-3.5 rounded-xl border border-chrono-border text-chrono-ivory text-xs uppercase font-mono tracking-wider hover:bg-chrono-800 transition-colors"
            >
              Explore Flagships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
