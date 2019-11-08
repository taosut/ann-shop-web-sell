// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';


const routes: Routes = [
  {
    path: '',
    component: PageWishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
