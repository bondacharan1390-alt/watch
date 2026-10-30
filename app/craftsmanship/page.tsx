'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Feather, Award, Droplets, Gem } from 'lucide-react';

export default function CraftsmanshipPage() {
  return (
    <div className="pt-28 pb-24 bg-chrono-950 text-chrono-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block">
            Swiss Haute Horlogerie Tradition
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-chrono-ivory">
            Our Craftsmanship & Métiers d’Art
          </h1>
          <p className="text-sm sm:text-base text-chrono-ivory-muted leading-relaxed font-light">
            Founded high in the Swiss Jura mountains in Le Locle, CHARAN operates with a sacred philosophy: no machine can replace the touch, eye, and heartbeat of a dedicated Master Watchmaker.
          </p>
        </div>

        {/* Feature 1: The Manufacture Calibre */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden bg-chrono-900 border border-chrono-border">
            <Image
              src="/images/watch-skeleton.jpg"
              alt="Hand finishing calibre movement"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chrono-gold/10 border border-chrono-gold/30 text-chrono-gold text-xs font-mono uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Calibre CH-9021</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chrono-ivory">
              The Architecture of 36,000 Vibrations
            </h2>
            <p className="text-sm text-chrono-ivory-muted leading-relaxed font-light">
              While conventional timepieces beat at 21,600 or 28,800 vibrations per hour, our high-frequency movements operate at 5 Hertz (36,000 vph). This lightning cadence divides each second into ten exact mechanical pulses, drastically reducing vulnerability to gravitational shifts and abrupt shocks.
            </p>
            <div className="space-y-3 text-xs font-mono text-chrono-ivory-muted border-l-2 border-chrono-gold pl-4">
              <p>• 72-hour continuous chronometric power reserve</p>
              <p>• Silicon escapement wheel and anchor impervious to magnetism</p>
              <p>• 22-carat gold heavy winding rotor with custom engraving</p>
            </div>
          </div>
        </div>

        {/* Feature 2: Metallurgy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chrono-gold/10 border border-chrono-gold/30 text-chrono-gold text-xs font-mono uppercase tracking-widest">
              <Gem className="w-3.5 h-3.5" />
              <span>Space-Age Metallurgy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chrono-ivory">
              Austenitic 904L Steel & Grade 5 Titanium
            </h2>
            <p className="text-sm text-chrono-ivory-muted leading-relaxed font-light">
              We machine our cases solely from austenitic 904L superalloys and aerospace Grade 5 titanium. High-chromium and molybdenum content ensure an exceptional luster when polished, as well as lifetime resistance against corrosion, seawater pitting, and sulphuric elements.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="/customize"
                className="px-6 py-3 rounded-xl bg-chrono-gold text-chrono-950 font-bold text-xs uppercase font-mono tracking-wider hover:bg-chrono-gold-light transition-colors"
              >
                Configure in 3D Studio
              </Link>
            </div>
          </div>
          <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden bg-chrono-900 border border-chrono-border order-1 lg:order-2">
            <Image
              src="/images/watch-midnight.jpg"
              alt="Titanium and steel metallurgy"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Feature 3: Grand Feu Enameling & Dial Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden bg-chrono-900 border border-chrono-border">
            <Image
              src="/images/watch-heritage.jpg"
              alt="Enameling dial craft"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chrono-gold/10 border border-chrono-gold/30 text-chrono-gold text-xs font-mono uppercase tracking-widest">
              <Feather className="w-3.5 h-3.5" />
              <span>Oven-Fired Grand Feu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chrono-ivory">
              Dials That Defy Centuries
            </h2>
            <p className="text-sm text-chrono-ivory-muted leading-relaxed font-light">
              Our cream and noir dials are repeatedly dusted with pulverized enamel powder and fired at 800°C in ceramic kilns. Multiple firings bond glass silicate to the solid gold dial disc, creating an unalterable radiance that will not fade or oxidize over the next 300 years.
            </p>
            <div className="pt-2">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-chrono-gold hover:text-chrono-gold-light"
              >
                <span>View Enamel Heritage Series</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
