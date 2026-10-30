'use client';

import React, { useState, useMemo } from 'react';
import { LUXURY_PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import { WatchViewerModal } from '@/components/3d/WatchViewerModal';
import { Product } from '@/types/product';
import { Search, SlidersHorizontal, ArrowUpDown, Box } from 'lucide-react';

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [selectedProductFor3D, setSelectedProductFor3D] = useState<Product | null>(null);
  const [all3DMode, setAll3DMode] = useState<boolean>(false);

  const categories = [
    'all',
    'Chronograph Series',
    'Midnight Automatic',
    'Heritage Classic',
    'Ocean Diver',
    'Titanium Edge',
    'Royal Skeleton',
  ];

  const filteredProducts = useMemo(() => {
    let list = [...LUXURY_PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.collection === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.movementCalibre.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-24 bg-chrono-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block mb-2">
            Haute Horlogerie Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-chrono-ivory mb-4">
            The CHARAN Collections
          </h1>
          <p className="text-sm sm:text-base text-chrono-ivory-muted leading-relaxed font-light">
            Every timepiece is machined from corrosion-resistant alloys, regulated to Swiss chronometer standards, and accompanied by a numbered certificate of manufacture.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-chrono-900 border border-chrono-border rounded-2xl p-4 sm:p-6 mb-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 shadow-xl">
          {/* Categories Pill Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors capitalize ${
                  selectedCategory === cat
                    ? 'bg-chrono-gold text-chrono-950 font-bold shadow-md'
                    : 'bg-chrono-850 text-chrono-ivory-muted hover:text-chrono-ivory border border-chrono-border'
                }`}
              >
                {cat === 'all' ? 'All Timepieces' : cat}
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
              title="Toggle 3D View for all watches"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${all3DMode ? 'bg-chrono-950' : 'bg-emerald-400 animate-pulse'}`} />
              <Box className="w-3.5 h-3.5" />
              <span>{all3DMode ? 'All 3D Active' : 'View All in 3D'}</span>
            </button>
          </div>

          {/* Search and Sort controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-chrono-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-chrono-850 border border-chrono-border rounded-xl text-xs text-chrono-ivory placeholder-chrono-ivory-muted/60 focus:outline-none focus:border-chrono-gold font-mono"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-chrono-ivory-muted shrink-0" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-chrono-850 border border-chrono-border rounded-xl text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold font-mono"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center rounded-2xl bg-chrono-900 border border-chrono-border p-8">
            <p className="font-serif text-xl text-chrono-ivory mb-2">No Timepieces Match Your Query</p>
            <p className="text-xs text-chrono-ivory-muted mb-6">
              Try adjusting your search criteria or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-xl bg-chrono-gold text-chrono-950 text-xs font-mono font-bold uppercase"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
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
        )}
      </div>

      {/* 3D Quick View Modal */}
      <WatchViewerModal
        product={selectedProductFor3D}
        onClose={() => setSelectedProductFor3D(null)}
      />
    </div>
  );
}
