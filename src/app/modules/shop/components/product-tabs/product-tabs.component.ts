import { Component, Input } from '@angular/core';
import { ProductFeaturesSection, ProductReview, ProductDetail } from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent{
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews' = 'description';
    @Input() product: ProductDetail;

    specification: ProductFeaturesSection[] = specification;
    reviews: ProductReview[] = reviews;

    constructor() { }

    get content(): string {
        if (this.product)
        {
            let content: string = this.product.content ? `${this.product.content}<br/>` : "";
            let contentImages: string[] = content.match(/\/[a-zA-Z0-9\/\-\.]+\w/g) || [];

            this.product.images
                .filter(item => !(item in contentImages) )
                .forEach((item: string) => {
                    let regex: string[] = item.match(/([a-z0-9\-\.]+)$/g) || [];
                    let alt: string = regex.length ? regex[1] : "";

                    content += `<img alt="${alt}" class="img-download" src="${item}"><br/>`;
                });

            return content;
        }
        else
        {
            return "";
        }
    }
}
