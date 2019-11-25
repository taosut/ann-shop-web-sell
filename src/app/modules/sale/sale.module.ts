import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { SaleRoutingModule } from './sale-routing.module';

// pages
import { PageProductSaleComponent } from './pages/page-product-sale/page-product-sale.component';

@NgModule({
  declarations: [
    // pages
    PageProductSaleComponent,
  ],
  imports: [
    CommonModule,
    // modules (third-party)
    CarouselModule,
    LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
    // modules
    BlocksModule,
    SharedModule,
    SaleRoutingModule
  ]
})
export class SaleModule { }
