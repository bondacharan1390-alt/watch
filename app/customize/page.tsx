'use client';

import React, { useState } from 'react';
import { WatchViewer3D } from '@/components/3d/WatchViewer3D';
import { useConfiguratorStore } from '@/store/configurator-store';
import { LUXURY_PRODUCTS } from '@/lib/products';
import { calculateConfiguredPrice, CONFIGURATION_DELTAS, formatINR } from '@/lib/pricing';
import { CaseMaterial, DialColor, StrapType, StrapColor, DialStyle, CameraAngle } from '@/types/configuration';
import { useCartStore } from '@/store/cart-store';
import {
  RotateCcw,
  ShoppingBag,
  Check,
  Sparkles,
  ShieldCheck,
  Eye,
  Sliders,
  PenTool,
  Layers,
  Palette
} from 'lucide-react';

export default function CustomizerPage() {
  const {
    selectedProduct,
    config,
    cameraAngle,
    lightingPreset,
    isWireframe,
    setSelectedProduct,
    setCaseMaterial,
    setDialColor,
    setStrapType,
    setStrapColor,
    setDialStyle,
    setEngravingText,
    setCameraAngle,
    setLightingPreset,
    toggleWireframe,
    resetConfig,
  } = useConfiguratorStore();

  const { addItem } = useCartStore();
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'material' | 'dial' | 'strap' | 'engraving'>('material');

  const configuredPrice = calculateConfiguredPrice(selectedProduct.priceINR, config);

  const handleAddToCart = () => {
    addItem(selectedProduct, config, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="pt-24 pb-16 bg-chrono-950 min-h-screen text-chrono-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Studio Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-chrono-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHARAN Atelier Studio • 3D Bespoke Configurator</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-chrono-ivory">
              Customize Your Timepiece
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetConfig}
              className="px-4 py-2 rounded-xl border border-chrono-border hover:border-chrono-gold/50 text-chrono-ivory-muted hover:text-chrono-ivory text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors bg-chrono-900/60"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Configuration</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace: Split 3D Canvas (Left/Center) + Control Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Canvas Column (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative">
              <WatchViewer3D
                config={config}
                cameraAngle={cameraAngle}
                lightingPreset={lightingPreset}
                wireframe={isWireframe}
                heightClass="h-[460px] sm:h-[580px] lg:h-[660px]"
                autoRotate={false}
                interactive={true}
                onAngleChange={setCameraAngle}
              />
            </div>

            {/* Quick Angle Jump & Lighting bar */}
            <div className="p-4 rounded-xl bg-chrono-900 border border-chrono-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-chrono-ivory-muted">Viewpoint:</span>
                {(['hero', 'dial', 'profile', 'strap', 'caseback'] as CameraAngle[]).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setCameraAngle(angle)}
                    className={`px-3 py-1 rounded capitalize transition-colors ${
                      cameraAngle === angle
                        ? 'bg-chrono-gold text-chrono-950 font-bold'
                        : 'bg-chrono-850 text-chrono-ivory-muted hover:text-chrono-ivory'
                    }`}
                  >
                    {angle === 'caseback' ? 'Caseback' : angle}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleWireframe}
                  className={`px-3 py-1 rounded transition-colors ${
                    isWireframe
                      ? 'bg-emerald-500 text-chrono-950 font-bold'
                      : 'bg-chrono-850 text-chrono-ivory-muted hover:text-chrono-ivory'
                  }`}
                >
                  Wireframe
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Controls (5 Cols on desktop) */}
          <div className="lg:col-span-5 bg-chrono-900 border border-chrono-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Step 1: Base Watch Model Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-chrono-gold mb-2">
                1. Base Timepiece Architecture
              </label>
              <select
                value={selectedProduct.id}
                onChange={(e) => {
                  const prod = LUXURY_PRODUCTS.find((p) => p.id === e.target.value);
                  if (prod) setSelectedProduct(prod);
                }}
                className="w-full px-4 py-3 bg-chrono-850 border border-chrono-border rounded-xl text-sm text-chrono-ivory font-serif focus:outline-none focus:border-chrono-gold"
              >
                {LUXURY_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.collection})
                  </option>
                ))}
              </select>
            </div>

            {/* Configurator Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-chrono-850 border border-chrono-border text-xs font-mono">
              <button
                onClick={() => setActiveTab('material')}
                className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'material' ? 'bg-chrono-gold text-chrono-950 font-bold' : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Case</span>
              </button>
              <button
                onClick={() => setActiveTab('dial')}
                className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'dial' ? 'bg-chrono-gold text-chrono-950 font-bold' : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Dial</span>
              </button>
              <button
                onClick={() => setActiveTab('strap')}
                className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'strap' ? 'bg-chrono-gold text-chrono-950 font-bold' : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Strap</span>
              </button>
              <button
                onClick={() => setActiveTab('engraving')}
                className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'engraving' ? 'bg-chrono-gold text-chrono-950 font-bold' : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Engraving</span>
              </button>
            </div>

            {/* TAB CONTENT */}
            {/* Tab 1: Case Metallurgy */}
            {activeTab === 'material' && (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory-muted block">
                  Select Case Metallurgy & Finish
                </span>
                <div className="space-y-2.5">
                  {[
                    {
                      id: 'steel' as CaseMaterial,
                      name: 'Brushed 316L Stainless Steel',
                      desc: 'Classic Swiss brushed finish with polished chamfers',
                      delta: CONFIGURATION_DELTAS.caseMaterial.steel,
                      color: 'bg-slate-300',
                    },
                    {
                      id: 'black-steel' as CaseMaterial,
                      name: 'Obsidian DLC-Coated Steel',
                      desc: 'Diamond-Like Carbon ultra-hard matte noir finish',
                      delta: CONFIGURATION_DELTAS.caseMaterial['black-steel'],
                      color: 'bg-zinc-800',
                    },
                    {
                      id: 'gold' as CaseMaterial,
                      name: '18k Champagne Gold Finish',
                      desc: 'Radiant warm gold alloy with mirror-polished bezel',
                      delta: CONFIGURATION_DELTAS.caseMaterial.gold,
                      color: 'bg-amber-300',
                    },
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setCaseMaterial(mat.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        config.caseMaterial === mat.id
                          ? 'border-chrono-gold bg-chrono-gold/10'
                          : 'border-chrono-border bg-chrono-850 hover:border-chrono-gold/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full ${mat.color} border border-white/20 shrink-0`} />
                        <div>
                          <p className="text-xs font-semibold text-chrono-ivory">{mat.name}</p>
                          <p className="text-[11px] text-chrono-ivory-muted">{mat.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-chrono-gold font-medium shrink-0 ml-2">
                        {mat.delta === 0 ? 'Included' : `+${formatINR(mat.delta)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Dial Color & Style */}
            {activeTab === 'dial' && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory-muted block mb-3">
                    Dial Color
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'black' as DialColor, name: 'Obsidian Noir', delta: 0, hex: '#111215' },
                      { id: 'white' as DialColor, name: 'Grand Feu Cream', delta: 0, hex: '#F7F5F0' },
                      { id: 'navy' as DialColor, name: 'Royal Navy Sunburst', delta: 12000, hex: '#0D233F' },
                      { id: 'green' as DialColor, name: 'Racing Emerald', delta: 18000, hex: '#0B291A' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDialColor(d.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                          config.dialColor === d.id
                            ? 'border-chrono-gold bg-chrono-gold/10'
                            : 'border-chrono-border bg-chrono-850 hover:border-chrono-gold/40'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: d.hex }}
                        />
                        <div>
                          <p className="text-xs font-semibold text-chrono-ivory leading-tight">{d.name}</p>
                          <p className="text-[10px] font-mono text-chrono-gold">
                            {d.delta === 0 ? 'Base' : `+${formatINR(d.delta)}`}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory-muted block mb-2">
                    Dial Style Architecture
                  </span>
                  <div className="space-y-2">
                    {[
                      { id: 'classic' as DialStyle, name: 'Classic Three-Hand Minimalist', desc: 'Applied faceted batons and date' },
                      { id: 'chronograph' as DialStyle, name: 'Tri-Compax Chronograph Subdials', desc: '3 recessed counters at 3, 6, 9' },
                      { id: 'skeleton' as DialStyle, name: 'Open-Heart Skeleton Tourbillon', desc: 'Exposed escapement and balance wheel' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setDialStyle(s.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${
                          config.dialStyle === s.id
                            ? 'border-chrono-gold bg-chrono-gold/10'
                            : 'border-chrono-border bg-chrono-850 hover:border-chrono-gold/40'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-chrono-ivory">{s.name}</p>
                          <p className="text-[10px] text-chrono-ivory-muted">{s.desc}</p>
                        </div>
                        {config.dialStyle === s.id && <Check className="w-4 h-4 text-chrono-gold" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Strap Selection */}
            {activeTab === 'strap' && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory-muted block mb-3">
                    Strap Material
                  </span>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: 'leather' as StrapType,
                        name: 'Hand-Stitched Alligator Leather',
                        desc: 'Full grain leather with French perimeter saddle stitching',
                        delta: CONFIGURATION_DELTAS.strapType.leather,
                      },
                      {
                        id: 'metal' as StrapType,
                        name: 'Three-Link Articulated Oyster Bracelet',
                        desc: 'Solid milled links with Glidelock micro-adjustment',
                        delta: CONFIGURATION_DELTAS.strapType.metal,
                      },
                      {
                        id: 'rubber' as StrapType,
                        name: 'High-Density FKM Fluoroelastomer Rubber',
                        desc: 'Saltwater and UV impervious maritime sports strap',
                        delta: CONFIGURATION_DELTAS.strapType.rubber,
                      },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setStrapType(st.id)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                          config.strapType === st.id
                            ? 'border-chrono-gold bg-chrono-gold/10'
                            : 'border-chrono-border bg-chrono-850 hover:border-chrono-gold/40'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-chrono-ivory">{st.name}</p>
                          <p className="text-[10px] text-chrono-ivory-muted">{st.desc}</p>
                        </div>
                        <span className="text-xs font-mono text-chrono-gold font-medium shrink-0 ml-2">
                          {st.delta === 0 ? 'Standard' : st.delta > 0 ? `+${formatINR(st.delta)}` : `${formatINR(st.delta)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strap Color Variants */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory-muted block mb-2">
                    Strap Color
                  </span>
                  <div className="flex gap-2">
                    {(config.strapType === 'leather'
                      ? (['black', 'brown'] as StrapColor[])
                      : config.strapType === 'rubber'
                      ? (['black', 'navy'] as StrapColor[])
                      : (['steel', 'gold'] as StrapColor[])
                    ).map((col) => (
                      <button
                        key={col}
                        onClick={() => setStrapColor(col)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono capitalize border transition-colors ${
                          config.strapColor === col
                            ? 'border-chrono-gold bg-chrono-gold text-chrono-950 font-bold'
                            : 'border-chrono-border bg-chrono-850 text-chrono-ivory-muted hover:text-chrono-ivory'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Exhibition Caseback Custom Engraving */}
            {activeTab === 'engraving' && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-chrono-gold block mb-1">
                    Custom Exhibition Caseback Laser Inscription
                  </span>
                  <p className="text-xs text-chrono-ivory-muted mb-3">
                    Personalize your timepiece with your name, anniversary date, or personal motto engraved permanently onto the exhibition sapphire retaining ring.
                  </p>

                  <div className="space-y-2">
                    <input
                      type="text"
                      maxLength={18}
                      placeholder="e.g. IN MEMORIAM 2026"
                      value={config.engravingText}
                      onChange={(e) => {
                        setEngravingText(e.target.value);
                        setCameraAngle('caseback'); // automatically switch camera to view engraving!
                      }}
                      className="w-full px-4 py-3 bg-chrono-850 border border-chrono-border rounded-xl text-xs font-mono tracking-wider uppercase text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-chrono-ivory-muted">
                      <span>Max 18 Roman characters</span>
                      <span>{config.engravingText.length} / 18</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-chrono-850 border border-chrono-border text-xs flex justify-between items-center">
                  <span className="text-chrono-ivory-muted">Micro-Laser Engraving Fee:</span>
                  <span className="font-mono text-chrono-gold font-bold">
                    +{formatINR(CONFIGURATION_DELTAS.engraving)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setCameraAngle('caseback')}
                  className="w-full py-2.5 rounded-lg border border-chrono-border hover:border-chrono-gold text-xs font-mono text-chrono-ivory hover:text-chrono-gold transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Exhibition Caseback in 3D</span>
                </button>
              </div>
            )}

            {/* LIVE PRICE SUMMARY & ADD TO BAG */}
            <div className="pt-6 border-t border-chrono-border space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-chrono-ivory-muted">
                  <span>Base Timepiece ({selectedProduct.name}):</span>
                  <span className="font-mono text-chrono-ivory">{formatINR(selectedProduct.priceINR)}</span>
                </div>
                {config.caseMaterial !== 'steel' && (
                  <div className="flex justify-between text-chrono-ivory-muted">
                    <span>Case Metallurgy:</span>
                    <span className="font-mono text-chrono-gold">
                      +{formatINR(CONFIGURATION_DELTAS.caseMaterial[config.caseMaterial])}
                    </span>
                  </div>
                )}
                {config.dialColor !== 'black' && config.dialColor !== 'white' && (
                  <div className="flex justify-between text-chrono-ivory-muted">
                    <span>Sunburst Dial Tint:</span>
                    <span className="font-mono text-chrono-gold">
                      +{formatINR(CONFIGURATION_DELTAS.dialColor[config.dialColor])}
                    </span>
                  </div>
                )}
                {config.strapType !== 'leather' && (
                  <div className="flex justify-between text-chrono-ivory-muted">
                    <span>Bracelet Architecture:</span>
                    <span className="font-mono text-chrono-gold">
                      {CONFIGURATION_DELTAS.strapType[config.strapType] > 0 ? '+' : ''}
                      {formatINR(CONFIGURATION_DELTAS.strapType[config.strapType])}
                    </span>
                  </div>
                )}
                {config.engravingText && config.engravingText.trim().length > 0 && (
                  <div className="flex justify-between text-chrono-ivory-muted">
                    <span>Caseback Laser Engraving:</span>
                    <span className="font-mono text-chrono-gold">
                      +{formatINR(CONFIGURATION_DELTAS.engraving)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-chrono-border/60">
                  <span className="font-serif text-sm font-semibold text-chrono-ivory">
                    Total Configured Price:
                  </span>
                  <span className="font-mono text-xl font-bold text-chrono-gold">
                    {formatINR(configuredPrice)}
                  </span>
                </div>
              </div>

              {/* Add Configured Watch to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950 font-bold" />
                    <span>Configured Piece Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Configured Watch to Bag</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-chrono-ivory-muted">
                <ShieldCheck className="w-4 h-4 text-chrono-gold shrink-0" />
                <span>Individually Hand-Assembled Upon Order in Le Locle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
