import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';

// components
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';

// pages
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from './pages/page-compare/page-compare.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';

@NgModule({
    declarations: [
        // components
        ProductsViewComponent,
        ProductTabsComponent,
        // pages
        PageCartComponent,
        PageCategoryComponent,
        PageCheckoutComponent,
        PageCompareComponent,
        PageProductComponent,
        PageTrackOrderComponent,
        PageWishlistComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        CarouselModule,
        LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
        // modules
        BlocksModule,
        SharedModule,
        ShopRoutingModule,
        WidgetsModule
    ]
})
export class ShopModule { }
