import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { AdminGuard } from './guards/admin.guard';

// Auth guards
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'tabs',
    loadChildren: () => import('../app/pages/tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/pages/admin/admin.module').then(m => m.AdminPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
    canActivate: [AdminGuard]
  },
  {
    path: 'product/:id',
    loadChildren: () => import('../app/pages/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('../app/pages/category-products/category-products.module').then(m => m.CategoryProductsPageModule)
  },
  {
    path: '**',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
