import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { StoreConfigService } from './store-config.service';
import { CategoryWithSVG, getAllCategories, StoreType } from '../../assets/data/categories';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesCollection: AngularFirestoreCollection<Category>;
  // We also need a collection reference that accepts documents without IDs for adding new items
  private categoriesCollectionForAdd: AngularFirestoreCollection<Omit<Category, 'id'>>;
  categories$: Observable<Category[]>;
  private useLocalCategories = true; // Flag to determine if we use local or Firestore categories

  constructor(
    private afs: AngularFirestore,
    private storeConfigService: StoreConfigService,
    private languageService: LanguageService
  ) {
    // Initialize Firestore collections (still needed for admin operations)
    this.categoriesCollection = afs.collection<Category>('categories', ref => ref.orderBy('name', 'asc'));
    this.categoriesCollectionForAdd = afs.collection<Omit<Category, 'id'>>('categories');
    
    // Get categories based on the selected store type and translate them
    this.categories$ = this.storeConfigService.storeType$.pipe(
      switchMap(storeType => {
        if (this.useLocalCategories) {
          return this.getLocalCategories(storeType);
        } else {
          // Fallback to Firestore categories if needed
          return this.categoriesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Category;
              const id = a.payload.doc.id;
              const { id: _unused, ...restData } = data;
              return { id, ...restData };
            }))
          );
        }
      })
    );
  }
  
  /**
   * Get categories from local data based on store type
   */
  private getLocalCategories(storeType: StoreType): Observable<Category[]> {
    return this.languageService.currentLang$.pipe(
      map(lang => {
        const localCategories = getAllCategories(storeType);
        
        // Transform CategoryWithSVG to Category and translate names/descriptions
        // Use a Map to ensure no duplicate IDs
        const uniqueCategories = new Map<string, Category>();
        
        localCategories.forEach(localCat => {
          if (!uniqueCategories.has(localCat.id)) {
            const category: Category = {
              id: localCat.id,
              name: this.languageService.getTranslation(localCat.nameKey) || localCat.name,
              description: localCat.descriptionKey ? 
                this.languageService.getTranslation(localCat.descriptionKey) : 
                localCat.description,
              imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(localCat.svgIcon)}`,
              parentId: localCat.subcategories ? undefined : localCat.id.includes('-') ? 
                localCat.id.split('-')[0] : undefined,
              createdAt: localCat.createdAt,
              updatedAt: localCat.updatedAt
            };
            uniqueCategories.set(localCat.id, category);
          }
        });
        
        return Array.from(uniqueCategories.values());
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  // Get main categories (not subcategories)
  getMainCategories(): Observable<Category[]> {
    if (this.useLocalCategories) {
      return this.categories$.pipe(
        map(categories => categories.filter(cat => !cat.parentId))
      );
    } else {
      return this.afs.collection<Category>('categories', 
        ref => ref.where('parentId', '==', null).orderBy('name', 'asc')
      ).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          // Remove id from data to avoid duplicate property
          const { id: dataId, ...restData } = data;
          return { id, ...restData };
        }))
      );
    }
  }

  // Get subcategories for a specific parent category
  getSubCategories(parentId: string): Observable<Category[]> {
    if (this.useLocalCategories) {
      return this.categories$.pipe(
        map(categories => categories.filter(cat => cat.parentId === parentId))
      );
    } else {
      return this.afs.collection<Category>('categories', 
        ref => ref.where('parentId', '==', parentId).orderBy('name', 'asc')
      ).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          // Remove id from data to avoid duplicate property
          const { id: dataId, ...restData } = data;
          return { id, ...restData };
        }))
      );
    }
  }

  getCategory(id: string): Observable<Category | undefined> {
    if (this.useLocalCategories) {
      return this.categories$.pipe(
        map(categories => categories.find(cat => cat.id === id))
      );
    } else {
      return this.categoriesCollection.doc<Category>(id).valueChanges().pipe(
        map(category => {
          if (category) {
            return { ...category, id };
          }
          return undefined;
        })
      );
    }
  }

  /**
   * Add a new category to Firestore (admin only)
   */
  addCategory(category: Omit<Category, 'id'>): Promise<any> {
    // Only admins should be able to add categories to Firestore
    // Regular users will use the local categories
    const timestamp = new Date().getTime();
    // Create a new object with the required properties
    const newCategory = {
      ...category,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    // Use the properly typed collection for adding new documents
    // This collection is typed to accept documents without an ID
    return this.categoriesCollectionForAdd.add(newCategory);
  }

  /**
   * Update a category in Firestore (admin only)
   */
  updateCategory(id: string, category: Partial<Category>): Promise<void> {
    // Only admins should be able to update categories in Firestore
    return this.categoriesCollection.doc(id).update({
      ...category,
      updatedAt: new Date().getTime()
    });
  }

  /**
   * Delete a category from Firestore (admin only)
   */
  deleteCategory(id: string): Promise<void> {
    // Only admins should be able to delete categories from Firestore
    return this.categoriesCollection.doc(id).delete();
  }
  
  /**
   * Toggle between local and Firestore categories
   * This is mainly for admin purposes
   */
  toggleCategorySource(useLocal: boolean): void {
    this.useLocalCategories = useLocal;
  }
  
  /**
   * Set the store type for categories
   */
  setStoreType(storeType: StoreType): void {
    this.storeConfigService.setStoreType(storeType);
  }
  
  /**
   * Get available store types
   */
  getAvailableStoreTypes(): {type: StoreType, label: string}[] {
    return this.storeConfigService.getAvailableStoreTypes();
  }
}
