import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { LogoutService } from '../../services/logout.service';
import { LanguageService } from '../../services/language.service';
import { StoreConfigService } from '../../services/store-config.service';
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
import { cartOutline, starSharp, personOutline, logOutOutline, chevronForward } from 'ionicons/icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StoreType } from '../../../assets/data/categories';

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
  mainCategories$: Observable<Category[]>;
  storeType: StoreType = StoreType.KIRANA;
  availableStoreTypes: {type: StoreType, label: string}[] = [];
  
  // Banner slide options with responsive slidesPerView
  bannerSlideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1, // Default to 1 slide for mobile
    breakpoints: {
      // When window width is >= 992px (desktop)
      992: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  };
  
  // Product slide options
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    loop: true,
    spaceBetween: 20,
    slidesPerView: 2.2,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private toastController: ToastController,
    private logoutService: LogoutService,
    private languageService: LanguageService,
    private storeConfigService: StoreConfigService,
    private sanitizer: DomSanitizer
  ) {
    // Add Ionic icons
    addIcons({
      'cart-outline': cartOutline,
      'star': starSharp,
      'person-outline': personOutline,
      'log-out-outline': logOutOutline,
      'chevron-forward': chevronForward
    });
    
    // Get available store types
    this.availableStoreTypes = this.categoryService.getAvailableStoreTypes();
    
    // Subscribe to the current store type
    this.storeConfigService.storeType$.subscribe(type => {
      this.storeType = type;
    });
    
    // Get products and categories
    this.featuredProducts$ = this.productService.getFeaturedProducts();
    this.categories$ = this.categoryService.getCategories();
    this.mainCategories$ = this.categoryService.getMainCategories();
  }
  
  /**
   * Safely convert SVG data URL to HTML content
   */
  getSafeHtml(svgUrl: string | undefined): SafeHtml {
    if (!svgUrl) return this.sanitizer.bypassSecurityTrustHtml('');
    
    // If it's a data URL, extract the SVG content
    if (svgUrl.startsWith('data:image/svg+xml')) {
      try {
        const svgContent = decodeURIComponent(svgUrl.split('utf8,')[1]);
        return this.sanitizer.bypassSecurityTrustHtml(svgContent);
      } catch (e) {
        console.error('Error parsing SVG:', e);
        return this.sanitizer.bypassSecurityTrustHtml('');
      }
    }
    
    // If it's a regular URL, return an img tag
    return this.sanitizer.bypassSecurityTrustHtml(`<img src="${svgUrl}" alt="Category" />`);
  }
  
  /**
   * Change the store type
   */
  changeStoreType(type: StoreType): void {
    this.categoryService.setStoreType(type);
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
