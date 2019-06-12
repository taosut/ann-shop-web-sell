import { Component, Input } from '@angular/core';
import { ProductFeaturesSection, ProductReview, Product } from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent {
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews' = 'description';
    @Input() product: Product;

    specification: ProductFeaturesSection[] = specification;
    reviews: ProductReview[] = reviews;

    constructor() { }
}
