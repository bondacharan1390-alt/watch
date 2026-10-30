'use client';

import React from 'react';
import { useCartStore } from '@/store/cart-store';
import { formatINR } from '@/lib/pricing';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTax, getTotal } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-chrono-950/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-chrono-900 border-l border-chrono-border h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-chrono-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-chrono-gold" />
            <h2 className="font-serif text-lg tracking-wider text-chrono-ivory">
              Your Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-chrono-800 text-chrono-ivory-muted hover:text-chrono-ivory transition-colors"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-chrono-ivory-muted">
              <div className="w-16 h-16 rounded-full bg-chrono-850 flex items-center justify-center mb-4 border border-chrono-border">
                <ShoppingBag className="w-8 h-8 text-chrono-gold/50" />
              </div>
              <p className="font-serif text-lg text-chrono-ivory mb-2">Your Bag is Empty</p>
              <p className="text-sm max-w-xs mb-6 text-chrono-ivory-muted">
                Explore our Haute Horlogerie collections or tailor a unique bespoke timepiece in our 3D Customizer.
              </p>
              <div className="flex flex-col gap-2.5 w-full">
                <Link
                  href="/collections"
                  onClick={closeCart}
                  className="w-full py-3 rounded-xl bg-chrono-gold text-chrono-950 font-semibold text-sm text-center transition-colors hover:bg-chrono-gold-light"
                >
                  Discover Collections
                </Link>
                <Link
                  href="/customize"
                  onClick={closeCart}
                  className="w-full py-3 rounded-xl border border-chrono-border text-chrono-ivory text-sm text-center hover:bg-chrono-800 transition-colors"
                >
                  Open 3D Customizer
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-chrono-850 border border-chrono-border flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-chrono-gold uppercase">
                      {item.product.collection}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-chrono-ivory">
                      {item.product.name}
                    </h4>
                    <span className="font-mono text-sm text-chrono-gold font-medium">
                      {formatINR(item.unitPriceINR)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-chrono-ivory-muted hover:text-red-400 transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Configuration Specs breakdown */}
                <div className="text-[11px] font-mono text-chrono-ivory-muted bg-chrono-900/60 p-2.5 rounded-lg border border-chrono-border/40 space-y-1">
                  <div className="flex justify-between">
                    <span>Case:</span>
                    <span className="text-chrono-ivory capitalize">{item.config.caseMaterial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dial:</span>
                    <span className="text-chrono-ivory capitalize">
                      {item.config.dialColor} ({item.config.dialStyle})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strap:</span>
                    <span className="text-chrono-ivory capitalize">
                      {item.config.strapColor} {item.config.strapType}
                    </span>
                  </div>
                  {item.config.engravingText && (
                    <div className="flex justify-between text-chrono-gold border-t border-chrono-border/30 pt-1">
                      <span>Engraving:</span>
                      <span className="font-semibold">"{item.config.engravingText}"</span>
                    </div>
                  )}
                </div>

                {/* Quantity Control & Line Total */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 border border-chrono-border rounded-lg px-2 py-1 bg-chrono-900">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-chrono-ivory-muted hover:text-chrono-ivory"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs text-chrono-ivory px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-chrono-ivory-muted hover:text-chrono-ivory"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-mono text-sm font-semibold text-chrono-ivory">
                    {formatINR(item.unitPriceINR * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-chrono-border bg-chrono-950/80 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Subtotal:</span>
                <span className="font-mono text-chrono-ivory">{formatINR(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Luxury Goods GST (18%):</span>
                <span className="font-mono text-chrono-ivory">{formatINR(getTax())}</span>
              </div>
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Armored Courier Delivery:</span>
                <span className="text-emerald-400 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-chrono-border text-chrono-ivory">
                <span className="font-serif">Total:</span>
                <span className="font-mono text-chrono-gold text-base">{formatINR(getTotal())}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-chrono-ivory-muted">
              <ShieldCheck className="w-4 h-4 text-chrono-gold shrink-0" />
              <span>Includes 5-Year Swiss International Warranty & Certificate</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold tracking-wider text-sm flex items-center justify-center gap-2 transition-colors shadow-xl"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={closeCart}
                className="w-full py-2.5 text-xs text-chrono-ivory-muted hover:text-chrono-ivory transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
