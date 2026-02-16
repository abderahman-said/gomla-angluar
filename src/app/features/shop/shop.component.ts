import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES } from '../../core/data/products.data';

import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../core/config/lucide-icons.config';

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent, LucideAngularModule],
    providers: [
        { provide: LUCIDE_ICONS, useValue: LUCIDE_ICONS }
    ],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
    // State Signals
    searchQuery = signal('');
    selectedCategory = signal('الكل');
    sortBy = signal('newest');
    showFilters = signal(false);
    priceRange = signal({ min: 0, max: 5000 });
    selectedTags = signal<string[]>([]);

    // Data
    allProducts = SAMPLE_PRODUCTS;
    categories = SAMPLE_CATEGORIES;

    // Constants
    sortOptions = [
        { value: 'newest', label: 'الأحدث' },
        { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
        { value: 'price-high', label: 'السعر: من الأعلى للأقل' }
    ];

    tags = [
        { value: 'bestseller', label: 'الأكثر مبيعاً' },
        { value: 'new', label: 'وصل حديثاً' },
        { value: 'sale', label: 'خصم' },
        { value: 'premium', label: 'مميز' }
    ];

    // Computed Values
    filteredProducts = computed(() => {
        let result = [...this.allProducts];
        const query = this.searchQuery().toLowerCase();
        const category = this.selectedCategory();
        const price = this.priceRange();
        const tags = this.selectedTags();

        result = result.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(query);
            const matchesCategory = category === 'الكل' || product.category === category;
            const matchesPrice = (product.averagePrice || product.price || 0) >= price.min &&
                (product.averagePrice || product.price || 0) <= price.max;

            // Basic tag check - if product has tags field (mocking logic)
            const matchesTags = tags.length === 0 || (product as any).tags?.some((t: string) => tags.includes(t));

            return matchesSearch && matchesCategory && matchesPrice && matchesTags;
        });

        if (this.sortBy() === 'price-low') {
            result.sort((a, b) => (a.averagePrice || a.price || 0) - (b.averagePrice || b.price || 0));
        } else if (this.sortBy() === 'price-high') {
            result.sort((a, b) => (b.averagePrice || b.price || 0) - (a.averagePrice || a.price || 0));
        }

        return result;
    });

    activeFiltersCount = computed(() => {
        let count = 0;
        if (this.searchQuery() !== '') count++;
        if (this.selectedCategory() !== 'الكل') count++;
        if (this.priceRange().min > 0 || this.priceRange().max < 5000) count++;
        if (this.selectedTags().length > 0) count++;
        return count;
    });

    ngOnInit(): void { }

    toggleMobileFilters() {
        this.showFilters.set(!this.showFilters());
    }

    setCategory(category: string) {
        this.selectedCategory.set(category);
    }

    setSort(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.sortBy.set(value);
    }

    onPriceChange(type: 'min' | 'max', event: Event) {
        const value = parseInt((event.target as HTMLInputElement).value, 10);
        this.priceRange.update(prev => ({
            ...prev,
            [type]: value
        }));
    }

    toggleTag(tag: string) {
        this.selectedTags.update(tags =>
            tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]
        );
    }

    clearAllFilters() {
        this.searchQuery.set('');
        this.selectedCategory.set('الكل');
        this.sortBy.set('newest');
        this.priceRange.set({ min: 0, max: 5000 });
        this.selectedTags.set([]);
    }
}
