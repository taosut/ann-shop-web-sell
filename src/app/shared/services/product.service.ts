// import { DOCUMENT } from "@angular/platform-browser";
// import { Inject, Injectable } from '@angular/core';
// import { formatNumber } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { environment } from '../../../environments/environment'
// import { CurrencyService } from './currency.service';
// import { Product } from '../interfaces/product/product-product';
// import { User } from '../interfaces/user';
// import { CopyConfigService } from './copy-config.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private dom: Document;

//   constructor(
//     @Inject(DOCUMENT) dom: Document,
//     private http: HttpClient,
//     private currency: CurrencyService,
//     private copyConfig: CopyConfigService
//   ) {
//     this.dom = dom;
//   }

//   getProductAdvertisementInfo(product: Product, user?: User): string {
//     let content: string = '';
//     if (user) {
//       // Config SKU - Product name
//       if (user.setting.showSKU && user.setting.showProductName) {
//         content += `${product.sku || ""} - ${product.name || ""}\n`;
//         content += '\n';
//       }
//       else {
//         if (user.setting.showSKU && !user.setting.showProductName) {
//           content += `${product.sku || ""}`;
//           content += '\n';
//         }
//         else if (!user.setting.showSKU && user.setting.showProductName) {
//           content += `${product.name || ""}\n`;
//           content += '\n';
//         }
//         else {
//           content += '';
//         }
//       }

//       // Config RegularPrice and RetailPrice
//       if (user.setting.increntPrice) {
//         let regularPrice = (+product.regularPrice || 0) + user.setting.increntPrice;
//         let retailPrice = (+product.retailPrice || 0) + user.setting.increntPrice;

//         content += `📌 Giá: ${formatNumber(retailPrice, this.currency.options.locale, this.currency.options.digitsInfo) || ""} VND\n`;
//         content += '\n';
//       }

//       content += `🔖 Chất liệu: ${product.materials || ""}\n`;
//       content += '\n';
//       content += `🔖 Mô tả: ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
//       content += '\n';

//       if (product.colors && product.colors.length) {

//         let strColor: string = "";
//         product.colors.forEach(item => {
//           if (!item.name.match(/^Mẫu.*$/g))
//             strColor += ` ${item.name};`;
//         });

//         if (strColor) {
//           content += `📚 Màu: ${strColor}`;
//           content += '\n';
//         }
//       }
//       if (product.sizes && product.sizes.length) {

//         let strSize: string = "";
//         product.sizes.forEach(item => {
//           if (!item.name.match(/^Mẫu.*$/g))
//             strSize += ` ${item.name};`;
//         });

//         if (strSize) {
//           content += `📚 Sizes: ${strSize}`;
//           content += '\n';
//         }
//       }

//       // Config phone
//       if (user.shop.phone) {
//         content += `📌 Điện thoại: ${user.shop.phone || ""}\n`;
//         content += '\n';
//       }

//       // Config address
//       if (user.shop.address) {
//         content += `📌 Địa chỉ: ${user.shop.address || ""}\n`;
//         content += '\n';
//       }
//     }
//     else {
//       content += `${product.sku || ""} - ${product.name || ""}\n`;
//       content += '\n';
//       content += `📌 Giá lẻ: ${formatNumber(+product.retailPrice || 0, this.currency.options.locale, this.currency.options.digitsInfo) || ""} VND\n`;
//       content += '\n';
//       content += `🔖 Chất liệu: ${product.materials || ""}\n`;
//       content += '\n';
//       content += `🔖 Mô tả: ${product.content ? product.content.replace(/<img[a-zA-Z0-9\s\=\"\-\/\.]+\/>/g, '') : ""}\n`;
//       if (product.colors && product.colors.length) {

//         let strColor: string = "";
//         product.colors.forEach(item => {
//           if (!item.name.match(/^Mẫu.*$/g))
//             strColor += ` ${item.name};`;
//         });

//         if (strColor) {
//           content += `📚 Màu: ${strColor}`;
//           content += '\n';
//         }
//       }
//       if (product.sizes && product.sizes.length) {

//         let strSize: string = "";
//         product.sizes.forEach(item => {
//           if (!item.name.match(/^Mẫu.*$/g))
//             strSize += ` ${item.name};`;
//         });

//         if (strSize) {
//           content += `📚 Sizes: ${strSize}`;
//           content += '\n';
//         }
//       }
//     }

//     return content;
//   }

//   copyInfo(product: Product): boolean {
//     // Get user info
//     const userJSON = localStorage.getItem('user');
//     let user: User = userJSON ? JSON.parse(userJSON) : null;

//     if (user) {
//       var textArea = this.dom.createElement("textarea");
//       textArea.style.position = 'fixed';
//       textArea.style.left = '0';
//       textArea.style.top = '0';
//       textArea.style.opacity = '0';
//       this.dom.body.appendChild(textArea);
//       textArea.innerHTML = this.getProductAdvertisementInfo(product, user);
//       textArea.focus();
//       // Select Text
//       var range = this.dom.createRange();
//       range.selectNodeContents(textArea);
//       let selection = window.getSelection();
//       selection.removeAllRanges();
//       selection.addRange(range);
//       textArea.setSelectionRange(0, 999999);
//       // Copy and remove textArea
//       this.dom.execCommand('copy');
//       this.dom.body.removeChild(textArea);

//       return true;
//     }
//     else
//     {
//       this.copyConfig.show(user).subscribe();
//       return false;
//     }
//   }

//   saveProductImage(sku: string): void {
//     // Setting header
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };

//     this.http.post(environment.apiProductImage, JSON.stringify({ sku: sku }), httpOptions)
//       .subscribe(
//         (resp: { d: string }) => {
//           let data: string[] = JSON.parse(resp.d);

//           if (data) {
//             const FileSaver = require('file-saver');
//             data.forEach((item: string, index: number) => {
//               setTimeout(() => {
//                 FileSaver.saveAs(data[index], `${sku}-${index + 1}`);
//               }, 1000);
//             });
//           }
//         },
//         (err) => {
//           alert("Lỗi");
//         }
//       );
//   }
// }
