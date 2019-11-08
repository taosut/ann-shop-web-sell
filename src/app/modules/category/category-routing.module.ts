// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageCategoryComponent } from './pages/page-category/page-category.component';


const routes: Routes = [
  {
    path: ':slug',
    component: PageCategoryComponent,
    data: {
      columns: 4,
      viewMode: 'grid'
    }
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
