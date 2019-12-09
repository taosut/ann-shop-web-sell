// Angular
import { Injectable, OnDestroy } from '@angular/core';

// Rxjs
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, delay } from 'rxjs/operators';

// ANN Shop
// Interface
import { DownloadImage } from '../../interfaces/modals/download-image';
import { ProductCard } from '../../interfaces/common/product-card';
// Service
import { ProductService } from '../pages/product.service';


@Injectable({
  providedIn: 'root'
})
export class DownloadImageService implements OnDestroy {
  private destroy$: Subject<void>;
  private showSubject$: Subject<DownloadImage>;

  public show$: Observable<DownloadImage>;

  constructor(
    private productService: ProductService
  ) {
    this.destroy$ = new Subject();
    this.showSubject$ = new Subject<DownloadImage>();
    this.show$ = this.showSubject$.pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getThumbnail(image: string, size: string): string {
    return image.replace(/^\/uploads\/images/g, `/uploads/images/${size}`);
  }

  private getFileName(sku: string, image: string, index: number): string {
    let extr: string[] = image.match(/.\w+$/g) || [];
    let fileName: string = "";
    let fileType: string = "";

    fileName = `${sku}-${index}`;
    if (extr.length > 0)
      fileType = extr[0];

    return `${fileName}${fileType}`;
  }

  public show(product: ProductCard): Observable<void> {
    return this.productService.getAdvertisementImage(product.productID)
      .pipe(
        delay(1000),
        map((images: string[]) => {
          let imageListDownload = [];

          images.filter((image :string) => image.length > 0).forEach((image: string, index: number) => {
            imageListDownload.push({
              url: image,
              fileName: this.getFileName(product.sku, image, index + 1),
              thumbnail: this.getThumbnail(image, '85x113')
            })
          })

          this.showSubject$.next({
            product: product,
            images: imageListDownload
          })
        })
      );
  }
}
