'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import { formatINR } from '@/lib/pricing';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Sliders } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-28 bg-chrono-950 min-h-screen text-chrono-ivory">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-chrono-900 border border-chrono-border flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-chrono-gold/40" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3">Your Shopping Bag is Empty</h1>
          <p className="text-sm text-chrono-ivory-muted mb-8 leading-relaxed">
            Every CHARAN timepiece is hand-assembled in Le Locle. Browse our flagship collections or customize a bespoke model in the 3D studio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/collections"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-chrono-gold text-chrono-950 font-bold text-xs uppercase font-mono tracking-wider transition-colors hover:bg-chrono-gold-light"
            >
              Browse Collections
            </Link>
            <Link
              href="/customize"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-chrono-border hover:border-chrono-gold text-chrono-ivory text-xs font-mono uppercase tracking-wider transition-colors"
            >
              3D Customizer Studio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-chrono-950 min-h-screen text-chrono-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold block mb-1">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chrono-ivory">
            Your Shopping Bag
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-chrono-900 border border-chrono-border flex flex-col sm:flex-row justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-chrono-gold">
                      {item.product.collection}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-chrono-ivory">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-mono text-chrono-gold font-bold">
                      {formatINR(item.unitPriceINR)}
                    </p>
                  </div>

                  {/* Specs breakdown */}
                  <div className="p-3 rounded-xl bg-chrono-850 border border-chrono-border/60 text-xs font-mono space-y-1 text-chrono-ivory-muted">
                    <div className="flex justify-between">
                      <span>Case:</span>
                      <span className="text-chrono-ivory capitalize">{item.config.caseMaterial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dial:</span>
                      <span className="text-chrono-ivory capitalize">{item.config.dialColor} ({item.config.dialStyle})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Strap:</span>
                      <span className="text-chrono-ivory capitalize">{item.config.strapColor} {item.config.strapType}</span>
                    </div>
                    {item.config.engravingText && (
                      <div className="flex justify-between text-chrono-gold border-t border-chrono-border/40 pt-1">
                        <span>Exhibition Engraving:</span>
                        <span className="font-bold">"{item.config.engravingText}"</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex sm:flex-col justify-between sm:items-end items-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-chrono-ivory-muted hover:text-red-400 transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="space-y-2 text-right">
                    <div className="flex items-center border border-chrono-border rounded-xl px-2.5 py-1.5 bg-chrono-850">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-chrono-ivory-muted hover:text-chrono-ivory px-1.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-xs px-2.5 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-chrono-ivory-muted hover:text-chrono-ivory px-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="font-mono text-base font-bold text-chrono-ivory">
                      {formatINR(item.unitPriceINR * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-chrono-900 border border-chrono-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <h2 className="font-serif text-xl font-bold text-chrono-ivory border-b border-chrono-border pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} Items):</span>
                <span className="text-chrono-ivory font-semibold">{formatINR(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Luxury Goods GST (18%):</span>
                <span className="text-chrono-ivory font-semibold">{formatINR(getTax())}</span>
              </div>
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Armored Courier Transit:</span>
                <span className="text-emerald-400 font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-bold text-chrono-ivory pt-3 border-t border-chrono-border">
                <span className="font-serif">Grand Total:</span>
                <span className="font-mono text-chrono-gold text-xl">{formatINR(getTotal())}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-chrono-850 border border-chrono-border space-y-2 text-xs text-chrono-ivory-muted font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-chrono-gold shrink-0" />
                <span>5-Year Swiss International Warranty Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-chrono-gold shrink-0" />
                <span>Individually Calibrated to COSC Precision</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/collections"
              className="block text-center text-xs font-mono text-chrono-ivory-muted hover:text-chrono-ivory transition-colors"
            >
              Continue Exploring Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
