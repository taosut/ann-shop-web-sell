import { ProductStyle } from '../common/product-style';
import { ProductBadge } from '../common/product-bage';
import { Thumbnail } from '../common/thumbnail';


export interface HomeProduct {
  productID: number;
  name: string;
  sku: string;
  kind: ProductStyle;
  thumbnails: Thumbnail[];
  regularPrice: number;
  retailPrice: number;
  slug: string;
  badge: ProductBadge;
}
