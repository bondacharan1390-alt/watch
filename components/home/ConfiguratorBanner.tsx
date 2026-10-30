'use client';

import React from 'react';
import Link from 'next/link';
import { Sliders, Sparkles, Check, ArrowRight } from 'lucide-react';

export function ConfiguratorBanner() {
  return (
    <section className="py-24 bg-chrono-950 relative overflow-hidden">
      {/* Decorative Golden Ambient Radial Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-chrono-gold/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-chrono-900 via-chrono-850 to-chrono-900 border border-chrono-border p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#CBB26B_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

          {/* Left Text */}
          <div className="max-w-xl space-y-6 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chrono-gold/10 border border-chrono-gold/30 text-chrono-gold text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Atelier Studio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chrono-ivory leading-tight">
              Create Your Unique <br />
              <span className="text-chrono-gold">Horological Signature</span>
            </h2>

            <p className="text-sm sm:text-base text-chrono-ivory-muted leading-relaxed font-light">
              Enter our interactive 3D studio. Select from hand-finished 316L austenitic steel, DLC obsidian coating, or 18k champagne gold. Choose your sunburst dial, handcrafted strap, and personalize your timepiece with custom exhibition caseback engraving.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-chrono-ivory-muted pt-2 text-left">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-chrono-gold" />
                <span>Real-Time 3D Rendering</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-chrono-gold" />
                <span>3 Case Metallurgies</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-chrono-gold" />
                <span>Exhibition Caseback Engraving</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-chrono-gold" />
                <span>Transparent Live Pricing</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/customize"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <Sliders className="w-4 h-4" />
                <span>Launch 3D Customizer Studio</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Teaser */}
          <div className="w-full lg:w-5/12 flex items-center justify-center z-10">
            <div className="relative p-6 rounded-2xl bg-chrono-950/80 border border-chrono-border shadow-2xl backdrop-blur-md w-full max-w-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-chrono-border text-xs font-mono">
                <span className="text-chrono-ivory">Live Customization Preview</span>
                <span className="text-chrono-gold">Config ID: #CH-778</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-chrono-900 border border-chrono-border/50">
                  <span className="text-chrono-ivory-muted">Case Material</span>
                  <span className="text-chrono-gold font-bold">18k Champagne Gold (+₹1,45,000)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-chrono-900 border border-chrono-border/50">
                  <span className="text-chrono-ivory-muted">Dial Colour</span>
                  <span className="text-chrono-ivory">Royal Navy Sunburst (+₹12,000)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-chrono-900 border border-chrono-border/50">
                  <span className="text-chrono-ivory-muted">Strap Choice</span>
                  <span className="text-chrono-ivory">Hand-Stitched Alligator Leather</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-chrono-900 border border-chrono-border/50">
                  <span className="text-chrono-ivory-muted">Laser Engraving</span>
                  <span className="text-emerald-400">"VERITAS VINCIT" (+₹15,000)</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-sm font-bold border-t border-chrono-border">
                <span className="text-chrono-ivory font-serif">Configured Price:</span>
                <span className="text-chrono-gold font-mono text-base">₹7,57,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
