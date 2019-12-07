import { ProductCard } from '../common/product-card';

export interface DownloadImage {
  product: ProductCard;
  images: {
    url: string,
    fileName: string,
    thumbnail: string,
  }[];
}
