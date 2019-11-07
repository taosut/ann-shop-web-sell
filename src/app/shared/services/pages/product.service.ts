// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJS
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// ANN Shop
// Environment
import { environment } from 'src/environments/environment';
// Interface
import { ProductProduct } from '../../interfaces/product/product-product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Lấy url api product theo slug
   */
  private urlProduct(slug: string): string {
    return `${environment.api}/product/${slug}`;
  }

  /**
   * Lấy url api product related theo slug
   */
  private urlProductRelated(slug: string): string {
    return `${environment.api}/product/${slug}/related`;
  }

  /**
   * Lấy url api image của product
   */
  private urlImage(id: number): string {
    return `${environment.api}/product/${id}/image`;
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
}
