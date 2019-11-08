export enum CategorySortKind {
  PriceAsc = 1,    // Gia tang dan
  PriceDesc = 2,    // Gia giam dan
  ModelNew = 3,    // Kieu moi nhat
  ProductNew = 4     // Hang moi ve
}

export interface CategorySort {
  key: number;
  name: string;
}
