// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageProductComponent } from './pages/page-product/page-product.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/not-found'
  },
  {
    path: ':slug',
    component: PageProductComponent,
    data: {
      layout: 'standard'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
