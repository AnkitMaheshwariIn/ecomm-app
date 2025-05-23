import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { ImageService } from '../../../../services/image.service';
import { Observable } from 'rxjs';
import { Category } from '../../../../models/category.model';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit {
  productForm: FormGroup;
  categories$: Observable<Category[]>;
  subCategories$: Observable<Category[]> | null = null;
  isEditMode = false;
  productId: string | null = null;
  selectedImages: string[] = [];
  imageFiles: File[] = [];
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.categories$ = this.categoryService.getMainCategories();
    
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      salePrice: [null],
      categoryId: ['', Validators.required],
      subCategoryId: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      featured: [false],
      attributes: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = id;
        this.loadProduct(id);
      }
    });
  }

  async loadProduct(id: string) {
    const loading = await this.loadingController.create({
      message: 'Loading product...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const product = await this.productService.getProduct(id).toPromise();
      if (product) {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          salePrice: product.salePrice,
          categoryId: product.categoryId,
          subCategoryId: product.subCategoryId,
          stock: product.stock,
          featured: product.featured
        });
        
        // Load subcategories
        if (product.categoryId) {
          this.onCategoryChange(product.categoryId);
        }
        
        // Load attributes
        if (product.attributes) {
          Object.entries(product.attributes).forEach(([key, value]) => {
            this.addAttribute(key, value);
          });
        }
        
        // Load images
        this.selectedImages = [...product.images];
      }
      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      console.error('Error loading product:', error);
      const toast = await this.toastController.create({
        message: 'Error loading product',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

  onCategoryChange(categoryId: string) {
    if (categoryId) {
      this.subCategories$ = this.categoryService.getSubCategories(categoryId);
    } else {
      this.subCategories$ = null;
      this.productForm.get('subCategoryId')?.setValue('');
    }
  }

  get attributes() {
    return this.productForm.get('attributes') as FormArray;
  }

  addAttribute(key: string = '', value: string = '') {
    this.attributes.push(
      this.fb.group({
        key: [key, Validators.required],
        value: [value, Validators.required]
      })
    );
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }

  async selectImages() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    
    input.onchange = async (event: any) => {
      const files = event.target.files;
      if (files && files.length) {
        const loading = await this.loadingController.create({
          message: 'Processing images...',
          spinner: 'crescent'
        });
        await loading.present();
        
        try {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.imageFiles.push(file);
            
            // Convert file to data URL
            const dataUrl = await this.imageService.fileToDataUrl(file);
            
            // Optimize image
            const optimizedImage = await this.imageService.compressImage(dataUrl, 80);
            
            // Add to selected images
            this.selectedImages.push(optimizedImage);
          }
          await loading.dismiss();
        } catch (error) {
          await loading.dismiss();
          console.error('Error processing images:', error);
          const toast = await this.toastController.create({
            message: 'Error processing images',
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

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    if (index < this.imageFiles.length) {
      this.imageFiles.splice(index, 1);
    }
  }

  async saveProduct() {
    if (this.productForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
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
    
    if (this.selectedImages.length === 0) {
      const toast = await this.toastController.create({
        message: 'Please add at least one product image',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
      return;
    }
    
    const loading = await this.loadingController.create({
      message: this.isEditMode ? 'Updating product...' : 'Creating product...',
      spinner: 'crescent'
    });
    await loading.present();
    
    try {
      // Convert attributes FormArray to object
      const attributesObj: { [key: string]: string } = {};
      this.attributes.controls.forEach(control => {
        const { key, value } = control.value;
        attributesObj[key] = value;
      });
      
      const productData: any = {
        ...this.productForm.value,
        attributes: attributesObj,
        images: this.selectedImages
      };
      
      if (this.isEditMode && this.productId) {
        await this.productService.updateProduct(this.productId, productData);
      } else {
        await this.productService.addProduct(productData);
      }
      
      await loading.dismiss();
      
      const toast = await this.toastController.create({
        message: this.isEditMode ? 'Product updated successfully' : 'Product created successfully',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();
      
      this.router.navigate(['/admin/products']);
    } catch (error) {
      await loading.dismiss();
      console.error('Error saving product:', error);
      const toast = await this.toastController.create({
        message: 'Error saving product',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

  async confirmCancel() {
    const alert = await this.alertController.create({
      header: 'Discard Changes',
      message: 'Are you sure you want to discard your changes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Discard',
          handler: () => {
            this.router.navigate(['/admin/products']);
          }
        }
      ]
    });
    await alert.present();
  }
}
