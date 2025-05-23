import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { ToastController } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonBadge, IonGrid, IonRow, IonCol, IonText, IonSkeletonText, IonFooter, IonImg, IonChip } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, cartOutline, heartOutline, starOutline, starSharp } from 'ionicons/icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, RouterLink, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonBadge, IonGrid, IonRow, IonCol, IonText, IonSkeletonText, IonFooter, IonImg, IonChip]
})
export class ProductDetailPage implements OnInit {
  product$: Observable<Product | undefined>;
  category: Category | null = null;
  subCategory: Category | null = null;
  quantity: number = 1;
  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 0,
    zoom: true
  };
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toastController: ToastController
  ) {
    // Add Ionic icons
    addIcons({
      'add-outline': addOutline,
      'remove-outline': removeOutline,
      'cart-outline': cartOutline,
      'heart-outline': heartOutline,
      'star-outline': starOutline,
      'star': starSharp
    });
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.productService.getProduct(id || '');
      })
    );
  }

  ngOnInit() {
    this.product$.subscribe(product => {
      if (product) {
        // Load category
        this.categoryService.getCategory(product.categoryId).subscribe(category => {
          if (category) {
            this.category = category;
          }
        });
        
        // Load subcategory if exists
        if (product.subCategoryId) {
          this.categoryService.getCategory(product.subCategoryId).subscribe(subCategory => {
            if (subCategory) {
              this.subCategory = subCategory;
            }
          });
        }
      }
    });
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  async addToCart(product: Product) {
    await this.cartService.addToCart(product, this.quantity);
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
