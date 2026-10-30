import { Product } from '@/types/product';

export const LUXURY_PRODUCTS: Product[] = [
  {
    id: 'chrono-apex-42',
    slug: 'chronograph-series-apex-42',
    name: 'CHRONO Apex Chronograph 42',
    collection: 'Chronograph Series',
    tagline: 'High-frequency precision meets architectural elegance.',
    description: 'Engineered for uncompromising accuracy, the Apex Chronograph 42 features an integrated column-wheel chronograph movement operating at 36,000 vibrations per hour. The multi-layered dial showcases diamond-cut indices and a discreet tachymeter scale under anti-reflective double-domed sapphire crystal.',
    story: 'Conceived in our Le Locle workshop, the Apex Chronograph was built for pioneers who measure life in micro-fractions of a second. Every component is chamfered and polished by hand, resulting in a timepiece that commands presence on the wrist.',
    priceINR: 585000,
    primaryImage: '/images/watch-apex.jpg',
    galleryImages: [
      '/images/watch-apex.jpg',
      '/images/watch-midnight.jpg',
      '/images/watch-heritage.jpg'
    ],
    badge: 'Flagship Edition',
    specs: {
      caseDiameter: '42.0 mm',
      caseThickness: '12.4 mm',
      lugToLug: '49.0 mm',
      waterResistance: '100 meters (10 ATM)',
      movementCalibre: 'CH-9021 Auto-Chronograph',
      powerReserve: '72 Hours',
      frequency: '5 Hz (36,000 vph)',
      jewels: 35,
      crystal: 'Scratch-resistant double-curved sapphire with dual anti-reflective treatment',
      caseback: 'Exhibition sapphire crystal with 22k gold winding mass',
    },
    defaultConfig: {
      caseMaterial: 'steel',
      dialColor: 'black',
      strapType: 'leather',
      strapColor: 'black',
      dialStyle: 'chronograph',
    },
    inStock: true,
    featured: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Julian V. Belmont',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'March 14, 2026',
        title: 'Unrivaled precision and hand-finishing',
        comment: 'The mechanical actuation of the column-wheel pushers provides a tactile satisfaction unlike anything in this price bracket. The dial depth under sunlight is astonishing.',
        verifiedCollector: true,
      },
      {
        id: 'rev-2',
        author: 'Arjun Singhania',
        location: 'Mumbai, India',
        rating: 5,
        date: 'January 28, 2026',
        title: 'A true collector’s grail',
        comment: 'Delivered in an armored presentation box with certificate of chronometry. The 36,000 vph sweep of the seconds hand is hypnotic.',
        verifiedCollector: true,
      }
    ]
  },
  {
    id: 'midnight-noir-40',
    slug: 'midnight-automatic-noir-40',
    name: 'CHRONO Midnight Automatic 40',
    collection: 'Midnight Automatic',
    tagline: 'The poetry of deep obsidian darkness and luminescence.',
    description: 'Bathed in diamond-like carbon (DLC) obsidian tones, the Midnight Automatic is an exercise in subtle mastery. Hand-applied Swiss Super-LumiNova® X1 hour markers contrast against the matte charcoal dial, illuminated by subtle brushed gold accents.',
    story: 'Inspired by the quiet stillness of the Val-de-Travers midnight sky. Designed for evening gala attire as naturally as daily modern tailoring.',
    priceINR: 420000,
    primaryImage: '/images/watch-midnight.jpg',
    galleryImages: [
      '/images/watch-midnight.jpg',
      '/images/watch-apex.jpg'
    ],
    badge: 'Signature Noir',
    specs: {
      caseDiameter: '40.0 mm',
      caseThickness: '9.8 mm (Ultra-slim)',
      lugToLug: '46.5 mm',
      waterResistance: '50 meters (5 ATM)',
      movementCalibre: 'CH-4100 Ultra-Slim In-House',
      powerReserve: '65 Hours',
      frequency: '4 Hz (28,800 vph)',
      jewels: 28,
      crystal: 'Box-shaped sapphire crystal with internal anti-reflective coating',
      caseback: 'Smoked sapphire crystal exhibition back',
    },
    defaultConfig: {
      caseMaterial: 'black-steel',
      dialColor: 'black',
      strapType: 'leather',
      strapColor: 'black',
      dialStyle: 'classic',
    },
    inStock: true,
    featured: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Marcus Vance',
        location: 'London, UK',
        rating: 5,
        date: 'February 19, 2026',
        title: 'Pure understated elegance',
        comment: 'Under 10mm thick, slips effortlessly beneath a French cuff. The matte black finish does not pick up scratches even after months of daily wear.',
        verifiedCollector: true,
      }
    ]
  },
  {
    id: 'heritage-1958',
    slug: 'heritage-classic-calibre-1958',
    name: 'CHRONO Heritage Calibre 1958',
    collection: 'Heritage Classic',
    tagline: 'An homage to the golden century of mechanical watchmaking.',
    description: 'Evoking the timeless proportions of mid-century horology, the Heritage 1958 features curved feuille hands, vintage typography, and a warm cream lacquered dial encased in polished 18k champagne gold or marine-grade 316L steel.',
    story: 'Preserving historical watchmaking archives from our founding artisans in Neuchâtel. Each dial is oven-fired using traditional grand feu enameling techniques.',
    priceINR: 690000,
    primaryImage: '/images/watch-heritage.jpg',
    galleryImages: [
      '/images/watch-heritage.jpg',
      '/images/watch-skeleton.jpg'
    ],
    badge: 'Grand Heritage',
    specs: {
      caseDiameter: '39.0 mm (Classic Proportions)',
      caseThickness: '10.5 mm',
      lugToLug: '45.0 mm',
      waterResistance: '30 meters (3 ATM)',
      movementCalibre: 'CH-1958 Manual-Wind Heritage',
      powerReserve: '55 Hours',
      frequency: '3 Hz (21,600 vph)',
      jewels: 21,
      crystal: 'High-dome sapphire crystal',
      caseback: 'Closed screw-down caseback with hand-engraved coat of arms or exhibition option',
    },
    defaultConfig: {
      caseMaterial: 'gold',
      dialColor: 'white',
      strapType: 'leather',
      strapColor: 'brown',
      dialStyle: 'classic',
    },
    inStock: true,
    featured: true,
    reviews: [
      {
        id: 'rev-4',
        author: 'Henri Delacroix',
        location: 'Paris, France',
        rating: 5,
        date: 'December 22, 2025',
        title: 'Pure Haute Horlogerie',
        comment: 'The winding feel of the CH-1958 manual movement is buttery smooth with precise clicks. The cream dial has a warmth no computer screen can fully capture.',
        verifiedCollector: true,
      }
    ]
  },
  {
    id: 'ocean-diver-300',
    slug: 'ocean-diver-thalassa-300m',
    name: 'CHRONO Ocean Diver Thalassa',
    collection: 'Ocean Diver',
    tagline: 'Engineered for the abyss. Tested in abyssal depths.',
    description: 'A professional maritime tool watch rated to 300 meters. Equipped with a unidirectional 120-click ceramic bezel, helium escape valve, and deep royal navy dial with luminescent markers legible in deep waters.',
    story: 'Tested during extreme marine expeditions in the Mediterranean and North Sea. The case is machined from corrosion-resistant austenitic 904L stainless steel.',
    priceINR: 520000,
    primaryImage: '/images/watch-aqua.jpg',
    galleryImages: [
      '/images/watch-aqua.jpg',
      '/images/watch-apex.jpg'
    ],
    badge: 'ISO 6425 Certified',
    specs: {
      caseDiameter: '42.5 mm',
      caseThickness: '13.2 mm',
      lugToLug: '49.8 mm',
      waterResistance: '300 meters (30 ATM)',
      movementCalibre: 'CH-8000 Maritime Calibre',
      powerReserve: '70 Hours',
      frequency: '4 Hz (28,800 vph)',
      jewels: 31,
      crystal: '4.2mm extra-thick sapphire with internal anti-reflective coating',
      caseback: 'Solid engraved 904L steel with Thalassa maritime trident insignia',
    },
    defaultConfig: {
      caseMaterial: 'steel',
      dialColor: 'navy',
      strapType: 'rubber',
      strapColor: 'navy',
      dialStyle: 'classic',
    },
    inStock: true,
    featured: false,
    reviews: [
      {
        id: 'rev-5',
        author: 'Capt. Thomas Lindqvist',
        location: 'Oslo, Norway',
        rating: 5,
        date: 'January 10, 2026',
        title: 'Rugged yet remarkably refined',
        comment: 'Took this on multiple dive ascents down to 45m. Perfect legibility in murky cold waters and transitions seamlessly to a dinner jacket.',
        verifiedCollector: true,
      }
    ]
  },
  {
    id: 'titanium-edge-41',
    slug: 'titanium-edge-aero-41',
    name: 'CHRONO Titanium Edge Aëro 41',
    collection: 'Titanium Edge',
    tagline: 'Ultralight Grade 5 aerospace titanium with razor-sharp facets.',
    description: 'Weighing only 78 grams including bracelet, the Titanium Edge is sculpted from Grade 5 titanium—an alloy twice as strong as steel yet half the weight. Micro-sandblasted surfaces juxtaposed with mirror-polished beveled edges.',
    story: 'Developed alongside aerospace aerodynamics engineers to eliminate wrist fatigue during high-g travel and dynamic pursuits.',
    priceINR: 640000,
    primaryImage: '/images/watch-celestial.jpg',
    galleryImages: [
      '/images/watch-celestial.jpg',
      '/images/watch-skeleton.jpg'
    ],
    badge: 'Aerospace Grade 5',
    specs: {
      caseDiameter: '41.0 mm',
      caseThickness: '10.8 mm',
      lugToLug: '47.2 mm',
      waterResistance: '150 meters (15 ATM)',
      movementCalibre: 'CH-6300 Ultralight Skeletonised',
      powerReserve: '80 Hours',
      frequency: '4 Hz (28,800 vph)',
      jewels: 33,
      crystal: 'Flat anti-scratch sapphire crystal with 9-layer anti-reflective coating',
      caseback: 'Exhibition sapphire framed in Grade 5 Titanium',
    },
    defaultConfig: {
      caseMaterial: 'steel',
      dialColor: 'green',
      strapType: 'metal',
      strapColor: 'steel',
      dialStyle: 'classic',
    },
    inStock: true,
    featured: false,
    reviews: [
      {
        id: 'rev-6',
        author: 'Siddharth Mehra',
        location: 'Bengaluru, India',
        rating: 5,
        date: 'February 3, 2026',
        title: 'Featherlight with astonishing architecture',
        comment: 'You forget you are wearing a timepiece until the facets catch ambient lighting. The green sunburst dial is subtle indoors and magnificent outside.',
        verifiedCollector: true,
      }
    ]
  },
  {
    id: 'royal-skeleton-43',
    slug: 'royal-skeleton-tourbillon-43',
    name: 'CHRONO Royal Skeleton Tourbillon',
    collection: 'Royal Skeleton',
    tagline: 'High complications laid bare. The open heart of Swiss horology.',
    description: 'An open-worked masterpiece featuring an exposed 60-second flying tourbillon cage at 6 o’clock. Every bridge, lever, and wheel is hand-beveled with Anglage and black-polished by master watchmakers.',
    story: 'Requiring over 180 hours of meticulous hand-crafting per movement, the Royal Skeleton Tourbillon is limited to only 25 individually numbered pieces per year.',
    priceINR: 1480000,
    primaryImage: '/images/watch-skeleton.jpg',
    galleryImages: [
      '/images/watch-skeleton.jpg',
      '/images/watch-celestial.jpg'
    ],
    badge: 'Grand Complication',
    specs: {
      caseDiameter: '43.0 mm',
      caseThickness: '12.0 mm',
      lugToLug: '50.0 mm',
      waterResistance: '50 meters (5 ATM)',
      movementCalibre: 'CH-01 Tourbillon Squelette Hand-Wound',
      powerReserve: '100 Hours (Twin Barrel)',
      frequency: '3 Hz (21,600 vph)',
      jewels: 42,
      crystal: 'Curved sapphire crystal with multi-layer AR coating',
      caseback: 'Full exhibition back displaying titanium bridges and gold train wheels',
    },
    defaultConfig: {
      caseMaterial: 'gold',
      dialColor: 'black',
      strapType: 'leather',
      strapColor: 'black',
      dialStyle: 'skeleton',
    },
    inStock: true,
    featured: true,
    reviews: [
      {
        id: 'rev-7',
        author: 'Dr. Evelyn Sterling',
        location: 'Zurich, Switzerland',
        rating: 5,
        date: 'January 15, 2026',
        title: 'Horological art at its pinnacle',
        comment: 'Watching the flying tourbillon compensate for earth gravity through the crystal dial is pure mechanical ballet. An heirloom piece.',
        verifiedCollector: true,
      }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return LUXURY_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return LUXURY_PRODUCTS.find((p) => p.id === id);
}

export function getAllCollections(): string[] {
  return Array.from(new Set(LUXURY_PRODUCTS.map((p) => p.collection)));
}
