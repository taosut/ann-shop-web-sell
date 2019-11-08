import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

// pages
import { PageProductNewComponent } from './pages/page-product-new/page-product-new.component';

@NgModule({
    declarations: [
        // pages
        PageProductNewComponent,
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        CarouselModule,
        LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
        // modules
        BlocksModule,
        SharedModule,
        ShopRoutingModule,
    ]
})
export class ShopModule { }
