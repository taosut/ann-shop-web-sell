// Angular
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// RxJS
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';

// ANN Shop
// data
import { categoryDecriptions } from '../../../../../data/category-description'
// Interface
// Common
import { ProductSortKind } from '../../../../shared/interfaces/common/product-sort-kind';
import { ProductSort } from '../../../../shared/interfaces/common/product-sort';
import { PagingHeaders } from '../../../../shared/interfaces/common/paging-headers';
import { ProductCard } from '../../../../shared/interfaces/common/product-card';
// Pages
import { ProductNewPageFilter } from '../../../../shared/interfaces/pages/product-new-page/product-new-page-filter';
// Service
import { TitleService } from '../../../../shared/services/title.service';
import { LoadingSpinnerService } from '../../../../shared/services/loading-spinner.service';
import { CategoryService } from '../../../../shared/services/pages/category.service';


@Component({
  selector: 'app-page-product-new',
  templateUrl: './page-product-new.component.html',
  styleUrls: ['./page-product-new.component.scss']
})
export class PageProductNewComponent implements OnInit {
  private loadingSort: BehaviorSubject<boolean>;
  private loadingProduct: BehaviorSubject<boolean>;
  private categoryDicriptions = categoryDecriptions;

  columns: 3 | 4 | 5;
  viewMode: 'grid' | 'grid-with-features' | 'list';
  sidebarPosition: 'start' | 'end';

  // Query Params
  filter: ProductNewPageFilter;

  sorts: ProductSort[];
  products: ProductCard[];
  pagingHeaders: PagingHeaders;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private service: CategoryService,
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
    this.pagingHeaders = {
      totalCount: 0,
      pageSize: 28,
      currentPage: 1,
      totalPages: 0,
      previousPage: "No",
      nextPage: "No"
    };

    this.filter = {
      productBadge: "",
      priceMin: 0,
      priceMax: 0,
      productSort: ProductSortKind.ProductNew,
      page: this.pagingHeaders.currentPage,
      limit: this.pagingHeaders.pageSize
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Hàng mới về');

    // Thức show thông tin sản phẩm theo slug danh mục
    const urlParams = combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    urlParams.subscribe(routeParams => {


      // Mở màn hình loanding
      this.loadingSpinner.show();

      this.filter.productBadge = routeParams["productBadge"] || this.filter.productBadge;
      if (!["hang-co-san", "hang-order", ""].includes(this.filter.productBadge)) {
        this.loadingSpinner.close();
        this.router.navigate(['/not-found']);
      }

      this.filter.priceMin = +routeParams["priceMin"] || 0;
      this.filter.priceMax = +routeParams["priceMax"] || 0;
      this.filter.productSort = routeParams["sort"] || ProductSortKind.ProductNew;
      this.filter.page = this.pagingHeaders.currentPage = +routeParams["page"] || 1;

      // Lấy thông tin sorts
      this.getSorts();

      // Lấy danh sách sản phẩm
      this.getProducts(this.filter);
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

  private getProducts(filter: ProductNewPageFilter) {
    let products: Observable<any> = this.service.getProductListByProductNewPage(filter);

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

    if (this.filter.priceMin)
      query += `&priceMin=${this.filter.priceMin}`;
    if (this.filter.priceMax)
      query += `&priceMax=${this.filter.priceMax}`;
    if (this.filter.productSort)
      query += `&sort=${this.filter.productSort}`;
    if (this.pagingHeaders.currentPage)
      query += `&page=${this.pagingHeaders.currentPage}`;

    if (query)
      query = query.replace(/^&/g, '');

    this.location.replaceState(url, query);
  }

  get headerPage(): string {
    let header: string = "Hàng mới về";

    if (this.filter.productBadge) {
      header += ` (${this.filter.productBadge === "hang-co-san" ? "hàng có sẵn" : "hàng order"})`;
    }

    return header
  }

  getDecription(slug: string) {
    let description = this.categoryDicriptions.filter(x => x.slug === slug);

    return description.length > 0 ? description[0].decription : '';
  }
}
