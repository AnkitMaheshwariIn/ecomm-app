import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _storage: Storage | null = null;
  private _cart = new BehaviorSubject<CartItem[]>([]);
  private _cartItemCount = new BehaviorSubject<number>(0);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Initialize storage
    const storage = await this.storage.create();
    this._storage = storage;
    
    // Load cart from storage
    this.loadCart();
  }

  async loadCart() {
    if (!this._storage) {
      await this.init();
    }
    
    const cart = await this._storage?.get('cart') || [];
    this._cart.next(cart);
    this.calculateItemCount();
  }

  get cart(): Observable<CartItem[]> {
    return this._cart.asObservable();
  }

  get cartItemCount(): Observable<number> {
    return this._cartItemCount.asObservable();
  }

  async addToCart(product: Product, quantity: number = 1) {
    const currentCart = this._cart.value;
    const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex > -1) {
      // Item already exists, update quantity
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      currentCart.push({ product, quantity });
    }
    
    this._cart.next(currentCart);
    this.calculateItemCount();
    await this._storage?.set('cart', currentCart);
  }

  async updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }
    
    const currentCart = this._cart.value;
    const existingItemIndex = currentCart.findIndex(item => item.product.id === productId);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity = quantity;
      this._cart.next(currentCart);
      this.calculateItemCount();
      await this._storage?.set('cart', currentCart);
    }
  }

  async removeFromCart(productId: string) {
    const currentCart = this._cart.value;
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    
    this._cart.next(updatedCart);
    this.calculateItemCount();
    await this._storage?.set('cart', updatedCart);
  }

  async clearCart() {
    this._cart.next([]);
    this._cartItemCount.next(0);
    await this._storage?.set('cart', []);
  }

  calculateItemCount() {
    const count = this._cart.value.reduce((total, item) => total + item.quantity, 0);
    this._cartItemCount.next(count);
  }

  calculateTotal(): number {
    return this._cart.value.reduce((total, item) => {
      const price = item.product.salePrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }
}
