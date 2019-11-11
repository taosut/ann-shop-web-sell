import { ProductBadge } from '../common/product-bage';
import { ProductColor } from './product-color';
import { ProductSize } from './product-size';
import { Thumbnail } from '../common/thumbnail';


export interface ProductProduct {
  id: number;
  categoryName: string;
  categorySlug: string;
  name: string;
  sku: string;
  avatar: string;
  thumbnails: Thumbnail[];
  materials: string;
  regularPrice: number;
  retailPrice: number;
  content: string;
  slug: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  badge: ProductBadge;
}
