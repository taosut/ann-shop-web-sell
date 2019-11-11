// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules (third-party)
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// ANN Shop
// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
// pages
import { PageCategoryComponent } from './pages/page-category/page-category.component';


@NgModule({
  declarations: [
    // pages
    PageCategoryComponent
  ],
  imports: [
    CommonModule,
    // modules (third-party)
    LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
    // modules
    BlocksModule,
    SharedModule,
    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
