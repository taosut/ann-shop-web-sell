import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
// import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
// import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
// import { PageCompareComponent } from './pages/page-compare/page-compare.component';
// import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
// import { CheckoutGuard } from './guards/checkout.guard';
import { PageProductComponent } from './pages/page-product/page-product.component';

const routes: Routes = [
    {
        path: '',
        component: PageCategoryComponent,
        data: {
            columns: 4,
            viewMode: 'grid'
        }
    },
    {
      path: 'danh-muc',
      component: PageCategoryComponent,
      data: {
          columns: 4,
          viewMode: 'grid'
      }
    },
    {
        path: 'danh-muc/:slug',
        component: PageCategoryComponent,
        data: {
            columns: 4,
            viewMode: 'grid'
        }
    },
    {
        path: 'san-pham/:slug',
        component: PageProductComponent,
        data: {
            layout: 'standard'
        }
    },
    {
        path: 'danh-sach-san-pham-yeu-thich',
        component: PageWishlistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
