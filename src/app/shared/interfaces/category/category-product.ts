import { Thumbnail } from '../common/thumbnail';


export interface CategoryProduct {
  productID: number;
  name: string;
  sku: string;
  thumbnails: Thumbnail[];
  regularPrice: number;
  retailPrice: number;
  availability: boolean;
  materials: string;
  slug: string;
}
