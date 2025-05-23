import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonBadge, 
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonFooter,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, gridOutline, cartOutline, personOutline, logOutOutline, closeOutline } from 'ionicons/icons';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageToggleComponent } from '../../components/language-toggle/language-toggle.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonLabel, 
    IonBadge, 
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonFooter,
    TranslatePipe,
    LanguageToggleComponent
  ]
})
export class TabsPage implements OnInit {
  user$: Observable<User | null | undefined>;
  cartItemCount$: Observable<number>;
  
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private alertController: AlertController,
    private languageService: LanguageService
  ) {
    this.user$ = this.authService.user$;
    this.cartItemCount$ = this.cartService.cartItemCount;
    
    // Add Ionic icons
    addIcons({
      'home-outline': homeOutline,
      'grid-outline': gridOutline,
      'cart-outline': cartOutline,
      'person-outline': personOutline,
      'log-out-outline': logOutOutline,
      'close-outline': closeOutline
    });
  }
  
  async showLogoutConfirmation() {
    const alert = await this.alertController.create({
      header: this.languageService.translate('auth.logout'),
      message: this.languageService.translate('auth.logoutConfirmation'),
      buttons: [
        {
          text: this.languageService.translate('common.cancel'),
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: this.languageService.translate('auth.logout'),
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    await this.authService.signOut();
  }

  ngOnInit() {
  }
}
