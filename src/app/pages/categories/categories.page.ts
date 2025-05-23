import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonImg, IonChip, IonList } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { gridOutline, arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterLink, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonImg, IonChip, IonList]
})
export class CategoriesPage implements OnInit {
  categories$: Observable<Category[]>;
  selectedCategory: Category | null = null;
  subCategories$: Observable<Category[]> | null = null;

  constructor(private categoryService: CategoryService) {
    // Add Ionic icons
    addIcons({
      'grid-outline': gridOutline,
      'arrow-forward-outline': arrowForwardOutline
    });
    this.categories$ = this.categoryService.getMainCategories();
  }

  ngOnInit() {
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.subCategories$ = this.categoryService.getSubCategories(category.id);
  }
}
