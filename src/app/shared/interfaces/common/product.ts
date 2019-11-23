import { ProductBadge } from './product-bage';
import { Color } from './color';
import { Size } from './size';
import { Thumbnail } from './thumbnail';


export interface Product {
  id: number;
  categoryName: string;
  categorySlug: string;
  name: string;
  sku: string;
  avatar: string;
  thumbnails: Thumbnail[];
  materials: string;
  regularPrice: number;
  odlPrice: number;
  retailPrice: number;
  content: string;
  slug: string;
  images: string[];
  colors: Color[];
  sizes: Size[];
  badge: ProductBadge;
}
