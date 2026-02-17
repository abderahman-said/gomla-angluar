import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Filter, X, Star, DollarSign } from 'lucide-angular';
import { HotelFilter, SortOption } from '../../../models';

@Component({
  selector: 'app-filters-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-card p-6 sticky top-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <lucide-icon [img]="Filter" [size]="20" />
         Filters
        </h3>
        @if (hasActiveFilters) {
          <button
            (click)="onClearFilters()"
            class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1"
          >
            <lucide-icon [img]="X" [size]="16" />
            Clear all
          </button>
        }
      </div>

      <!-- Price Range -->
      <div class="mb-6">
        <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <lucide-icon [img]="DollarSign" [size]="16" />
          Price Range
        </h4>
        <div class="space-y-3">
          <div>
            <label class="text-sm text-slate-600 dark:text-slate-400">Min Price</label>
            <input
              type="number"
              [(ngModel)]="localFilters.priceRange!.min"
              (ngModelChange)="onPriceRangeChange('min', $event)"
              class="input-field w-full mt-1"
              placeholder="0"
            />
          </div>
          <div>
            <label class="text-sm text-slate-600 dark:text-slate-400">Max Price</label>
            <input
              type="number"
              [(ngModel)]="localFilters.priceRange!.max"
              (ngModelChange)="onPriceRangeChange('max', $event)"
              class="input-field w-full mt-1"
              placeholder="1000+"
            />
          </div>
        </div>
      </div>

      <!-- Star Rating -->
      <div class="mb-6">
        <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <lucide-icon [img]="Star" [size]="16" />
          Star Rating
        </h4>
        <div class="space-y-2">
          @for (star of [5, 4, 3, 2, 1]; track star) {
            <label class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded">
              <input
                type="checkbox"
                [value]="star"
                [(ngModel)]="selectedStars"
                (ngModelChange)="onStarRatingChange()"
                class="rounded text-primary-600 focus:ring-primary-500"
              />
              <div class="flex items-center gap-1">
                @for (i of getStarArray(star); track i) {
                  <lucide-icon [img]="Star" [size]="14" class="text-yellow-400 fill-yellow-400" />
                }
                <span class="text-sm text-slate-600 dark:text-slate-400 ms-1">
                  @if (star === 5) {
                    5 Stars
                  } @else if (star === 4) {
                    4 Stars & up
                  } @else if (star === 3) {
                    3 Stars & up
                  } @else if (star === 2) {
                    2 Stars & up
                  } @else {
                    1 Star & up
                  }
                </span>
              </div>
            </label>
          }
        </div>
      </div>

      <!-- Guest Rating -->
      <div class="mb-6">
        <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-3">Guest Rating</h4>
        <div class="space-y-2">
          @for (rating of [9, 8, 7, 6]; track rating) {
            <label class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded">
              <input
                type="radio"
                name="guestRating"
                [value]="rating"
                [(ngModel)]="localFilters.guestRating"
                (ngModelChange)="onFilterChange()"
                class="text-primary-600 focus:ring-primary-500"
              />
              <span class="text-sm text-slate-600 dark:text-slate-400">
                {{ rating }}+ Excellent
                @if (rating === 9) {
                  <span class="text-xs text-slate-500">(Wonderful)</span>
                } @else if (rating === 8) {
                  <span class="text-xs text-slate-500">(Very Good)</span>
                } @else if (rating === 7) {
                  <span class="text-xs text-slate-500">(Good)</span>
                } @else {
                  <span class="text-xs text-slate-500">(Fair)</span>
                }
              </span>
            </label>
          }
        </div>
      </div>

      <!-- Popular Amenities -->
      <div class="mb-6">
        <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-3">Popular Amenities</h4>
        <div class="space-y-2">
          @for (amenity of popularAmenities; track amenity) {
            <label class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded">
              <input
                type="checkbox"
                [value]="amenity"
                [(ngModel)]="selectedAmenities"
                (ngModelChange)="onAmenitiesChange()"
                class="rounded text-primary-600 focus:ring-primary-500"
              />
              <span class="text-sm text-slate-600 dark:text-slate-400">{{ amenity }}</span>
            </label>
          }
        </div>
      </div>

      <!-- Cancellation Policy -->
      <div class="mb-6">
        <h4 class="font-semibold text-slate-900 dark:text-slate-100 mb-3">Cancellation Policy</h4>
        <label class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded">
          <input
            type="checkbox"
            [(ngModel)]="freeCancellation"
            (ngModelChange)="onFilterChange()"
            class="rounded text-primary-600 focus:ring-primary-500"
          />
          <span class="text-sm text-slate-600 dark:text-slate-400">Free Cancellation</span>
        </label>
      </div>
    </div>
  `
})
export class FiltersSidebarComponent {
  @Input() set filters(filters: HotelFilter | undefined) {
    this.localFilters = { ...filters };
    this.updateSelectedValues();
  }

  @Output() filtersChange = new EventEmitter<HotelFilter>();

  readonly Filter = Filter;
  readonly X = X;
  readonly Star = Star;
  readonly DollarSign = DollarSign;

  localFilters: HotelFilter = {};
  selectedStars: number[] = [];
  selectedAmenities: string[] = [];
  freeCancellation = false;

  readonly popularAmenities = [
    'Free WiFi',
    'Swimming Pool',
    'Spa',
    'Restaurant',
    'Gym',
    'Room Service',
    'Parking',
    'Pet Friendly'
  ];

  get hasActiveFilters(): boolean {
    return !!(
      this.localFilters.priceRange?.min ||
      this.localFilters.priceRange?.max ||
      this.localFilters.starRating?.length ||
      this.localFilters.guestRating ||
      this.localFilters.amenities?.length
    );
  }

  onPriceRangeChange(type: 'min' | 'max', value: number): void {
    if (!this.localFilters.priceRange) {
      this.localFilters.priceRange = { min: 0, max: 1000 };
    }
    this.localFilters.priceRange[type] = value;
    this.onFilterChange();
  }

  onStarRatingChange(): void {
    this.localFilters.starRating = this.selectedStars.length > 0 ? [...this.selectedStars] : undefined;
    this.onFilterChange();
  }

  onAmenitiesChange(): void {
    this.localFilters.amenities = this.selectedAmenities.length > 0 ? [...this.selectedAmenities] : undefined;
    this.onFilterChange();
  }

  onFilterChange(): void {
    this.filtersChange.emit({ ...this.localFilters });
  }

  onClearFilters(): void {
    this.localFilters = {};
    this.selectedStars = [];
    this.selectedAmenities = [];
    this.freeCancellation = false;
    this.filtersChange.emit({});
  }

  private updateSelectedValues(): void {
    this.selectedStars = this.localFilters.starRating ? [...this.localFilters.starRating] : [];
    this.selectedAmenities = this.localFilters.amenities ? [...this.localFilters.amenities] : [];
  }

  getStarArray(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index);
  }
}
