// Angular
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

// RxJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// ANN Shop
// Enviroment
import { environment } from '../../../../environments/environment';
// Interface
import { Category } from '../../interfaces/common/category';
import { ProductSort } from '../../interfaces/common/product-sort';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * Lấy url api category theo slug
   */
  private urlCategory(slug: string): string {
    return `${environment.apiPgaeCategory}/${slug}`;
  }

  /**
   * Lấy url api sorts trong danh mục
   */
  private urlSort(): string {
    return `${environment.apiPgaeCategory}/sort`;
  }

  /**
   * Lấy url api sản phẩm theo slug category
   */
  private urlProduct(slug: string): string {
    return `${environment.apiPgaeCategory}/${slug}/product`;
  }

  /**
   * Lấy url api sản phẩm mới về
   */
  private urlProductNew(): string {
    return `${environment.apiPgaeCategory}/product`;
  }

  /**
   * Lấy url api sản phẩm order theo slug category
   */
  private urlProductOrder(slug: string, preOrder: string): string {
    return `${environment.apiPgaeCategory}/${slug}/product/${preOrder}`;
  }

  /**
   * Lấy url api sản phẩm order new
   */
  private urlProductOrderNew(preOrder: string): string {
    return `${environment.apiPgaeCategory}/product/${preOrder}`;
  }

  /**
   * Lấy thông tin danh mục
   * @param slug category slug
   */
  public getCategory(slug: string): Observable<Category> {
    return this.http.get(this.urlCategory(slug))
      .pipe(
        map((value: Category) => value),
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
   * Lấy danh sách sản phẩm
   * @param slug
   * @param preOrder 'hang-co-san' | 'hang-order'
   * @param sort product new | price asc | price desc | model new
   * @param page
   * @param limit
   */
  private getProduct(slug: string, preOrder: string, sort: number, page: number, limit: number): Observable<any> {
    const observe = 'response';
    let url: string;
    let params: HttpParams;

    if (slug)
    {
      if (preOrder)
        url = this.urlProductOrder(slug, preOrder);
      else
        url = this.urlProduct(slug);
    }
    else {
      if (preOrder)
        url = this.urlProductOrderNew(preOrder);
      else
        url = this.urlProductNew();
    }

    params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', limit.toString());

    if (sort) {
      params = params.set('sort', sort.toString());
    }

    return this.http.get(url, { observe, params });
  }

  /**
   * Lấy danh sách sản phẩm theo category
   * @param slug
   * @param sort product new | price asc | price desc | model new
   * @param page
   * @param limit
   */
  public getProductByCategory(slug: string, sort: number, page: number, limit: number): Observable<any> {
    return this.getProduct(slug, "", sort, page, limit);
  }

  /**
   * Lấy sản phẩm mới về
   * @param sort product new | price asc | price desc | model new
   * @param page number
   * @param limit number
   */
  public getProductAll(sort: number, page: number, limit: number): Observable<any> {
    return this.getProduct("", "", sort, page, limit);
  }

  /**
   * Lấy danh sách sản phẩm order theo category
   * @param slug
   * @param preOrder
   * @param sort product new | price asc | price desc | model new
   * @param page
   * @param limit
   */
  public getProductOrderByCategory(slug: string, preOrder: string, sort: number, page: number, limit: number): Observable<any> {
    return this.getProduct(slug, preOrder, sort, page, limit);
  }

  /**
   * Lấy sản phẩm order mới về
   * @param preOrder
   * @param sort product new | price asc | price desc | model new
   * @param page number
   * @param limit number
   */
  public getProductOrderAll(preOrder: string, sort: number, page: number, limit: number): Observable<any> {
    return this.getProduct("", preOrder, sort, page, limit);
  }
}
