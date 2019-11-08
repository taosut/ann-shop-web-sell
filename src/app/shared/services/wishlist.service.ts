// Angular
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// RxJS
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// ANN Shop
// Interface
import { WishlistProduct } from '../interfaces/wishlist/wishlist-product';

interface WishlistData {
    items: WishlistProduct[];
}


@Injectable({
    providedIn: 'root'
})
export class WishlistService implements OnDestroy {
    private data: WishlistData = {
        items: []
    };

    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<WishlistProduct[]> = new BehaviorSubject([]);
    private onAddingSubject$: Subject<WishlistProduct> = new Subject();

    readonly items$: Observable<WishlistProduct[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
    readonly count$: Observable<number> = this.itemsSubject$.pipe(map(items => items.length));
    readonly onAdding$: Observable<WishlistProduct> = this.onAddingSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID)
        private platformId: any
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
        }
    }

    add(product: WishlistProduct): Observable<void> {
        // timer only for demo
        return timer(1000).pipe(map(() => {
            this.onAddingSubject$.next(product);

            const index = this.data.items.findIndex(item => item.id === product.id);

            if (index === -1) {
                this.data.items.push(product);
                this.save();
            }
        }));
    }

    remove(product: WishlistProduct): Observable<void> {
        // timer only for demo
        return timer(1000).pipe(map(() => {
            const index = this.data.items.findIndex(item => item.id === product.id);

            if (index !== -1) {
                this.data.items.splice(index, 1);
                this.save();
            }
        }));
    }

    private save(): void {
        localStorage.setItem('wishlistItems', JSON.stringify(this.data.items));

        this.itemsSubject$.next(this.data.items);
    }

    private load(): void {
        const items = localStorage.getItem('wishlistItems');

        if (items) {
            this.data.items = JSON.parse(items);
            this.itemsSubject$.next(this.data.items);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
