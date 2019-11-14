// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageProductNewComponent } from './pages/page-product-new/page-product-new.component';

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
    path: ':preOrder',
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
