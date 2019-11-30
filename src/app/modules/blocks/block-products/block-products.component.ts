// Angular
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// ANN Shop
// Interface
import { Category } from '../../../shared/interfaces/common/category';
import { ProductCard } from '../../../shared/interfaces/common/product-card';
// Service
import { RootService } from '../../../shared/services/root.service';
import { HomeService } from '../../../shared/services/pages/home.service';

export type Layout = 'grid' | 'grid-with-features' | 'list';


@Component({
  selector: 'app-block-products',
  templateUrl: './block-products.component.html',
  styleUrls: ['./block-products.component.scss']
})
export class BlockProductsComponent implements OnInit {
  @Input() isMultiCategory: boolean;
  @Input() header: string;
  @Input() slug: string;
  @Input() categories: Category[];
  @Input() limit: number;

  products: ProductCard[];
  layout: Layout;

  @Output() loadingEvent: EventEmitter<boolean>;

  constructor(private service: HomeService, public root: RootService) {
    this.isMultiCategory = false;
    this.categories = [];
    this.limit = 8;
    
    this.products = [];
    this.loadingEvent = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    // Cài đặt layout
    let viewMode: Layout = <Layout>localStorage.getItem('viewMode') || 'grid';

    if (viewMode)
      this.layout = viewMode;

    if (this.isMultiCategory) {
      // Lấy danh sách sản phẩm theo nhiều slug
      if (this.categories.length > 0) {
        // Bắt đầu loading
        this.loading(true);
        let slugList = this.categories.map((item) => item.slug);
        // Lấy thông tin sản phẩm
        this.service.getProductCategoryList(slugList, this.limit)
          .subscribe(
            data => { this.products = data; },
            _ => { this.loading(false); }
          );
      }
    }
    else {
      // Lấy danh sách sản phẩm theo slug
      if (this.slug) {
        // Bắt đầu loading
        this.loading(true);
        // Lấy thông tin sản phẩm
        this.service.getProductCategory(this.slug, this.limit)
          .subscribe(
            data => { this.products = data; },
            _ => { this.loading(false); }
          );
      }
    }
  }

  get title(): string {
    if (this.isMultiCategory) {
      return this.categories.map((item) => item.name).join(' - ');
    }
    else {
      return this.header;
    }
  }
  /**
   * Output trạng thái loading
   */
  loading(value: boolean) {
    this.loadingEvent.emit(value);
  }
}
