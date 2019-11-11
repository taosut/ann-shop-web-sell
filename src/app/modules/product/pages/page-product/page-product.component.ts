// Angular
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";

// Rxjs
import { BehaviorSubject, combineLatest } from 'rxjs';

// ANN Shop
// Enum
import { ProductBadge } from 'src/app/shared/interfaces/common/product-bage';
// Interface
import { PagingHeaders } from '../../../../shared/interfaces/common/paging-headers';
import { ProductProduct } from '../../../../shared/interfaces/product/product-product';
import { ProductRelated } from '../../../../shared/interfaces/product/product-related';
//Service
import { LoadingSpinnerService } from '../../../../shared/services/loading-spinner.service';
import { ProductService } from '../../../../shared/services/pages/product.service';

export type LayoutType = 'standard' | 'columnar' | 'sidebar';
export type PositionType = 'start' | 'end';


@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
  private loadingProduct: BehaviorSubject<boolean>;
  private loadingProductRelated: BehaviorSubject<boolean>;

  layout: LayoutType;
  sidebarPosition: PositionType;

  product: ProductProduct;
  pagingHeaders: PagingHeaders;
  productRelateds: ProductRelated[];

  ProductBadgeEnum = ProductBadge;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private service: ProductService,
    private loadingSpinner: LoadingSpinnerService
  ) {
    this.loadingProduct = new BehaviorSubject<boolean>(false);
    this.loadingProductRelated = new BehaviorSubject<boolean>(false);

    this.layout = 'standard';
    // For LTR scripts "start" is "left" and "end" is "right"
    this.sidebarPosition = 'start';
    this.route.data.subscribe(data => {
      this.layout = 'layout' in data ? data.layout : this.layout;
      this.sidebarPosition = 'sidebarPosition' in data ? data.sidebarPosition : this.sidebarPosition;
    });

    this.pagingHeaders = {
      totalCount: 0,
      pageSize: 12,
      currentPage: 1,
      totalPages: 0,
      previousPage: "No",
      nextPage: "No"
    };
    this.productRelateds = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.hasOwnProperty('slug'))
        return false;

      // Mở màn hình loanding
      this.loadingSpinner.show();

      // Lấy thông tin sản phẩm
      this.loadingProduct.next(true);
      this.service.getProduct(params.slug)
        .subscribe(
          (value: ProductProduct) => {
            this.product = value;
            this.titleService.setTitle(this.product.name);
            this.loadingProduct.next(false);
          },
          (err) => {
            this.loadingProduct.next(false);
            this.loadingProductRelated.next(false);
            if (err.status === 404) {
              this.router.navigate(['/not-found']);
            }
          }
        );

      // Lấy thông tin sản phẩm con
      this.loadingProductRelated.next(true);
      this.service.getProductRelated(params.slug, this.pagingHeaders.currentPage, this.pagingHeaders.pageSize)
        .subscribe(
          resp => {
            this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
            this.productRelateds = <ProductRelated[]>resp.body;
            this.loadingProductRelated.next(false);
          },
          (err) => {
            if (err.status === 404) {
              this.productRelateds = [];
              this.loadingProductRelated.next(false);
            }
          }
        );
    });

    combineLatest(this.loadingProduct, this.loadingProductRelated)
      .subscribe(([loadingProduct, loadingProductRelated]) => {
        if (!loadingProduct && !loadingProductRelated)
          this.loadingSpinner.close();
      });
  }

  pageChange(value: number) {
    // Mở màn hình loanding
    this.loadingSpinner.show();

    // Lấy thông tin sản phẩm con
    this.loadingProductRelated.next(true);
    this.service.getProductRelated(this.product.slug, value, this.pagingHeaders.pageSize)
      .subscribe(
        resp => {
          this.pagingHeaders = <PagingHeaders>JSON.parse(resp.headers.get('x-paging-headers'));
          this.productRelateds = <ProductRelated[]>resp.body;
          this.loadingProductRelated.next(false);
        },
        (err) => {
          if (err.status === 404) {
            this.productRelateds = [];
            this.loadingProductRelated.next(false);
          }
        }
      );

    this.loadingProductRelated.subscribe((value: boolean) => value ? this.loadingSpinner.close() : '');
  }
}
