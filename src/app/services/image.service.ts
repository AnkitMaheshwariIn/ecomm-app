import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private _storage: Storage | null = null;
  
  constructor(
    private imageCompress: NgxImageCompressService,
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    // Initialize storage
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Compresses and optimizes an image
   * @param imageDataUrl The base64 image data URL
   * @param quality The quality of the compressed image (0-100)
   * @returns Promise with the compressed image data URL
   */
  async compressImage(imageDataUrl: string, quality: number = 75): Promise<string> {
    try {
      // For getOrientation, we need a File object
      const file = this.dataUrlToFile(imageDataUrl);
      const orientation = await this.imageCompress.getOrientation(file);
      
      // For compressFile, we need the original data URL string
      return await this.imageCompress.compressFile(imageDataUrl, orientation, 75, quality);
    } catch (error) {
      console.error('Error compressing image:', error);
      return imageDataUrl; // Return original if compression fails
    }
  }

  /**
   * Resizes an image to specified dimensions
   * @param imageDataUrl The base64 image data URL
   * @param maxWidth Maximum width of the resized image
   * @param maxHeight Maximum height of the resized image
   * @returns Promise with the resized image data URL
   */
  async resizeImage(imageDataUrl: string, maxWidth: number = 800, maxHeight: number = 800): Promise<string> {
    try {
      return await this.imageCompress.compressFile(
        imageDataUrl, -1, 75, 75, maxWidth, maxHeight
      );
    } catch (error) {
      console.error('Error resizing image:', error);
      return imageDataUrl; // Return original if resizing fails
    }
  }

  /**
   * Stores an image in local storage
   * @param key The key to store the image under
   * @param imageDataUrl The base64 image data URL
   * @returns Promise<void>
   */
  async storeImage(key: string, imageDataUrl: string): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.set(key, imageDataUrl);
  }

  /**
   * Retrieves an image from local storage
   * @param key The key the image is stored under
   * @returns Promise with the image data URL or null if not found
   */
  async getImage(key: string): Promise<string | null> {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.get(key) || null;
  }

  /**
   * Deletes an image from local storage
   * @param key The key the image is stored under
   * @returns Promise<void>
   */
  async removeImage(key: string): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.remove(key);
  }

  /**
   * Converts a File object to a data URL
   * @param file The File object
   * @returns Promise with the data URL
   */
  async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Converts a data URL to a File object
   * @param dataUrl The data URL
   * @param fileName Optional file name (defaults to 'image.jpg')
   * @returns File object
   */
  dataUrlToFile(dataUrl: string, fileName: string = 'image.jpg'): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    const blob = new Blob([u8arr], { type: mime });
    return new File([blob], fileName, { type: mime, lastModified: Date.now() });
  }
}
