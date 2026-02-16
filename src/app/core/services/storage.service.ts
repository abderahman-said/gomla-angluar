import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Basic storage operations
  set(key: string, value: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    try {
      if (storageType === 'localStorage') {
        localStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Failed to set ${storageType} item:`, error);
    }
  }

  get(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): string | null {
    try {
      if (storageType === 'localStorage') {
        return localStorage.getItem(key);
      } else {
        return sessionStorage.getItem(key);
      }
    } catch (error) {
      console.error(`Failed to get ${storageType} item:`, error);
      return null;
    }
  }

  remove(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    try {
      if (storageType === 'localStorage') {
        localStorage.removeItem(key);
      } else {
        sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Failed to remove ${storageType} item:`, error);
    }
  }

  clear(storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    try {
      if (storageType === 'localStorage') {
        localStorage.clear();
      } else {
        sessionStorage.clear();
      }
    } catch (error) {
      console.error(`Failed to clear ${storageType}:`, error);
    }
  }

  // JSON operations
  setJSON<T>(key: string, value: T, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.set(key, serializedValue, storageType);
    } catch (error) {
      console.error(`Failed to set JSON item:`, error);
    }
  }

  getJSON<T>(key: string, defaultValue?: T, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): T | null {
    try {
      const item = this.get(key, storageType);
      if (item === null) {
        return defaultValue || null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Failed to get JSON item:`, error);
      return defaultValue || null;
    }
  }

  // Object operations with automatic JSON serialization
  setObject<T>(key: string, value: T, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    this.setJSON(key, value, storageType);
  }

  getObject<T>(key: string, defaultValue?: T, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): T | null {
    return this.getJSON(key, defaultValue, storageType);
  }

  // Array operations
  setArray<T>(key: string, value: T[], storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    this.setJSON(key, value, storageType);
  }

  getArray<T>(key: string, defaultValue: T[] = [], storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): T[] {
    return this.getJSON(key, defaultValue, storageType) || defaultValue;
  }

  // Utility methods
  exists(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): boolean {
    return this.get(key, storageType) !== null;
  }

  getAllKeys(storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): string[] {
    try {
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      return Object.keys(storage);
    } catch (error) {
      console.error(`Failed to get ${storageType} keys:`, error);
      return [];
    }
  }

  getStorageSize(storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): number {
    try {
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      let total = 0;
      for (let key in storage) {
        if (storage.hasOwnProperty(key)) {
          total += storage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error(`Failed to calculate ${storageType} size:`, error);
      return 0;
    }
  }

  // Session management
  setWithExpiry(key: string, value: any, expiryInMinutes: number, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    const expiryTime = new Date().getTime() + (expiryInMinutes * 60 * 1000);
    const item = {
      value,
      expiry: expiryTime
    };
    this.setJSON(key, item, storageType);
  }

  getWithExpiry<T>(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): T | null {
    try {
      const item = this.getJSON<{ value: T; expiry: number }>(key, undefined, storageType);
      
      if (!item) {
        return null;
      }

      const now = new Date().getTime();
      if (now > item.expiry) {
        this.remove(key, storageType);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error(`Failed to get item with expiry:`, error);
      return null;
    }
  }

  // Cache management
  setCache<T>(key: string, value: T, ttlInMinutes: number = 5): void {
    this.setWithExpiry(`cache_${key}`, value, ttlInMinutes);
  }

  getCache<T>(key: string): T | null {
    return this.getWithExpiry<T>(`cache_${key}`);
  }

  clearCache(): void {
    const keys = this.getAllKeys();
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        this.remove(key);
      }
    });
  }

  // User preferences
  setUserPreference(key: string, value: any): void {
    this.setJSON(`pref_${key}`, value);
  }

  getUserPreference<T>(key: string, defaultValue?: T): T | null {
    return this.getJSON(`pref_${key}`, defaultValue);
  }

  removeUserPreference(key: string): void {
    this.remove(`pref_${key}`);
  }

  // Theme and language settings
  setTheme(theme: string): void {
    this.setUserPreference('theme', theme);
  }

  getTheme(defaultTheme: string = 'light'): string {
    return this.getUserPreference('theme', defaultTheme) || defaultTheme;
  }

  setLanguage(language: string): void {
    this.setUserPreference('language', language);
  }

  getLanguage(defaultLanguage: string = 'ar'): string {
    return this.getUserPreference('language', defaultLanguage) || defaultLanguage;
  }

  // Recently viewed items
  addRecentlyViewed(itemId: string, maxItems: number = 10): void {
    const recentlyViewed = this.getArray<string>('recently_viewed', []);
    const index = recentlyViewed.indexOf(itemId);
    
    if (index > -1) {
      recentlyViewed.splice(index, 1);
    }
    
    recentlyViewed.unshift(itemId);
    
    if (recentlyViewed.length > maxItems) {
      recentlyViewed.splice(maxItems);
    }
    
    this.setArray('recently_viewed', recentlyViewed);
  }

  getRecentlyViewed(): string[] {
    return this.getArray<string>('recently_viewed', []);
  }

  clearRecentlyViewed(): void {
    this.remove('recently_viewed');
  }

  // Search history
  addSearchQuery(query: string, maxQueries: number = 20): void {
    const searchHistory = this.getArray<string>('search_history', []);
    const index = searchHistory.indexOf(query);
    
    if (index > -1) {
      searchHistory.splice(index, 1);
    }
    
    searchHistory.unshift(query);
    
    if (searchHistory.length > maxQueries) {
      searchHistory.splice(maxQueries);
    }
    
    this.setArray('search_history', searchHistory);
  }

  getSearchHistory(): string[] {
    return this.getArray<string>('search_history', []);
  }

  clearSearchHistory(): void {
    this.remove('search_history');
  }
}
