'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LUXURY_PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import { WatchViewerModal } from '@/components/3d/WatchViewerModal';
import { Product } from '@/types/product';
import { ArrowRight, Box } from 'lucide-react';

export function FeaturedCollection() {
  const [selectedProductFor3D, setSelectedProductFor3D] = useState<Product | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [all3DMode, setAll3DMode] = useState<boolean>(false);

  const collections = ['all', 'Chronograph Series', 'Midnight Automatic', 'Royal Skeleton'];

  const filteredProducts =
    selectedFilter === 'all'
      ? LUXURY_PRODUCTS.slice(0, 6)
      : LUXURY_PRODUCTS.filter((p) => p.collection === selectedFilter);

  return (
    <section className="py-24 bg-chrono-900 border-b border-chrono-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block mb-2">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-chrono-ivory">
              Masterpieces in Horology
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {collections.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors capitalize ${
                    selectedFilter === cat
                      ? 'bg-chrono-gold text-chrono-950 font-bold'
                      : 'bg-chrono-850 text-chrono-ivory-muted hover:text-chrono-ivory border border-chrono-border'
                  }`}
                >
                  {cat === 'all' ? 'All Flagships' : cat}
                </button>
              ))}

              {/* Master 3D Toggle */}
              <button
                type="button"
                onClick={() => setAll3DMode(!all3DMode)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 border shadow-md ${
                  all3DMode
                    ? 'bg-chrono-gold text-chrono-950 font-bold border-chrono-gold shadow-chrono-gold/20'
                    : 'bg-chrono-950/80 text-chrono-gold hover:text-chrono-ivory border-chrono-gold/50 hover:border-chrono-gold'
                }`}
                title="Switch all watch photos to interactive 3D models"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${all3DMode ? 'bg-chrono-950' : 'bg-emerald-400 animate-pulse'}`} />
                <Box className="w-3.5 h-3.5" />
                <span>{all3DMode ? 'All 3D Active' : 'View All in 3D'}</span>
              </button>
            </div>

            <Link
              href="/collections"
              className="hidden lg:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-chrono-gold hover:text-chrono-gold-light transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              global3DMode={all3DMode}
              onQuickView={(prod) => setSelectedProductFor3D(prod)}
            />
          ))}
        </div>

        {/* Bottom CTA to explore all collections */}
        <div className="mt-16 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-chrono-border hover:border-chrono-gold text-chrono-ivory font-mono text-xs uppercase tracking-wider transition-all bg-chrono-850 hover:bg-chrono-800"
          >
            <span>Explore Complete Swiss Catalog (All Models)</span>
            <ArrowRight className="w-4 h-4 text-chrono-gold" />
          </Link>
        </div>
      </div>

      {/* 3D Quick View Modal */}
      <WatchViewerModal
        product={selectedProductFor3D}
        onClose={() => setSelectedProductFor3D(null)}
      />
    </section>
  );
}
