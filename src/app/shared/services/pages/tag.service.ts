// Angular
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

// RxJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// ANN Shop
// Enviroment
import { environment } from '../../../../environments/environment';
// Intefface
import { Tag } from '../../interfaces/common/tag';
import { ProductSort } from '../../interfaces/common/product-sort';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  /**
   * Lấy url api tag theo slug
   */
  private urlTag(slug: string): string {
    return `${environment.apiPageTag}/${slug}`;
  }

  /**
   * Lấy url api sorts trong danh mục
   */
  private urlSort(): string {
    return `${environment.apiPageTag}/sort`;
  }

  /**
   * Lấy url api sản phẩm theo slug tag
   */
  private urlProduct(slug: string): string {
    return `${environment.apiPageTag}/${slug}/product`;
  }

  /**
   * Lấy thông tin tag
   * @param slug tag slug
   */
  public getTag(slug: string): Observable<Tag> {
    return this.http.get(this.urlTag(slug))
      .pipe(
        map((value: Tag) => value),
        catchError((err: Error) => throwError(err))
      )
  }

  /**
   * Lấy danh sách sort trong danh mục
   */
  public getSort(): Observable<ProductSort[]> {
    return this.http.get(this.urlSort())
      .pipe(
        map((value: ProductSort[]) => value),
        catchError((err: Error) => throwError(err))
      )
  }

  /**
   * Lấy danh sách sản phẩm theo category
   * @param slug
   * @param sort product new | price asc | price desc | model new
   * @param page
   * @param limit
   */
  public getProductByTag(slug: string, sort: number, page: number, limit: number): Observable<any> {
    const observe = 'response';
    let url: string;
    let params: HttpParams;

    url = this.urlProduct(slug);
    params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', limit.toString());

    if (sort) {
      params = params.set('sort', sort.toString());
    }

    return this.http.get(url, { observe, params });
  }
}
