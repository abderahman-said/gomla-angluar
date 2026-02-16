export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  businessName?: string;
  businessLicense?: string;
  taxId?: string;
  address: Address;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export enum UserRole {
  ADMIN = 'admin',
  IMPORTER = 'importer',
  MANUFACTURER = 'manufacturer',
  RETAILER = 'retailer',
  WHOLESALER = 'wholesaler'
}

export interface UserProfile {
  id: string;
  user: User;
  avatar?: string;
  bio?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  businessInfo: {
    type: BusinessType;
    categories: string[];
    minOrderValue: number;
    deliveryAreas: string[];
  };
}

export enum BusinessType {
  HOME_GOODS = 'home_goods',
  FURNITURE = 'furniture',
  ELECTRONICS = 'electronics',
  GENERAL = 'general'
}
