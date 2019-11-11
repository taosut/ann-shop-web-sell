// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';


// ANN Shop
// Interface
import { PagingHeaders } from '../../interfaces/common/paging-headers';
import { CategoryProduct } from '../../interfaces/category/category-product';
import { CategorySort } from '../../interfaces/category/category-sort';

export type Layout = 'grid' | 'grid-with-features' | 'list';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent {
  @Input() layout: Layout;
  @Input() grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
  @Input() sorts: CategorySort[];
  @Input() products: CategoryProduct[];
  @Input() pagingHeaders: PagingHeaders;

  @Output('sortChange') sortEvent: EventEmitter<number>;
  @Output('pageChange') pageEvent: EventEmitter<number>;

  constructor() {
    // @Input
    this.layout = 'grid';
    this.sorts = [];
    this.products = [];
    this.pagingHeaders = {
      totalCount: 0,
      pageSize: 0,
      currentPage: 1,
      totalPages: 0,
      previousPage: "No",
      nextPage: "No"
    }

    // Output
    this.sortEvent = new EventEmitter<number>();
    this.pageEvent = new EventEmitter<number>();
  }

  setLayout(value: Layout): void {
    this.layout = value;
  }

  sortChange(key: number) {
    this.sortEvent.emit(key);
  }

  pageChange(key: number) {
    this.pageEvent.emit(key);
  }

}
