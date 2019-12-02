import { ProductSortKind } from '../../common/product-sort-kind';

export interface ProductNewPageFilter {
  productBadge: "hang-co-san" | "hang-order" | "hang-sale" | "";
  priceMin: number;
  priceMax: number;
  productSort: ProductSortKind | 0;
  page: number;
  limit: number;
}
