import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonFooter, IonImg } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { trashOutline, addOutline, removeOutline, cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonFooter, IonImg]
})
export class CartPage implements OnInit {
  cartItems$: Observable<CartItem[]>;
  
  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {
    // Add Ionic icons
    addIcons({
      'trash-outline': trashOutline,
      'add-outline': addOutline,
      'remove-outline': removeOutline,
      'cart-outline': cartOutline
    });
    this.cartItems$ = this.cartService.cart;
  }

  ngOnInit() {
  }

  async updateQuantity(productId: string, quantity: number) {
    await this.cartService.updateQuantity(productId, quantity);
  }

  async removeItem(productId: string) {
    const alert = await this.alertController.create({
      header: 'Remove Item',
      message: 'Are you sure you want to remove this item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: async () => {
            await this.cartService.removeFromCart(productId);
            const toast = await this.toastController.create({
              message: 'Item removed from cart',
              duration: 2000,
              position: 'bottom',
              color: 'medium'
            });
            toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  async clearCart() {
    const alert = await this.alertController.create({
      header: 'Clear Cart',
      message: 'Are you sure you want to remove all items from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear',
          handler: async () => {
            await this.cartService.clearCart();
            const toast = await this.toastController.create({
              message: 'Cart cleared',
              duration: 2000,
              position: 'bottom',
              color: 'medium'
            });
            toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  checkout() {
    // In a real app, this would navigate to a checkout page
    this.router.navigate(['/checkout']);
  }
}
