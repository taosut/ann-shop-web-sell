import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../shared/interfaces/product';

@Component({
    selector: 'app-block-products',
    templateUrl: './block-products.component.html',
    styleUrls: ['./block-products.component.scss']
})
export class BlockProductsComponent implements OnInit {
    @Input() header: string;
    @Input() layout: 'large-first'|'large-last' = 'large-first';
    @Input() products: any[] = [];
    @Input() categoryID: number = 0;

    _limit: number = 7;

    get large(): any {
        if (this.layout === 'large-first' && this.products.length > 0) {
            return this.products[0];
        } else if (this.layout === 'large-last' && this.products.length > 6) {
            return this.products[6];
        }

        return null;
    }

    get smalls(): any[] {
        if (this.layout === 'large-first') {
            return this.products.slice(1, 7);
        } else  {
            return this.products.slice(0, 6);
        }
    }

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        if (this.categoryID) {
            this.http
            .get<Product[]>(environment.apiProduct + `?pageSize=${this._limit}&category=${this.categoryID}`)
            .subscribe(resp  => {
                this.products = resp;
            });
        }
    }
}
