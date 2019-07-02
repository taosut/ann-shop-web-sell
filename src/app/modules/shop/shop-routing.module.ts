import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';


const routes: Routes = [
    {
        path: '',
        component: PageCategoryComponent
    },
    {
        path: 'category/:slug',
        component: PageCategoryComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
