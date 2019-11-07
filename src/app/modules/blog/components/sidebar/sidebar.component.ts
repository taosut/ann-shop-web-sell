import { Component, Input } from '@angular/core';
import { Post } from '../../../../shared/interfaces/post';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Input() position: 'start'|'end' = 'start';

    posts: Post[] = [];
    categories = "";
    latestComments = "";

    constructor() { }
}
