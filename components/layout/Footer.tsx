'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, ShieldCheck, Clock, MapPin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
      }
    } catch (err) {
      // Fallback optimistic
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-chrono-950 border-t border-chrono-border text-chrono-ivory-muted text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Bar */}
        <div className="bg-chrono-900 border border-chrono-border rounded-2xl p-8 lg:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold mb-2 block">
              The CHARAN Gazette
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-chrono-ivory font-bold mb-2">
              Receive Private Horological Dispatches
            </h3>
            <p className="text-xs sm:text-sm text-chrono-ivory-muted leading-relaxed">
              Curated previews of limited complications, private auction acquisitions, and invitations to our Le Locle masterclasses.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-chrono-800/80 border border-chrono-gold/40 text-chrono-gold text-xs font-mono">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are registered with the CHARAN Horological Registry.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your private email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3.5 text-xs text-chrono-ivory placeholder-chrono-ivory-muted/60 focus:outline-none focus:border-chrono-gold flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold text-xs uppercase tracking-wider font-mono transition-colors shadow-lg"
                >
                  {loading ? 'Registering...' : 'Request Invitation'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-[0.3em] text-chrono-ivory">
                CHARAN
              </span>
              <span className="block text-[9px] uppercase font-mono tracking-[0.35em] text-chrono-gold">
                Engineered for Eternity
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-chrono-ivory-muted">
              Founded in Le Locle, Switzerland, CHARAN represents the apex of mechanical watchmaking—where historical artisanal finishing harmonizes with cutting-edge aerospace metallurgy.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-chrono-gold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 5-Year International Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> COSC Certified Precision
              </span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-chrono-ivory font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link href="/collections" className="hover:text-chrono-gold transition-colors">Chronograph Series</Link></li>
              <li><Link href="/collections" className="hover:text-chrono-gold transition-colors">Midnight Automatic</Link></li>
              <li><Link href="/collections" className="hover:text-chrono-gold transition-colors">Heritage Classic</Link></li>
              <li><Link href="/collections" className="hover:text-chrono-gold transition-colors">Ocean Diver 300M</Link></li>
              <li><Link href="/collections" className="hover:text-chrono-gold transition-colors">Titanium Edge</Link></li>
              <li><Link href="/collections" className="hover:text-chrono-gold transition-colors">Royal Skeleton Tourbillon</Link></li>
            </ul>
          </div>

          {/* Haute Horlogerie */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-chrono-ivory font-semibold">
              Atelier
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link href="/customize" className="hover:text-chrono-gold transition-colors">3D Customizer Studio</Link></li>
              <li><Link href="/craftsmanship" className="hover:text-chrono-gold transition-colors">Manufacture & Calibres</Link></li>
              <li><Link href="/our-story" className="hover:text-chrono-gold transition-colors">Our Le Locle Heritage</Link></li>
              <li><Link href="/journal" className="hover:text-chrono-gold transition-colors">Journal & Archives</Link></li>
              <li><a href="#concierge" className="hover:text-chrono-gold transition-colors">Bespoke Engraving</a></li>
            </ul>
          </div>

          {/* Salons & Boutiques */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-chrono-ivory font-semibold">
              Boutiques
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-chrono-ivory font-medium">Geneva Atelier</p>
                <p className="text-[11px] text-chrono-ivory-muted/80">Rue du Rhône 42, 1204 Genève</p>
              </div>
              <div>
                <p className="text-chrono-ivory font-medium">Zurich Salon</p>
                <p className="text-[11px] text-chrono-ivory-muted/80">Bahnhofstrasse 18, 8001 Zürich</p>
              </div>
              <div>
                <p className="text-chrono-ivory font-medium">Mumbai Flagship</p>
                <p className="text-[11px] text-chrono-ivory-muted/80">The Taj Mahal Palace, Colaba</p>
              </div>
              <div>
                <p className="text-chrono-ivory font-medium">London Mayfair</p>
                <p className="text-[11px] text-chrono-ivory-muted/80">14 New Bond St, London</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-chrono-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 CHARAN Horlogerie S.A. All rights reserved. Registered in Switzerland.</p>
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span className="hover:text-chrono-gold cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-chrono-gold cursor-pointer transition-colors">Terms of Haute Horlogerie</span>
            <span className="hover:text-chrono-gold cursor-pointer transition-colors">Armored Shipping Notice</span>
            <span className="hover:text-chrono-gold cursor-pointer transition-colors">Provenance Authentication</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
