import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

// modules
import { SharedModule } from '../../shared/shared.module';

// blocks
import { BlockCategoriesComponent } from './block-categories/block-categories.component';
import { BlockProductsComponent } from './block-products/block-products.component';

// components
import { BlockHeaderComponent } from './components/block-header/block-header.component';

@NgModule({
  declarations: [
    // blocks
    BlockCategoriesComponent,
    BlockProductsComponent,
    // components
    BlockHeaderComponent
  ],
  imports: [
    // modules (angular)
    CommonModule,
    RouterModule,
    // modules (third-party)
    CarouselModule,
    // modules
    SharedModule
  ],
  exports: [
    // blocks
    BlockCategoriesComponent,
    BlockProductsComponent,
  ]
})
export class BlocksModule { }
