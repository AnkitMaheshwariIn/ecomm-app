import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AlertController, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonAvatar, IonItem, IonLabel, IonIcon, IonButton, IonList, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logOutOutline, settingsOutline, cardOutline, helpCircleOutline, personOutline, shieldOutline } from 'ionicons/icons';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonAvatar, IonItem, IonLabel, IonIcon, IonButton, IonList, IonBadge, AdminManagerComponent]
})
export class ProfilePage implements OnInit {
  user$: Observable<User | null | undefined>;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.user$ = this.authService.user$;
    
    // Add Ionic icons
    addIcons({
      'log-out-outline': logOutOutline,
      'settings-outline': settingsOutline,
      'card-outline': cardOutline,
      'help-circle-outline': helpCircleOutline,
      'person-outline': personOutline,
      'shield-outline': shieldOutline
    });
  }

  ngOnInit() {
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: async () => {
            await this.authService.signOut();
          }
        }
      ]
    });
    await alert.present();
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']);
  }

  isAdmin(user: User | null | undefined): boolean {
    if (!user) return false;
    return this.authService.isAdmin(user);
  }
}
