// Angular
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT, formatNumber } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJS
import { map, catchError, takeUntil } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';

// ANN Shop
// Environment
import { environment } from '../../../../environments/environment';
// Interface
import { ProductCard } from '../../interfaces/common/product-card';
import { Product } from '../../interfaces/common/product';
import { User } from '../../interfaces/user';
// Service
import { CurrencyService } from '../currency.service';
import { CopyConfigService } from '../copy-config.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {
  private dom: Document;
  private destroy$: Subject<void>

  constructor(
    @Inject(DOCUMENT) dom: Document,
    private http: HttpClient,
    private copyConfig: CopyConfigService,
    private currency: CurrencyService,
  ) {
    this.dom = dom;
    this.destroy$ = new Subject();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Lấy url api product theo slug
   */
  private urlProduct(slug: string): string {
    return `${environment.apiPageProduct}/${slug}`;
  }

  /**
   * Lấy url api product related theo slug
   */
  private urlProductRelated(slug: string): string {
    return `${environment.apiPageProduct}/${slug}/related`;
  }

  /**
   * Lấy url api image của product
   */
  private urlImage(id: number): string {
    return `${environment.apiPageProduct}/${id}/image`;
  }

  /**
   * Lấy url api hình anh quảng cáo
   */
  private urlAdvertisementImage(id: number): string {
    return `${environment.apiPageProduct}/${id}/advertisement-image`;
  }

  /**
   * Lấy thông tin sản phẩm
   * @param slug product slug
   */
  public getProduct(slug: string): Observable<Product> {
    return this.http.get(this.urlProduct(slug))
      .pipe(
        map((value: Product) => value),
        catchError((err: Error) => throwError(err))
      );
  }

  /**
   * Lấy thông tin sản phẩm con
   * @param slug product slug
   * @param page trang hiện tại
   * @param limit giới hạng số lượng trong 1 trang
   */
  public getProductRelated(slug: string, page: number, limit: number): Observable<any> {
    const observe = 'response';
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', limit.toString());

    return this.http.get(this.urlProductRelated(slug), { observe, params })
  }

  /**
   * Lấy thông tin sản phẩm
   * @param id product ID
   */
  public getImage(id: number, color: number, size: number): Observable<string> {
    const params = new HttpParams()
      .set('color', color.toString())
      .set('size', size.toString());

    return this.http.get(this.urlImage(id), { params })
      .pipe(
        map((value: string) => value),
        catchError((err: Error) => throwError(err))
      );
  }

  /**
   * Lấy danh sách image quảng cáo
   * @param productID
   */
  public getAdvertisementImage(productID: number): Observable<string[]> {
    return this.http.get<string[]>(this.urlAdvertisementImage(productID));
  }

  private createContentProductAdvertisement(product: ProductCard, user?: User): string {
    let content: string = '';
    if (user) {
      // Config SKU - Product name
      if (user.setting.showSKU && user.setting.showProductName) {
        content += `${product.sku || ""} - ${product.name || ""}\n`;
        content += '\n';
      }
      else {
        if (user.setting.showSKU && !user.setting.showProductName) {
          content += `${product.sku || ""}`;
          content += '\n';
        }
        else if (!user.setting.showSKU && user.setting.showProductName) {
          content += `${product.name || ""}\n`;
          content += '\n';
        }
        else {
          content += '';
        }
      }

      // Config RegularPrice and RetailPrice
      if (user.setting.increntPrice) {
        let retailPrice = (+product.regularPrice || 0) + user.setting.increntPrice;

        content += `📌 ${formatNumber(retailPrice, this.currency.options.locale, this.currency.options.digitsInfo) || ""} \n`;
        content += '\n';
      }

      content += `🔖 ${product.materials || ""}\n`;
      content += '\n';
      if (product.content) {
        let temp = document.createElement("div");
        temp.innerHTML = product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '');
        content += `🔖 ${temp.textContent || temp.innerText || ""}\n`;
      }
      else {
        content += `🔖 \n`;
      }
      content += '\n';

      if (product.colors && product.colors.length) {

        let strColor: string = "";
        product.colors.forEach(item => {
          if (!item.name.match(/^Mẫu.*$/g))
            strColor += ` ${item.name};`;
        });

        if (strColor) {
          content += `📚 Màu: ${strColor}`;
          content += '\n';
        }
      }
      if (product.sizes && product.sizes.length) {

        let strSize: string = "";
        product.sizes.forEach(item => {
          if (!item.name.match(/^Mẫu.*$/g))
            strSize += ` ${item.name};`;
        });

        if (strSize) {
          content += `📚 Size: ${strSize}`;
          content += '\n';
        }
      }

      // Config phone
      if (user.shop.phone) {
        content += '\n';
        content += `📌 ${user.shop.phone || ""}\n`;
        content += '\n';
      }

      // Config address
      if (user.shop.address) {
        content += `📌 ${user.shop.address || ""}\n`;
        content += '\n';
      }
    }
    else {
      content += `${product.sku || ""} - ${product.name || ""}\n`;
      content += '\n';
      content += `📌 ${formatNumber(+product.retailPrice || 0, this.currency.options.locale, this.currency.options.digitsInfo) || ""}\n`;
      content += '\n';
      content += `🔖 ${product.materials || ""}\n`;
      content += '\n';
      content += `🔖 ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
      if (product.colors && product.colors.length) {

        let strColor: string = "";
        product.colors.forEach(item => {
          if (!item.name.match(/^Mẫu.*$/g))
            strColor += ` ${item.name};`;
        });

        if (strColor) {
          content += `📚 Màu: ${strColor}`;
          content += '\n';
        }
      }
      if (product.sizes && product.sizes.length) {

        let strSize: string = "";
        product.sizes.forEach(item => {
          if (!item.name.match(/^Mẫu.*$/g))
            strSize += ` ${item.name};`;
        });

        if (strSize) {
          content += `📚 Size: ${strSize}`;
          content += '\n';
        }
      }
    }

    return content;
  }

  getContentProductAdvertisement(product: ProductCard): Observable<boolean> {
    let copying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    // Get user info
    const userJSON = localStorage.getItem('user');
    let user: User = userJSON ? JSON.parse(userJSON) : null;

    if (user) {
      let textArea = this.dom.createElement("textarea");
      let readOnly = textArea.readOnly;
      let editable = textArea.contentEditable;

      textArea.contentEditable = "true";
      textArea.readOnly = false;
      textArea.style.position = 'fixed';
      textArea.style.left = '0';
      textArea.style.top = '0';
      textArea.style.opacity = '0';
      textArea.style.height = '0';
      textArea.style.width = '0';
      this.dom.body.appendChild(textArea);
      textArea.innerHTML = this.createContentProductAdvertisement(product, user);
      textArea.focus();
      // Select Text
      const range = this.dom.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
      textArea.contentEditable = editable;
      textArea.readOnly = readOnly;
      // Copy and remove textArea
      this.dom.execCommand('copy');
      this.dom.body.removeChild(textArea);

      copying.next(false);
    }
    else
    {
      this.copyConfig.show(user, product).subscribe();
      copying.next(false);
    }

    return copying.pipe(takeUntil(this.destroy$));
  }
}
