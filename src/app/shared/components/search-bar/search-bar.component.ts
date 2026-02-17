import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MapPin, Calendar, Search } from 'lucide-angular';
import { SearchCriteria } from '../../../models';
import { GuestSelectorComponent } from '../guest-selector/guest-selector.component';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule, GuestSelectorComponent],
    template: `
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-premium p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Destination -->
        <div class="relative">
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            الوجهة
          </label>
          <div class="relative">
            <lucide-icon
              [img]="MapPin"
              [size]="18"
              class="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              [(ngModel)]="destination"
              placeholder="إلى أين تريد الذهاب؟"
              class="input-field ps-10"
            />
          </div>
        </div>

        <!-- Check-in Date -->
        <div class="relative">
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            تاريخ الوصول
          </label>
          <div class="relative">
            <lucide-icon
              [img]="Calendar"
              [size]="18"
              class="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="date"
              [(ngModel)]="checkInDate"
              [min]="today"
              class="input-field ps-10"
            />
          </div>
        </div>

        <!-- Check-out Date -->
        <div class="relative">
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            تاريخ المغادرة
          </label>
          <div class="relative">
            <lucide-icon
              [img]="Calendar"
              [size]="18"
              class="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="date"
              [(ngModel)]="checkOutDate"
              [min]="checkInDate || today"
              class="input-field ps-10"
            />
          </div>
        </div>

        <!-- Guests -->
        <div class="relative">
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            الضيوف
          </label>
          <app-guest-selector
            [initialGuests]="guests()"
            (guestsChange)="onGuestsChange($event)"
          />
        </div>
      </div>

      <!-- Search Button -->
      <div class="mt-6">
        <button
          type="button"
          (click)="onSearch()"
          class="w-full md:w-auto btn-primary flex items-center justify-center gap-2"
        >
          <lucide-icon [img]="Search" [size]="20" />
          <span>بحث</span>
        </button>
      </div>
    </div>
  `
})
export class SearchBarComponent {
    @Output() search = new EventEmitter<SearchCriteria>();

    readonly MapPin = MapPin;
    readonly Calendar = Calendar;
    readonly Search = Search;

    destination = '';
    checkInDate = '';
    checkOutDate = '';
    guests = signal({ adults: 2, children: 0, rooms: 1 });

    get today(): string {
        return new Date().toISOString().split('T')[0];
    }

    ngOnInit() {
        // Set default dates
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date();
        dayAfter.setDate(dayAfter.getDate() + 2);

        this.checkInDate = tomorrow.toISOString().split('T')[0];
        this.checkOutDate = dayAfter.toISOString().split('T')[0];
    }

    onGuestsChange(guests: any): void {
        this.guests.set(guests);
    }

    onSearch(): void {
        const criteria: SearchCriteria = {
            destination: this.destination,
            checkIn: new Date(this.checkInDate),
            checkOut: new Date(this.checkOutDate),
            guests: this.guests()
        };

        this.search.emit(criteria);
    }
}
