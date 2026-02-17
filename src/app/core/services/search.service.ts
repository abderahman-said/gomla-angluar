import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchCriteria, HotelFilter, SortOption } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private readonly defaultSearchCriteria: SearchCriteria = {
        destination: '',
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 86400000), // Tomorrow
        guests: {
            adults: 2,
            children: 0,
            rooms: 1
        }
    };

    private readonly defaultFilters: HotelFilter = {
        priceRange: undefined,
        starRating: [],
        guestRating: undefined,
        amenities: []
    };

    // Search criteria state
    private _searchCriteria$ = new BehaviorSubject<SearchCriteria>(this.defaultSearchCriteria);
    searchCriteria$: Observable<SearchCriteria> = this._searchCriteria$.asObservable();

    // Filters state
    private _filters$ = new BehaviorSubject<HotelFilter>(this.defaultFilters);
    filters$: Observable<HotelFilter> = this._filters$.asObservable();

    // Sort option state
    private _sortOption$ = new BehaviorSubject<SortOption>('popularity');
    sortOption$: Observable<SortOption> = this._sortOption$.asObservable();

    /**
     * Update search criteria
     */
    updateSearch(criteria: Partial<SearchCriteria>): void {
        const current = this._searchCriteria$.value;
        this._searchCriteria$.next({ ...current, ...criteria });
    }

    /**
     * Get current search criteria
     */
    getCurrentSearch(): SearchCriteria {
        return this._searchCriteria$.value;
    }

    /**
     * Update filters
     */
    updateFilters(filters: Partial<HotelFilter>): void {
        const current = this._filters$.value;
        this._filters$.next({ ...current, ...filters });
    }

    /**
     * Get current filters
     */
    getCurrentFilters(): HotelFilter {
        return this._filters$.value;
    }

    /**
     * Reset filters to default
     */
    resetFilters(): void {
        this._filters$.next(this.defaultFilters);
    }

    /**
     * Update sort option
     */
    updateSort(sort: SortOption): void {
        this._sortOption$.next(sort);
    }

    /**
     * Get current sort option
     */
    getCurrentSort(): SortOption {
        return this._sortOption$.value;
    }

    /**
     * Check if any filters are active
     */
    hasActiveFilters(): boolean {
        const filters = this._filters$.value;
        return !!(
            filters.priceRange ||
            (filters.starRating && filters.starRating.length > 0) ||
            filters.guestRating ||
            (filters.amenities && filters.amenities.length > 0)
        );
    }

    /**
     * Get count of active filters
     */
    getActiveFiltersCount(): number {
        const filters = this._filters$.value;
        let count = 0;

        if (filters.priceRange) count++;
        if (filters.starRating && filters.starRating.length > 0) count++;
        if (filters.guestRating) count++;
        if (filters.amenities && filters.amenities.length > 0) count += filters.amenities.length;

        return count;
    }
}
