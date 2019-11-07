import { ProductStyle } from '../common/product-style';
import { Thumbnail } from '../common/thumbnail';


export interface CategoryProduct {
  productID: number;
  tilte: string;
  sku: string;
  kind: ProductStyle;
  thumbnails: Thumbnail[];
  regularPrice: number;
  retailPrice: number;
  availability: boolean;
  materials: string;
  slug: string;
}
