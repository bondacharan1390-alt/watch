'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatINR } from '@/lib/pricing';
import { useCartStore } from '@/store/cart-store';
import { Eye, ShoppingBag, Check, Maximize2, Sparkles, Box } from 'lucide-react';
import { WatchConfiguration } from '@/types/configuration';
import { WatchViewer3D } from '@/components/3d/WatchViewer3D';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  global3DMode?: boolean;
}

export function ProductCard({ product, onQuickView, global3DMode = false }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const show3D = global3DMode || is3DActive;

  const defaultConfig: WatchConfiguration = {
    modelId: product.id,
    modelName: product.name,
    caseMaterial: product.defaultConfig.caseMaterial,
    dialColor: product.defaultConfig.dialColor,
    strapType: product.defaultConfig.strapType,
    strapColor: product.defaultConfig.strapColor,
    dialStyle: product.defaultConfig.dialStyle,
    engravingText: '',
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product, defaultConfig, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 14), y: x * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="group relative rounded-2xl bg-chrono-900 border border-chrono-border hover:border-chrono-gold/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1">
      {/* Badge if available */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-chrono-950/85 backdrop-blur-md border border-chrono-gold/40 text-chrono-gold font-medium shadow-md">
            {product.badge}
          </span>
        </div>
      )}

      {/* Mode Switcher Pill (Photo vs 3D) */}
      <div className="absolute top-3.5 right-3.5 z-20 flex items-center p-0.5 rounded-full bg-chrono-950/90 backdrop-blur-md border border-chrono-gold/30 shadow-xl">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIs3DActive(false);
          }}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 ${
            !show3D
              ? 'bg-chrono-gold text-chrono-950 font-bold shadow-md'
              : 'text-chrono-ivory-muted hover:text-chrono-ivory'
          }`}
          title="Switch to High-Resolution Photography"
        >
          Photo
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIs3DActive(true);
          }}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
            show3D
              ? 'bg-chrono-gold text-chrono-950 font-bold shadow-md'
              : 'text-chrono-ivory-muted hover:text-chrono-ivory'
          }`}
          title="Switch to Interactive 3D Model"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${show3D ? 'bg-chrono-950' : 'bg-emerald-400 animate-pulse'}`} />
          3D Live
        </button>
      </div>

      {/* Watch Visual Container (3D Canvas or 2D Holographic Photo) */}
      <div className="relative w-full h-72 overflow-hidden bg-chrono-950 border-b border-chrono-border/60">
        {show3D ? (
          <div className="w-full h-full relative">
            <WatchViewer3D
              config={defaultConfig}
              compact={true}
              autoRotate={true}
              interactive={true}
              onExpand={() => onQuickView(product)}
              heightClass="h-72"
              imageUrl={product.primaryImage}
            />
          </div>
        ) : (
          <div
            className="relative w-full h-full bg-chrono-850 cursor-pointer overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
              <div
                className="w-full h-full relative transition-transform duration-200 ease-out"
                style={{
                  transform: isHovered
                    ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
                    : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                }}
              >
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center brightness-95 group-hover:brightness-105 transition-all duration-700"
                />
                {/* 3D dynamic specular light sweep */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay transition-opacity"
                    style={{
                      background: `radial-gradient(circle at ${(tilt.y / 14 + 0.5) * 100}% ${(tilt.x / -14 + 0.5) * 100}%, rgba(255,255,255,0.85) 0%, transparent 60%)`,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-chrono-900 via-transparent to-transparent opacity-80" />
              </div>
            </Link>

            {/* Floating button on hover: Quick 3D trigger */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIs3DActive(true);
                }}
                className="px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-chrono-950/90 text-chrono-gold border border-chrono-gold/50 shadow-xl backdrop-blur-md flex items-center gap-1.5 hover:bg-chrono-gold hover:text-chrono-950 transition-colors"
              >
                <Box className="w-3 h-3 text-chrono-gold" />
                <span>Spin Watch in 3D</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-chrono-gold mb-1 flex items-center justify-between">
            <span>{product.collection}</span>
            {show3D && (
              <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase">
                • 3D Active
              </span>
            )}
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-chrono-ivory group-hover:text-chrono-gold transition-colors mb-2 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-chrono-ivory-muted line-clamp-2 leading-relaxed mb-4">
            {product.tagline}
          </p>

          {/* Key Specs Pills */}
          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-chrono-ivory-muted mb-6">
            <span className="px-2 py-0.5 rounded bg-chrono-850 border border-chrono-border">
              {product.specs.caseDiameter}
            </span>
            <span className="px-2 py-0.5 rounded bg-chrono-850 border border-chrono-border">
              {product.specs.movementCalibre.split(' ')[0]}
            </span>
            <span className="px-2 py-0.5 rounded bg-chrono-850 border border-chrono-border">
              {product.specs.powerReserve}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 border-t border-chrono-border flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-chrono-ivory-muted block">
              Price
            </span>
            <span className="font-mono text-base font-bold text-chrono-gold">
              {formatINR(product.priceINR)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!show3D) {
                  setIs3DActive(true);
                } else {
                  onQuickView(product);
                }
              }}
              className={`p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                show3D
                  ? 'border-chrono-gold bg-chrono-gold/15 text-chrono-gold font-bold shadow-md'
                  : 'border-chrono-border hover:border-chrono-gold text-chrono-ivory-muted hover:text-chrono-ivory'
              }`}
              title={show3D ? 'Open Fullscreen 3D Studio' : 'View Watch in 3D'}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{show3D ? '3D Studio' : '3D View'}</span>
            </button>
            <button
              onClick={handleQuickAdd}
              className="p-2.5 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 transition-colors shadow-lg"
              title="Add to Shopping Bag"
            >
              {added ? <Check className="w-4 h-4 text-emerald-950 font-bold" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
