import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

export type Language = 'en' | 'hi';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translations: { [key: string]: any } = {};
  private currentLangSubject = new BehaviorSubject<Language>('en');
  currentLang$ = this.currentLangSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.initLanguage();
  }

  public async initLanguage() {
    // Initialize storage
    await this.storage.create();
    
    // Get saved language or default to English
    const savedLang = await this.storage.get('language') as Language || 'en';
    this.setLanguage(savedLang);
  }

  async setLanguage(lang: Language): Promise<void> {
    // Save to storage
    await this.storage.set('language', lang);
    
    // Load translations if not already loaded
    if (!this.translations[lang]) {
      try {
        const translations = await this.http.get<any>(`assets/i18n/${lang}.json`).toPromise();
        this.translations[lang] = translations;
      } catch (error) {
        console.error(`Failed to load translations for ${lang}`, error);
        // If loading fails, try to use English as fallback
        if (lang !== 'en') {
          return this.setLanguage('en');
        }
      }
    }
    
    // Update current language
    this.currentLangSubject.next(lang);
  }
  
  /**
   * Get a translation by key
   * @param key The translation key
   * @returns The translated string or undefined if not found
   */
  getTranslation(key: string): string | undefined {
    const lang = this.currentLangSubject.value;
    if (!this.translations[lang]) {
      return undefined;
    }
    
    // Handle nested keys (e.g. 'categories.fruitsVegetables')
    const keys = key.split('.');
    let result = this.translations[lang];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return undefined;
      }
    }
    
    return typeof result === 'string' ? result : undefined;
  }

  /**
   * Get translation for a key
   * @param key Dot notation path to translation (e.g., 'auth.logout')
   * @param params Optional parameters to replace in the translation
   * @returns The translated string
   */
  translate(key: string, params: { [key: string]: string } = {}): string {
    const lang = this.currentLangSubject.value;
    
    // If translations not loaded yet, return the key
    if (!this.translations[lang]) {
      return key;
    }
    
    // Get translation using dot notation
    const keys = key.split('.');
    let translation = this.translations[lang];
    
    for (const k of keys) {
      if (!translation[k]) {
        // If translation not found, try English as fallback
        if (lang !== 'en' && this.translations['en']) {
          let enTranslation = this.translations['en'];
          for (const enK of keys) {
            if (!enTranslation[enK]) {
              return key; // Not found in fallback either
            }
            enTranslation = enTranslation[enK];
          }
          translation = enTranslation;
          break;
        } else {
          return key; // Not found and no fallback
        }
      }
      translation = translation[k];
    }
    
    // Replace parameters
    if (typeof translation === 'string') {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
      return translation;
    }
    
    return key; // Return key if translation is not a string
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): Language {
    return this.currentLangSubject.value;
  }

  /**
   * Toggle between available languages
   */
  toggleLanguage(): void {
    const current = this.currentLangSubject.value;
    this.setLanguage(current === 'en' ? 'hi' : 'en');
  }
}
