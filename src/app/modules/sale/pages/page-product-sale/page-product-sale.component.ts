// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';

// RxJS
import { combineLatest, BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// ANN Shop
// data
import { categoryDecriptions } from '../../../../../data/category-description'
// Interface
import { ProductSortKind } from '../../../../shared/interfaces/common/product-sort-kind';
import { ProductSort } from '../../../../shared/interfaces/common/product-sort';
import { PagingHeaders } from '../../../../shared/interfaces/common/paging-headers';
import { ProductCard } from '../../../../shared/interfaces/common/product-card';
// Page
import { ProductSalePageFilter } from '../../../../shared/interfaces/pages/product-sale/product-sale-page-filter';
// Service
import { TitleService } from '../../../../shared/services/title.service';
import { LoadingSpinnerService } from '../../../../shared/services/loading-spinner.service';
import { CategoryService } from '../../../../shared/services/pages/category.service';


@Component({
  selector: 'app-page-product-sale',
  templateUrl: './page-product-sale.component.html',
  styleUrls: ['./page-product-sale.component.sass']
})
export class PageProductSaleComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void>;
  private loadingSort: BehaviorSubject<boolean>;
  private loadingProduct: BehaviorSubject<boolean>;
  private categoryDicriptions = categoryDecriptions;

  columns: 3 | 4 | 5;
  viewMode: 'grid' | 'grid-with-features' | 'list';
  sidebarPosition: 'start' | 'end';

  // Query Params
  filter: ProductSalePageFilter;

  sorts: ProductSort[];
  products: ProductCard[];
  pagingHeaders: PagingHeaders;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private service: CategoryService,
    private loadingSpinner: LoadingSpinnerService
  ) {
    this.destroy$ = new Subject();
    this.loadingSort = new BehaviorSubject<boolean>(false);
    this.loadingProduct = new BehaviorSubject<boolean>(false);

    this.columns = 3;
    this.viewMode = 'grid';
    // For LTR scripts "start" is "left" and "end" is "right"
    this.sidebarPosition = 'start';

    this.route.data.subscribe(data => {
      this.columns = 'columns' in data ? data.columns : this.columns;
      this.viewMode = 'viewMode' in data ? data.viewMode : this.viewMode;
      this.sidebarPosition = 'sidebarPosition' in data ? data.sidebarPosition : this.sidebarPosition;
    });

    // Query Params
    this.pagingHeaders = {
      totalCount: 0,
      pageSize: 28,
      currentPage: 1,
      totalPages: 0,
      previousPage: "No",
      nextPage: "No"
    };

    this.filter = {
      productBadge: "hang-sale",
      priceMin: 0,
      priceMax: 0,
      productSort: ProductSortKind.ProductNew,
      page: this.pagingHeaders.currentPage,
      limit: this.pagingHeaders.pageSize
    };

    this.router.events.pipe(
        filter((e: Event) => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((e: Event) => {
        // Mở màn hình loanding
        this.loadingSpinner.show();

        this.filter.priceMin = +this.route.snapshot.queryParams.priceMin || 0;
        this.filter.priceMax = +this.route.snapshot.queryParams.priceMax || 0;
        this.filter.productSort = +this.route.snapshot.queryParams.sort || ProductSortKind.ProductNew;
        this.filter.page = this.pagingHeaders.currentPage = +this.route.snapshot.queryParams.page || 1;

        // Lấy thông tin sorts
        this.getSorts();

        // Lấy danh sách sản phẩm
        this.getProducts(this.filter);
      });
  }

  ngOnInit() {
    this.titleService.setTitle('Hàng sale');

    combineLatest(this.loadingSort, this.loadingProduct)
      .subscribe(([loadingSort, loadingProduct]) => {
        if (!loadingSort && !loadingProduct) {
          this.loadingSpinner.close();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSorts() {
    this.loadingSort.next(true);
    this.service.getSort()
      .subscribe(
        (value: ProductSort[]) => {
          this.sorts = value;
          this.loadingSort.next(false);
        },
        (_) => {
          this.loadingSort.next(false);
        }
      );
  }

  private getProducts(filter: ProductSalePageFilter) {
    let products: Observable<any> = this.service.getProductListByProductSalePage(filter);

    this.loadingProduct.next(true);
    products.subscribe(
        resp => {
          this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
          this.products = <ProductCard[]>resp.body;
          this.loadingProduct.next(false);
        },
        (err) => {
          this.loadingProduct.next(false);
        }
      );
  }

  sortChange(value: number) {
    // Mở màn hình loanding
    this.loadingSpinner.show();

    this.filter.productSort = value;
    this.filter.page = this.pagingHeaders.currentPage = 1;

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.getProducts(this.filter);
    this.loadingProduct.subscribe((value: boolean) => {
      if (!value) {
        this.changeURL();
        this.loadingSpinner.close();
      }
    });
  }

  pageChange(value: number) {
    // Mở màn hình loanding
    this.loadingSpinner.show();

    this.filter.page = this.pagingHeaders.currentPage = value

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.getProducts(this.filter);
    this.loadingProduct.subscribe((value: boolean) => {
      if (!value) {
        this.changeURL();
        window.scrollTo(0, 0);
        this.loadingSpinner.close();
      }
    });
  }

  private changeURL() {
    let url = window.location.pathname.split('/').join('/');
    let query = "";

    if (this.filter.priceMin > 0)
      query += `&priceMin=${this.filter.priceMin}`;
    if (this.filter.priceMax > 0)
      query += `&priceMax=${this.filter.priceMax}`;
    if (this.filter.productSort != ProductSortKind.ProductNew)
      query += `&sort=${this.filter.productSort}`;
    if (this.pagingHeaders.currentPage > 1)
      query += `&page=${this.pagingHeaders.currentPage}`;

    if (query)
      query = query.replace(/^&/g, '');

    this.location.replaceState(url, query);
  }

  get headerPage(): string {
    let header: string = "Hàng sale";

    return header
  }

  getDecription(slug: string) {
    let description = this.categoryDicriptions.filter(x => x.slug === slug);

    return description.length > 0 ? description[0].decription : '';
  }
}
