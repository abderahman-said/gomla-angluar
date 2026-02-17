import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Users, Minus, Plus } from 'lucide-angular';

export interface GuestSelection {
  adults: number;
  children: number;
  rooms: number;
}

@Component({
  selector: 'app-guest-selector',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative">
      <!-- Trigger Button -->
      <button
        type="button"
        (click)="toggleDropdown()"
        class="w-full text-left outline-none"
      >
        <div class="flex items-center gap-3">
          <lucide-icon [img]="Users" [size]="20" class="text-amber-500" />
          <div class="flex flex-col">
            <span class="text-slate-900 font-bold text-base leading-tight">{{ guestSummary }}</span>
          </div>
        </div>
      </button>

      <!-- Dropdown -->
      @if (isOpen()) {
        <div
          class="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-[1000] min-w-[300px]"
          (click)="$event.stopPropagation()"
        >
          <!-- Adults -->
          <div class="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <div class="font-semibold text-slate-900 dark:text-slate-100">البالغون</div>
              <div class="text-sm text-slate-500 dark:text-slate-400">من 18 سنة فأكثر</div>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="decrementAdults()"
                [disabled]="guests().adults <= 1"
                class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <lucide-icon [img]="Minus" [size]="16" />
              </button>
              <span class="w-8 text-center font-semibold text-slate-900 dark:text-slate-100">
                {{ guests().adults }}
              </span>
              <button
                type="button"
                (click)="incrementAdults()"
                [disabled]="guests().adults >= 10"
                class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <lucide-icon [img]="Plus" [size]="16" />
              </button>
            </div>
          </div>

          <!-- Children -->
          <div class="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <div class="font-semibold text-slate-900 dark:text-slate-100">الأطفال</div>
              <div class="text-sm text-slate-500 dark:text-slate-400">من 0 إلى 17 سنة</div>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="decrementChildren()"
                [disabled]="guests().children <= 0"
                class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <lucide-icon [img]="Minus" [size]="16" />
              </button>
              <span class="w-8 text-center font-semibold text-slate-900 dark:text-slate-100">
                {{ guests().children }}
              </span>
              <button
                type="button"
                (click)="incrementChildren()"
                [disabled]="guests().children >= 10"
                class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <lucide-icon [img]="Plus" [size]="16" />
              </button>
            </div>
          </div>

          <!-- Rooms -->
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-semibold text-slate-900 dark:text-slate-100">الغرف</div>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="decrementRooms()"
                [disabled]="guests().rooms <= 1"
                class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <lucide-icon [img]="Minus" [size]="16" />
              </button>
              <span class="w-8 text-center font-semibold text-slate-900 dark:text-slate-100">
                {{ guests().rooms }}
              </span>
              <button
                type="button"
                (click)="incrementRooms()"
                [disabled]="guests().rooms >= 10"
                class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <lucide-icon [img]="Plus" [size]="16" />
              </button>
            </div>
          </div>

          <!-- Done Button -->
          <button
            type="button"
            (click)="applySelection()"
            class="w-full btn-primary mt-4"
          >
            تطبيق
          </button>
        </div>
      }
    </div>
  `,
  host: {
    '(document:click)': 'onClickOutside($event)'
  }
})
export class GuestSelectorComponent {
  @Input() initialGuests: GuestSelection = { adults: 2, children: 0, rooms: 1 };
  @Output() guestsChange = new EventEmitter<GuestSelection>();

  readonly Users = Users;
  readonly Minus = Minus;
  readonly Plus = Plus;

  guests = signal<GuestSelection>(this.initialGuests);
  isOpen = signal(false);

  ngOnInit() {
    this.guests.set(this.initialGuests);
  }

  get guestSummary(): string {
    const g = this.guests();
    const parts: string[] = [];

    parts.push(`${g.adults} بالغ`);
    if (g.children > 0) {
      parts.push(`${g.children} طفل`);
    }
    parts.push(`${g.rooms} غرفة`);

    return parts.join('، ');
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  incrementAdults(): void {
    this.guests.update(g => ({ ...g, adults: Math.min(g.adults + 1, 10) }));
  }

  decrementAdults(): void {
    this.guests.update(g => ({ ...g, adults: Math.max(g.adults - 1, 1) }));
  }

  incrementChildren(): void {
    this.guests.update(g => ({ ...g, children: Math.min(g.children + 1, 10) }));
  }

  decrementChildren(): void {
    this.guests.update(g => ({ ...g, children: Math.max(g.children - 1, 0) }));
  }

  incrementRooms(): void {
    this.guests.update(g => ({ ...g, rooms: Math.min(g.rooms + 1, 10) }));
  }

  decrementRooms(): void {
    this.guests.update(g => ({ ...g, rooms: Math.max(g.rooms - 1, 1) }));
  }

  applySelection(): void {
    this.guestsChange.emit(this.guests());
    this.isOpen.set(false);
  }

  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-guest-selector')) {
      this.isOpen.set(false);
    }
  }
}
