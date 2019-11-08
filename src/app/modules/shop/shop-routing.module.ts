// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageSearchProductComponent } from './pages/page-search-product/page-search-product.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
import { PageProductComponent } from './pages/page-product/page-product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'hang-moi-ve'
  },
  {
    path: 'hang-moi-ve',
    component: PageCategoryComponent,
    data: {
      columns: 4,
      viewMode: 'grid'
    }
  },
  {
    path: 'danh-muc',
    pathMatch: 'full',
    redirectTo: 'hang-moi-ve'
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
    path: 'tim-kiem-san-pham',
    component: PageSearchProductComponent,
    data: {
      columns: 4,
      viewMode: 'grid'
    }
  },
  {
    path: 'san-pham',
    pathMatch: 'full',
    redirectTo: 'hang-moi-ve'
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
