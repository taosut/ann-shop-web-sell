import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../../../shared/interfaces/product';
import { ProductCategory } from '../../../../shared/interfaces/product-category';
import { PagingHeaders } from '../../../../shared/interfaces/paging-headers';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-grid',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss']
})
export class PageCategoryComponent implements OnInit {
    limit:number = 20;

    columns: 3|4|5 = 3;
    viewMode: 'grid'|'grid-with-features'|'list' = 'grid';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    private _category: string = "";
    search: string = "";
    productCategory: ProductCategory;
    products: Product[] = [];
    pagingHeaders: PagingHeaders =  {
        totalCount: 0,
        pageSize: 0,
        currentPage: 0,
        totalPages: 0,
        previousPage: "No",
        nextPage: "No"
    };
    pageHeading: string = "";

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
        ) {
        this.route.data.subscribe(data => {
            this.columns = 'columns' in data ? data.columns : this.columns;
            this.viewMode = 'viewMode' in data ? data.viewMode : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data.sidebarPosition : this.sidebarPosition;
        });
    }

    private getProductURL(category: string, page: number, limit: number, search: string): string {
        let paramCategory = category ? `category=${category}&` : '';
        let paramPage = page ? `pageNumber=${page}&` : '';
        let paramLimit = limit ? `pageSize=${limit}&` : '';
        let paramSearch = search ? `search=${search}&` : '';

        let url = environment.apiProduct + '?' + paramPage + paramLimit + paramCategory + paramSearch;
        return url.replace(/(\?|\&)+$/g, '');
    }

    private getProductCategoryURL(slug: string): string {

        let url = `${environment.apiProductCategory}/${slug}` ;
        return url.replace(/(\?|\&)+$/g, '');
    }

    ngOnInit(): void {
        let pageNumber = 0;
        this.pageHeading = "Hàng mới về";

        this.route.queryParamMap
            .subscribe(
                params => {
                    pageNumber = +params.get("page") || 0;
                    this.limit = +params.get("limt") || this.limit;
                    this.search = params.get("search") || "";

                    this.route.params.subscribe(params => {
                        if(params.hasOwnProperty('slug'))
                        {
                            this._category = params.slug;
                            if (!this._category)
                            {
                                this.router.navigate(['/not-found']);
                            }
                        }
                    
                        if (!this.search)
                        {
                            if (this._category)
                            {
                                this.http
                                    .get(this.getProductCategoryURL(this._category))
                                    .subscribe(
                                        (data: ProductCategory)  => {
                                            this.productCategory = data;
                                            this.pageHeading = this.productCategory.title;
                                            this.titleService.setTitle(this.productCategory.title);
                                        },
                                        (err) => {
                                            if (err.status === 404)
                                            {
                                                this.router.navigate(['/not-found']);
                                            }
                                        }
                                    );
                            }
                        }
                        else
                        {
                            console.log(this.search);
                            this.pageHeading = "Kết quả tìm kiếm: " + this.search;
                        }
            
                        this.http
                            .get(this.getProductURL(this._category, pageNumber, this.limit, this.search), { observe: 'response'})
                            .subscribe(
                                resp  => {
                                this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                                this.products = <Product[]>resp.body;
                                },
                                (err) => {
                                    if (err.status === 404)
                                    {
                                        this.router.navigate(['/not-found']);
                                    }
                                }
                            );
                    });
                });
    }
}
