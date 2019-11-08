// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageSearchProductComponent } from './pages/page-search-product/page-search-product.component';


const routes: Routes = [
  {
    path: 'product',
    component: PageSearchProductComponent,
    data: {
      columns: 4,
      viewMode: 'grid'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
