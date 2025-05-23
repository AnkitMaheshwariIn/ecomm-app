import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsPage,
        children: [
          {
            path: 'home',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'categories',
            loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule)
          },
          {
            path: 'cart',
            loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
          },
          {
            path: 'profile',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: '',
            redirectTo: '/tabs/home',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]),
    TabsPage // Import the standalone component
  ]
})
export class TabsPageModule {}
