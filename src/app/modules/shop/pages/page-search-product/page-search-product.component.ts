// Angular
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// RxJS
import { BehaviorSubject, combineLatest } from 'rxjs';

// ANN Shop
// Interface
import { PagingHeaders } from 'src/app/shared/interfaces/common/paging-headers';
import { SearchProductSort, SearchProductSortKind } from 'src/app/shared/interfaces/search/search-product-sort';
import { SearchProductProduct } from 'src/app/shared/interfaces/search/search-product-product';
// Service
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';
import { SearchService } from 'src/app/shared/services/search.service';


@Component({
  selector: 'app-page-search-product',
  templateUrl: './page-search-product.component.html',
  styleUrls: ['./page-search-product.component.sass']
})
export class PageSearchProductComponent implements OnInit {
  private loadingSort: BehaviorSubject<boolean>;
  private loadingProduct: BehaviorSubject<boolean>;

  columns: 3 | 4 | 5;
  viewMode: 'grid' | 'grid-with-features' | 'list';
  sidebarPosition: 'start' | 'end';

  // Query Params
  search: string;
  sort: number;

  sorts: SearchProductSort[];
  products: SearchProductProduct[];
  pagingHeaders: PagingHeaders;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private service: SearchService,
    private loadingSpinner: LoadingSpinnerService
  ) {
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
    this.search = "";
    this.sort = SearchProductSortKind.ProductNew;
    this.pagingHeaders = {
      totalCount: 0,
      pageSize: 20,
      currentPage: 1,
      totalPages: 0,
      previousPage: "No",
      nextPage: "No"
    };
  }

  ngOnInit() {
    // Mở màn hình loanding
    this.loadingSpinner.show();

    // Thức show thông tin sản phẩm theo slug danh mục
    const urlParams = combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    urlParams.subscribe(routeParams => {
      this.search = routeParams["search"] || this.search;
      this.sort = routeParams["sort"] || this.sort;
      this.pagingHeaders.currentPage = +routeParams["page"] || this.pagingHeaders.currentPage;

      if (!this.search)
        this.router.navigate(['/not-found']);

      this.titleService.setTitle(`Tìm kiếm sản phẩm: ${this.search}`);

      // Lấy thông tin sorts
      this.getSorts();

      // Lấy danh sách sản phẩm
      this.getProducts(this.search, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
    })

    combineLatest(this.loadingSort, this.loadingProduct)
      .subscribe(([loadingSort, loadingProduct]) => {
        if (!loadingSort && !loadingProduct) {
          this.loadingSpinner.close();
        }
      });
  }

  private getSorts() {
    this.loadingSort.next(true);
    this.service.getSearchProductSort()
      .subscribe(
        (value: SearchProductSort[]) => {
          this.sorts = value;
          this.loadingSort.next(false);
        },
        (_) => {
          this.loadingSort.next(false);
        }
      );
  }

  private getProducts(slug: string, sort: number, page: number, limit: number) {
    this.loadingProduct.next(true);
    this.service.getSearchProductProduct(slug, sort, page, limit)
      .subscribe(
        resp => {
          this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
          this.products = <SearchProductProduct[]>resp.body;
          this.loadingProduct.next(false);
        },
        (err) => {
          this.loadingProduct.next(false);
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
          }
        }
      );
  }

  sortChange(value: number) {
    // Mở màn hình loanding
    this.loadingSpinner.show();

    this.sort = value;
    this.pagingHeaders.currentPage = 1;

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.getProducts(this.search, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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

    this.pagingHeaders.currentPage = value

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.getProducts(this.search, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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
    let query = `search=${this.search}`;

    if (this.sort)
      query += `&sort=${this.sort}`;
    if (this.pagingHeaders.currentPage)
      query += `&page=${this.pagingHeaders.currentPage}`;

    this.location.replaceState(url, query);
  }
}
