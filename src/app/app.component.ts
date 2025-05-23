import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, RouterModule],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    // Initialize storage
    await this.storage.create();
    
    // Let the router handle navigation based on the routes configuration
    // This avoids any redirect loops
  }
}
