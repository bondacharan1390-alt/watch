'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      author: 'Julian V. Belmont',
      location: 'Geneva, Switzerland',
      title: 'Unrivaled precision and hand-finishing',
      comment:
        'The mechanical actuation of the column-wheel pushers provides a tactile satisfaction unlike anything in this price bracket. The dial depth under sunlight is astonishing.',
      model: 'Apex Chronograph 42',
    },
    {
      author: 'Arjun Singhania',
      location: 'Mumbai, India',
      title: 'A true collector’s grail',
      comment:
        'Delivered in an armored presentation box with certificate of chronometry. The 36,000 vph sweep of the seconds hand is hypnotic. The custom engraving was executed with laser perfection.',
      model: 'Customized Midnight 40',
    },
    {
      author: 'Dr. Evelyn Sterling',
      location: 'Zurich, Switzerland',
      title: 'Horological art at its pinnacle',
      comment:
        'Watching the flying tourbillon compensate for earth gravity through the exhibition sapphire caseback is pure mechanical ballet. An heirloom piece to pass down.',
      model: 'Royal Skeleton Tourbillon',
    },
  ];

  return (
    <section className="py-24 bg-chrono-900 border-b border-chrono-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block">
            Collector Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chrono-ivory">
            The Connoisseurs' Verdict
          </h2>
          <p className="text-xs text-chrono-ivory-muted font-mono">
            *Demonstration collector perspectives from our global boutique salons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-chrono-850 border border-chrono-border flex flex-col justify-between relative group hover:border-chrono-gold/40 transition-colors"
            >
              <Quote className="w-8 h-8 text-chrono-gold/20 mb-4" />

              <div className="space-y-3 mb-6">
                <div className="flex gap-1 text-chrono-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-chrono-gold" />
                  ))}
                </div>
                <h3 className="font-serif text-lg font-bold text-chrono-ivory">
                  "{rev.title}"
                </h3>
                <p className="text-xs text-chrono-ivory-muted leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-chrono-border/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="text-chrono-ivory font-semibold">{rev.author}</h4>
                  <p className="text-[11px] text-chrono-ivory-muted font-mono">{rev.location}</p>
                </div>
                <div className="flex items-center gap-1.5 text-chrono-gold font-mono text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Connoisseur</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
