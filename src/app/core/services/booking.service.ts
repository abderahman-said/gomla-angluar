import { Injectable, signal, computed } from '@angular/core';
import { Booking } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private readonly STORAGE_KEY = 'hotel_bookings';

    // Current booking in progress (for checkout flow)
    private _currentBooking = signal<Partial<Booking> | null>(null);
    currentBooking = this._currentBooking.asReadonly();

    // All user bookings
    private _bookings = signal<Booking[]>(this.loadBookingsFromStorage());
    bookings = this._bookings.asReadonly();

    // Computed: upcoming bookings
    upcomingBookings = computed(() => {
        const now = new Date();
        return this._bookings().filter(b =>
            b.status === 'confirmed' && new Date(b.checkIn) > now
        );
    });

    // Computed: past bookings
    pastBookings = computed(() => {
        const now = new Date();
        return this._bookings().filter(b =>
            new Date(b.checkOut) < now
        );
    });

    /**
     * Start a new booking (called from hotel details page)
     */
    startBooking(bookingData: Partial<Booking>): void {
        this._currentBooking.set(bookingData);
    }

    /**
     * Update current booking (during checkout)
     */
    updateCurrentBooking(updates: Partial<Booking>): void {
        const current = this._currentBooking();
        if (current) {
            this._currentBooking.set({ ...current, ...updates });
        }
    }

    /**
     * Complete booking and save it
     */
    confirmBooking(bookingData: Booking): Booking {
        const booking: Booking = {
            ...bookingData,
            id: this.generateBookingId(),
            status: 'confirmed',
            createdAt: new Date()
        };

        // Add to bookings list
        this._bookings.update(bookings => [...bookings, booking]);

        // Save to localStorage
        this.saveBookingsToStorage(this._bookings());

        // Clear current booking
        this._currentBooking.set(null);

        return booking;
    }

    /**
     * Get booking by ID
     */
    getBookingById(id: string): Booking | undefined {
        return this._bookings().find(b => b.id === id);
    }

    /**
     * Cancel a booking
     */
    cancelBooking(id: string): boolean {
        const booking = this.getBookingById(id);
        if (!booking) return false;

        this._bookings.update(bookings =>
            bookings.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b)
        );

        this.saveBookingsToStorage(this._bookings());
        return true;
    }

    /**
     * Clear current booking (e.g., user navigates away)
     */
    clearCurrentBooking(): void {
        this._currentBooking.set(null);
    }

    /**
     * Calculate total nights
     */
    calculateNights(checkIn: Date, checkOut: Date): number {
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Calculate total price
     */
    calculateTotalPrice(pricePerNight: number, checkIn: Date, checkOut: Date): number {
        const nights = this.calculateNights(checkIn, checkOut);
        return pricePerNight * nights;
    }

    private generateBookingId(): string {
        return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    private loadBookingsFromStorage(): Booking[] {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const bookings = JSON.parse(stored);
                // Convert date strings back to Date objects
                return bookings.map((b: any) => ({
                    ...b,
                    checkIn: new Date(b.checkIn),
                    checkOut: new Date(b.checkOut),
                    createdAt: new Date(b.createdAt)
                }));
            }
        } catch (error) {
            console.error('Error loading bookings from storage:', error);
        }
        return [];
    }

    private saveBookingsToStorage(bookings: Booking[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
        } catch (error) {
            console.error('Error saving bookings to storage:', error);
        }
    }
}
