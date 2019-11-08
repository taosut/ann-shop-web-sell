import { Thumbnail } from '../common/thumbnail';


export interface SearchProductProduct {
  productID: number;
  tilte: string;
  sku: string;
  thumbnails: Thumbnail[];
  regularPrice: number;
  retailPrice: number;
  availability: boolean;
  materials: string;
  slug: string;
}