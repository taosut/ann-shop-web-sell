import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../../../shared/interfaces/product';
import { ProductCategory } from '../../../../shared/interfaces/product-category';
import { PagingHeaders } from '../../../../shared/interfaces/paging-headers';
import { Title } from "@angular/platform-browser";
import { combineLatest } from 'rxjs';

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

    private getProducts(url: string): void {
        this.http.get(url, { observe: 'response'}).subscribe(
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
    }

    private getProductCategoryURL(slug: string): string {
        let url = `${environment.apiProductCategory}/${slug}` ;
        return url.replace(/(\?|\&)+$/g, '');
    }

    private getProdcutCategory(url: string): void {
        this.http.get(url).subscribe(
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

    ngOnInit(): void {
        let pageNumber = 0;
        const urlParams = combineLatest(
            this.route.params,
            this.route.queryParams,
            (params, queryParams) => ({ ...params, ...queryParams})
        );

        urlParams.subscribe(routeParams => {
            pageNumber = +routeParams["page"] || 0;
            this.limit = +routeParams["limt"] || this.limit;
            this.search = routeParams["search"] || "";
            this._category = routeParams['slug'];

            if (!this.search)
            {
                if (this._category)
                {
                    this.getProdcutCategory(this.getProductCategoryURL(this._category));
                }
                else
                {
                    this.pageHeading = "Hàng mới về";
                }
            }
            else
            {
                this.pageHeading = "Kết quả tìm kiếm: " + this.search;
            }

            this.getProducts(this.getProductURL(this._category, pageNumber, this.limit, this.search));
        });
    }
}
