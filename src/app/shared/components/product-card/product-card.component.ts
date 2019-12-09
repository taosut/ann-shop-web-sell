// Angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// ANN Shop
// Enum
import { ProductBadge } from '../../interfaces/common/product-bage';
// Interface
import { ProductCard } from '../../interfaces/common/product-card';
import { Thumbnail } from '../../interfaces/common/thumbnail';
import { WishlistProduct } from '../../interfaces/wishlist/wishlist-product';
// Service
import { CopyConfigService } from '../../services/copy-config.service';
import { CurrencyService } from '../../services/currency.service';
import { RootService } from '../../services/root.service';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/pages/product.service';
import { DownloadImageService } from '../../services/modals/download-image.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  @Input() product: ProductCard;
  @Input() layout: 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal' | null = null;

  addingToCart = false;
  addingToWishlist = false;
  addingToCompare = false;
  copyingProductInfo = false;
  showingImageDownload: boolean;

  ProductBadgeEnum = ProductBadge;

  constructor(
    private cd: ChangeDetectorRef,
    private productService: ProductService,
    private downloadImage: DownloadImageService,
    public copyConfig: CopyConfigService,
    public currency: CurrencyService,
    public root: RootService,
    public wishlist: WishlistService,
  ) {
    this.showingImageDownload = false;
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

    let data: WishlistProduct = {
      productID: this.product.productID,
      name: this.product.name,
      sku: this.product.sku,
      thumbnails: this.product.thumbnails,
      badge: this.product.badge,
      regularPrice: this.product.regularPrice,
    }

    this.addingToWishlist = true;
    this.wishlist.add(data).subscribe({
      complete: () => {
        this.addingToWishlist = false;
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

  copyProductInfo(product: ProductCard, btCopy1: HTMLButtonElement, btCopy2: HTMLButtonElement): void {
    if (this.copyingProductInfo) {
      return;
    }

    this.copyingProductInfo = true;
    timer(500).subscribe(_ =>
      this.productService.getContentProductAdvertisement(product)
        .subscribe((copying: boolean) => {
          this.copyingProductInfo = copying;
          this.cd.markForCheck();
          btCopy1.innerHTML = "Đã Copy";
          btCopy2.innerHTML = "Đã Copy";
        })
    );

  }

  saveProductImage(product: ProductCard): void {
    if (product) {
      this.showingImageDownload = true;

      this.downloadImage.show(product).subscribe(
        _ => {
          this.showingImageDownload = false;
          this.cd.markForCheck();
        },
        _ => {
          this.showingImageDownload = false;
          this.cd.markForCheck();
        }
      );
    }
  }
}
