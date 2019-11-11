import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LazyLoadImageModule, intersectionObserverPreset  } from 'ng-lazyload-image';

// directives
import { ClickDirective } from './directives/click.directive';
import { CollapseContentDirective, CollapseDirective, CollapseItemDirective } from './directives/collapse.directive';
import { DepartmentsAreaDirective } from './directives/departments-area.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { FakeSlidesDirective } from './directives/fake-slides.directive';
import { OwlPreventClickDirective } from './directives/owl-prevent-click.directive';
import { InputCurrencyDirective } from './directives/input-currency.directive';

// components
import { AlertComponent } from './components/alert/alert.component';
import { CopyConfigComponent } from './components/copy-config/copy-config.component';
import { IconComponent } from './components/icon/icon.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductComponent } from './components/product/product.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { ShortcodeComponent } from '../shared/components/shortcode/shortcode.component';

// pipes
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';


@NgModule({
    declarations: [
        // directives
        ClickDirective,
        CollapseContentDirective,
        CollapseDirective,
        CollapseItemDirective,
        DepartmentsAreaDirective,
        DropdownDirective,
        FakeSlidesDirective,
        OwlPreventClickDirective,
        InputCurrencyDirective,
        // components
        AlertComponent,
        CopyConfigComponent,
        IconComponent,
        InputNumberComponent,
        LoadingBarComponent,
        LoadingSpinnerComponent,
        PageHeaderComponent,
        PaginationComponent,
        PostCardComponent,
        ProductsViewComponent,
        ProductCardComponent,
        ProductComponent,
        ScrollComponent,
        ShortcodeComponent,
        // pipes
        CurrencyFormatPipe,
    ],
    imports: [
        // modules (angular)
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        CarouselModule,
        ModalModule.forRoot(),
        LazyLoadImageModule.forRoot({ preset: intersectionObserverPreset }),
    ],
    exports: [
        // directives
        ClickDirective,
        CollapseContentDirective,
        CollapseDirective,
        CollapseItemDirective,
        DepartmentsAreaDirective,
        DropdownDirective,
        FakeSlidesDirective,
        OwlPreventClickDirective,
        InputCurrencyDirective,
        // components
        AlertComponent,
        CopyConfigComponent,
        IconComponent,
        InputNumberComponent,
        LoadingBarComponent,
        LoadingSpinnerComponent,
        PageHeaderComponent,
        PaginationComponent,
        PostCardComponent,
        ProductsViewComponent,
        ProductCardComponent,
        ProductComponent,
        ScrollComponent,
        ShortcodeComponent,
        // pipes
        CurrencyFormatPipe
    ]
})
export class SharedModule { }
