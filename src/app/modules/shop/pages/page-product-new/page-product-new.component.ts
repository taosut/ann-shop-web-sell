// Angular
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

// RxJS
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';

// ANN Shop
// data
import { categoryDecriptions } from '../../../../../data/category-description'
// Interface
import { CategorySort, CategorySortKind } from '../../../../shared/interfaces/category/category-sort';
import { CategoryProduct } from '../../../../shared/interfaces/category/category-product';
import { PagingHeaders } from '../../../../shared/interfaces/common/paging-headers';
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
  preOrder: string;
  sort: number;

  sorts: CategorySort[];
  products: CategoryProduct[];
  pagingHeaders: PagingHeaders;

  constructor(
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
    this.preOrder = "";
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

      this.preOrder = routeParams["preOrder"] || this.preOrder;
      this.sort = routeParams["sort"] || this.sort;
      this.pagingHeaders.currentPage = +routeParams["page"] || this.pagingHeaders.currentPage;

      // Lấy thông tin sorts
      this.getSorts();

      // Lấy danh sách sản phẩm
      this.getProducts(this.preOrder, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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
        (value: CategorySort[]) => {
          this.sorts = value;
          this.loadingSort.next(false);
        },
        (_) => {
          this.loadingSort.next(false);
        }
      );
  }

  private getProducts(preOrder: string, sort: number, page: number, limit: number) {
    let products: Observable<any>;

    if (preOrder)
      products = this.service.getProductOrderAll(preOrder, sort, page, limit);
    else
      products = this.service.getProductAll(sort, page, limit);

    this.loadingProduct.next(true);
    products.subscribe(
        resp => {
          this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
          this.products = <CategoryProduct[]>resp.body;
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

    this.sort = value;
    this.pagingHeaders.currentPage = 1;

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.getProducts(this.preOrder, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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
    this.getProducts(this.preOrder, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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

    if (this.sort)
      query += `&sort=${this.sort}`;
    if (this.pagingHeaders.currentPage)
      query += `&page=${this.pagingHeaders.currentPage}`;

    if (query)
      query = query.replace(/^&/g, '');

    this.location.replaceState(url, query);
  }

  get headerPage(): string {
    let header: string = "Hàng mới về";

    if (this.preOrder) {
      header += ` (${this.preOrder === "hang-co-san"? "hàng có sẵn" : "hàng order"})`;
    }

    return header
  }

  getDecription(slug: string) {
    let description = this.categoryDicriptions.filter(x => x.slug === slug);

    return description.length > 0 ? description[0].decription : '';
  }
}
