import { Variable } from './variable';
import { Thumbnail } from './thumbnail';

export interface ProductFeature {
    name: string;
    value: string;
}

export interface ProductFeaturesSection {
    name: string;
    features: ProductFeature[];
}

export interface ProductReview {
    avatar: string;
    author: string;
    rating: number;
    date: string;
    text: string;
}

export interface ProductImage {
    id: string;
    url: string;
    active: boolean;
}

export interface Product {
    id: number;
    // custom
    categoryID: number;
    categoryName: string;
    categorySlug: string;
    sku: string;
    // ----------------------------
    name: string;
    // price: number;
    // compareAtPrice: number|null;
    // ----------------------------
    // custom
    materials: string;
    avatar: string;
    thumbnails: Thumbnail[];
    colors: Variable[];
    sizes: Variable[];
    regularPrice: number;
    retailPrice: number;
    content: string;
    // ----------------------------
    // badges: ('sale'|'new'|'hot')[];
    // rating: number;
    // reviews: number;
    // custom
    quantity: number;
    // ----------------------------
    availability: boolean;
    // ----------------------------
    // features: ProductFeature[];
    // options: Array<any>;
}

export interface ProductRelated extends Product {
    color: string;
    size: string;
}

export interface ProductDetail extends Product {
    images: string[];
}
