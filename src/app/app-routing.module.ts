// Angular
import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
// Component
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeTwoComponent } from './pages/page-home-two/page-home-two.component';
import { RootComponent } from './components/root/root.component';

export function makeRoutes(homeComponent: Type<any>): Routes {
  return [
    {
      path: '',
      component: homeComponent
    },
    {
      path: 'shop',
      loadChildren: './modules/shop/shop.module#ShopModule'
    },
    {
      path: 'category',
      loadChildren: './modules/category/category.module#CategoryModule'
    },
    {
      path: 'product',
      loadChildren: './modules/product/product.module#ProductModule'
    },
    {
      path: 'search',
      loadChildren: './modules/search/search.module#SearchModule'
    },
    {
      path: 'page',
      loadChildren: './modules/site/site.module#SiteModule'
    },
    {
      path: 'wishlist',
      loadChildren: './modules/wishlist/wishlist.module#WishlistModule'
    },
    {
      path: '**',
      redirectTo: 'not-found'
    },
    {
      path: 'not-found',
      component: PageNotFoundComponent
    }
  ];
}

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    data: {
      headerLayout: 'compact'
    },
    children: makeRoutes(PageHomeTwoComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
