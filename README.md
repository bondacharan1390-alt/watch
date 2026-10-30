# CHRONO — The Art of Time
### *Manufacture de Haute Horlogerie Suisse & Interactive 3D Watch Studio*

**CHRONO** is a production-grade, immersive luxury watch e-commerce experience and 3D watch customization platform inspired by independent Swiss watchmaking ateliers in Le Locle.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js / React Three Fiber / @react-three/drei**, and **Zustand**.

---

## 1. Features & Architectural Highlights

### 🌟 Interactive 3D Watch Viewer & Engine
- **Procedural PBR Metallurgy**: Real-time rendering of 316L Brushed Steel, DLC Obsidian Noir, and 18k Champagne Gold with physically-based metalness, roughness, clearcoat, and studio reflections.
- **Micro-Engineered Dial Details**: 12 applied faceted hour batons with Super-LumiNova® inserts, diamond-cut hands, continuous sweeping mechanical central seconds hand, and sub-dials.
- **Open-Heart / Tourbillon Bridge**: Animated oscillating balance wheel and tourbillon carriage.
- **Exhibition Sapphire Caseback**: 22k gold winding rotor with Côte de Genève finishing that reacts to motion, revealing custom user laser inscriptions engraved in real time on the sapphire retaining ring.
- **Smooth Camera Transitions**: Quick angle selectors for **360° Hero**, **Dial**, **Profile**, **Strap**, and **Exhibition Caseback**.
- **Studio Lighting Modes**: Preset switchers for Swiss Studio, Dramatic Rim Light, and Warm Champagne Gold illumination.
- **Custom Model Compatibility**: Drop any `.glb` or `.gltf` model into `public/models/watch.glb` for automatic detection, with robust procedural fallback.

### 🎨 3D Bespoke Watch Customization Studio (`/customize`)
- Select base watch architectures.
- Dynamically toggle **Case Metallurgy** (Steel, DLC Noir, 18k Gold).
- Change **Sunburst Dial Colors** (Obsidian Noir, Grand Feu Cream, Royal Navy, Racing Emerald).
- Toggle **Dial Architecture** (Classic Three-Hand, Tri-Compax Chronograph, Skeleton Tourbillon).
- Select **Strap Types** (Hand-Stitched Alligator Leather, 3-Link Oyster Metal Bracelet, High-Density FKM Rubber).
- **Personalized Exhibition Caseback Laser Engraving**: Type custom text (up to 18 characters) and immediately watch it appear engraved on the 3D exhibition caseback ring.
- **Real-Time Dynamic Pricing**: Computes base watch price + material deltas + engraving fees in INR (`₹`).
- Directly commission and add configured timepieces into the shopping bag with preserved specifications.

### 🛍️ Luxury Shopping Experience & Cart
- Slide-out luxury shopping bag drawer with quantity counters and configuration breakdowns.
- Dedicated `/cart` review page.
- Persistent state using local storage.
- Real-time tax (18% Swiss luxury VAT/GST) and complimentary armored courier calculation.

### 💳 Secure Checkout & Stripe Test Mode Simulator (`/checkout`)
- Collector contact and credentials form.
- Armored courier delivery address with white-glove transit guarantee.
- Stripe test mode card simulator and Swiss Private Bank Wire options.
- Server-side route handler validation (`/api/checkout`).
- Confetti celebration modal upon successful allocation with assigned Swiss Order Protocol numbers (`CHRONO-2026-XXXX`).

---

## 2. Project Structure

```text
watch/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts       # Server-side checkout & order validation
│   │   ├── newsletter/route.ts     # Gazette subscriber endpoint
│   │   └── products/route.ts       # Products catalog API
│   ├── cart/page.tsx               # Dedicated Cart Review
│   ├── checkout/page.tsx           # Multi-step Checkout & Celebration Modal
│   ├── collections/page.tsx        # Catalog with search, filters & 3D quick view
│   ├── craftsmanship/page.tsx      # Haute Horlogerie & metallurgy dossier
│   ├── customize/page.tsx          # Real-Time 3D Customization Studio
│   ├── journal/page.tsx            # Horological magazine essays
│   ├── our-story/page.tsx          # Le Locle heritage & chronicle
│   ├── products/[slug]/page.tsx    # Dynamic Product Detail Page (3D & Gallery)
│   ├── globals.css                 # Dark luxury styling & keyframes
│   ├── layout.tsx                  # Root layout with Cinzel & Inter typography
│   └── page.tsx                    # Full-screen Cinematic Homepage
├── components/
│   ├── 3d/
│   │   ├── ProceduralWatchModel.tsx # Procedural 3D luxury watch model
│   │   ├── WatchViewer3D.tsx        # Three.js / R3F interactive canvas
│   │   └── WatchViewerModal.tsx     # Quick 3D inspection modal
│   ├── home/
│   │   ├── BrandPhilosophy.tsx      # 4 Pillars & Horological Metrics
│   │   ├── ConfiguratorBanner.tsx   # 3D Studio Teaser
│   │   ├── CraftsmanshipShowcase.tsx# Materials, Sapphire & Calibre showcase
│   │   ├── FeaturedCollection.tsx   # Curated Flagships
│   │   ├── Hero3D.tsx               # Cinematic 3D Hero Section
│   │   ├── JournalPreview.tsx       # Gazette articles preview
│   │   └── Testimonials.tsx         # Verified Collector Reviews
│   ├── layout/
│   │   ├── CartDrawer.tsx           # Slide-out Shopping Bag
│   │   ├── Footer.tsx               # Editorial footer & newsletter
│   │   └── Navbar.tsx               # Sticky header with search & bag badge
│   └── product/
│       └── ProductCard.tsx          # Reusable product card with 3D quick view
├── lib/
│   ├── pricing.ts                  # Configuration price deltas & formatINR
│   ├── products.ts                 # Full luxury watch catalog & specs
│   └── utils.ts                    # Class merging utilities
├── prisma/
│   └── schema.prisma               # PostgreSQL relational schema
├── public/
│   ├── models/
│   │   └── README.md               # Instructions for custom 3D GLB assets
│   ├── images/
│   └── textures/
├── store/
│   ├── cart-store.ts               # Zustand persistent shopping cart store
│   └── configurator-store.ts       # Zustand 3D customizer state store
├── types/
│   ├── configuration.ts            # Materials, colors, angles & options
│   └── product.ts                  # Products, reviews & technical specs
├── tailwind.config.js              # Custom luxury color palette & typography
├── tsconfig.json                   # TypeScript configuration
├── package.json
└── README.md
```

---

## 3. Installation & Local Development

### Prerequisites:
- Node.js `v18+` or `v20+` (tested on Node v22)
- npm or pnpm

### Quick Start:

1. Clone or navigate to the project directory:
   ```bash
   cd watch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```text
   http://localhost:3000
   ```

---

## 4. Instructions for Adding or Replacing 3D Watch Models

To replace the procedural watch with your own 3D asset:

1. Export your watch as a binary GLTF file (`.glb`).
2. Place the file inside:
   ```text
   public/models/watch.glb
   ```
3. Recommended model specifications:
   - **Polygon count**: 30,000 – 80,000 triangles for smooth 60fps rendering.
   - **Scale**: Centered at origin `(0, 0, 0)` with diameter ~`1.5` to `2.0` world units.
   - **Hierarchy node names**:
     - `Case` or `Watch_Case` (linked to Case Material).
     - `Dial` or `Watch_Dial` (linked to Dial Color).
     - `Strap` or `Watch_Strap` (linked to Strap Material).
     - `Hands` (linked to Hands rotation).
4. If no `.glb` file is detected, the engine automatically renders the procedural watch model with full interactive functionality.

---

## 5. Payment & Stripe Test Mode Integration

- The checkout page (`/checkout`) includes an end-to-end **Stripe Test Mode Simulator**.
- Submitting the form verifies the order server-side at `/api/checkout`, assigns an authentic Swiss order protocol ID, triggers confetti animations, and clears the cart.
- To connect real Stripe API keys:
  1. Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
  2. Populate `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
  3. Uncomment the Stripe webhook route in production.

---

## 6. Accessibility & Responsive Notes

- **Prefers-Reduced-Motion**: Automatically checks `(prefers-reduced-motion: reduce)` to disable floating animations and camera swoops for sensitive users.
- **GPU Throttling Protection**: Device Pixel Ratio is clamped to `[1, 2]` to prevent overheating or frame drops on high-DPI retina displays.
- **Mobile Touch Controls**: Touch rotations and pinch-to-zoom are tuned with damped inertia.
- **Semantic HTML**: Fully structured with `<header>`, `<main>`, `<section>`, `<nav>`, `<aside>`, and descriptive ARIA labels on all buttons.
