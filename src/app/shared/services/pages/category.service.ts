// Angular
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

// RxJS
import { Observable, throwError } from 'rxjs';

// ANN Shop
// Enviroment
import { environment } from 'src/environments/environment';
import { CategoryCategory } from '../../interfaces/category/category-category';
import { map, catchError } from 'rxjs/operators';
import { CategorySort } from '../../interfaces/category/category-sort';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * Lấy url api category theo slug
   */
  private urlCategory(slug: string): string {
    return `${environment.api}/category/${slug}`;
  }

  /**
   * Lấy url api sorts trong danh mục
   */
  private urlSort(): string {
    return `${environment.api}/category/sort`;
  }

  /**
   * Lấy url api sản phẩm theo slug category
   */
  private urlProduct(slug: string): string {
    return `${environment.api}/category/${slug}/product`;
  }

  /**
   * Lấy url api sản phẩm theo từ khóa
   */
  private urlProductSearch(): string {
    return `${environment.api}/category/product`;
  }

  /**
   * Lấy thông tin danh mục
   * @param slug category slug
   */
  public getCategory(slug: string): Observable<CategoryCategory> {
    return this.http.get(this.urlCategory(slug))
      .pipe(
        map((value: CategoryCategory) => value),
        catchError((err: Error) => throwError(err))
      )
  }

  /**
   * Lấy danh sách sort trong danh mục
   */
  public getSort(): Observable<CategorySort[]> {
    return this.http.get(this.urlSort())
      .pipe(
        map((value: CategorySort[]) => value),
        catchError((err: Error) => throwError(err))
      )
  }

  /**
   * Lấy sản phẩm theo slug category
   * @param slug category slug
   * @param search product title
   * @param sort product new | price asc | price desc | model new
   * @param page number
   * @param limit number
   */
  public getProduct(slug: string, search: string, sort: number, page: number, limit: number): Observable<any> {
    const observe = 'response';
    let params: HttpParams

    if (search && sort > 0) {
      params = new HttpParams()
        .set('search', search)
        .set('sort', sort.toString())
        .set('pageNumber', page.toString())
        .set('pageSize', limit.toString());
    }
    else {
      if (search)
        params = new HttpParams()
          .set('search', search)
          .set('pageNumber', page.toString())
          .set('pageSize', limit.toString());

      if (sort)
        params = new HttpParams()
          .set('sort', sort.toString())
          .set('pageNumber', page.toString())
          .set('pageSize', limit.toString());
    }

    return this.http.get(this.urlProduct(slug), { observe, params });
  }

  /**
   * Lấy sản phẩm theo từ khóa
   * @param search product title
   * @param sort product new | price asc | price desc | model new
   * @param page number
   * @param limit number
   */
  public getProductSearch(search: string, sort: number, page: number, limit: number): Observable<any> {
    const observe = 'response';
    let params: HttpParams

    if (search && sort > 0) {
      params = new HttpParams()
        .set('search', search)
        .set('sort', sort.toString())
        .set('pageNumber', page.toString())
        .set('pageSize', limit.toString());
    }
    else {
      if (search)
        params = new HttpParams()
          .set('search', search)
          .set('pageNumber', page.toString())
          .set('pageSize', limit.toString());

      if (sort)
        params = new HttpParams()
          .set('sort', sort.toString())
          .set('pageNumber', page.toString())
          .set('pageSize', limit.toString());
    }

    return this.http.get(this.urlProductSearch(), { observe, params });
  }

}
