import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { StoreType, CategoryWithSVG, getAllCategories } from '../../assets/data/categories';

/**
 * Service for managing store configuration
 * 
 * NOTE: This repository is specifically for Kirana stores.
 * The service is designed to be flexible so that when cloned for other store types
 * (apparel, electronics, etc.), only minimal changes are needed.
 */
@Injectable({
  providedIn: 'root'
})
export class StoreConfigService {
  // Always use Kirana store type for this repository
  private storeTypeSubject = new BehaviorSubject<StoreType>(StoreType.KIRANA);
  storeType$: Observable<StoreType> = this.storeTypeSubject.asObservable();

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    // For this repository, we always use Kirana store type
    // When cloned for other store types, this can be modified
    this.storeTypeSubject.next(StoreType.KIRANA);
  }

  /**
   * This method exists for compatibility when cloning the repository for other store types
   * For this Kirana-specific repository, it doesn't change the store type
   */
  setStoreType(type: StoreType): void {
    // In this repository, we only support Kirana
    // This method exists for compatibility when cloning for other store types
    console.log('Note: This repository is Kirana-specific. Store type changes are ignored.');
  }
  
  /**
   * Get the current store type
   */
  public getStoreType(): StoreType {
    return this.storeTypeSubject.value;
  }
  
  /**
   * Get categories for the current store type (Kirana only in this repository)
   */
  public getCategories(): CategoryWithSVG[] {
    // Always return Kirana categories for this repository
    return getAllCategories(StoreType.KIRANA);
  }
  
  /**
   * Get available store types
   * For this repository, only returns Kirana
   * When cloned for other store types, this can be modified
   */
  public getAvailableStoreTypes(): {type: StoreType, label: string}[] {
    // This repository is Kirana-specific
    return [
      { type: StoreType.KIRANA, label: 'Kirana Grocery Store' }
    ];
  }
}
