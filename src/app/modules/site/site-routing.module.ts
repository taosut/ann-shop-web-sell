// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
// components
import { PageDeliveryPolicyComponent } from './pages/page-delivery-policy/page-delivery-policy.component';
import { PageWholsalePolicyComponent } from './pages/page-wholsale-policy/page-wholsale-policy.component';


const routes: Routes = [
  {
    path: 'chinh-sach-giao-hang',
    component: PageDeliveryPolicyComponent
  },
  {
    path: 'chi-sach-ban-si',
    component: PageWholsalePolicyComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
