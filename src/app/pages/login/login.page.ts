import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController, IonContent, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle, languageOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageToggleComponent } from '../../components/language-toggle/language-toggle.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons, TranslatePipe, LanguageToggleComponent]
})
export class LoginPage implements OnInit {

  // Modern dependency injection
  private authService = inject(AuthService);
  private router = inject(Router);
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController);
  private languageService = inject(LanguageService);

  constructor() {
    // Add Ionic icons
    addIcons({
      'logo-google': logoGoogle,
      'language-outline': languageOutline
    });
  }

  ngOnInit() {
    // Check if user is already logged in and redirect to home
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log('User already logged in, redirecting to home');
        this.router.navigate(['/tabs/home']);
      }
    });
  }

  async googleLogin() {
    console.log('Google login button clicked');
    
    const loading = await this.loadingController.create({
      message: 'Signing in with Google...',
      spinner: 'crescent',
      showBackdrop: true
    });
    await loading.present();

    try {
      console.log('Calling authService.googleSignIn()');
      const success = await this.authService.googleSignIn();
      console.log('Auth service returned:', success);
      
      await loading.dismiss();
      
      if (success) {
        console.log('Login successful, navigating to home');
        
        // Check if we're already on the home page
        if (this.router.url === '/tabs/home') {
          console.log('Already on home page, reloading');
          window.location.reload();
          return;
        }
        
        // Force navigation to home page
        console.log('Navigating to /tabs/home');
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      } else {
        console.warn('Login failed according to auth service');
        const toast = await this.toastController.create({
          message: 'Login failed. Please try again.',
          duration: 3000,
          position: 'bottom',
          color: 'warning'
        });
        toast.present();
      }
    } catch (error: any) {
      console.error('Exception during login:', error);
      await loading.dismiss();
      
      const errorMessage = error?.message || 'Could not sign in. Please try again.';
      
      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }
}
