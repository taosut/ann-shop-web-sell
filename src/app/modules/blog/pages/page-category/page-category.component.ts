import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from '../../../../shared/interfaces/post';

@Component({
    selector: 'app-category',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss']
})
export class PageCategoryComponent implements OnDestroy {
    private destroy$: Subject<void> = new Subject();

    sidebarPosition: 'start'|'end' = 'end'; // For LTR scripts "start" is "left" and "end" is "right"
    layout: 'classic'|'grid'|'list' = 'classic';

    posts: Post[] = [];

    constructor(private route: ActivatedRoute) {
        this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.sidebarPosition = data.sidebarPosition;
            this.layout = data.layout;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
