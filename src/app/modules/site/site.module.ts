// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANN Shop
// modules
import { SiteRoutingModule } from './site-routing.module';
// components
import { PageWholsalePolicyComponent } from './pages/page-wholsale-policy/page-wholsale-policy.component';
import { PageDeliveryPolicyComponent } from './pages/page-delivery-policy/page-delivery-policy.component';
import { TestComponent } from './pages/test/test.component';


@NgModule({
  declarations: [
    // pages
    PageDeliveryPolicyComponent,
    PageWholsalePolicyComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
