'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, LUXURY_PRODUCTS } from '@/lib/products';
import { WatchViewer3D } from '@/components/3d/WatchViewer3D';
import { WatchConfiguration, CaseMaterial, DialColor, StrapType, CameraAngle } from '@/types/configuration';
import { calculateConfiguredPrice, formatINR } from '@/lib/pricing';
import { useCartStore } from '@/store/cart-store';
import { ProductCard } from '@/components/product/ProductCard';
import { WatchViewerModal } from '@/components/3d/WatchViewerModal';
import { Product } from '@/types/product';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Check,
  Sliders,
  Star,
  ChevronRight,
  Eye,
  Box,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Compass
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  const [viewMode, setViewMode] = useState<'3d' | 'photo-3d' | 'gallery'>('3d');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('hero');
  const [added, setAdded] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // 3D Photo Depth Inspector states
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const [photoZoom, setPhotoZoom] = useState(1);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhotoTilt({ x: -(y * 22), y: x * 22 });
  };

  // All hooks must be called unconditionally — these must come before any early return
  const [caseMat, setCaseMat] = useState<CaseMaterial>(
    product?.defaultConfig.caseMaterial ?? 'steel'
  );
  const [dialCol, setDialCol] = useState<DialColor>(
    product?.defaultConfig.dialColor ?? 'black'
  );
  const [strapTy, setStrapTy] = useState<StrapType>(
    product?.defaultConfig.strapType ?? 'leather'
  );

  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="pt-36 pb-24 text-center min-h-screen bg-chrono-950 text-chrono-ivory">
        <h1 className="font-serif text-3xl mb-4">Timepiece Not Found</h1>
        <p className="text-sm text-chrono-ivory-muted mb-8">
          The requested horological reference does not exist in our Le Locle registry.
        </p>
        <Link
          href="/collections"
          className="px-6 py-3 rounded-xl bg-chrono-gold text-chrono-950 font-bold text-xs uppercase font-mono"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const currentConfig: WatchConfiguration = {
    modelId: product.id,
    modelName: product.name,
    caseMaterial: caseMat,
    dialColor: dialCol,
    strapType: strapTy,
    strapColor: strapTy === 'metal' ? (caseMat === 'gold' ? 'gold' : 'steel') : 'black',
    dialStyle: product.defaultConfig.dialStyle,
    engravingText: '',
  };

  const calculatedPrice = calculateConfiguredPrice(product.priceINR, currentConfig);

  const handleAddToCart = () => {
    addItem(product, currentConfig, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const relatedProducts = LUXURY_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-28 pb-24 bg-chrono-950 text-chrono-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-chrono-ivory-muted mb-8">
          <Link href="/" className="hover:text-chrono-gold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/collections" className="hover:text-chrono-gold">Collections</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-chrono-gold">{product.name}</span>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Left Column: 3D Viewer & Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Toggle: Interactive 3D Model vs 3D Photo Depth vs Photographic Gallery */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-chrono-900 border border-chrono-border text-xs font-mono">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    viewMode === '3d'
                      ? 'bg-chrono-gold text-chrono-950 font-bold shadow-md'
                      : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                  }`}
                  title="360° Real-time 3D Model Inspection"
                >
                  <Box className="w-4 h-4" />
                  <span>3D Model Studio</span>
                </button>
                <button
                  onClick={() => setViewMode('photo-3d')}
                  className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    viewMode === 'photo-3d'
                      ? 'bg-chrono-gold text-chrono-950 font-bold shadow-md'
                      : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                  }`}
                  title="Interactive 3D Depth Inspection of Official Studio Photography"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>3D Photo Inspector</span>
                </button>
                <button
                  onClick={() => setViewMode('gallery')}
                  className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    viewMode === 'gallery'
                      ? 'bg-chrono-gold text-chrono-950 font-bold shadow-md'
                      : 'text-chrono-ivory-muted hover:text-chrono-ivory'
                  }`}
                  title="High-Resolution Studio Gallery"
                >
                  <Eye className="w-4 h-4" />
                  <span>Atelier Photography</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-chrono-gold hidden md:inline-block">
                {viewMode === '3d'
                  ? 'Real-Time PBR Metallurgy & Animated Chrono'
                  : viewMode === 'photo-3d'
                  ? 'Holographic 3D Depth & Light Parallax'
                  : 'Swiss Master Studio Photography'}
              </span>
            </div>

            {/* Display Area */}
            {viewMode === '3d' ? (
              <div className="space-y-4">
                <WatchViewer3D
                  config={currentConfig}
                  cameraAngle={cameraAngle}
                  heightClass="h-[460px] sm:h-[560px] lg:h-[620px]"
                  interactive={true}
                  autoRotate={false}
                  onAngleChange={setCameraAngle}
                  imageUrl={product.primaryImage}
                />
              </div>
            ) : viewMode === 'photo-3d' ? (
              <div className="space-y-4">
                {/* 3D Photo Depth Viewer */}
                <div
                  className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px] rounded-2xl overflow-hidden bg-chrono-950 border border-chrono-border flex items-center justify-center cursor-crosshair select-none"
                  onMouseMove={handlePhotoMouseMove}
                  onMouseEnter={() => setIsPhotoHovered(true)}
                  onMouseLeave={() => {
                    setIsPhotoHovered(false);
                    setPhotoTilt({ x: 0, y: 0 });
                  }}
                  style={{ perspective: 1200 }}
                >
                  {/* Background Radial Ambiance */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(203,178,107,0.12)_0%,transparent_70%)]" />

                  {/* 3D Tilted Photo Stage */}
                  <div
                    className="relative w-full h-full max-w-2xl max-h-[92%] transition-transform duration-150 ease-out flex items-center justify-center p-6"
                    style={{
                      transform: isPhotoHovered
                        ? `rotateX(${photoTilt.x}deg) rotateY(${photoTilt.y}deg) scale(${photoZoom})`
                        : `rotateX(0deg) rotateY(0deg) scale(${photoZoom})`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-chrono-gold/30">
                      <Image
                        src={product.galleryImages[selectedGalleryIdx] || product.primaryImage}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-contain object-center drop-shadow-2xl"
                      />

                      {/* Real-time 3D Specular Glare Reflection following cursor */}
                      {isPhotoHovered && (
                        <div
                          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity duration-150"
                          style={{
                            background: `radial-gradient(circle at ${(photoTilt.y / 22 + 0.5) * 100}% ${(photoTilt.x / -22 + 0.5) * 100}%, rgba(255, 250, 230, 0.95) 0%, rgba(203, 178, 107, 0.3) 30%, transparent 65%)`,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Top-Left Mode Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-mono bg-chrono-950/85 backdrop-blur-md border border-chrono-gold/40 text-chrono-gold flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      3D Photo Depth
                    </span>
                  </div>

                  {/* Bottom Center Interaction Guide */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-[10px] font-mono tracking-widest uppercase text-chrono-ivory-muted bg-chrono-950/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-chrono-border shadow-xl">
                    Move cursor across dial to inspect 3D depth & crystal sheen
                  </div>

                  {/* Bottom-Right Zoom & Reset Controls */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-chrono-950/90 backdrop-blur-md border border-chrono-border shadow-xl">
                    <button
                      type="button"
                      onClick={() => setPhotoZoom(Math.max(0.85, photoZoom - 0.2))}
                      className="p-1.5 rounded-lg text-chrono-ivory-muted hover:text-chrono-gold transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-mono px-1.5 text-chrono-gold">
                      {Math.round(photoZoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setPhotoZoom(Math.min(1.8, photoZoom + 0.2))}
                      className="p-1.5 rounded-lg text-chrono-ivory-muted hover:text-chrono-gold transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoZoom(1);
                        setPhotoTilt({ x: 0, y: 0 });
                      }}
                      className="p-1.5 rounded-lg text-chrono-ivory-muted hover:text-chrono-ivory transition-colors"
                      title="Reset 3D View"
                    >
                      <Compass className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails to choose photo */}
                <div className="flex gap-3">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`relative w-24 h-24 rounded-xl overflow-hidden border transition-all ${
                        selectedGalleryIdx === idx
                          ? 'border-chrono-gold ring-2 ring-chrono-gold/50 shadow-lg'
                          : 'border-chrono-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px] rounded-2xl overflow-hidden bg-chrono-900 border border-chrono-border">
                  <Image
                    src={product.galleryImages[selectedGalleryIdx] || product.primaryImage}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`relative w-24 h-24 rounded-xl overflow-hidden border transition-all ${
                        selectedGalleryIdx === idx
                          ? 'border-chrono-gold ring-1 ring-chrono-gold'
                          : 'border-chrono-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Specs & Add to Bag (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold block mb-2">
                {product.collection}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chrono-ivory mb-2">
                {product.name}
              </h1>
              <p className="text-xs font-mono text-chrono-ivory-muted mb-4">
                Ref. CH-{product.id.toUpperCase()} • Calibre {product.specs.movementCalibre.split(' ')[0]}
              </p>
              <div className="text-3xl font-mono text-chrono-gold font-bold">
                {formatINR(calculatedPrice)}
              </div>
              <p className="text-xs text-chrono-ivory-muted mt-1">
                Inclusive of 18% Swiss luxury VAT/GST & armored white-glove courier transit.
              </p>
            </div>

            <p className="text-sm text-chrono-ivory-muted leading-relaxed border-t border-chrono-border pt-4">
              {product.description}
            </p>

            {/* Quick Material Variant Options */}
            <div className="space-y-4 pt-2 border-t border-chrono-border">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory block mb-2">
                  Case Metallurgy: <span className="text-chrono-gold capitalize">{caseMat}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'steel' as CaseMaterial, label: '316L Steel' },
                    { id: 'black-steel' as CaseMaterial, label: 'DLC Noir' },
                    { id: 'gold' as CaseMaterial, label: '18k Gold' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setCaseMat(m.id)}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono transition-colors ${
                        caseMat === m.id
                          ? 'border-chrono-gold bg-chrono-gold/10 text-chrono-gold font-bold'
                          : 'border-chrono-border bg-chrono-900 text-chrono-ivory-muted hover:text-chrono-ivory'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory block mb-2">
                  Sunburst Dial: <span className="text-chrono-gold capitalize">{dialCol}</span>
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'black' as DialColor, label: 'Noir' },
                    { id: 'white' as DialColor, label: 'Cream' },
                    { id: 'navy' as DialColor, label: 'Navy' },
                    { id: 'green' as DialColor, label: 'Emerald' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDialCol(d.id)}
                      className={`py-2 rounded-xl border text-xs font-mono transition-colors capitalize ${
                        dialCol === d.id
                          ? 'border-chrono-gold bg-chrono-gold/10 text-chrono-gold font-bold'
                          : 'border-chrono-border bg-chrono-900 text-chrono-ivory-muted hover:text-chrono-ivory'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-chrono-ivory block mb-2">
                  Strap: <span className="text-chrono-gold capitalize">{strapTy}</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'leather' as StrapType, label: 'Leather' },
                    { id: 'metal' as StrapType, label: 'Oyster Metal' },
                    { id: 'rubber' as StrapType, label: 'FKM Rubber' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setStrapTy(st.id)}
                      className={`py-2 rounded-xl border text-xs font-mono transition-colors capitalize ${
                        strapTy === st.id
                          ? 'border-chrono-gold bg-chrono-gold/10 text-chrono-gold font-bold'
                          : 'border-chrono-border bg-chrono-900 text-chrono-ivory-muted hover:text-chrono-ivory'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div className="pt-4 border-t border-chrono-border space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-chrono-border rounded-xl px-3 py-3 bg-chrono-900">
                  <span className="text-xs font-mono text-chrono-ivory-muted mr-3">Quantity:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-chrono-ivory-muted hover:text-chrono-ivory px-2"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs px-2 font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-chrono-ivory-muted hover:text-chrono-ivory px-2"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-xl bg-chrono-gold hover:bg-chrono-gold-light text-chrono-950 font-bold text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 transition-all shadow-xl"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950 font-bold" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Link to Full 3D Customizer */}
              <Link
                href="/customize"
                className="w-full py-3 rounded-xl border border-chrono-border hover:border-chrono-gold text-chrono-ivory text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors bg-chrono-900/60"
              >
                <Sliders className="w-4 h-4 text-chrono-gold" />
                <span>Open in 3D Customizer Studio (Laser Engraving)</span>
              </Link>
            </div>

            {/* Trust Assurance */}
            <div className="p-4 rounded-xl bg-chrono-900/80 border border-chrono-border space-y-2 text-xs text-chrono-ivory-muted font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-chrono-gold" />
                <span>5-Year International Manufacture Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-chrono-gold" />
                <span>Complimentary Armored Courier with GPS Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-chrono-gold" />
                <span>14-Day Complimentary Inspection & Return Policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="mb-20">
          <div className="border-b border-chrono-border pb-4 mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold block mb-1">
              Horological Engineering
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chrono-ivory">
              Technical Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs font-mono">
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Case Diameter</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.caseDiameter}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Manufacture Calibre</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.movementCalibre}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Case Thickness</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.caseThickness}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Oscillation Frequency</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.frequency}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Lug to Lug</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.lugToLug}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Power Reserve</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.powerReserve}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Water Resistance</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.waterResistance}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60">
              <span className="text-chrono-ivory-muted">Jewels Count</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.jewels} Functional Rubies</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60 md:col-span-2">
              <span className="text-chrono-ivory-muted">Crystal Glass</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.crystal}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-chrono-border/60 md:col-span-2">
              <span className="text-chrono-ivory-muted">Caseback</span>
              <span className="text-chrono-ivory font-semibold">{product.specs.caseback}</span>
            </div>
          </div>
        </div>

        {/* Collector Reviews */}
        <div className="mb-20">
          <div className="border-b border-chrono-border pb-4 mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold block mb-1">
                Proven Provenance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chrono-ivory">
                Collector Reviews ({product.reviews.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-chrono-ivory-muted">
              *Demonstration client testimonials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-chrono-900 border border-chrono-border space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-chrono-gold">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-chrono-gold" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-chrono-ivory-muted">{rev.date}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-chrono-ivory">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-chrono-ivory-muted leading-relaxed italic">
                  "{rev.comment}"
                </p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-chrono-border/60">
                  <span className="text-chrono-ivory font-medium">{rev.author} ({rev.location})</span>
                  <span className="text-[10px] font-mono text-emerald-400">Verified Collector</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Watches */}
        <div>
          <div className="border-b border-chrono-border pb-4 mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-chrono-gold block mb-1">
              Explore More
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chrono-ivory">
              Related Masterpieces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onQuickView={(p) => setModalProduct(p)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3D Quick View Modal */}
      <WatchViewerModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
