import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { AuthService } from './auth.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private languageService: LanguageService
  ) {}

  /**
   * Shows a confirmation dialog and handles logout if confirmed
   */
  async confirmAndLogout(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.languageService.translate('auth.logout'),
      message: this.languageService.translate('auth.logoutConfirmation'),
      buttons: [
        {
          text: this.languageService.translate('common.cancel'),
          role: 'cancel'
        },
        {
          text: this.languageService.translate('auth.logout'),
          handler: async () => {
            await this.performLogout();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Performs the actual logout operation
   */
  private async performLogout(): Promise<void> {
    try {
      await this.authService.signOut();
      const toast = await this.toastController.create({
        message: this.languageService.translate('auth.logoutSuccess'),
        duration: 2000,
        position: 'bottom',
        color: 'primary'
      });
      toast.present();
    } catch (error) {
      console.error('Logout error:', error);
      const toast = await this.toastController.create({
        message: this.languageService.translate('auth.logoutError'),
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }
}
