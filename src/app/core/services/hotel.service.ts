import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Hotel, HotelFilter, SearchCriteria, SortOption, Destination } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    private mockHotels: Hotel[] = this.generateMockHotels();
    private mockDestinations: Destination[] = this.generateMockDestinations();

    /**
     * Get all hotels with optional filtering and sorting
     */
    getHotels(filters?: HotelFilter, sort?: SortOption): Observable<Hotel[]> {
        let hotels = [...this.mockHotels];

        // Apply filters
        if (filters) {
            hotels = this.applyFilters(hotels, filters);
        }

        // Apply sorting
        if (sort) {
            hotels = this.applySorting(hotels, sort);
        }

        // Simulate API delay
        return of(hotels).pipe(delay(500));
    }

    /**
     * Get a single hotel by ID
     */
    getHotelById(id: string): Observable<Hotel | undefined> {
        const hotel = this.mockHotels.find(h => h.id === id);
        return of(hotel).pipe(delay(300));
    }

    /**
     * Get featured hotels for home page
     */
    getFeaturedHotels(): Observable<Hotel[]> {
        const featured = this.mockHotels.filter(h => h.featured).slice(0, 8);
        return of(featured).pipe(delay(400));
    }

    /**
     * Search hotels by criteria
     */
    searchHotels(criteria: SearchCriteria): Observable<Hotel[]> {
        let hotels = this.mockHotels.filter(h =>
            h.location.city.toLowerCase().includes(criteria.destination.toLowerCase()) ||
            h.location.country.toLowerCase().includes(criteria.destination.toLowerCase()) ||
            h.name.toLowerCase().includes(criteria.destination.toLowerCase())
        );

        return of(hotels).pipe(delay(600));
    }

    /**
     * Get popular destinations
     */
    getPopularDestinations(): Observable<Destination[]> {
        return of(this.mockDestinations.filter(d => d.popular)).pipe(delay(300));
    }

    private applyFilters(hotels: Hotel[], filters: HotelFilter): Hotel[] {
        return hotels.filter(hotel => {
            // Price range filter
            if (filters.priceRange) {
                if (hotel.priceFrom < filters.priceRange.min || hotel.priceFrom > filters.priceRange.max) {
                    return false;
                }
            }

            // Star rating filter
            if (filters.starRating && filters.starRating.length > 0) {
                if (!filters.starRating.includes(hotel.starRating)) {
                    return false;
                }
            }

            // Guest rating filter
            if (filters.guestRating) {
                if (hotel.guestRating < filters.guestRating) {
                    return false;
                }
            }

            // Amenities filter
            if (filters.amenities && filters.amenities.length > 0) {
                const hasAllAmenities = filters.amenities.every(amenity =>
                    hotel.amenities.includes(amenity)
                );
                if (!hasAllAmenities) {
                    return false;
                }
            }

            return true;
        });
    }

    private applySorting(hotels: Hotel[], sort: SortOption): Hotel[] {
        const sorted = [...hotels];

        switch (sort) {
            case 'price-asc':
                return sorted.sort((a, b) => a.priceFrom - b.priceFrom);
            case 'price-desc':
                return sorted.sort((a, b) => b.priceFrom - a.priceFrom);
            case 'rating':
                return sorted.sort((a, b) => b.guestRating - a.guestRating);
            case 'popularity':
                return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
            default:
                return sorted;
        }
    }

    private generateMockHotels(): Hotel[] {
        return [
            {
                id: '1',
                name: 'فندق برج العرب',
                description: 'فندق فاخر على شاطئ البحر مع إطلالات خلابة وخدمة من الدرجة الأولى',
                location: {
                    address: 'شارع جميرا',
                    city: 'دبي',
                    country: 'الإمارات العربية المتحدة',
                    coordinates: { lat: 25.141, lng: 55.186 }
                },
                starRating: 5,
                guestRating: 9.2,
                reviewCount: 1543,
                images: [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
                ],
                amenities: ['WiFi مجاني', 'مسبح', 'سبا', 'مطعم', 'موقف سيارات', 'صالة رياضية', 'شاطئ خاص'],
                rooms: [],
                priceFrom: 850,
                featured: true
            },
            {
                id: '2',
                name: 'Luxury Beach Resort',
                description: 'Experience paradise with stunning ocean views and world-class amenities',
                location: {
                    address: '123 Beach Road',
                    city: 'Maldives',
                    country: 'Maldives',
                    coordinates: { lat: 4.175, lng: 73.509 }
                },
                starRating: 5,
                guestRating: 9.5,
                reviewCount: 2341,
                images: [
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'
                ],
                amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access', 'Water Sports'],
                rooms: [],
                priceFrom: 1200,
                featured: true
            },
            {
                id: '3',
                name: 'فندق القاهرة الكبرى',
                description: 'فندق عصري في قلب المدينة مع إطلالة على نهر النيل',
                location: {
                    address: 'كورنيش النيل',
                    city: 'القاهرة',
                    country: 'مصر'
                },
                starRating: 4,
                guestRating: 8.7,
                reviewCount: 876,
                images: [
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
                ],
                amenities: ['WiFi مجاني', 'مسبح على السطح', 'مطعم', 'موقف سيارات'],
                rooms: [],
                priceFrom: 320,
                featured: true
            },
            {
                id: '4',
                name: 'Mountain View Hotel',
                description: 'Cozy mountain retreat with breathtaking alpine views',
                location: {
                    address: 'Alpine Road 45',
                    city: 'Interlaken',
                    country: 'Switzerland'
                },
                starRating: 4,
                guestRating: 9.0,
                reviewCount: 654,
                images: [
                    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
                ],
                amenities: ['Free WiFi', 'Restaurant', 'Ski Storage', 'Parking'],
                rooms: [],
                priceFrom: 450,
                featured: true
            },
            {
                id: '5',
                name: 'فندق الرياض بلازا',
                description: 'فندق أعمال حديث مع مرافق متطورة',
                location: {
                    address: 'طريق الملك فهد',
                    city: 'الرياض',
                    country: 'السعودية'
                },
                starRating: 5,
                guestRating: 8.9,
                reviewCount: 1234,
                images: [
                    'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800'
                ],
                amenities: ['WiFi مجاني', 'مركز أعمال', 'صالة رياضية', 'مطعم', 'موقف سيارات'],
                rooms: [],
                priceFrom: 550,
                featured: true
            },
            {
                id: '6',
                name: 'City Center Hotel',
                description: 'Modern hotel in the heart of the business district',
                location: {
                    address: '789 Downtown Ave',
                    city: 'New York',
                    country: 'USA'
                },
                starRating: 4,
                guestRating: 8.5,
                reviewCount: 2100,
                images: [
                    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
                ],
                amenities: ['Free WiFi', 'Gym', 'Restaurant', 'Bar'],
                rooms: [],
                priceFrom: 280,
                featured: false
            },
            {
                id: '7',
                name: 'فندق مراكش الذهبي',
                description: 'فندق تقليدي مغربي مع حدائق جميلة',
                location: {
                    address: 'المدينة القديمة',
                    city: 'مراكش',
                    country: 'المغرب'
                },
                starRating: 3,
                guestRating: 8.3,
                reviewCount: 432,
                images: [
                    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800'
                ],
                amenities: ['WiFi مجاني', 'حديقة', 'مطعم تقليدي'],
                rooms: [],
                priceFrom: 180,
                featured: false
            },
            {
                id: '8',
                name: 'Seaside Paradise Hotel',
                description: 'Tropical paradise with pristine beaches',
                location: {
                    address: 'Coconut Beach',
                    city: 'Phuket',
                    country: 'Thailand'
                },
                starRating: 5,
                guestRating: 9.3,
                reviewCount: 1876,
                images: [
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
                ],
                amenities: ['Free WiFi', 'Pool', 'Spa', 'Beach Access', 'Restaurant'],
                rooms: [],
                priceFrom: 380,
                featured: true
            }
        ];
    }

    private generateMockDestinations(): Destination[] {
        return [
            {
                id: '1',
                name: 'دبي',
                country: 'الإمارات',
                image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
                hotelCount: 1234,
                popular: true
            },
            {
                id: '2',
                name: 'Paris',
                country: 'France',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
                hotelCount: 2341,
                popular: true
            },
            {
                id: '3',
                name: 'القاهرة',
                country: 'مصر',
                image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600',
                hotelCount: 876,
                popular: true
            },
            {
                id: '4',
                name: 'London',
                country: 'UK',
                image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600',
                hotelCount: 3210,
                popular: true
            },
            {
                id: '5',
                name: 'الرياض',
                country: 'السعودية',
                image: 'https://images.unsplash.com/photo-1556566127-1a1d3e8d6b7f?w=600',
                hotelCount: 654,
                popular: true
            },
            {
                id: '6',
                name: 'Tokyo',
                country: 'Japan',
                image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
                hotelCount: 1987,
                popular: true
            }
        ];
    }
}
