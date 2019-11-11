// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules (third-party)
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// ANN Shop
// modules
import { SharedModule } from '../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
// components
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
// pages
import { PageProductComponent } from './pages/page-product/page-product.component';


@NgModule({
  declarations: [
    // components
    ProductTabsComponent,
    // pages
    PageProductComponent
  ],
  imports: [
    CommonModule,
    // modules (third-party)
    LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
    // modules
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
