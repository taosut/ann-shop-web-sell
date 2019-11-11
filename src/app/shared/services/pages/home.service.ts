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
import { HomeProduct } from '../../interfaces/home/home-product';


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
   * Lấy sản phẩm theo slug category
   * @param slug Slug category
   * @param limit giới hạn
   */
  getProductCategory(slug: string, limit: number): Observable<HomeProduct[]> {
    const params = new HttpParams()
      .set('pageSize', limit.toString());

    return this.http.get(this.urlProductCategory(slug), { params })
      .pipe(
        map((value: HomeProduct[]) => value),
        catchError((err: Error) => throwError(err))
      );
  }

}
