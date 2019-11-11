// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules (third-party)
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// ANN Shop
// modules
import { SharedModule } from '../../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
// pages
import { PageSearchProductComponent } from './pages/page-search-product/page-search-product.component';


@NgModule({
  declarations: [
    // pages
    PageSearchProductComponent
  ],
  imports: [
    CommonModule,
    // modules (third-party)
    LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
    // modules
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
