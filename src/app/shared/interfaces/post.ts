export interface Post {
    id: number;
    title: string;
    image: string;
    content: string;
    featured: number;
    categoryID: number;
    categoryName: string;
    createdDate: Date;
}
