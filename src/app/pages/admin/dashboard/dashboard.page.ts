import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircleOutline, timeOutline, peopleOutline, gridOutline, statsChartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterLink, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList]
})
export class DashboardPage implements OnInit {
  productCount$: Observable<number>;
  categoryCount$: Observable<number>;
  
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    // Add Ionic icons
    addIcons({
      'add-circle-outline': addCircleOutline,
      'time-outline': timeOutline,
      'people-outline': peopleOutline,
      'grid-outline': gridOutline,
      'stats-chart-outline': statsChartOutline
    });
    this.productCount$ = this.productService.getProducts().pipe(
      map(products => products.length)
    );
    
    this.categoryCount$ = this.categoryService.getCategories().pipe(
      map(categories => categories.length)
    );
  }

  ngOnInit() {
  }
  
  navigateToAddProduct() {
    this.router.navigate(['/admin/products']);
  }
  
  navigateToAddCategory() {
    this.router.navigate(['/admin/categories']);
  }
}
