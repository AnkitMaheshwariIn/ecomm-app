import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
