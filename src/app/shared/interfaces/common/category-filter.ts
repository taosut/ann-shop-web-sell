import { ProductSortKind } from './product-sort-kind';

export interface CategoryFilter {
  categorySlug: string;
  productBadge: "hang-co-san" | "hang-order" | "hang-sale" | "";
  priceMin: number;
  priceMax: number;
  productSort: ProductSortKind | 0;
  page: number;
  limit: number;
}
