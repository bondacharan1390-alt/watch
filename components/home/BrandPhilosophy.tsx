'use client';

import React from 'react';
import { Award, Compass, Feather, ShieldCheck } from 'lucide-react';

export function BrandPhilosophy() {
  const pillars = [
    {
      icon: Feather,
      title: 'Artisanal Hand-Chamfering',
      subtitle: 'Anglage & Black Polish',
      desc: 'Every bridge, lever, and flank is hand-beveled with diamond files and buffed with elderberry wood pith to achieve an optically flawless mirror finish.',
    },
    {
      icon: Compass,
      title: '36,000 VPH High-Frequency',
      subtitle: 'Chronometric Superiority',
      desc: 'Our in-house calibres oscillate at 5 Hertz, dividing each second into ten exact increments for unwavering stability in active daily environments.',
    },
    {
      icon: ShieldCheck,
      title: 'Impervious Metallurgy',
      subtitle: 'Austenitic 904L & Grade 5 Titanium',
      desc: 'Selected from aerospace suppliers, our alloys resist chemical oxidation, saltwater pitting, and extreme magnetic distortions beyond 15,000 Gauss.',
    },
    {
      icon: Award,
      title: 'Geneva Chronometry Purity',
      subtitle: 'COSC & Poinçon de Genève',
      desc: 'Tested for 15 consecutive days across five positions and three temperatures before receiving its individual chronometer certification.',
    },
  ];

  return (
    <section id="philosophy" className="py-24 bg-chrono-950 border-t border-b border-chrono-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block">
            Brand Philosophy • Le Locle
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-chrono-ivory font-bold tracking-tight">
            Engineered for Eternity.
          </h2>
          <p className="text-sm sm:text-base text-chrono-ivory-muted leading-relaxed font-light">
            In an era of disposable novelties, CHARAN creates enduring mechanical heirlooms. Time is not merely measured—it is honored through centuries-old Swiss horological mastery.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-chrono-900/60 border border-chrono-border hover:border-chrono-gold/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-chrono-850 border border-chrono-border flex items-center justify-center mb-6 text-chrono-gold group-hover:bg-chrono-gold group-hover:text-chrono-950 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-chrono-gold block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-lg text-chrono-ivory font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-chrono-ivory-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Big Horological Metric Strip */}
        <div className="mt-20 pt-16 border-t border-chrono-border grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-chrono-gold mb-1">
              36,000
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-chrono-ivory-muted">
              Vibrations Per Hour
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-chrono-gold mb-1">
              300M
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-chrono-ivory-muted">
              Abyssal Depth Rating
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-chrono-gold mb-1">
              100%
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-chrono-ivory-muted">
              Manufacture In-House
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-chrono-gold mb-1">
              5 Years
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-chrono-ivory-muted">
              Swiss Warranty
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
