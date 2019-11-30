// Angular
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// ANN Shop
// Interface
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
  @Input() header: string;
  @Input() slug: string;
  @Input() limit: number;

  products: ProductCard[];
  layout: Layout;

  @Output() loadingEvent: EventEmitter<boolean>;

  constructor(private service: HomeService, public root: RootService) {
    this.limit = 8;
    this.products = [];
    this.loadingEvent = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    // Cài đặt layout
    let viewMode: Layout = <Layout>localStorage.getItem('viewMode') || 'grid';

    if (viewMode)
      this.layout = viewMode;

    // Lấy danh sách sản phẩm
    if (this.slug) {
      // Bắt đầu loading
      this.loading(true);
      // Lấy thông tin sản phẩm
      this.service.getProductCategory(this.slug, this.limit)
        .subscribe(
          data => { this.products = data; },
          err => { this.loading(false); }
        );
    }
  }

  /**
   * Output trạng thái loading
   */
  loading(value: boolean) {
    this.loadingEvent.emit(value);
  }
}
