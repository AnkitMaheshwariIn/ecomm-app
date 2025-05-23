import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products', ref => ref.orderBy('createdAt', 'desc'));
    this.products$ = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Product, 'id'>;
        const docId = a.payload.doc.id;
        return { id: docId, ...data };
      }))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.afs.collection<Product>('products', 
      ref => ref.where('categoryId', '==', categoryId).orderBy('createdAt', 'desc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Product, 'id'>;
        const docId = a.payload.doc.id;
        return { id: docId, ...data };
      }))
    );
  }

  getProductsBySubCategory(subCategoryId: string): Observable<Product[]> {
    return this.afs.collection<Product>('products', 
      ref => ref.where('subCategoryId', '==', subCategoryId).orderBy('createdAt', 'desc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Product, 'id'>;
        const docId = a.payload.doc.id;
        return { id: docId, ...data };
      }))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.afs.collection<Product>('products', 
      ref => ref.where('featured', '==', true).orderBy('createdAt', 'desc').limit(10)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Product, 'id'>;
        const docId = a.payload.doc.id;
        return { id: docId, ...data };
      }))
    );
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.productsCollection.doc<Product>(id).valueChanges().pipe(
      map(product => {
        if (product) {
          return { ...product, id };
        }
        return undefined;
      })
    );
  }

  addProduct(product: Omit<Product, 'id'>): Promise<any> {
    const timestamp = new Date().getTime();
    // Using type assertion to tell TypeScript that we know what we're doing
    // Firestore will generate the ID for us when we add the document
    return this.productsCollection.add({
      ...product,
      createdAt: timestamp,
      updatedAt: timestamp
    } as Product);
  }

  updateProduct(id: string, product: Partial<Product>): Promise<void> {
    return this.productsCollection.doc(id).update({
      ...product,
      updatedAt: new Date().getTime()
    });
  }

  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }
}
