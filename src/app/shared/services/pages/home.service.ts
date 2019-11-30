// Angular
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

// RxJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// ANN Shop
// Environment
import { environment } from '../../../../environments/environment';
// Interface
import { ProductCard } from '../../interfaces/common/product-card';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  /**
   * Lấy url api sản phẩm theo slug category
   */
  private urlProductCategory(slug: string): string {
    return `${environment.apiPageHome}/category/${slug}`;
  }

  /**
   * Lấy url api sản phẩm theo nhiều slug category
   */
  private urlProductCategoryList(): string {
    return `${environment.apiPageHome}/category`;
  }

  /**
   * Lấy sản phẩm theo slug category
   * @param slug Slug category
   * @param limit giới hạn
   */
  getProductCategory(slug: string, limit: number): Observable<ProductCard[]> {
    const params = new HttpParams()
      .set('pageSize', limit.toString());

    return this.http.get(this.urlProductCategory(slug), { params })
      .pipe(
        map((value: ProductCard[]) => value),
        catchError((err: Error) => throwError(err))
      );
  }

  /**
   * Lấy sản phẩm theo nhiều slug category
   * @param slugList Slug category
   * @param limit giới hạn
   */
  getProductCategoryList(slugList: string[], limit: number): Observable<ProductCard[]> {
    let params = new HttpParams()
      .set('pageSize', limit.toString());

    slugList.forEach((slug: string, index: number) => {
      params = params.set(`slugList[${index}]`, slug);
    });

    return this.http.get(this.urlProductCategoryList(), { params })
      .pipe(
        map((value: ProductCard[]) => value),
        catchError((err: Error) => throwError(err))
      );
  }

}
