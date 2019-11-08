// Angular
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';

// ANN Shop
// Interface
import { HomeProduct } from '../../../shared/interfaces/home/home-product';
// Service
import { HomeService } from 'src/app/shared/services/pages/home.service';


@Component({
  selector: 'app-block-products',
  templateUrl: './block-products.component.html',
  styleUrls: ['./block-products.component.scss']
})
export class BlockProductsComponent implements OnInit {
  @Input() header: string;
  @Input() slug: string;
  @Input() limit: number;

  products$: Observable<HomeProduct[]>;

  @Output() loadingEvent: EventEmitter<boolean>;

  constructor(private service: HomeService) {
    this.limit = 8;
    this.products$ = new Observable();
    this.loadingEvent = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    if (this.slug) {
      // Bắt đầu loading
      this.loading(true);
      // Lấy thông tin sản phẩm
      this.products$ = this.service.getProductCategory(this.slug, this.limit);
    }
  }

  /**
   * Output trạng thái loading
   */
  loading(value: boolean) {
    this.loadingEvent.emit(value);
  }
}
