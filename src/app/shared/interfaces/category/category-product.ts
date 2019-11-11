import { ProductBadge } from '../common/product-bage';
import { Thumbnail } from '../common/thumbnail';


export interface CategoryProduct {
  productID: number;
  name: string;
  sku: string;
  thumbnails: Thumbnail[];
  regularPrice: number;
  retailPrice: number;
  materials: string;
  slug: string;
  badge: ProductBadge;
}
