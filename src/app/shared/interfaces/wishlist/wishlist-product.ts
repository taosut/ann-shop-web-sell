import { Thumbnail } from '../common/thumbnail';


export interface WishlistProduct {
  id: number;
  name: string;
  sku: string;
  thumbnails: Thumbnail[];
  availability: boolean;
  regularPrice: number
}
