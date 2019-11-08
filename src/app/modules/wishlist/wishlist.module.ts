// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules (third-party)
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// ANN Shop
// modules
import { SharedModule } from 'src/app/shared/shared.module';
import { WishlistRoutingModule } from './wishlist-routing.module';
// pages
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';

@NgModule({
  declarations: [
    // pages
    PageWishlistComponent
  ],
  imports: [
    CommonModule,
    // modules (third-party)
    LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
    // modules
    SharedModule,
    WishlistRoutingModule
  ]
})
export class WishlistModule { }
