import { Component, Input, OnInit } from '@angular/core';
import { Location, ViewportScroller } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../../../shared/interfaces/product';
import { ProductSort } from '../../../../shared/interfaces/product-sort';
import { PagingHeaders } from '../../../../shared/interfaces/paging-headers';

export type Layout = 'grid'|'grid-with-features'|'list';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
    @Input() layout: Layout = 'grid';
    @Input() grid: 'grid-3-sidebar'|'grid-4-full'|'grid-5-full' = 'grid-3-sidebar';
    @Input() limit:number = 20;
    @Input() products: Product[] = [];
    @Input() pagingHeaders: PagingHeaders =  {
        totalCount: 0,
        pageSize: 0,
        currentPage: 0,
        totalPages: 0,
        previousPage: "No",
        nextPage: "No"
    };

    private _url:string =  window.location.pathname.split('/').join('/');
    private _category: number = 0;
    public sorts: ProductSort[] = [];
    public sort: string = "";

    constructor(
            private http: HttpClient,
            private location: Location,
            private scroller: ViewportScroller
        ) { }

    private getProductURL(category: number, page: number, limit: number, sort: string): string {
        let paramCategory = category ? `category=${category}&` : '';
        let paramPage = page ? `pageNumber=${page}&` : '';
        let paramLimit = limit ? `pageSize=${limit}&` : '';
        let paramSort = sort ? `sort=${sort}&` : '';


        let url = environment.apiProduct + '?' + paramPage + paramLimit + paramCategory + paramSort ;
        return url.replace(/(\?|\&)+$/g, '');
    }

    ngOnInit(): void {
        this.http.get(environment.apiProductSort)
            .subscribe((data: ProductSort[]) => this.sorts = data);
    }

    setLayout(value: Layout): void {
        this.layout = value;
    }

    private changeUrl(url: string)
    {
        this.location.replaceState(url);
    }

    onPageChange(page: number): void {
        this.http
            .get(this.getProductURL(this._category, page, this.limit, this.sort), { observe: 'response'})
            .subscribe(resp  => {
                this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                this.products = <Product[]>resp.body;
                this.changeUrl(this._url + `?page=${page}&limt=${this.limit}`);

                // Move the pointer to page top
                this.scroller.scrollToPosition([0, 0]);
            });
    }

    onSortChange(key: string): void {
        this.sort = key;
        this.http
            .get(this.getProductURL(this._category, 0, this.limit, this.sort), { observe: 'response'})
            .subscribe(resp  => {
                this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                this.products = <Product[]>resp.body;
            });
    }
}
