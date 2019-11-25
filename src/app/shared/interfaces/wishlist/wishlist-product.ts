import { ProductBadge } from '../common/product-bage';
import { Thumbnail } from '../common/thumbnail';


export interface WishlistProduct {
  productID: number;
  name: string;
  sku: string;
  thumbnails: Thumbnail[];
  regularPrice: number;
  badge: ProductBadge;
}
