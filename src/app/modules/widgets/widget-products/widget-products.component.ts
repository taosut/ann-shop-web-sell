import { Component, Input } from '@angular/core';
import { ProductProduct } from '../../../shared/interfaces/product/product-product';
import { RootService } from '../../../shared/services/root.service';

@Component({
    selector: 'app-widget-products',
    templateUrl: './widget-products.component.html',
    styleUrls: ['./widget-products.component.scss']
})
export class WidgetProductsComponent {
    @Input() header = '';
    @Input() products: ProductProduct[] = [];

    constructor(public root: RootService) { }
}
