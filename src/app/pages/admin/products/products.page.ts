import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList, IonFab, IonFabButton, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList, IonFab, IonFabButton, IonItemSliding, IonItemOptions, IonItemOption]
})
export class ProductsPage implements OnInit {
  products$: Observable<Product[]>;
  
  constructor(
    private productService: ProductService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {
    // Add Ionic icons
    addIcons({
      'add-outline': addOutline,
      'add': addOutline,
      'create-outline': createOutline,
      'trash-outline': trashOutline
    });
    this.products$ = this.productService.getProducts();
  }

  ngOnInit() {
  }

  async addProduct() {
    const alert = await this.alertController.create({
      header: 'Add New Product',
      message: 'This functionality is not yet implemented. In a complete application, this would open a form to add a new product.',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    
    await alert.present();
  }

  async editProduct(productId: string) {
    const alert = await this.alertController.create({
      header: 'Edit Product',
      message: `This functionality is not yet implemented. In a complete application, this would open a form to edit product with ID: ${productId}`,
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    
    await alert.present();
  }

  async deleteProduct(productId: string) {
    const alert = await this.alertController.create({
      header: 'Delete Product',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              await this.productService.deleteProduct(productId);
              const toast = await this.toastController.create({
                message: 'Product deleted successfully',
                duration: 2000,
                position: 'bottom',
                color: 'success'
              });
              toast.present();
            } catch (error) {
              const toast = await this.toastController.create({
                message: 'Error deleting product',
                duration: 2000,
                position: 'bottom',
                color: 'danger'
              });
              toast.present();
              console.error('Error deleting product:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
