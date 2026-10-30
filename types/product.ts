export interface WatchSpecification {
  caseDiameter: string;
  caseThickness: string;
  lugToLug: string;
  waterResistance: string;
  movementCalibre: string;
  powerReserve: string;
  frequency: string;
  jewels: number;
  crystal: string;
  caseback: string;
}

export interface WatchReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedCollector: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  tagline: string;
  description: string;
  story: string;
  priceINR: number;
  primaryImage: string;
  galleryImages: string[];
  modelAssetUrl?: string; // Optional custom GLB url
  badge?: string; // e.g. "Limited Edition", "Flagship", "New Release"
  specs: WatchSpecification;
  defaultConfig: {
    caseMaterial: 'steel' | 'gold' | 'black-steel';
    dialColor: 'black' | 'white' | 'navy' | 'green';
    strapType: 'leather' | 'metal' | 'rubber';
    strapColor: 'black' | 'brown' | 'navy' | 'steel' | 'gold';
    dialStyle: 'classic' | 'chronograph' | 'skeleton';
  };
  inStock: boolean;
  featured: boolean;
  reviews: WatchReview[];
}
