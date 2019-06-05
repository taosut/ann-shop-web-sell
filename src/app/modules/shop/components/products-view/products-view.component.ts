import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, ActivatedRoute  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../../../shared/interfaces/product';
import { PagingHeaders } from '../../../../shared/interfaces/paging-headers';

export type Layout = 'grid'|'grid-with-features'|'list';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
    @Input() category: number = 0;
    @Input() layout: Layout = 'grid';
    @Input() grid: 'grid-3-sidebar'|'grid-4-full'|'grid-5-full' = 'grid-3-sidebar';
    @Input() limit:number = 20;

    private _url:string =  window.location.pathname.split('/').join('/');
    products: Product[] = [];
    pagingHeaders: PagingHeaders =  {
        totalCount: 0,
        pageSize: 0,
        currentPage: 0,
        totalPages: 0,
        previousPage: "No",
        nextPage: "No"
    };

    constructor(
            private http: HttpClient,
            private route: ActivatedRoute,
            private location: Location
        ) { }

    private getProductURL(category: number, page: number, limit: number): string {
        let paramCategory = category ? `category=${category}&` : '';
        let paramPage = page ? `pageNumber=${page}&` : '';
        let paramLimit = limit ? `pageSize=${limit}&` : '';

        let url = environment.apiProduct + '?' + paramPage + paramLimit + paramCategory ;
        return url.replace(/(\?|\&)+$/g, '');
    }

    ngOnInit(): void {
        let pageNumber = 0;

        this.route.queryParamMap
            .subscribe(params => {
                pageNumber = +params.get("page") || 0;
                this.limit = +params.get("limt") || this.limit;
            });

        this.http
            .get(this.getProductURL(this.category, pageNumber, this.limit), { observe: 'response'})
            .subscribe(resp  => {
                this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                this.products = <Product[]>resp.body;
            });
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
            .get(this.getProductURL(this.category, page, this.limit), { observe: 'response'})
            .subscribe(resp  => {
                this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                this.products = <Product[]>resp.body;
                this.changeUrl(this._url + `?page=${page}&limt=${this.limit}`);
            });
    }
}
