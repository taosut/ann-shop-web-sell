export enum SearchProductSortKind {
  PriceAsc = 1,    // Gia tang dan
  PriceDesc = 2,    // Gia giam dan
  ModelNew = 3,    // Kieu moi nhat
  ProductNew = 4     // Hang moi ve
}

export interface SearchProductSort {
  key: number;
  name: string;
}
