// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageProductNewComponent } from './pages/page-product-new/page-product-new.component';
import { PageProductSaleComponent } from './pages/page-product-sale/page-product-sale.component';

const routes: Routes = [
  {
    path: '',
    component: PageProductNewComponent,
    data: {
      columns: 4,
      viewMode: 'grid'
    }
  },
  {
    path: 'hang-sale',
    component: PageProductSaleComponent,
    data: {
      columns: 4,
      viewMode: 'grid'
    }
  },
  {
    path: ':productBadge',
    component: PageProductNewComponent,
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
export class ShopRoutingModule { }
