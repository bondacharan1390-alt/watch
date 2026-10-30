export type CaseMaterial = 'steel' | 'gold' | 'black-steel';
export type DialColor = 'black' | 'white' | 'navy' | 'green';
export type StrapType = 'leather' | 'metal' | 'rubber';
export type StrapColor = 'black' | 'brown' | 'navy' | 'steel' | 'gold';
export type DialStyle = 'classic' | 'chronograph' | 'skeleton';
export type CameraAngle = 'dial' | 'profile' | 'strap' | 'caseback' | 'hero';

export interface WatchConfiguration {
  modelId: string;
  modelName: string;
  caseMaterial: CaseMaterial;
  dialColor: DialColor;
  strapType: StrapType;
  strapColor: StrapColor;
  dialStyle: DialStyle;
  engravingText: string;
  engravingFont?: 'classic' | 'modern' | 'script';
}

export interface ConfigurationPricingDelta {
  caseMaterial: Record<CaseMaterial, number>;
  dialColor: Record<DialColor, number>;
  strapType: Record<StrapType, number>;
  engraving: number;
}
