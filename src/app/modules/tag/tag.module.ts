// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules (third-party)
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// ANN Shop
// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';
// pages
import { PageTagComponent } from './pages/page-tag/page-tag.component';

@NgModule({
  declarations: [
    // pages
    PageTagComponent
  ],
  imports: [
    CommonModule,
    // modules (third-party)
    LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
    // modules
    BlocksModule,
    SharedModule,
    TagRoutingModule
  ]
})
export class TagModule { }
