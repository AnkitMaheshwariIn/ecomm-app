import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesCollection: AngularFirestoreCollection<Category>;
  // We also need a collection reference that accepts documents without IDs for adding new items
  private categoriesCollectionForAdd: AngularFirestoreCollection<Omit<Category, 'id'>>;
  categories$: Observable<Category[]>;

  constructor(private afs: AngularFirestore) {
    this.categoriesCollection = afs.collection<Category>('categories', ref => ref.orderBy('name', 'asc'));
    // Initialize the collection for adding new documents (without ID requirement)
    this.categoriesCollectionForAdd = afs.collection<Omit<Category, 'id'>>('categories');
    this.categories$ = this.categoriesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        // Remove any existing id from data to avoid duplicate property
        // Using object destructuring to exclude the id property from the data object
        const { id: _unused, ...restData } = data;
        // Create a new object with the Firestore document id and the rest of the data
        return { id, ...restData };
      }))
    );
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  // Get main categories (not subcategories)
  getMainCategories(): Observable<Category[]> {
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

  // Get subcategories for a specific parent category
  getSubCategories(parentId: string): Observable<Category[]> {
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

  getCategory(id: string): Observable<Category | undefined> {
    return this.categoriesCollection.doc<Category>(id).valueChanges().pipe(
      map(category => {
        if (category) {
          return { ...category, id };
        }
        return undefined;
      })
    );
  }

  addCategory(category: Omit<Category, 'id'>): Promise<any> {
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

  updateCategory(id: string, category: Partial<Category>): Promise<void> {
    return this.categoriesCollection.doc(id).update({
      ...category,
      updatedAt: new Date().getTime()
    });
  }

  deleteCategory(id: string): Promise<void> {
    return this.categoriesCollection.doc(id).delete();
  }
}
