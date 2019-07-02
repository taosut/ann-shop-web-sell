import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AccountLogin } from '../interfaces/account';

import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getAccout(): AccountLogin {
        const accJSON = localStorage.getItem('account');

        if (accJSON) {
            const acc:AccountLogin = JSON.parse(accJSON);
            return acc;
        }

        return null;
    }

    login(acc: AccountLogin): Observable<any> {
        // Setting header
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(environment.apiAccountLogin, acc, httpOptions)
            .pipe(
                map(_ => { return true;})
            )
    }
}
