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
  private urlProductOrder(slug: string, productBadge: string): string {
    return `${environment.apiPgaeCategory}/${slug}/product/${productBadge}`;
  }

  /**
   * Lấy url api sản phẩm order new
   */
  private urlProductOrderNew(productBadge: string): string {
    return `${environment.apiPgaeCategory}/product/${productBadge}`;
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
   * @param productBadge 'hang-co-san' | 'hang-order'
   * @param sort product new | price asc | price desc | model new
   * @param page
   * @param limit
   */
  private getProduct(slug: string, productBadge: string, sort: number, page: number, limit: number): Observable<any> {
    const observe = 'response';
    let url: string;
    let params: HttpParams;

    if (slug)
    {
      if (productBadge)
        url = this.urlProductOrder(slug, productBadge);
      else
        url = this.urlProduct(slug);
    }
    else {
      if (productBadge)
        url = this.urlProductOrderNew(productBadge);
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
   * @param productBadge
   * @param sort product new | price asc | price desc | model new
   * @param page
   * @param limit
   */
  public getProductOrderByCategory(slug: string, productBadge: string, sort: number, page: number, limit: number): Observable<any> {
    return this.getProduct(slug, productBadge, sort, page, limit);
  }

  /**
   * Lấy sản phẩm order mới về
   * @param productBadge
   * @param sort product new | price asc | price desc | model new
   * @param page number
   * @param limit number
   */
  public getProductOrderAll(productBadge: string, sort: number, page: number, limit: number): Observable<any> {
    return this.getProduct("", productBadge, sort, page, limit);
  }
}
