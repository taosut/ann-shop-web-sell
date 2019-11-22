// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJS
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

// ANN Shop
// Enviroment
import { environment } from '../../../environments/environment';
// Interface
import { ProductSort } from '../interfaces/common/product-sort';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  /**
   * Lấy url api sort cho màn hình search product
   */
  private urlProductSort(): string {
    return `${environment.apiPageSearch}/search-product/sort`;
  }

  /**
   * Lấy url api sản phẩm theo từ khóa cho màn hình search product
   */
  private urlProduct(search: string): string {
    return `${environment.apiPageSearch}/search-product/${search}`;
  }

  /**
   * Lấy danh sách sort trong danh mục
   */
  public getProductSort(): Observable<ProductSort[]> {
    return this.http.get(this.urlProductSort())
      .pipe(
        map((value: ProductSort[]) => value),
        catchError((err: Error) => throwError(err))
      )
  }

  /**
   * Lấy sản phẩm theo từ khóa cho màn hình search product
   * @param search product title
   * @param sort product new | price asc | price desc | model new
   * @param page number
   * @param limit number
   */
  public getProduct(search: string, sort: number, page: number, limit: number): Observable<any> {
    const observe = 'response';
    let params: HttpParams

    if (sort > 0) {
      params = new HttpParams()
        .set('sort', sort.toString())
        .set('pageNumber', page.toString())
        .set('pageSize', limit.toString());
    }
    else {
      params = new HttpParams()
        .set('pageNumber', page.toString())
        .set('pageSize', limit.toString());
    }

    return this.http.get(this.urlProduct(search), { observe, params });
  }

}
