import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly STORAGE_KEY = 'hotel_theme_preference';

    // Dark mode state
    private _isDarkMode = signal<boolean>(this.loadThemePreference());
    isDarkMode = this._isDarkMode.asReadonly();

    constructor() {
        // Apply theme on initialization
        this.applyTheme(this._isDarkMode());

        // Watch for theme changes and apply them
        effect(() => {
            this.applyTheme(this._isDarkMode());
        });
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode(): void {
        this._isDarkMode.update(current => !current);
        this.saveThemePreference(this._isDarkMode());
    }

    /**
     * Set dark mode explicitly
     */
    setDarkMode(enabled: boolean): void {
        this._isDarkMode.set(enabled);
        this.saveThemePreference(enabled);
    }

    /**
     * Apply theme to document
     */
    private applyTheme(isDark: boolean): void {
        if (typeof document !== 'undefined') {
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }

    /**
     * Load theme preference from localStorage
     */
    private loadThemePreference(): boolean {
        if (typeof window === 'undefined') return false;

        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored !== null) {
                return stored === 'dark';
            }

            // Check system preference if no stored preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (error) {
            console.error('Error loading theme preference:', error);
            return false;
        }
    }

    /**
     * Save theme preference to localStorage
     */
    private saveThemePreference(isDark: boolean): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    }
}
