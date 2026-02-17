// Hotel Booking Platform Models

export interface Location {
    address: string;
    city: string;
    country: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface Hotel {
    id: string;
    name: string;
    description: string;
    location: Location;
    starRating: 1 | 2 | 3 | 4 | 5;
    guestRating: number; // 0-10
    reviewCount: number;
    images: string[];
    amenities: string[];
    rooms: Room[];
    priceFrom: number; // Starting price per night
    featured?: boolean;
    popularDestination?: boolean;
}

export interface Room {
    id: string;
    hotelId: string;
    type: string; // e.g., "Standard Double", "Deluxe Suite"
    description: string;
    price: number; // Per night
    capacity: {
        adults: number;
        children: number;
    };
    size: number; // Square meters
    bedType: string; // e.g., "King Bed", "2 Single Beds"
    amenities: string[];
    images: string[];
    available: boolean;
}

export interface SearchCriteria {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    guests: {
        adults: number;
        children: number;
        rooms: number;
    };
}

export interface HotelFilter {
    priceRange?: {
        min: number;
        max: number;
    };
    starRating?: number[];
    guestRating?: number; // Minimum rating
    amenities?: string[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'popularity';

export interface Booking {
    id: string;
    userId: string;
    hotel: Hotel;
    room: Room;
    checkIn: Date;
    checkOut: Date;
    guests: {
        adults: number;
        children: number;
    };
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    guestInfo: GuestInfo;
    createdAt: Date;
}

export interface GuestInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
}

export interface Review {
    id: string;
    hotelId: string;
    userId: string;
    userName: string;
    rating: number; // 0-10
    comment: string;
    date: Date;
    helpful: number; // Number of users who found it helpful
}

export interface Destination {
    id: string;
    name: string;
    country: string;
    image: string;
    hotelCount: number;
    popular?: boolean;
}
