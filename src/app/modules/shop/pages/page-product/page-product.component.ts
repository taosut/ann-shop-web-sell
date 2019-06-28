import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';
// import { products } from '../../../../../data/shop-products';
import { ProductDetail, ProductRelated } from '../../../../shared/interfaces/product';
import { PagingHeaders } from '../../../../shared/interfaces/paging-headers';
import { categories } from '../../../../../data/shop-widget-categories';
// import { map } from 'rxjs/operators';
// import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
    categories = categories;
    // products: Product[] = products;
    relatedProducts:  ProductRelated[] = [];
    product: ProductDetail;
    layout: 'standard'|'columnar'|'sidebar' = 'standard';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"

    limit:number = 12;
    pagingHeaders: PagingHeaders =  {
        totalCount: 0,
        pageSize: 0,
        currentPage: 0,
        totalPages: 0,
        previousPage: "No",
        nextPage: "No"
    };

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private titleService: Title) {
        this.route.data.subscribe(data => {
            this.layout = 'layout' in data ? data.layout : this.layout;
            this.sidebarPosition = 'sidebarPosition' in data ? data.sidebarPosition : this.sidebarPosition;
        });
    }

    private getUrlProductRelated(productID: number): string {
        return environment.apiProduct + `/${productID}`+ '/related';
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if(params.hasOwnProperty('slug')){
                let url = environment.apiProduct + `/${params.slug}`;

                this.http.get(url)
                    .subscribe(
                        (data : ProductDetail) => {
                            this.product = data;
                            this.titleService.setTitle(this.product.name);

                            if(this.product.colors.length || this.product.sizes.length)
                            {
                                this.http
                                .get(this.getUrlProductRelated(this.product.id) + `?pageSize=${this.limit}`, { observe: 'response'})
                                .subscribe(
                                    resp  => {
                                    this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                                    this.relatedProducts = <ProductRelated[]>resp.body;
                                    },
                                    (err) => {
                                        if (err.status === 404)
                                        {
                                            this.relatedProducts = [];
                                        }
                                    }
                                );
                            }
                        },
                        (err) => {
                            if (err.status === 404)
                            {
                                this.router.navigate(['/not-found']);
                            }
                        }
                    );
            }
        });
    }

    onPageChange(productID: number, page: number): void {
        this.http
            .get(this.getUrlProductRelated(productID) + `?pageNumber=${page}&pageSize=${this.limit}`, { observe: 'response'})
            .subscribe(
                resp  => {
                this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                this.relatedProducts = <ProductRelated[]>resp.body;
                },
                (err) => {
                    if (err.status === 404)
                    {
                        this.relatedProducts = [];
                    }
                }
            );

    }
}
