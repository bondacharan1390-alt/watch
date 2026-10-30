'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WatchViewer3D } from '@/components/3d/WatchViewer3D';
import { LUXURY_PRODUCTS } from '@/lib/products';
import { WatchConfiguration, CameraAngle } from '@/types/configuration';
import { formatINR } from '@/lib/pricing';
import { ArrowRight, Sliders, ChevronDown, Sparkles, Shield, Compass } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export function Hero3D() {
  const heroProduct = LUXURY_PRODUCTS[0]; // Apex Chronograph 42
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('hero');
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'dramatic' | 'warm-gold'>('studio');
  const { addItem } = useCartStore();

  const heroConfig: WatchConfiguration = {
    modelId: heroProduct.id,
    modelName: heroProduct.name,
    caseMaterial: 'steel',
    dialColor: 'black',
    strapType: 'leather',
    strapColor: 'black',
    dialStyle: 'chronograph',
    engravingText: 'CHARAN NO. 001',
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-chrono-950">
      {/* Background Ambience & Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-chrono-gold/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-chrono-700/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Grid: Left Editorial Text, Right 3D Interactive Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 my-auto">
        {/* Left Column: Headlines & Actions */}
        <div className="w-full lg:w-5/12 text-center lg:text-left space-y-6 pt-6 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-chrono-gold/30 bg-chrono-900/60 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-chrono-gold" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-chrono-gold font-medium">
              Manufacture de Haute Horlogerie
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-chrono-ivory leading-[1.05]">
            TIME, <br />
            <span className="bg-gradient-to-r from-chrono-ivory via-chrono-gold-light to-chrono-gold bg-clip-text text-transparent">
              REDEFINED.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-chrono-ivory-muted max-w-lg font-light leading-relaxed">
            Precision engineering. Timeless design. Made to be remembered. Handcrafted in Le Locle with 36,000 vibrations per hour chronograph calibre.
          </p>

          {/* Pricing & Model Tag */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs font-mono">
            <span className="text-chrono-ivory-muted">Featured:</span>
            <span className="text-chrono-ivory font-semibold">{heroProduct.name}</span>
            <span className="text-chrono-gold font-bold text-base">{formatINR(heroProduct.priceINR)}</span>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/collections"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold tracking-wider text-xs uppercase font-mono flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-chrono-gold/10"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/customize"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-chrono-border hover:border-chrono-gold/60 text-chrono-ivory hover:text-chrono-gold font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 backdrop-blur-sm bg-chrono-900/40"
            >
              <Sliders className="w-4 h-4 text-chrono-gold" />
              <span>Customize Your Watch</span>
            </Link>
          </div>

          {/* Atelier Trust Badges */}
          <div className="pt-6 border-t border-chrono-border/60 flex items-center justify-center lg:justify-start gap-8 text-[11px] font-mono text-chrono-ivory-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-chrono-gold" />
              <span>5-Year Swiss Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-chrono-gold" />
              <span>Armored Global Transit</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Watch Model Viewer */}
        <div className="w-full lg:w-7/12 relative">
          {/* Quick Studio Lighting Switcher */}
          <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-1 bg-chrono-900/80 backdrop-blur-md p-1 rounded-lg border border-chrono-border text-[10px] font-mono">
            <span className="px-2 text-chrono-ivory-muted">Lighting:</span>
            {(['studio', 'dramatic', 'warm-gold'] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => setLightingPreset(preset)}
                className={`px-2 py-0.5 rounded capitalize transition-colors ${
                  lightingPreset === preset
                    ? 'bg-chrono-gold text-chrono-950 font-bold'
                    : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                }`}
              >
                {preset.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* 3D Canvas */}
          <div className="relative">
            <WatchViewer3D
              config={heroConfig}
              cameraAngle={cameraAngle}
              lightingPreset={lightingPreset}
              heightClass="h-[480px] sm:h-[560px] lg:h-[640px]"
              autoRotate={true}
              interactive={true}
              onAngleChange={setCameraAngle}
            />
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 text-chrono-ivory-muted text-xs font-mono z-10">
        <span className="tracking-[0.25em] uppercase text-[10px] text-chrono-gold/80">Scroll to Explore Craftsmanship</span>
        <a href="#philosophy" aria-label="Scroll down" className="animate-bounce p-1 text-chrono-gold">
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
