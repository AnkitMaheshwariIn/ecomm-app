import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Development mode: always allow access to admin routes
    if (!environment.production) {
      console.log('Development mode: Admin access granted automatically');
      return of(true);
    }

    // Production mode: check if user is admin
    return this.authService.user$.pipe(
      take(1),
      map(user => this.authService.isAdmin(user || null)),
      tap(isAdmin => {
        if (!isAdmin) {
          console.log('Access denied - Admin only');
          this.router.navigate(['/tabs/home']);
        }
      })
    );
  }
}
