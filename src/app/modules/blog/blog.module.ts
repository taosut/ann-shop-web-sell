import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';

// modules
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';

// components
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { PostComponent } from './components/post/post.component';

// pages
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PagePostComponent } from './pages/page-post/page-post.component';

@NgModule({
    declarations: [
        // components
        CommentsListComponent,
        PostComponent,
        // pages
        PageCategoryComponent,
        PagePostComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        // modules
        BlogRoutingModule,
        SharedModule,
    ]
})
export class BlogModule { }
