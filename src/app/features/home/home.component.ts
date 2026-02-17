import { Component, OnInit, signal, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, MapPin, Star, Calendar, Users, Check, Heart, Hotel as HotelIcon } from 'lucide-angular';
import { Hotel, Destination, SearchCriteria } from '../../models';
import { HotelService } from '../../core/services/hotel.service';
import { HotelCardComponent } from '../../shared/components/hotel-card/hotel-card.component';
import { GuestSelectorComponent, GuestSelection } from '../../shared/components/guest-selector/guest-selector.component';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

// Custom Date Adapter for better date formatting
export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'dateInput') {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    }
    return super.format(date, displayFormat);
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HotelCardComponent,
    LucideAngularModule,
    // Angular Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    GuestSelectorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  loaded = signal(false);
  featuredHotels = signal<Hotel[]>([]);
  popularDestinations = signal<Destination[]>([]);
  searchCriteria = signal<SearchCriteria | null>(null);

  readonly Search = Search;
  readonly MapPin = MapPin;
  readonly Star = Star;
  readonly Calendar = Calendar;
  readonly Users = Users;
  readonly Check = Check;
  readonly Heart = Heart;
  readonly Hotel = HotelIcon;

  // ViewChild references for tree animation
  @ViewChild('treeWrap') treeWrap!: ElementRef;
  @ViewChild('treeSvg') treeSvg!: ElementRef;
  @ViewChild('hub') hub!: ElementRef;
  @ViewChild('cardsGrid') cardsGrid!: ElementRef;
  @ViewChild('card0') card0!: ElementRef;
  @ViewChild('card1') card1!: ElementRef;
  @ViewChild('card2') card2!: ElementRef;
  @ViewChild('card3') card3!: ElementRef;

  // Form data
  destination = '';
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  guestsAndRooms = signal<GuestSelection>({ adults: 2, children: 0, rooms: 1 });

  // Filter options
  isWorkTrip = signal(false);
  hasSpecialRates = signal(false);
  hasFreeCancellation = signal(false);

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadData();
    setTimeout(() => this.loaded.set(true), 100);
  }

  ngAfterViewInit(): void {
    this.startCounters();
    this.initializeTreeAnimation();
  }

  // Draw SVG lines from hub to each card
  private drawTreeLines(): void {
    if (!this.treeWrap || !this.treeSvg || !this.hub) return;

    const svg = this.treeSvg.nativeElement;
    const hub = this.hub.nativeElement;
    const cards = [this.card0, this.card1, this.card2, this.card3]
      .map(cardRef => cardRef?.nativeElement)
      .filter(Boolean);

    // Clear existing lines
    svg.innerHTML = '';

    const wrapRect = this.treeWrap.nativeElement.getBoundingClientRect();
    const hubRect = hub.getBoundingClientRect();

    // Hub center relative to wrap
    const hx = hubRect.left - wrapRect.left + hubRect.width / 2;
    const hy = hubRect.top - wrapRect.top + hubRect.height / 2;

    cards.forEach(card => {
      const cr = card.getBoundingClientRect();
      // Top-center of card
      const cx = cr.left - wrapRect.left + cr.width / 2;
      const cy = cr.top - wrapRect.top;

      // Create curved path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const midX = (hx + cx) / 2;
      const midY = (hy + cy) / 2;
      path.setAttribute('d', `M ${hx} ${hy} C ${hx} ${midY}, ${cx} ${hy}, ${cx} ${cy}`);
      path.setAttribute('stroke', '#f6c842');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-dasharray', '6 4');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.7');

      svg.appendChild(path);
    });
  }

  // Initialize tree animation with resize listener
  private initializeTreeAnimation(): void {
    // Wait for fonts and layout
    setTimeout(() => {
      this.drawTreeLines();
    }, 100);

    // Add resize listener
    window.addEventListener('resize', () => {
      this.drawTreeLines();
    });
  }

  private startCounters(): void {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const countUp = (counter: HTMLElement) => {
      const target = +counter.getAttribute('data-target')!;
      const count = +counter.innerText.replace(/[^0-9]/g, '');
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(() => countUp(counter), 10);
      } else {
        if (target >= 1000000) {
          counter.innerText = (target / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
          counter.innerText = (target / 1000).toFixed(0) + 'K+';
        } else {
          counter.innerText = target.toLocaleString() + '+';
        }
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  private loadData(): void {
    this.hotelService.getFeaturedHotels().subscribe(hotels => {
      this.featuredHotels.set(hotels);
    });

    this.hotelService.getPopularDestinations().subscribe(destinations => {
      this.popularDestinations.set(destinations);
    });
  }

  onSearch(criteria: SearchCriteria): void {
    this.searchCriteria.set(criteria);
    // Navigate to hotels listing page with search parameters
    this.router.navigate(['/hotels'], {
      queryParams: {
        destination: criteria.destination,
        checkIn: criteria.checkIn.toISOString().split('T')[0],
        checkOut: criteria.checkOut.toISOString().split('T')[0],
        adults: criteria.guests.adults,
        children: criteria.guests.children,
        rooms: criteria.guests.rooms
      }
    });
  }

  onDestinationClick(destination: Destination): void {
    this.router.navigate(['/hotels'], {
      queryParams: {
        destination: destination.name
      }
    });
  }

  // Hero search form data
  guests = { adults: 2, children: 0, rooms: 1 };

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get tomorrow(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  get dayAfterTomorrow(): string {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter.toISOString().split('T')[0];
  }

  get minCheckOutDate(): Date {
    return this.checkInDate || new Date();
  }

  // Date range display
  get dateRangeDisplay(): string {
    if (!this.checkInDate && !this.checkOutDate) {
      return 'Select dates';
    }

    if (this.checkInDate && !this.checkOutDate) {
      return this.formatDate(this.checkInDate) + ' → ?';
    }

    if (this.checkInDate && this.checkOutDate) {
      return this.formatDate(this.checkInDate) + ' → ' + this.formatDate(this.checkOutDate);
    }

    return 'Select dates';
  }

  // Format date for display
  private formatDate(date: Date): string {
    if (!date) return '';

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  onQuickSearch(): void {
    if (!this.destination) return;

    const criteria: SearchCriteria = {
      destination: this.destination,
      checkIn: this.checkInDate || new Date(),
      checkOut: this.checkOutDate || new Date(),
      guests: this.guestsAndRooms()
    };

    this.onSearch(criteria);
  }

  onGuestChange(selection: GuestSelection): void {
    this.guestsAndRooms.set(selection);
  }

  toggleFilter(filter: 'work' | 'rates' | 'cancellation'): void {
    if (filter === 'work') this.isWorkTrip.update(v => !v);
    if (filter === 'rates') this.hasSpecialRates.update(v => !v);
    if (filter === 'cancellation') this.hasFreeCancellation.update(v => !v);
  }

  // Quick date selection methods
  setQuickDates(type: string): void {
    const today = new Date();
    const checkIn = new Date(today);
    const checkOut = new Date(today);

    switch (type) {
      case 'tonight':
        // Check-in: today, Check-out: tomorrow
        checkOut.setDate(checkOut.getDate() + 1);
        break;
      case 'tomorrow':
        // Check-in: tomorrow, Check-out: day after tomorrow
        checkIn.setDate(checkIn.getDate() + 1);
        checkOut.setDate(checkOut.getDate() + 2);
        break;
      case 'weekend':
        // Find next Friday to Sunday
        const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7;
        checkIn.setDate(today.getDate() + daysUntilFriday);
        checkOut.setDate(checkIn.getDate() + 2); // Sunday
        break;
      case 'week':
        // Next week for 7 days
        const startOfNextWeek = today.getDate() + (7 - today.getDay() + 1);
        checkIn.setDate(startOfNextWeek);
        checkOut.setDate(checkIn.getDate() + 7);
        break;
      case 'month':
        // Next month for 3 days
        checkIn.setMonth(checkIn.getMonth() + 1);
        checkIn.setDate(1);
        checkOut.setDate(checkIn.getDate() + 3);
        break;
    }

    this.checkInDate = checkIn;
    this.checkOutDate = checkOut;
  }

  // Stats data
  stats = [
    { val: '2M+', label: 'Guests' },
    { val: '150K+', label: 'Hotels' },
    { val: '120+', label: 'Countries' },
    { val: '4.8★', label: 'Average Rating' }
  ];

  // Promotions
  promotions = [
    {
      title: 'Summer Sale',
      description: 'Up to 50% off on beach resorts',
      discount: '50%',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'City Breaks',
      description: 'Save 30% on urban hotels',
      discount: '30%',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Romantic Getaways',
      description: 'Special packages for couples',
      discount: '25%',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    }
  ];
}
