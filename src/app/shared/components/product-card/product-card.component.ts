import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { User } from '../../interfaces/user';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { CopyConfigService } from '../../services/copy-config.service';
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
    showingCopyConfig = false;
    copyingProductInfo = false;

    constructor(
        private http: HttpClient,
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartService,
        public wishlist: WishlistService,
        public compare: CompareService,
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
            if (item.size === size)
            {
                url = item.url;
                return false;
            }
        });

        return url
    }

    private _getProductAdvertisementInfo(product: Product, user?: User): string{
        let content: string = '';
        if (user)
        {
            // Config SKU - Product name
            if (user.setting.showSKU && user.setting.showProductName)
            {
                content += `${product.sku || ""} - ${product.name || ""}\n`;
                content += '\n';
            }
            else {
                if (user.setting.showSKU && !user.setting.showProductName)
                {
                    content += `${product.sku || ""}`;
                    content += '\n';
                }
                else if (!user.setting.showSKU && user.setting.showProductName)
                {
                    content += `${product.name || ""}\n`;
                    content += '\n';
                }
                else
                {
                    content += '';
                }
            }

            // Config RegularPrice and RetailPrice
            if (user.setting.increntPrice)
            {
                let regularPrice = (+product.regularPrice || 0) + user.setting.increntPrice;
                let retailPrice = (+product.retailPrice || 0) + user.setting.increntPrice;

                content += `📌 Giá sỉ: ${formatNumber(regularPrice, this.currency.options.locale, this.currency.options.digitsInfo) || ""} VND\n`;
                content += '\n';
                content += `📌 Giá lẻ: ${formatNumber(retailPrice, this.currency.options.locale, this.currency.options.digitsInfo) || ""} VND\n`;
                content += '\n';
            }

            content += `🔖 Chất liệu: ${product.materials || ""}\n`;
            content += '\n';
            content += `🔖 Mô tả: ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
            content += '\n';

            // Config phone
            if (user.shop.phone)
            {
                content += `📌 Điện thoại shop: ${user.shop.phone || ""}\n`;
                content += '\n';
            }

            // Config address
            if (user.shop.address)
            {
                content += `📌 Địa chỉ shop: ${user.shop.address || ""}\n`;
                content += '\n';
            }
        }
        else
        {
            content += `${product.sku || ""} - ${product.name || ""}\n`;
            content += '\n';
            content += `📌 Giá sỉ: ${formatNumber(+product.regularPrice || 0, this.currency.options.locale, this.currency.options.digitsInfo) || ""} VND\n`;
            content += '\n';
            content += `📌 Giá lẻ: ${formatNumber(+product.retailPrice || 0, this.currency.options.locale, this.currency.options.digitsInfo)  || ""} VND\n`;
            content += '\n';
            content += `🔖 Chất liệu: ${product.materials || ""}\n`;
            content += '\n';
            content += `🔖 Mô tả: ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
        }

        return content;
    }

    copyProductInfo(product: Product): void{
        if (this.copyingProductInfo) {
            return;
        }

        try {
            this.copyingProductInfo = true;

            // Get user info
            const userJSON = localStorage.getItem('user');
            let user: User = userJSON ? JSON.parse(userJSON) : null;

            // Create Text Area
            let textArea = document.createElement('textarea');
            textArea.style.position = 'fixed';
            textArea.style.left = '0';
            textArea.style.top = '0';
            textArea.style.opacity = '0';
            textArea.value = this._getProductAdvertisementInfo(product, user);
            document.body.appendChild(textArea);
            textArea.focus();
            // Select Text
            let range = document.createRange();
            range.selectNodeContents(textArea);
            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
            // Copy and remove textArea
            document.execCommand('copy');
            document.body.removeChild(textArea);

            this.copyingProductInfo = false;
        } catch (error) {
            this.copyingProductInfo = false;
        }
    }

    saveProductImage(product: Product): void{
        // Setting header
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
                        const FileSaver = require('file-saver');
                        data.forEach((item: string, index: number) => {
                            setTimeout(() => {
                                FileSaver.saveAs(data[index], `${product.sku}-${index + 1}`);
                            }, 1000);
                        });
                    }
                },
                (err) => {
                    alert("Lỗi");
                }
            );
    }
}
