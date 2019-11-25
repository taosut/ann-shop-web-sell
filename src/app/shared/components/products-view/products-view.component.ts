// Angular
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';


// ANN Shop
// Interface
import { PagingHeaders } from '../../interfaces/common/paging-headers';
import { ProductCard } from '../../interfaces/common/product-card';
import { ProductSort } from '../../interfaces/common/product-sort';

export type Layout = 'grid' | 'grid-with-features' | 'list';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  @Input() layout: Layout;
  @Input() grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
  @Input() sorts: ProductSort[];
  @Input() products: ProductCard[];
  @Input() pagingHeaders: PagingHeaders;
  @Input() loading: boolean;

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

  ngOnInit() {
    let viewMode: Layout = <Layout>localStorage.getItem('viewMode') || 'grid';

    if (viewMode)
      this.layout =viewMode;
  }

  setLayout(value: Layout): void {
    this.layout = value;
    localStorage.setItem('viewMode', this.layout);
  }

  sortChange(key: number) {
    this.sortEvent.emit(key);
  }

  pageChange(key: number) {
    this.pageEvent.emit(key);
  }

}
