'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';
import { ShoppingBag, Search, Menu, X, Compass, Sliders, Sparkles, User } from 'lucide-react';
import { LUXURY_PRODUCTS } from '@/lib/products';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  const { openCart } = useCartStore();
  const cartCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  useEffect(() => {
    setHasHydrated(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/collections', label: 'Collections' },
    { href: '/customize', label: 'Customize (3D)' },
    { href: '/craftsmanship', label: 'Our Craftsmanship' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/journal', label: 'Journal' },
  ];

  const filteredSearchResults = searchQuery.trim()
    ? LUXURY_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-chrono-950/90 backdrop-blur-md border-b border-chrono-border py-3 shadow-xl'
            : 'bg-gradient-to-b from-chrono-950/80 via-chrono-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile hamburger & Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-chrono-ivory hover:text-chrono-gold transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-mono uppercase tracking-[0.2em] transition-colors relative py-1 ${
                      isActive
                        ? 'text-chrono-gold font-semibold'
                        : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-chrono-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Wordmark */}
          <div className="text-center">
            <Link href="/" className="inline-block group">
              <span className="block font-serif text-2xl sm:text-3xl font-bold tracking-[0.3em] text-chrono-ivory group-hover:text-chrono-gold transition-colors">
                CHARAN
              </span>
              <span className="block text-[9px] uppercase font-mono tracking-[0.35em] text-chrono-gold/90 -mt-0.5">
                The Art of Time
              </span>
            </Link>
          </div>

          {/* Right: Actions (Search, Account, Bag) */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-chrono-ivory-muted hover:text-chrono-ivory transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => setAccountModalOpen(true)}
              className="p-2 text-chrono-ivory-muted hover:text-chrono-ivory transition-colors hidden sm:block"
              aria-label="Collector Concierge Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Shopping Bag Button with Badge */}
            <button
              onClick={openCart}
              className="relative p-2 text-chrono-ivory hover:text-chrono-gold transition-colors flex items-center gap-2 group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
              <span className="hidden sm:inline-block text-xs font-mono tracking-wider uppercase text-chrono-ivory-muted group-hover:text-chrono-ivory">
                Bag
              </span>
              {hasHydrated && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-chrono-gold text-chrono-950 font-mono text-[10px] font-bold flex items-center justify-center shadow-lg animate-scale-up">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-chrono-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-chrono-900 border-r border-chrono-border h-full p-6 flex flex-col justify-between z-10 animate-slide-right">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-chrono-border mb-6">
                <div>
                  <span className="font-serif text-xl font-bold tracking-[0.25em] text-chrono-ivory">
                    CHARAN
                  </span>
                  <span className="block text-[8px] uppercase font-mono tracking-[0.3em] text-chrono-gold">
                    Genève • Atelier
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-chrono-ivory-muted hover:text-chrono-ivory"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-mono uppercase tracking-[0.2em] py-2 border-b border-chrono-border/40 ${
                      pathname === link.href ? 'text-chrono-gold font-bold' : 'text-chrono-ivory'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-chrono-border text-xs text-chrono-ivory-muted space-y-2">
              <p className="font-serif text-chrono-gold">Swiss Haute Horlogerie</p>
              <p className="text-[11px]">Le Locle, Canton of Neuchâtel, Switzerland</p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAccountModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-lg border border-chrono-border text-chrono-ivory text-xs font-mono uppercase tracking-wider"
                >
                  Collector Concierge Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-chrono-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-chrono-900 border border-chrono-border rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-chrono-border">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-5 h-5 text-chrono-gold" />
                <input
                  type="text"
                  placeholder="Search timepieces by collection, movement, or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-chrono-ivory placeholder-chrono-ivory-muted/60 text-base focus:outline-none font-serif tracking-wide"
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1.5 text-chrono-ivory-muted hover:text-chrono-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="mt-4 max-h-80 overflow-y-auto space-y-3">
              {searchQuery.trim() === '' ? (
                <div className="py-6 text-center text-xs font-mono text-chrono-ivory-muted">
                  Popular searches: <span className="text-chrono-gold cursor-pointer" onClick={() => setSearchQuery('Apex')}>Apex Chronograph</span>, <span className="text-chrono-gold cursor-pointer" onClick={() => setSearchQuery('Tourbillon')}>Tourbillon</span>, <span className="text-chrono-gold cursor-pointer" onClick={() => setSearchQuery('Ocean')}>Ocean Diver</span>
                </div>
              ) : filteredSearchResults.length === 0 ? (
                <div className="py-8 text-center text-sm text-chrono-ivory-muted">
                  No timepieces found matching "{searchQuery}".
                </div>
              ) : (
                filteredSearchResults.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-chrono-850 border border-transparent hover:border-chrono-border transition-colors group"
                  >
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-chrono-gold uppercase">
                        {prod.collection}
                      </span>
                      <h4 className="font-serif text-sm text-chrono-ivory group-hover:text-chrono-gold transition-colors">
                        {prod.name}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-chrono-gold">
                      ₹{prod.priceINR.toLocaleString('en-IN')}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Collector Concierge Account Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chrono-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-chrono-900 border border-chrono-border rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setAccountModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-chrono-ivory-muted hover:text-chrono-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="inline-block p-3 rounded-full bg-chrono-800 border border-chrono-border mb-3">
                <User className="w-6 h-6 text-chrono-gold" />
              </span>
              <h3 className="font-serif text-xl text-chrono-ivory font-bold">
                CHARAN Collector Concierge
              </h3>
              <p className="text-xs text-chrono-ivory-muted mt-1">
                Access your provenance registry, bespoke configurations, and private atelier appointments.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Welcome, Esteemed Collector. Your CHARAN Concierge session has been authenticated.');
                setAccountModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-chrono-ivory-muted mb-1.5">
                  Collector Email / Provenance ID
                </label>
                <input
                  type="email"
                  required
                  defaultValue="collector@geneva-chronometry.ch"
                  className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-sm text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-chrono-ivory-muted mb-1.5">
                  Security Passcode
                </label>
                <input
                  type="password"
                  required
                  defaultValue="swisscalibre2026"
                  className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-sm text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold tracking-wider text-xs uppercase transition-colors shadow-lg"
              >
                Enter Private Salon
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-chrono-border text-center text-[11px] text-chrono-ivory-muted">
              Need assistance? Call our Le Locle Master Concierge: <span className="text-chrono-gold">+41 32 931 00 24</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
