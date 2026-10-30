import { create } from 'zustand';
import { CaseMaterial, DialColor, StrapType, StrapColor, DialStyle, CameraAngle, WatchConfiguration } from '@/types/configuration';
import { LUXURY_PRODUCTS } from '@/lib/products';
import { Product } from '@/types/product';

interface ConfiguratorStore {
  selectedProduct: Product;
  config: WatchConfiguration;
  cameraAngle: CameraAngle;
  autoRotate: boolean;
  lightingPreset: 'studio' | 'dramatic' | 'warm-gold';
  isWireframe: boolean;

  setSelectedProduct: (product: Product) => void;
  setCaseMaterial: (material: CaseMaterial) => void;
  setDialColor: (color: DialColor) => void;
  setStrapType: (strapType: StrapType) => void;
  setStrapColor: (color: StrapColor) => void;
  setDialStyle: (style: DialStyle) => void;
  setEngravingText: (text: string) => void;
  setCameraAngle: (angle: CameraAngle) => void;
  toggleAutoRotate: () => void;
  setLightingPreset: (preset: 'studio' | 'dramatic' | 'warm-gold') => void;
  toggleWireframe: () => void;
  resetConfig: () => void;
}

const defaultProduct = LUXURY_PRODUCTS[0];

export const useConfiguratorStore = create<ConfiguratorStore>((set, get) => ({
  selectedProduct: defaultProduct,
  config: {
    modelId: defaultProduct.id,
    modelName: defaultProduct.name,
    caseMaterial: defaultProduct.defaultConfig.caseMaterial,
    dialColor: defaultProduct.defaultConfig.dialColor,
    strapType: defaultProduct.defaultConfig.strapType,
    strapColor: defaultProduct.defaultConfig.strapColor,
    dialStyle: defaultProduct.defaultConfig.dialStyle,
    engravingText: '',
  },
  cameraAngle: 'hero',
  autoRotate: true,
  lightingPreset: 'studio',
  isWireframe: false,

  setSelectedProduct: (product: Product) =>
    set({
      selectedProduct: product,
      config: {
        modelId: product.id,
        modelName: product.name,
        caseMaterial: product.defaultConfig.caseMaterial,
        dialColor: product.defaultConfig.dialColor,
        strapType: product.defaultConfig.strapType,
        strapColor: product.defaultConfig.strapColor,
        dialStyle: product.defaultConfig.dialStyle,
        engravingText: '',
      },
    }),

  setCaseMaterial: (material: CaseMaterial) => {
    // Also intelligently harmonize strap if strap is metal
    const current = get().config;
    let newStrapColor = current.strapColor;
    if (current.strapType === 'metal') {
      newStrapColor = material === 'gold' ? 'gold' : 'steel';
    }
    set({
      config: {
        ...current,
        caseMaterial: material,
        strapColor: newStrapColor,
      },
    });
  },

  setDialColor: (color: DialColor) =>
    set((state) => ({ config: { ...state.config, dialColor: color } })),

  setStrapType: (strapType: StrapType) => {
    const current = get().config;
    let defaultColor: StrapColor = 'black';
    if (strapType === 'metal') {
      defaultColor = current.caseMaterial === 'gold' ? 'gold' : 'steel';
    } else if (strapType === 'rubber') {
      defaultColor = current.dialColor === 'navy' ? 'navy' : 'black';
    }
    set({
      config: {
        ...current,
        strapType,
        strapColor: defaultColor,
      },
    });
  },

  setStrapColor: (color: StrapColor) =>
    set((state) => ({ config: { ...state.config, strapColor: color } })),

  setDialStyle: (style: DialStyle) =>
    set((state) => ({ config: { ...state.config, dialStyle: style } })),

  setEngravingText: (text: string) =>
    set((state) => ({
      config: {
        ...state.config,
        engravingText: text.slice(0, 18).toUpperCase(), // limit to 18 uppercase chars for caseback
      },
    })),

  setCameraAngle: (angle: CameraAngle) => set({ cameraAngle: angle }),

  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),

  setLightingPreset: (preset) => set({ lightingPreset: preset }),

  toggleWireframe: () => set((state) => ({ isWireframe: !state.isWireframe })),

  resetConfig: () => {
    const prod = get().selectedProduct;
    set({
      config: {
        modelId: prod.id,
        modelName: prod.name,
        caseMaterial: prod.defaultConfig.caseMaterial,
        dialColor: prod.defaultConfig.dialColor,
        strapType: prod.defaultConfig.strapType,
        strapColor: prod.defaultConfig.strapColor,
        dialStyle: prod.defaultConfig.dialStyle,
        engravingText: '',
      },
      cameraAngle: 'hero',
    });
  },
}));
