import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { WishlistService } from '../../services/wishlist.service';
import { CopyConfigService } from '../../services/copy-config.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { Thumbnail } from '../../interfaces/common/thumbnail';
// import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    @Input() product: any;
    @Input() layout: 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal' | null = null;

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    showingCopyConfig = false;
    copyingProductInfo = false;

    constructor(
        private cd: ChangeDetectorRef,
        // private service: ProductService,
        public root: RootService,
        public wishlist: WishlistService,
        public copyConfig: CopyConfigService,
        public currency: CurrencyService
    ) { }

    ngOnInit(): void {
        this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cd.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addToWishlist(): void {
        if (this.addingToWishlist) {
            return;
        }

        this.addingToWishlist = true;
        this.wishlist.add(this.product).subscribe({
            complete: () => {
                this.addingToWishlist = false;
                this.cd.markForCheck();
            }
        });
    }

    showCopyConfig(): void {
        if (this.showingCopyConfig) {
            return;
        }

        this.showingCopyConfig = true;
        const userJSON = localStorage.getItem('user');
        let user: User = userJSON ? JSON.parse(userJSON) : null;

        this.copyConfig.show(user).subscribe({
            complete: () => {
                this.showingCopyConfig = false;
                this.cd.markForCheck();
            }
        });
    }

    getImageThumbnail(thumbnails: Thumbnail[], size: string): string {
        let url: string = "";
        thumbnails.forEach(item => {
            if (item.size === size) {
                url = item.url;
                return false;
            }
        });

        return url
    }

    // copyProductInfo(product: Product, btCopy1: HTMLButtonElement, btCopy2: HTMLButtonElement): void {
    //     if (this.copyingProductInfo) {
    //         return;
    //     }

    //     this.copyingProductInfo = true;
    //     let result = this.service.copyInfo(product);
    //     this.copyingProductInfo = false;
    //     this.cd.markForCheck();

    //     if (result)
    //     {
    //         btCopy1.innerHTML = "Đã COPY";
    //         btCopy2.innerHTML = "Đã COPY";
    //     }
    // }

    // saveProductImage(product: Product): void {
    //     this.service.saveProductImage(product.sku)
    // }
}
