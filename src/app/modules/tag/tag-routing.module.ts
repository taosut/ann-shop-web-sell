// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ANN Shop
import { PageTagComponent } from './pages/page-tag/page-tag.component';


const routes: Routes = [
  {
    path: ':slug',
    component: PageTagComponent,
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
export class TagRoutingModule { }
