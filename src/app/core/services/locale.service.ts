import { Injectable, signal, effect } from '@angular/core';

export type Locale = 'ar' | 'en';

@Injectable({
    providedIn: 'root'
})
export class LocaleService {
    private readonly STORAGE_KEY = 'hotel_locale_preference';

    // Current locale state
    private _currentLocale = signal<Locale>(this.loadLocalePreference());
    currentLocale = this._currentLocale.asReadonly();

    // Computed: is RTL
    isRTL = signal<boolean>(this._currentLocale() === 'ar');

    constructor() {
        // Apply locale on initialization
        this.applyLocale(this._currentLocale());

        // Watch for locale changes and apply them
        effect(() => {
            const locale = this._currentLocale();
            this.applyLocale(locale);
            this.isRTL.set(locale === 'ar');
        });
    }

    /**
     * Set locale
     */
    setLocale(locale: Locale): void {
        this._currentLocale.set(locale);
        this.saveLocalePreference(locale);
    }

    /**
     * Toggle between Arabic and English
     */
    toggleLocale(): void {
        const newLocale: Locale = this._currentLocale() === 'ar' ? 'en' : 'ar';
        this.setLocale(newLocale);
    }

    /**
     * Apply locale to document
     */
    private applyLocale(locale: Locale): void {
        if (typeof document !== 'undefined') {
            const direction = locale === 'ar' ? 'rtl' : 'ltr';
            const lang = locale;

            document.documentElement.setAttribute('dir', direction);
            document.documentElement.setAttribute('lang', lang);
        }
    }

    /**
     * Load locale preference from localStorage
     */
    private loadLocalePreference(): Locale {
        if (typeof window === 'undefined') return 'ar';

        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored === 'ar' || stored === 'en') {
                return stored;
            }

            // Default to Arabic
            return 'ar';
        } catch (error) {
            console.error('Error loading locale preference:', error);
            return 'ar';
        }
    }

    /**
     * Save locale preference to localStorage
     */
    private saveLocalePreference(locale: Locale): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(this.STORAGE_KEY, locale);
        } catch (error) {
            console.error('Error saving locale preference:', error);
        }
    }
}
