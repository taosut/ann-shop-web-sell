import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Post } from '../../../../shared/interfaces/post';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-post',
    templateUrl: './page-post.component.html',
    styleUrls: ['./page-post.component.scss']
})
export class PagePostComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    post: Post;
    sidebarPosition: 'start'|'end' = 'end'; // For LTR scripts "start" is "left" and "end" is "right"
    layout: 'classic'|'full' = 'classic';

    constructor(private http: HttpClient, private route: ActivatedRoute, private titleService: Title) {
        this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.sidebarPosition = data.sidebarPosition;
            this.layout = data.layout;
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if(params.hasOwnProperty('id')){
                let url = environment.apiPost + `/${params.id}`;

                this.http.get(url).subscribe((data : Post) => { 
                    this.post = data;
                    this.titleService.setTitle(this.post.title);
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
