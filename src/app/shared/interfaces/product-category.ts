export interface ProductCategoryChild {
    id: number;
    title: string;
    description: string;
    slug: string;
}
export interface ProductCategory extends ProductCategoryChild {
    child: ProductCategoryChild[];
}
