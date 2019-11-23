import { Injectable, OnDestroy  } from '@angular/core';
import { User } from '../interfaces/user';
import { Subject, Observable, timer } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { ProductCard } from '../interfaces/common/product-card';

@Injectable({
    providedIn: 'root'
})
export class CopyConfigService implements OnDestroy {
    private destroy$: Subject<void> = new Subject();
    private showSubject$: Subject<{user: User, product: ProductCard}> = new Subject();

    show$: Observable<{user: User, product: ProductCard}> = this.showSubject$.pipe(takeUntil(this.destroy$));

    constructor() {}

    show(user: User, product?: ProductCard): Observable<void> {
        return timer(1000).pipe(map(() => {
            this.showSubject$.next({user, product});
        }));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
