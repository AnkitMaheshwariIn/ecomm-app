import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AlertController, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonAvatar, IonItem, IonLabel, IonIcon, IonButton, IonList, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logOutOutline, settingsOutline, cardOutline, helpCircleOutline, personOutline, shieldOutline, cartOutline, heartOutline, locationOutline } from 'ionicons/icons';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageToggleComponent } from '../../components/language-toggle/language-toggle.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonAvatar, IonItem, IonLabel, IonIcon, IonButton, IonList, IonBadge, AdminManagerComponent, TranslatePipe, LanguageToggleComponent]
})
export class ProfilePage implements OnInit {
  user$: Observable<User | null | undefined>;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private languageService: LanguageService,
    private logoutService: LogoutService
  ) {
    this.user$ = this.authService.user$;
    
    // Add Ionic icons
    addIcons({
      'log-out-outline': logOutOutline,
      'settings-outline': settingsOutline,
      'card-outline': cardOutline,
      'help-circle-outline': helpCircleOutline,
      'person-outline': personOutline,
      'shield-outline': shieldOutline,
      'cart-outline': cartOutline,
      'heart-outline': heartOutline,
      'location-outline': locationOutline
    });
  }

  ngOnInit() {
  }

  async logout() {
    await this.logoutService.confirmAndLogout();
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']);
  }

  isAdmin(user: User | null | undefined): boolean {
    if (!user) return false;
    return this.authService.isAdmin(user);
  }
}
