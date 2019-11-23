// Angular
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// RxJS
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';

// ANN Shop
// data
import { categoryDecriptions } from '../../../../../data/category-description'
// Interface
import { ProductSortKind } from '../../../../shared/interfaces/common/product-sort-kind';
import { ProductSort } from '../../../../shared/interfaces/common/product-sort';
import { PagingHeaders } from '../../../../shared/interfaces/common/paging-headers';
import { ProductCard } from '../../../../shared/interfaces/common/product-card';
// Service
import { TitleService } from '../../../../shared/services/title.service';
import { LoadingSpinnerService } from '../../../../shared/services/loading-spinner.service';
import { CategoryService } from '../../../../shared/services/pages/category.service';


@Component({
  selector: 'app-page-product-sale',
  templateUrl: './page-product-sale.component.html',
  styleUrls: ['./page-product-sale.component.sass']
})
export class PageProductSaleComponent implements OnInit {
  private loadingSort: BehaviorSubject<boolean>;
  private loadingProduct: BehaviorSubject<boolean>;
  private categoryDicriptions = categoryDecriptions;

  columns: 3 | 4 | 5;
  viewMode: 'grid' | 'grid-with-features' | 'list';
  sidebarPosition: 'start' | 'end';

  // Query Params
  productBadge: string;
  sort: number;

  sorts: ProductSort[];
  products: ProductCard[];
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
    this.productBadge = "hang-sale";
    this.sort = ProductSortKind.ProductNew;
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
    this.titleService.setTitle('Hàng Sale');

    this.route.queryParams.subscribe(params => {
      // Mở màn hình loanding
      this.loadingSpinner.show();

      this.sort = params["sort"] || this.sort;
      this.pagingHeaders.currentPage = +params["page"] || this.pagingHeaders.currentPage;

      // Lấy thông tin sorts
      this.getSorts();

      // Lấy danh sách sản phẩm
      this.getProducts(this.productBadge, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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

  private getProducts(productBadge: string, sort: number, page: number, limit: number) {
    let products: Observable<any>;

    if (productBadge)
      products = this.service.getProductOrderAll(productBadge, sort, page, limit);
    else
      products = this.service.getProductAll(sort, page, limit);

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

    this.sort = value;
    this.pagingHeaders.currentPage = 1;

    // Lấy danh sách sản phẩm
    this.loadingProduct.next(true);
    this.getProducts(this.productBadge, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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
    this.getProducts(this.productBadge, this.sort, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize);
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
    let header: string = "Hàng Sale";

    return header
  }

  getDecription(slug: string) {
    let description = this.categoryDicriptions.filter(x => x.slug === slug);

    return description.length > 0 ? description[0].decription : '';
  }
}
