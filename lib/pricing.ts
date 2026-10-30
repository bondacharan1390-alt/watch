import { CaseMaterial, DialColor, StrapType, WatchConfiguration, ConfigurationPricingDelta } from '@/types/configuration';

export const CONFIGURATION_DELTAS: ConfigurationPricingDelta = {
  caseMaterial: {
    steel: 0,
    'black-steel': 35000,
    gold: 145000,
  },
  dialColor: {
    black: 0,
    white: 0,
    navy: 12000,
    green: 18000,
  },
  strapType: {
    leather: 0,
    rubber: -8000,
    metal: 28000,
  },
  engraving: 15000,
};

export function calculateConfiguredPrice(basePriceINR: number, config: WatchConfiguration): number {
  let total = basePriceINR;
  total += CONFIGURATION_DELTAS.caseMaterial[config.caseMaterial] || 0;
  total += CONFIGURATION_DELTAS.dialColor[config.dialColor] || 0;
  total += CONFIGURATION_DELTAS.strapType[config.strapType] || 0;
  if (config.engravingText && config.engravingText.trim().length > 0) {
    total += CONFIGURATION_DELTAS.engraving;
  }
  return total;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
