import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonList, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { listOutline, gridOutline, peopleOutline, statsChartOutline, settingsOutline, cubeOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonList, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet]
})
export class AdminPage implements OnInit {
  user$: Observable<User | null | undefined>;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Add Ionic icons
    addIcons({
      'list-outline': listOutline,
      'grid-outline': gridOutline,
      'people-outline': peopleOutline,
      'stats-chart-outline': statsChartOutline,
      'settings-outline': settingsOutline,
      'cube-outline': cubeOutline,
      'arrow-back-outline': arrowBackOutline
    });
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    // Check if user is admin, if not redirect to home
    this.user$.subscribe(user => {
      if (user && !this.authService.isAdmin(user)) {
        this.router.navigate(['/tabs/home']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }
}
