import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MapPin, SlidersHorizontal, ArrowUpDown, Grid, List, Star } from 'lucide-angular';
import { Hotel, HotelFilter, SortOption, SearchCriteria } from '../../models';
import { HotelService } from '../../core/services/hotel.service';
import { HotelCardComponent } from '../../shared/components/hotel-card/hotel-card.component';
import { FiltersSidebarComponent } from '../../shared/components/filters-sidebar/filters-sidebar.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HotelCardComponent,
    FiltersSidebarComponent,
    SkeletonLoaderComponent,
    LucideAngularModule
  ],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {
  hotels = signal<Hotel[]>([]);
  loading = signal(true);
  totalCount = signal(0);
  currentPage = signal(1);
  totalPages = signal(0);
  hasMore = signal(false);

  // Filters and sorting
  filters = signal<HotelFilter>({});
  sortBy = signal<SortOption>('popularity');
  viewMode = signal<'grid' | 'list'>('grid');

  // Search parameters from query params
  destination = '';
  checkIn = '';
  checkOut = '';
  adults = 2;
  children = 0;
  rooms = 1;

  readonly MapPin = MapPin;
  readonly SlidersHorizontal = SlidersHorizontal;
  readonly ArrowUpDown = ArrowUpDown;
  readonly Grid = Grid;
  readonly List = List;
  readonly Star = Star;
  readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Guest Rating' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' }
  ];

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.parseQueryParams();
    this.loadHotels();
  }

  private parseQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      this.destination = params['destination'] || '';
      this.checkIn = params['checkIn'] || '';
      this.checkOut = params['checkOut'] || '';
      this.adults = parseInt(params['adults']) || 2;
      this.children = parseInt(params['children']) || 0;
      this.rooms = parseInt(params['rooms']) || 1;
    });
  }

  private loadHotels(): void {
    this.loading.set(true);
    
    const searchCriteria: SearchCriteria = {
      destination: this.destination,
      checkIn: this.checkIn ? new Date(this.checkIn) : new Date(),
      checkOut: this.checkOut ? new Date(this.checkOut) : new Date(Date.now() + 24 * 60 * 60 * 1000),
      guests: {
        adults: this.adults,
        children: this.children,
        rooms: this.rooms
      }
    };

    this.hotelService.searchHotels(searchCriteria).subscribe(hotels => {
      // Apply additional filters and sorting
      let filteredHotels = hotels;
      
      // Apply filters
      if (this.filters().priceRange) {
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.priceFrom >= (this.filters().priceRange?.min || 0) && 
          hotel.priceFrom <= (this.filters().priceRange?.max || 9999)
        );
      }
      
      if (this.filters().starRating?.length) {
        filteredHotels = filteredHotels.filter(hotel => 
          this.filters().starRating!.includes(hotel.starRating)
        );
      }
      
      if (this.filters().guestRating) {
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.guestRating >= this.filters().guestRating!
        );
      }

      // Apply sorting
      this.hotelService.getHotels(this.filters(), this.sortBy()).subscribe(sortedHotels => {
        this.hotels.set(sortedHotels);
        this.totalCount.set(sortedHotels.length);
        this.totalPages.set(Math.ceil(sortedHotels.length / 12));
        this.loading.set(false);
      });
    });
  }

  onFiltersChange(newFilters: HotelFilter): void {
    this.filters.set(newFilters);
    this.currentPage.set(1);
    this.loadHotels();
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortBy.set(select.value as SortOption);
    this.currentPage.set(1);
    this.loadHotels();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadHotels();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }

  onHotelClick(hotel: Hotel): void {
    this.router.navigate(['/hotels', hotel.id]);
  }

  // Computed properties for template
  searchSummary = computed(() => {
    if (!this.destination) return 'All Hotels';
    return `Hotels in ${this.destination}`;
  });

  resultCount = computed(() => {
    const count = this.totalCount();
    return `${count} ${count === 1 ? 'Hotel' : 'Hotels'} Found`;
  });

  showNoResults = computed(() => {
    return !this.loading() && this.hotels().length === 0;
  });

  showResults = computed(() => {
    return !this.loading() && this.hotels().length > 0;
  });

  // Pagination helpers
  getPages(): number[] {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // ellipsis
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // ellipsis
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // ellipsis
        pages.push(total);
      }
    }

    return pages;
  }

  getStarArray(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index);
  }
}
