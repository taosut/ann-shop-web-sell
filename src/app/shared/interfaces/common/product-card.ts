import { ProductBadge } from './product-bage';
import { Thumbnail } from './thumbnail';
import { Color } from './color';
import { Size } from './size';


export interface ProductCard {
  productID: number;
  name: string;
  sku: string;
  slug: string;
  materials: string;
  colors: Color[];
  sizes: Size[];
  badge: ProductBadge;
  availability: boolean;
  thumbnails: Thumbnail[];
  regularPrice: number;
  oldPrice: number;
  retailPrice: number;
  content: string;
}
