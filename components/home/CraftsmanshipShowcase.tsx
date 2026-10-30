'use client';

import React from 'react';
import Image from 'next/image';
import { Layers, Droplets, Gem, Disc } from 'lucide-react';

export function CraftsmanshipShowcase() {
  const crafts = [
    {
      icon: Gem,
      title: 'Double-Curved Sapphire Crystal',
      subtitle: 'Mohs Hardness 9',
      desc: 'Formed at 2,050°C from pure corundum aluminium oxide crystals, our crystals are diamond-ground and treated with nine anti-reflective coats on both interior and exterior surfaces.',
      image: '/images/watch-celestial.jpg',
    },
    {
      icon: Disc,
      title: 'Column-Wheel Chronograph Architecture',
      subtitle: 'Instantaneous Feedback',
      desc: 'Unlike basic cam-actuated levers, our solid column-wheel system ensures instantaneous start, stop, and reset transitions without jumping seconds hands.',
      image: '/images/watch-apex.jpg',
    },
    {
      icon: Layers,
      title: 'Exhibition Caseback with 22k Rotor',
      subtitle: 'Côtes de Genève Finishing',
      desc: 'The exhibition caseback unveils our heavy 22k gold oscillating mass swinging over rhodium-plated bridges adorned with circular graining (perlage).',
      image: '/images/watch-skeleton.jpg',
    },
    {
      icon: Droplets,
      title: 'Hermetic Screw-Down Gasket System',
      subtitle: 'Abyssal Hermeticity',
      desc: 'Engineered with triple Viton® O-rings and threaded crowns to guarantee complete resistance against deep sea pressure, thermal shocks, and fine micro-particulates.',
      image: '/images/watch-aqua.jpg',
    },
  ];

  return (
    <section className="py-24 bg-chrono-950 border-b border-chrono-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block">
            Haute Horlogerie
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chrono-ivory">
            The Sanctum of Precision
          </h2>
          <p className="text-sm sm:text-base text-chrono-ivory-muted leading-relaxed font-light">
            Every CHARAN timepiece contains over 300 discrete mechanical components, assembled and regulated by a single dedicated Master Watchmaker in Switzerland.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {crafts.map((craft, idx) => {
            const Icon = craft.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-chrono-900 border border-chrono-border overflow-hidden group hover:border-chrono-gold/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 w-full bg-chrono-850 overflow-hidden">
                  <Image
                    src={craft.image}
                    alt={craft.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-80 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chrono-900 via-chrono-900/40 to-transparent" />
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-chrono-950/80 backdrop-blur-md border border-chrono-border text-chrono-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-chrono-gold block mb-1">
                      {craft.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-chrono-ivory mb-3">
                      {craft.title}
                    </h3>
                    <p className="text-xs text-chrono-ivory-muted leading-relaxed">
                      {craft.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
