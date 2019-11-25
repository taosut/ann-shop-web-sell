// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
// Page
import { PageProductSaleComponent } from './pages/page-product-sale/page-product-sale.component';

const routes: Routes = [
  {
    path: '',
    component: PageProductSaleComponent,
    data: {
      columns: 4,
      viewMode: 'grid'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
