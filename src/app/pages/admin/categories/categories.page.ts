import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category.model';
import { ImageService } from '../../../services/image.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList, IonFab, IonFabButton, IonItemSliding, IonItemOptions, IonItemOption, IonInput, IonTextarea, IonSelect, IonSelectOption, IonImg } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, imageOutline, closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, IonList, IonFab, IonFabButton, IonItemSliding, IonItemOptions, IonItemOption, IonInput, IonTextarea, IonSelect, IonSelectOption, IonImg]
})
export class CategoriesPage implements OnInit {
  categories$: Observable<Category[]>;
  subCategories: Category[] = [];
  selectedCategory: Category | null = null;
  
  categoryForm: FormGroup;
  isEditMode = false;
  editCategoryId: string | null = null;
  selectedImage: string | null = null;
  
  constructor(
    private categoryService: CategoryService,
    private alertController: AlertController,
    private toastController: ToastController,
    private imageService: ImageService,
    private fb: FormBuilder
  ) {
    // Add Ionic icons
    addIcons({
      'add': addOutline,
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'image-outline': imageOutline,
      'close-circle-outline': closeCircleOutline
    });
    this.categories$ = this.categoryService.getMainCategories();
    
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      parentId: ['']
    });
  }

  ngOnInit() {
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.categoryService.getSubCategories(category.id).subscribe(subCategories => {
      this.subCategories = subCategories;
    });
  }

  resetForm() {
    this.categoryForm.reset();
    this.isEditMode = false;
    this.editCategoryId = null;
    this.selectedImage = null;
  }

  async addCategory() {
    this.resetForm();
    // If a category is selected, set it as parent for the new subcategory
    if (this.selectedCategory) {
      this.categoryForm.patchValue({
        parentId: this.selectedCategory.id
      });
    }
    
    // Mark the form as dirty to make it visible
    this.categoryForm.markAsDirty();
    
    // Show a toast to guide the user
    const toast = await this.toastController.create({
      message: 'Add your new category details below',
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  async editCategory(category: Category) {
    this.isEditMode = true;
    this.editCategoryId = category.id;
    this.selectedImage = category.imageUrl || null;
    
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description || '',
      parentId: category.parentId || ''
    });
  }

  async selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        try {
          // Convert file to data URL
          const dataUrl = await this.imageService.fileToDataUrl(file);
          
          // Optimize image
          const optimizedImage = await this.imageService.compressImage(dataUrl, 80);
          
          // Set as selected image
          this.selectedImage = optimizedImage;
        } catch (error) {
          console.error('Error processing image:', error);
          const toast = await this.toastController.create({
            message: 'Error processing image',
            duration: 2000,
            position: 'bottom',
            color: 'danger'
          });
          toast.present();
        }
      }
    };
    
    input.click();
  }

  removeImage() {
    this.selectedImage = null;
  }

  async saveCategory() {
    if (this.categoryForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.categoryForm.controls).forEach(key => {
        const control = this.categoryForm.get(key);
        control?.markAsTouched();
      });
      
      const toast = await this.toastController.create({
        message: 'Please fill in all required fields',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
      return;
    }
    
    try {
      const categoryData: any = {
        ...this.categoryForm.value
      };
      
      if (this.selectedImage) {
        categoryData.imageUrl = this.selectedImage;
      }
      
      if (this.isEditMode && this.editCategoryId) {
        await this.categoryService.updateCategory(this.editCategoryId, categoryData);
        const toast = await this.toastController.create({
          message: 'Category updated successfully',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        toast.present();
      } else {
        await this.categoryService.addCategory(categoryData);
        const toast = await this.toastController.create({
          message: 'Category created successfully',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        toast.present();
      }
      
      this.resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
      const toast = await this.toastController.create({
        message: 'Error saving category',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

  async deleteCategory(category: Category) {
    const alert = await this.alertController.create({
      header: 'Delete Category',
      message: 'Are you sure you want to delete this category? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              await this.categoryService.deleteCategory(category.id);
              
              // If the deleted category was selected, reset selection
              if (this.selectedCategory && this.selectedCategory.id === category.id) {
                this.selectedCategory = null;
                this.subCategories = [];
              }
              
              const toast = await this.toastController.create({
                message: 'Category deleted successfully',
                duration: 2000,
                position: 'bottom',
                color: 'success'
              });
              toast.present();
            } catch (error) {
              console.error('Error deleting category:', error);
              const toast = await this.toastController.create({
                message: 'Error deleting category',
                duration: 2000,
                position: 'bottom',
                color: 'danger'
              });
              toast.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  cancelEdit() {
    this.resetForm();
  }
}
