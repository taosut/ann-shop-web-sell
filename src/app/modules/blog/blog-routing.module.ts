import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PagePostComponent } from './pages/page-post/page-post.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'category-classic'
    },
    {
        path: 'post/:id',
        component: PagePostComponent,
        data: {
            layout: 'full'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
