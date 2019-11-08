// Angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

// modules (third-party)
import { ToastrService } from 'ngx-toastr';

// RxJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// ANN Shop
// Interface
import { User } from '../../interfaces/user';
import { Thumbnail } from '../../interfaces/common/thumbnail';

// Service
import { CopyConfigService } from '../../services/copy-config.service';
import { CurrencyService } from '../../services/currency.service';
import { RootService } from '../../services/root.service';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/pages/product.service';
import { ProductProduct } from '../../interfaces/product/product-product';

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
  downloadingImages: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private productService: ProductService,
    public copyConfig: CopyConfigService,
    public currency: CurrencyService,
    public root: RootService,
    public wishlist: WishlistService
  ) {
    this.downloadingImages = false;
  }

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

  copyProductInfo(productSlug: string, btCopy1: HTMLButtonElement, btCopy2: HTMLButtonElement): void {
    if (this.copyingProductInfo) {
      return;
    }

    this.copyingProductInfo = true;
    this.productService.getProduct(productSlug)
      .subscribe((product: ProductProduct) =>
        this.productService.getContentProductAdvertisement(product)
          .subscribe((copying: boolean) => {
            this.copyingProductInfo = copying;
            this.cd.markForCheck();
            btCopy1.innerHTML = "Đã COPY";
            btCopy2.innerHTML = "Đã COPY";
          })
      );
  }

  saveProductImage(product: any): void {
    if (product && product.id && product.sku) {
      this.downloadingImages = true;
      this.productService.downloadAdvertisementImage(product.id, product.sku)
        .subscribe((downloading: boolean) => { this.downloadingImages = downloading; });
    }
  }
}
