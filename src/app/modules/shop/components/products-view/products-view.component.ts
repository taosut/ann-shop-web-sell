import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Location, ViewportScroller } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../../../shared/interfaces/product';
import { ProductSort } from '../../../../shared/interfaces/product-sort';
import { PagingHeaders } from '../../../../shared/interfaces/paging-headers';
import { Thumbnail } from 'src/app/shared/interfaces/thumbnail';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit, OnDestroy {
    @Input() limit: number = 20;
    @Input() products: Product[] = [];
    @Input() pagingHeaders: PagingHeaders = {
        totalCount: 0,
        pageSize: 0,
        currentPage: 0,
        totalPages: 0,
        previousPage: "No",
        nextPage: "No"
    };

    private _url: string = window.location.pathname.split('/').join('/');
    private _category: number = 0;
    private destroy$: Subject<void> = new Subject();

    public sorts: ProductSort[] = [];
    public sort: string = "";
    public updatingWebPublish = false;
    public updatingWebUpdate = false;

    constructor(
        private http: HttpClient,
        private location: Location,
        private scroller: ViewportScroller,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.http.get(environment.apiProductSort)
            .subscribe((data: ProductSort[]) => this.sorts = data);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getProductURL(category: number, page: number, limit: number, sort: string): string {
        let paramCategory = category ? `category=${category}&` : '';
        let paramPage = page ? `pageNumber=${page}&` : '';
        let paramLimit = limit ? `pageSize=${limit}&` : '';
        let paramSort = sort ? `sort=${sort}&` : '';


        let url = environment.apiProduct + '?' + paramPage + paramLimit + paramCategory + paramSort;
        return url.replace(/(\?|\&)+$/g, '');
    }

    private changeUrl(url: string) {
        this.location.replaceState(url);
    }

    onPageChange(page: number): void {
        this.http
            .get(this.getProductURL(this._category, page, this.limit, this.sort), { observe: 'response' })
            .subscribe(resp => {
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
            .get(this.getProductURL(this._category, 0, this.limit, this.sort), { observe: 'response' })
            .subscribe(resp => {
                this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
                this.products = <Product[]>resp.body;
            });
    }

    getImageThumbnail(thumbnails: Thumbnail[], size: string): string {
        let url: string = "";
        thumbnails.forEach(item => {
            if (item.size === size) {
                url = item.url;
                return false;
            }
        });

        return url
    }

    clickWebPublish(element: HTMLButtonElement, product: Product): void {
        if (this.updatingWebPublish) return;

        this.updatingWebPublish = true;
        timer(1000).pipe(takeUntil(this.destroy$)).subscribe(_ => {
            this.http.patch(`${environment.apiProduct}/${product.id}/webpublic`,null)
                .subscribe({
                    next: _ => {
                        if (product.webPublish  === true) {
                            product.webPublish = false;
                            element.innerHTML = "Ẩn";
                        }
                        else {
                            product.webPublish = true;
                            element.innerHTML = "Hiện";
                        }

                        this.updatingWebPublish = false;
                        this.cd.markForCheck();
                    },
                    error: _ => {
                        this.updatingWebPublish = false;
                        this.cd.markForCheck();
                    }
                })
        })
    }

    clickWebUpdate(product: Product): void {
        if (this.updatingWebUpdate) return;

        this.updatingWebUpdate = true;
        timer(1000).pipe(takeUntil(this.destroy$)).subscribe(_ => {
            this.http.patch(`${environment.apiProduct}/${product.id}/webupdate`, null)
                .subscribe({
                    next: _ => {
                        this.updatingWebUpdate = false;
                        this.cd.markForCheck();
                    },
                    error: _ => {
                        this.updatingWebUpdate = false;
                        this.cd.markForCheck();
                    }
                })
        })
    }
}
