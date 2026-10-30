'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { formatINR } from '@/lib/pricing';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, getSubtotal, getTax, getTotal, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: 'Alexander Sterling',
    email: 'alexander.sterling@mayfair-advisory.co.uk',
    phone: '+91 98200 45892',
    address: 'Apt 1402, High Point Penthouse, Worli Sea Face',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400018',
    country: 'India',
    paymentMethod: 'stripe_test' as 'stripe_test' | 'bank_wire' | 'concierge',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    termsAccepted: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setErrorMessage('Please accept the Terms of Haute Horlogerie & Armored Transit to proceed.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);

    try {
      const orderPayload = {
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: items.map((i) => ({
          name: i.product.name,
          collection: i.product.collection,
          quantity: i.quantity,
          unitPriceINR: i.unitPriceINR,
          config: i.config,
        })),
        pricing: {
          subtotal: getSubtotal(),
          tax: getTax(),
          total: getTotal(),
        },
        paymentMethod: formData.paymentMethod,
        isTestMode: true,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCompletedOrder(data.order);
        clearCart();
        // Fire celebration confetti
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#CBB26B', '#EAD79D', '#FFFFFF', '#14161D'],
          });
        } catch (e) {
          // ignore if canvas-confetti is not loaded
        }
      } else {
        setErrorMessage(data.message || 'Payment simulation failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage('Network or server error during checkout verification.');
    } finally {
      setIsProcessing(false);
    }
  };

  // If order is completed, show celebration confirmation modal
  if (completedOrder) {
    return (
      <div className="pt-32 pb-24 bg-chrono-950 min-h-screen text-chrono-ivory">
        <div className="max-w-2xl mx-auto px-4">
          <div className="p-8 sm:p-12 rounded-3xl bg-chrono-900 border border-chrono-gold/50 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-chrono-gold/20 border-2 border-chrono-gold flex items-center justify-center mx-auto text-chrono-gold animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-chrono-gold block mb-1">
                Swiss Provenance Registered
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chrono-ivory">
                Acquisition Confirmed
              </h1>
              <p className="text-xs font-mono text-chrono-ivory-muted mt-2">
                Order Protocol #{completedOrder.orderId}
              </p>
            </div>

            <p className="text-sm text-chrono-ivory-muted leading-relaxed">
              Esteemed Collector, your bespoke allocation has been registered with our Le Locle Master Horologists. A signed certificate of chronometry and armored courier dispatch dossier have been transmitted to <span className="text-chrono-ivory font-semibold">{completedOrder.customer.email}</span>.
            </p>

            {/* Order Summary box */}
            <div className="p-6 rounded-2xl bg-chrono-850 border border-chrono-border text-left space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-chrono-border/60 pb-2">
                <span className="text-chrono-ivory-muted">Recipient:</span>
                <span className="text-chrono-ivory font-semibold">{completedOrder.customer.name}</span>
              </div>
              <div className="flex justify-between border-b border-chrono-border/60 pb-2">
                <span className="text-chrono-ivory-muted">Destination:</span>
                <span className="text-chrono-ivory font-semibold">{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.country}</span>
              </div>
              <div className="flex justify-between border-b border-chrono-border/60 pb-2">
                <span className="text-chrono-ivory-muted">Payment Mode:</span>
                <span className="text-emerald-400 font-semibold">Stripe Test Verification (Approved)</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-chrono-ivory">Total Settled:</span>
                <span className="text-chrono-gold font-mono">{formatINR(completedOrder.pricing.total)}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/collections"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-chrono-gold text-chrono-950 font-bold text-xs uppercase font-mono tracking-wider hover:bg-chrono-gold-light transition-colors"
              >
                Return to Gallery
              </Link>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-chrono-border text-chrono-ivory text-xs font-mono uppercase tracking-wider hover:bg-chrono-800 transition-colors"
              >
                Print Acquisition Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-24 text-center min-h-screen bg-chrono-950 text-chrono-ivory">
        <h1 className="font-serif text-3xl mb-4">No Timepieces in Bag to Checkout</h1>
        <p className="text-sm text-chrono-ivory-muted mb-8">
          Please add a luxury watch or tailored configuration to your bag first.
        </p>
        <Link
          href="/collections"
          className="px-6 py-3 rounded-xl bg-chrono-gold text-chrono-950 font-bold text-xs font-mono uppercase"
        >
          Discover Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-chrono-950 text-chrono-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold block mb-1">
            Secure Acquisition Protocol
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-chrono-ivory">
            Secure Checkout
          </h1>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wider block font-mono">
              Demonstration Checkout Environment (Test Mode)
            </span>
            <p className="text-amber-200/80 mt-0.5">
              This checkout simulates a live Stripe & Bank Wire payment. You may submit the form with the pre-filled demo collector details to test order processing and celebration confirmation without real charges.
            </p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form: Details & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Details */}
            <div className="p-6 sm:p-8 rounded-2xl bg-chrono-900 border border-chrono-border space-y-4">
              <h2 className="font-serif text-xl font-bold text-chrono-ivory border-b border-chrono-border pb-3 flex items-center justify-between">
                <span>1. Collector Credentials</span>
                <span className="text-xs font-mono text-chrono-gold font-normal">Step 1 of 3</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                    Concierge Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                    Telephone (For Armored Courier Dispatch)
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Armored Delivery Address */}
            <div className="p-6 sm:p-8 rounded-2xl bg-chrono-900 border border-chrono-border space-y-4">
              <h2 className="font-serif text-xl font-bold text-chrono-ivory border-b border-chrono-border pb-3 flex items-center justify-between">
                <span>2. Armored Courier Delivery Address</span>
                <span className="text-xs font-mono text-chrono-gold font-normal">Step 2 of 3</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                    Residence / Private Salon Address
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                      State / Province
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-chrono-ivory-muted uppercase mb-1.5">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-3 text-xs text-chrono-ivory focus:outline-none focus:border-chrono-gold"
                  >
                    <option value="India">India</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="p-6 sm:p-8 rounded-2xl bg-chrono-900 border border-chrono-border space-y-4">
              <h2 className="font-serif text-xl font-bold text-chrono-ivory border-b border-chrono-border pb-3 flex items-center justify-between">
                <span>3. Settlement & Payment Gateway</span>
                <span className="text-xs font-mono text-chrono-gold font-normal">Step 3 of 3</span>
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-chrono-gold bg-chrono-gold/10 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe_test"
                    checked={formData.paymentMethod === 'stripe_test'}
                    onChange={handleChange}
                    className="text-chrono-gold focus:ring-0"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-chrono-ivory flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-chrono-gold" />
                        <span>Stripe Payment Simulator (Test Mode)</span>
                      </p>
                      <p className="text-[11px] text-chrono-ivory-muted">
                        Simulate card verification with sandbox authorization token
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      Instant Simulation
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-chrono-border bg-chrono-850 hover:border-chrono-gold/40 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_wire"
                    checked={formData.paymentMethod === 'bank_wire'}
                    onChange={handleChange}
                    className="text-chrono-gold focus:ring-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-chrono-ivory">
                      Swiss Private Bank Wire (Banque Cantonale de Genève)
                    </p>
                    <p className="text-[11px] text-chrono-ivory-muted">
                      Receive an escrow IBAN proforma invoice for wire settlement
                    </p>
                  </div>
                </label>
              </div>

              {/* Card Inputs if Stripe */}
              {formData.paymentMethod === 'stripe_test' && (
                <div className="pt-2 space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-chrono-ivory-muted uppercase mb-1">
                      Test Card Number
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.cardNumber}
                      className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-2.5 text-xs text-chrono-ivory font-mono cursor-not-allowed"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-chrono-ivory-muted uppercase mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        disabled
                        value={formData.cardExp}
                        className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-2.5 text-xs text-chrono-ivory font-mono cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-chrono-ivory-muted uppercase mb-1">
                        Security CVC
                      </label>
                      <input
                        type="text"
                        disabled
                        value={formData.cardCvc}
                        className="w-full bg-chrono-850 border border-chrono-border rounded-xl px-4 py-2.5 text-xs text-chrono-ivory font-mono cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms and Agreements */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-chrono-ivory-muted">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-0.5 rounded text-chrono-gold focus:ring-0"
                />
                <span>
                  I confirm my allocation under the Swiss Haute Horlogerie Provenance Protocol and authorize armored courier transit insurance.
                </span>
              </label>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-chrono-900 border border-chrono-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <h2 className="font-serif text-xl font-bold text-chrono-ivory border-b border-chrono-border pb-4">
              Dossier Summary ({items.reduce((a, b) => a + b.quantity, 0)} Items)
            </h2>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="pb-3 border-b border-chrono-border/60 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-bold text-chrono-ivory">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-chrono-ivory-muted capitalize">
                        {item.config.caseMaterial} • {item.config.dialColor} • {item.config.strapType}
                      </p>
                      {item.config.engravingText && (
                        <p className="text-[10px] text-chrono-gold font-mono">
                          Engraved: "{item.config.engravingText}"
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-chrono-ivory font-semibold">
                      {formatINR(item.unitPriceINR * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs font-mono pt-2">
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Subtotal:</span>
                <span className="text-chrono-ivory font-semibold">{formatINR(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Swiss Luxury Goods GST (18%):</span>
                <span className="text-chrono-ivory font-semibold">{formatINR(getTax())}</span>
              </div>
              <div className="flex justify-between text-chrono-ivory-muted">
                <span>Armored White-Glove Transit:</span>
                <span className="text-emerald-400 font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-bold text-chrono-ivory pt-3 border-t border-chrono-border">
                <span className="font-serif">Acquisition Total:</span>
                <span className="font-mono text-chrono-gold text-xl">{formatINR(getTotal())}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-chrono-950 border-t-transparent animate-spin" />
                  <span>Verifying Provenance & Authorizing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize Acquisition ({formatINR(getTotal())})</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-chrono-ivory-muted space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-chrono-gold font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> End-to-End 256-Bit TLS Encryption
              </p>
              <p>Your personal data is protected under Swiss Federal Data Protection (FADP).</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
