import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { LogoutService } from '../../services/logout.service';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonSkeletonText, IonImg, IonChip, IonButtons } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cartOutline, starSharp, personOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterLink, TranslatePipe, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonSkeletonText, IonImg, IonChip, IonButtons]
})
export class HomePage implements OnInit {
  featuredProducts$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };
  
  categorySlideOpts = {
    slidesPerView: 3.5,
    spaceBetween: 10,
    freeMode: true
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private toastController: ToastController,
    private logoutService: LogoutService,
    private languageService: LanguageService
  ) {
    // Add Ionic icons
    addIcons({
      'cart-outline': cartOutline,
      'star': starSharp,
      'person-outline': personOutline,
      'log-out-outline': logOutOutline
    });
    this.featuredProducts$ = this.productService.getFeaturedProducts();
    this.categories$ = this.categoryService.getMainCategories();
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

  async logout() {
    await this.logoutService.confirmAndLogout();
  }
}
