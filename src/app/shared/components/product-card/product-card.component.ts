import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { QuickviewService } from '../../services/quickview.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Thumbnail } from '../../interfaces/thumbnail';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    @Input() product: Product;
    @Input() layout: 'grid-sm'|'grid-nl'|'grid-lg'|'list'|'horizontal'|null = null;

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    showingQuickview = false;

    constructor(
        private http: HttpClient,
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartService,
        public wishlist: WishlistService,
        public compare: CompareService,
        public quickview: QuickviewService,
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

    addToCart(): void {
        if (this.addingToCart) {
            return;
        }

        this.addingToCart = true;
        this.cart.add(this.product, 1).subscribe({
            complete: () => {
                this.addingToCart = false;
                this.cd.markForCheck();
            }
        });
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

    addToCompare(): void {
        if (this.addingToCompare) {
            return;
        }

        this.addingToCompare = true;
        this.compare.add(this.product).subscribe({
            complete: () => {
                this.addingToCompare = false;
                this.cd.markForCheck();
            }
        });
    }

    showQuickview(): void {
        if (this.showingQuickview) {
            return;
        }

        this.showingQuickview = true;
        this.quickview.show(this.product).subscribe({
            complete: () => {
                this.showingQuickview = false;
                this.cd.markForCheck();
            }
        });
    }

    getImageThumbnail(thumbnails: Thumbnail[], size: string): string {
        let url: string = "";
        thumbnails.forEach(item => {
            if (item.size === size)
            {
                url = item.url;
                return false;
            }
        });

        return url
    }

    private _getProductAdvertisementInfo(product: Product): string{
        let content: string = '';

        if (product){
            content += `${product.sku || ""} - ${product.name || ""}\n`;
            content += '\n';
            content += `📌 Giá sỉ: ${product.regularPrice || ""}\n`;
            content += '\n';
            content += `📌 Giá lẻ: ${product.retailPrice  || ""}\n`;
            content += '\n';
            content += `🔖 Chất liệu: ${product.materials || ""}\n`;
            content += '\n';
            content += `🔖 Mô tả: ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
        }
        return content;
    }

    copy(product: Product): void{
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this._getProductAdvertisementInfo(product);
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    save(product: Product): void{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };

        this.http.post(environment.apiProductImage, JSON.stringify({sku: product.sku}), httpOptions)
            .subscribe(
                (resp: {d: string})  => {
                    let data: string[] = JSON.parse(resp.d);

                    if (data)
                    {
                        let link = document.createElement('a');
                        data.forEach((item: string, index: number) => {
                            setTimeout(function () {
                                link.setAttribute('download', `${product.sku}-${index + 1}`);
                                link.setAttribute('href', data[index]);
                                link.click();
                            }, 1000 * index);
                        });
                    }
                },
                (err) => {
                    alert("Lỗi");
                }
            );
    }
}
