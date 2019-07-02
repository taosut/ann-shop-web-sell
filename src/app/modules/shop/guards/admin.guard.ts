import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { tap, takeWhile, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private user: UserService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const acc = this.user.getAccout();

        if (!acc) {
            return this.router.navigate(['/login']);
        }
        else {
            let expires: Date = new Date(acc.expires);
            let now: Date = new Date();

            if (expires.getTime() > now.getTime()) {
                return this.user.login(acc).pipe(
                    catchError(_ => {
                        localStorage.removeItem('account');
                        return this.router.navigate(['/login'])
                    })
                );
            }
            else {
                localStorage.removeItem('account');
                return this.router.navigate(['/login']);
            }
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }
}
