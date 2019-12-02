import { ProductSortKind } from '../../common/product-sort-kind';

export interface TagPageFilter {
  tagSlug: string;
  priceMin: number;
  priceMax: number;
  productSort: ProductSortKind | 0;
  page: number;
  limit: number;
}
