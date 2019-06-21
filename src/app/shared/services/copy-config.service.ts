import { Injectable, OnDestroy  } from '@angular/core';
import { User } from '../interfaces/user';
import { Subject, Observable, timer } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CopyConfigService implements OnDestroy {
    private destroy$: Subject<void> = new Subject();
    private showSubject$: Subject<User> = new Subject();

    show$: Observable<User> = this.showSubject$.pipe(takeUntil(this.destroy$));

    constructor() {}

    show(user: User): Observable<void> {
        return timer(1000).pipe(map(() => {
            this.showSubject$.next(user);
        }));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
