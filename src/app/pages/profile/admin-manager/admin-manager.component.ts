import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonButton, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-manager',
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>Admin Management</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>Use this tool to grant or revoke admin privileges.</p>
        
        <ion-list>
          <ion-item>
            <ion-label position="stacked">User ID</ion-label>
            <ion-input [(ngModel)]="userId" placeholder="Enter user ID"></ion-input>
          </ion-item>
        </ion-list>
        
        <div class="ion-padding">
          <ion-button expand="block" (click)="setAsAdmin(true)">Grant Admin Access</ion-button>
          <ion-button expand="block" color="danger" (click)="setAsAdmin(false)">Revoke Admin Access</ion-button>
        </div>
        
        <div class="ion-padding-top">
          <ion-button expand="block" color="secondary" (click)="getCurrentUserInfo()">
            Get My User ID
          </ion-button>
          <p *ngIf="currentUserId">Your User ID: {{ currentUserId }}</p>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonButton, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent
  ]
})
export class AdminManagerComponent {
  userId = '';
  currentUserId: string | null = null;

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async setAsAdmin(isAdmin: boolean) {
    if (!this.userId) {
      this.showToast('Please enter a user ID', 'danger');
      return;
    }

    try {
      await this.authService.setUserAsAdmin(this.userId, isAdmin);
      this.showToast(
        `User ${this.userId} ${isAdmin ? 'granted' : 'revoked'} admin privileges`, 
        'success'
      );
    } catch (error) {
      this.showToast('Error updating admin status', 'danger');
      console.error(error);
    }
  }

  async getCurrentUserInfo() {
    try {
      this.currentUserId = await this.authService.getCurrentUserId();
      if (this.currentUserId) {
        this.userId = this.currentUserId;
      } else {
        this.showToast('Not logged in', 'warning');
      }
    } catch (error) {
      this.showToast('Error getting user info', 'danger');
      console.error(error);
    }
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
