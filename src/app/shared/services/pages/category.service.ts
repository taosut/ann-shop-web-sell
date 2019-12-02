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
// Common
import { Category } from '../../interfaces/common/category';
import { ProductSort } from '../../interfaces/common/product-sort';
import { CategoryFilter } from '../../interfaces/common/category-filter';
// Pages
import { CategoryPageFilter } from '../../interfaces/pages/category-page/category-page-filter';
import { ProductNewPageFilter } from '../../interfaces/pages/product-new-page/product-new-page-filter';
import { ProductSalePageFilter } from '../../interfaces/pages/product-sale/product-sale-page-filter';


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
   * @param filter 
   */
  private getProducts(filter: CategoryFilter): Observable<any> {
    const observe = 'response';
    let url: string;
    let params: HttpParams;

    if (filter.categorySlug)
    {
      if (filter.productBadge)
        url = this.urlProductOrder(filter.categorySlug, filter.productBadge);
      else
        url = this.urlProduct(filter.categorySlug);
    }
    else {
      if (filter.productBadge)
        url = this.urlProductOrderNew(filter.productBadge);
      else
        url = this.urlProductNew();
    }

    params = new HttpParams()
      .set('pageNumber', filter.page.toString())
      .set('pageSize', filter.limit.toString());

    if (filter.priceMin) {
      params = params.set('priceMin', filter.priceMin.toString());
    }

    if (filter.priceMax) {
      params = params.set('priceMax', filter.priceMax.toString());
    }

    if (filter.productSort) {
      params = params.set('sort', filter.productSort.toString());
    }

    return this.http.get(url, { observe, params });
  }

  /**
   * Lấy danh sách sản phẩm theo bộ lọc của trang category
   * @param category 
   */
  public getProductListByCategoryPage(category: CategoryPageFilter): Observable<any> {
    let filter: CategoryFilter = {
      categorySlug: category.categorySlug,
      productBadge: category.productBadge,
      priceMin: category.priceMin,
      priceMax: category.priceMax,
      productSort: category.productSort,
      page: category.page,
      limit: category.limit
    }

    return this.getProducts(filter);
  }

  /**
   * Lấy danh sách sản phẩm theo bộ lọc của trang product new
   * @param productNew 
   */
  public getProductListByProductNewPage(productNew: ProductNewPageFilter): Observable<any> {
    let filter: CategoryFilter = {
      categorySlug: "",
      productBadge: productNew.productBadge,
      priceMin: productNew.priceMin,
      priceMax: productNew.priceMax,
      productSort: productNew.productSort,
      page: productNew.page,
      limit: productNew.limit
    }

    return this.getProducts(filter);
  }

  /**
   * Lấy danh sách sản phẩm theo bộ lọc của trang product sale
   * @param tag 
   */
  public getProductListByProductSalePage(productSale: ProductSalePageFilter): Observable<any> {
    let filter: CategoryFilter = {
      categorySlug: "",
      productBadge: productSale.productBadge,
      priceMin: productSale.priceMin,
      priceMax: productSale.priceMax,
      productSort: productSale.productSort,
      page: productSale.page,
      limit: productSale.limit
    }

    return this.getProducts(filter);
  }
}
