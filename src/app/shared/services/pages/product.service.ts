// Angular
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT, formatNumber } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

// third-party
import { ToastrService } from 'ngx-toastr';

// RxJS
import { map, catchError, takeUntil } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';

// ANN Shop
// Environment
import { environment } from 'src/environments/environment';
// Interface
import { ProductProduct } from '../../interfaces/product/product-product';
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
    private toastr: ToastrService,
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
  public getProduct(slug: string): Observable<ProductProduct> {
    return this.http.get(this.urlProduct(slug))
      .pipe(
        map((value: ProductProduct) => value),
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
   * @param id product ID
   */
  public downloadAdvertisementImage(id: number, sku: string): Observable<boolean> {
    let downloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    this.http.get(this.urlAdvertisementImage(id))
    .subscribe(
      (data: string[]) => {
        // Khai báo thư viên
        const FileSaver = require('file-saver');
        // Số lượng ảnh cần download
        let count: number = data.length;

        data.forEach((item: string, index: number) => {
          setTimeout(() => {
            FileSaver.saveAs(item, `${sku}-${index + 1}`);
            if (index === count - 1) {
              downloading.next(false);
              this.toastr.success("Tải hình ảnh thành công")
            }
          }, 1000);
        });
      },
      (err) => {
        this.toastr.error("Đã có lỗi trong quá trình tải hình ảnh");
      }
    );

    return downloading.pipe(takeUntil(this.destroy$));
  }

  private createContentProductAdvertisement(product: ProductProduct, user?: User): string {
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
        let regularPrice = (+product.regularPrice || 0) + user.setting.increntPrice;
        let retailPrice = (+product.retailPrice || 0) + user.setting.increntPrice;

        content += `📌 Giá: ${formatNumber(retailPrice, this.currency.options.locale, this.currency.options.digitsInfo) || ""} VND\n`;
        content += '\n';
      }

      content += `🔖 Chất liệu: ${product.materials || ""}\n`;
      content += '\n';
      content += `🔖 Mô tả: ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
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
          content += `📚 Sizes: ${strSize}`;
          content += '\n';
        }
      }

      // Config phone
      if (user.shop.phone) {
        content += `📌 Điện thoại: ${user.shop.phone || ""}\n`;
        content += '\n';
      }

      // Config address
      if (user.shop.address) {
        content += `📌 Địa chỉ: ${user.shop.address || ""}\n`;
        content += '\n';
      }
    }
    else {
      content += `${product.sku || ""} - ${product.name || ""}\n`;
      content += '\n';
      content += `📌 Giá lẻ: ${formatNumber(+product.retailPrice || 0, this.currency.options.locale, this.currency.options.digitsInfo) || ""} VND\n`;
      content += '\n';
      content += `🔖 Chất liệu: ${product.materials || ""}\n`;
      content += '\n';
      content += `🔖 Mô tả: ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
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
          content += `📚 Sizes: ${strSize}`;
          content += '\n';
        }
      }
    }

    return content;
  }

  getContentProductAdvertisement(product: ProductProduct): Observable<boolean> {
    let copying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    // Get user info
    const userJSON = localStorage.getItem('user');
    let user: User = userJSON ? JSON.parse(userJSON) : null;

    if (user) {
      var textArea = this.dom.createElement("textarea");
      textArea.style.position = 'fixed';
      textArea.style.left = '0';
      textArea.style.top = '0';
      textArea.style.opacity = '0';
      this.dom.body.appendChild(textArea);
      textArea.innerHTML = this.createContentProductAdvertisement(product, user);
      textArea.focus();
      // Select Text
      var range = this.dom.createRange();
      range.selectNodeContents(textArea);
      let selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
      // Copy and remove textArea
      this.dom.execCommand('copy');
      this.dom.body.removeChild(textArea);

      copying.next(false);
    }
    else
    {
      this.copyConfig.show(user).subscribe();
      copying.next(false);
    }

    return copying.pipe(takeUntil(this.destroy$));
  }
}
