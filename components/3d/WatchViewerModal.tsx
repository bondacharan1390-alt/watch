'use client';

import React from 'react';
import { Product } from '@/types/product';
import { WatchViewer3D } from './WatchViewer3D';
import { formatINR } from '@/lib/pricing';
import { X, ExternalLink, ShoppingBag, Check } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import { WatchConfiguration } from '@/types/configuration';

interface WatchViewerModalProps {
  product: Product | null;
  onClose: () => void;
}

export function WatchViewerModal({ product, onClose }: WatchViewerModalProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);

  if (!product) return null;

  const config: WatchConfiguration = {
    modelId: product.id,
    modelName: product.name,
    caseMaterial: product.defaultConfig.caseMaterial,
    dialColor: product.defaultConfig.dialColor,
    strapType: product.defaultConfig.strapType,
    strapColor: product.defaultConfig.strapColor,
    dialStyle: product.defaultConfig.dialStyle,
    engravingText: '',
  };

  const handleAddToCart = () => {
    addItem(product, config, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chrono-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-chrono-900 border border-chrono-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-chrono-800/80 hover:bg-chrono-700 text-chrono-ivory transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D Canvas Side */}
        <div className="w-full md:w-3/5 h-[340px] md:h-[540px] relative bg-chrono-950">
          <WatchViewer3D config={config} heightClass="h-full" interactive autoRotate imageUrl={product.primaryImage} />
        </div>

        {/* Product Details Side */}
        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-chrono-gold mb-1">
              {product.collection}
            </div>
            <h3 className="font-serif text-2xl text-chrono-ivory font-semibold mb-2">
              {product.name}
            </h3>
            <div className="text-xl font-mono text-chrono-gold mb-4">
              {formatINR(product.priceINR)}
            </div>

            <p className="text-sm text-chrono-ivory-muted leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="space-y-2.5 text-xs text-chrono-ivory-muted border-t border-b border-chrono-border py-4 mb-6">
              <div className="flex justify-between">
                <span>Diameter:</span>
                <span className="text-chrono-ivory font-mono">{product.specs.caseDiameter}</span>
              </div>
              <div className="flex justify-between">
                <span>Calibre:</span>
                <span className="text-chrono-ivory font-mono">{product.specs.movementCalibre}</span>
              </div>
              <div className="flex justify-between">
                <span>Power Reserve:</span>
                <span className="text-chrono-ivory font-mono">{product.specs.powerReserve}</span>
              </div>
              <div className="flex justify-between">
                <span>Water Resistance:</span>
                <span className="text-chrono-ivory font-mono">{product.specs.waterResistance}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 px-4 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-900" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </>
              )}
            </button>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-chrono-border hover:border-chrono-gold/50 text-chrono-ivory text-center text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>View Full Specifications</span>
              <ExternalLink className="w-4 h-4 text-chrono-gold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
