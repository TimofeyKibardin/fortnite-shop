import { api } from './client';
import { buildApiUrl } from '../shared/config/config';

export interface ItemAssets {
    full_background: string
}

export interface ItemPrice {
    regularPrice: number,
    finalPrice: number
}

export interface ItemRarity {
    id: string,
    name: string
}

export interface ShopItems {
  mainId: string;
  displayName: string;
  rarity?: ItemRarity;
  price?: ItemPrice;
  full_background?: ItemAssets[];
}

export interface ShopResponse {
  result: boolean;
  lastUpdate?: string;
  shop: ShopItems[];
}


export async function getShop(lang: 'en' | 'ru' = 'en') {
    const { data } = await api.get(buildApiUrl('shop'), {
        params: { lang }
    });
    return data as ShopResponse;
}