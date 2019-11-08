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

// components
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';

// pages
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
import { PageSearchProductComponent } from './pages/page-search-product/page-search-product.component';

@NgModule({
    declarations: [
        // components
        ProductsViewComponent,
        ProductTabsComponent,
        // pages
        PageCategoryComponent,
        PageProductComponent,
        PageWishlistComponent,
        PageSearchProductComponent
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
    ]
})
export class ShopModule { }
