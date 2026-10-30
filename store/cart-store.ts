import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';
import { WatchConfiguration } from '@/types/configuration';
import { calculateConfiguredPrice } from '@/lib/pricing';

export interface CartItem {
  id: string; // unique item id based on product + serialized config
  product: Product;
  config: WatchConfiguration;
  quantity: number;
  unitPriceINR: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, config: WatchConfiguration, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTax: () => number; // 18% GST standard luxury goods
  getShipping: () => number; // Complimentary armored courier for luxury watches > 1,00,000
  getTotal: () => number;
}

function generateCartItemId(productId: string, config: WatchConfiguration): string {
  const parts = [
    productId,
    config.caseMaterial,
    config.dialColor,
    config.strapType,
    config.strapColor,
    config.dialStyle,
    (config.engravingText || '').trim(),
  ];
  return parts.join('__');
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product: Product, config: WatchConfiguration, quantity = 1) => {
        const itemId = generateCartItemId(product.id, config);
        const unitPriceINR = calculateConfiguredPrice(product.priceINR, config);
        const existingItems = get().items;
        const existingIndex = existingItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updatedItems = [...existingItems];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems, isOpen: true });
        } else {
          const newItem: CartItem = {
            id: itemId,
            product,
            config,
            quantity,
            unitPriceINR,
          };
          set({ items: [...existingItems, newItem], isOpen: true });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.unitPriceINR * item.quantity, 0);
      },

      getTax: () => {
        // Included in luxury price display or calculated separately (18% GST)
        return Math.round(get().getSubtotal() * 0.18);
      },

      getShipping: () => {
        // Complimentary white-glove armored transit on all CHRONO orders
        return 0;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },
    }),
    {
      name: 'chrono-shopping-cart-v1',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
