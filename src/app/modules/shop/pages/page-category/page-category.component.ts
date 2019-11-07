// Angular
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// RxJS
import { combineLatest, BehaviorSubject } from 'rxjs';

// ANN Shop
// Interface
import { CategoryCategory } from 'src/app/shared/interfaces/category/category-category';
import { CategorySort, CategorySortKind } from 'src/app/shared/interfaces/category/category-sort';
import { CategoryProduct } from 'src/app/shared/interfaces/category/category-product';
import { PagingHeaders } from '../../../../shared/interfaces/common/paging-headers';
// Service
import { CategoryService } from 'src/app/shared/services/pages/category.service';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';


@Component({
  selector: 'app-grid',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.scss']
})
export class PageCategoryComponent implements OnInit {
  private loadingCategory: BehaviorSubject<boolean>;
  private loadingSort: BehaviorSubject<boolean>;
  private loadingProduct: BehaviorSubject<boolean>;

  columns: 3 | 4 | 5;
  viewMode: 'grid' | 'grid-with-features' | 'list';
  sidebarPosition: 'start' | 'end';

  // Query Params
  slug: string;
  search: string;
  sort: number;

  category: CategoryCategory;
  sorts: CategorySort[];
  products: CategoryProduct[];
  pagingHeaders: PagingHeaders;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private service: CategoryService,
    private loadingSpinner: LoadingSpinnerService
  ) {
    this.loadingCategory = new BehaviorSubject<boolean>(false);
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
    this.slug = "";
    this.search = "";
    this.sort = CategorySortKind.ProductNew;
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
    // Thức show thông tin sản phẩm theo slug danh mục
    const urlParams = combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    urlParams.subscribe(routeParams => {
      // Mở màn hình loanding
      this.loadingSpinner.show();

      this.slug = routeParams["slug"] || this.slug;
      this.search = routeParams["search"] || this.search;
      this.sort = routeParams["sort"] || this.sort;
      this.pagingHeaders.currentPage = +routeParams["page"] || this.pagingHeaders.currentPage;
      this.pagingHeaders.pageSize = +routeParams["limt"] || this.pagingHeaders.pageSize;

      // Lấy thông tin category
      this.loadingCategory.next(true);
      this.service.getCategory(this.slug)
        .subscribe((value: CategoryCategory) => {
          this.category = value;
          this.titleService.setTitle(this.category.name);
          this.loadingCategory.next(false);
        });

      // Lấy thông tin sorts
      this.loadingSort.next(true);
      this.service.getSort()
        .subscribe((value: CategorySort[]) => {
          this.sorts = value;
          this.loadingSort.next(false);
        });

      // Lấy danh sách sản phẩm
      this.loadingProduct.next(true);
      this.service.getProduct(this.slug, this.search, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize)
        .subscribe(
          resp => {
            this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
            this.products = <CategoryProduct[]>resp.body;
            this.loadingProduct.next(false);
          },
          (err) => {
            if (err.status === 404) {
              this.router.navigate(['/not-found']);
            }
          }
        );
    })

    combineLatest(this.loadingCategory, this.loadingSort, this.loadingProduct)
      .subscribe(([loadingCategory, loadingSort, loadingProduct]) => {
        if (!loadingCategory && !loadingSort && !loadingProduct) {
          this.loadingSpinner.close();
        }
      });
  }

  sortChange(value: number) {
    // Mở màn hình loanding
    this.loadingSpinner.show();

    this.sort = value;
    this.pagingHeaders.currentPage = 1;

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.service.getProduct(this.slug, this.search, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize)
      .subscribe(
        resp => {
          this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
          this.products = <CategoryProduct[]>resp.body;
          this.changeURL();
          this.loadingProduct.next(false);
        },
        (err) => {
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
          }
        }
      );

    this.loadingProduct.subscribe((value: boolean) => value ? this.loadingSpinner.close : '');
  }

  pageChange(value: number) {
    // Mở màn hình loanding
    this.loadingSpinner.show();

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.service.getProduct(this.slug, this.search, this.sort, value, this.pagingHeaders.pageSize)
      .subscribe(
        resp => {
          this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
          this.products = <CategoryProduct[]>resp.body;
          this.changeURL();
          window.scrollTo(0, 0);
          this.loadingProduct.next(false);
        },
        (err) => {
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
          }
        }
      );

    this.loadingProduct.subscribe((value: boolean) => value ? this.loadingSpinner.close : '');
  }

  private changeURL() {
    let url = window.location.pathname.split('/').join('/');
    let query = "";

    if (this.search)
      query += `&search=${this.search}`;
    if (this.sort)
      query += `&sort=${this.sort}`;
    if (this.pagingHeaders.currentPage)
      query += `&page=${this.pagingHeaders.currentPage}`;
    if (this.pagingHeaders.pageSize)
      query += `&limit=${this.pagingHeaders.pageSize}`;

    if (query)
      query = query.replace(/^&/g, '');

    this.location.replaceState(url, query);
  }
}
