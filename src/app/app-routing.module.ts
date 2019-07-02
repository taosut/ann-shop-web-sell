import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { PageHomeTwoComponent } from './pages/page-home-two/page-home-two.component';
import { RootComponent } from './components/root/root.component';
import { PageLoginComponent } from './modules/account/pages/page-login/page-login.component';
import { AdminGuard } from './modules/shop/guards/admin.guard';

export function makeRoutes(homeComponent: Type<any>): Routes {
    return [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'shop',
        },
        {
            path: 'shop',
            canActivate: [AdminGuard],
            canActivateChild: [AdminGuard],
            loadChildren: './modules/shop/shop.module#ShopModule'
        },
        {
            path: 'login',
            component: PageLoginComponent
        },
        {
            path: '**',
            component: PageNotFoundComponent
        }
    ];
}

const routes: Routes = [
    {
        path: '',
        component: RootComponent,
        data: {
            headerLayout: 'compact'
        },
        children: makeRoutes(PageHomeTwoComponent)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
