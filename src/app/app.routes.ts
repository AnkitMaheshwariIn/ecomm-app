import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { AdminGuard } from './guards/admin.guard';

// Auth guards
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs/home']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.page').then(m => m.CategoriesPage)
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.page').then(m => m.CartPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then(m => m.AdminPage),
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/admin/products/products.page').then(m => m.ProductsPage)
      },

      {
        path: 'categories',
        loadComponent: () => import('./pages/admin/categories/categories.page').then(m => m.CategoriesPage)
      },

    ]
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then(m => m.ProductDetailPage)
  },
  {
    path: 'category/:id',
    loadComponent: () => import('./pages/category-products/category-products.page').then(m => m.CategoryProductsPage)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
