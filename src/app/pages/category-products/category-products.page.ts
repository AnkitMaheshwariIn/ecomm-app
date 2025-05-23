import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonSkeletonText, IonFooter, IonImg, IonChip, IonList } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { cartOutline, starSharp } from 'ionicons/icons';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.page.html',
  styleUrls: ['./category-products.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterLink, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonSkeletonText, IonFooter, IonImg, IonChip, IonList]
})
export class CategoryProductsPage implements OnInit {
  products$: Observable<Product[]>;
  category$: Observable<Category | undefined>;
  subCategories$: Observable<Category[]>;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toastController: ToastController
  ) {
    // Add Ionic icons
    addIcons({
      'cart-outline': cartOutline,
      'star': starSharp
    });
    this.category$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.categoryService.getCategory(id);
        }
        return of(undefined);
      })
    );
    
    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.productService.getProductsByCategory(id);
        }
        return of([]);
      })
    );
    
    this.subCategories$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.categoryService.getSubCategories(id);
        }
        return of([]);
      })
    );
  }

  ngOnInit() {
  }

  async addToCart(product: Product) {
    await this.cartService.addToCart(product);
    const toast = await this.toastController.create({
      message: `${product.name} added to cart`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  getDiscountPercentage(product: Product): number {
    if (product.salePrice && product.price > 0) {
      return Math.round(((product.price - product.salePrice) / product.price) * 100);
    }
    return 0;
  }
}
