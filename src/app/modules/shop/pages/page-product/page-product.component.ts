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

    limit:number = 8;
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
        // this.route.params.pipe(map(params => {
        //     if (params.hasOwnProperty('id')) {
        //         const product = products.find(eachProduct => eachProduct.id === parseFloat(params.id));

        //         if (product) {
        //             return product;
        //         }
        //     }

        //     return products[products.length - 1];
        // })).subscribe(product => this.product = product);
    }

    private getUrlProductRelated(productID: number): string {
        return environment.apiProduct + `/${productID}`+ '/related';
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if(params.hasOwnProperty('id')){
                let url = environment.apiProduct + `/${params.id}`;

                this.http.get(url)
                    .subscribe(
                        (data : ProductDetail) => { 
                            this.product = data; 
                            this.titleService.setTitle(this.product.name);
                        },
                        (err) => {
                            if (err.status === 404)
                            {
                                this.router.navigate(['/not-found']);
                            }
                        }
                    );
                    
                this.http
                    .get(this.getUrlProductRelated(params.id) + `?pageSize=${this.limit}`, { observe: 'response'})
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
        });
    }

    onPageChange(page: number): void {
        this.route.params.subscribe(params => {
            if(params.hasOwnProperty('id')){
                this.http
                    .get(this.getUrlProductRelated(params.id) + `?pageNumber=${page}&pageSize=${this.limit}`, { observe: 'response'})
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
        });
        
    }
}
