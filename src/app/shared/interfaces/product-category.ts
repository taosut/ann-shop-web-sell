export interface ProductCategoryChild {
    id: number;
    title: string;
    description: string;
}
export interface ProductCategory extends ProductCategoryChild {
    child: ProductCategoryChild[];
}
