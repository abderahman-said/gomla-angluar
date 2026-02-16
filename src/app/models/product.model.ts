import { Address } from './user.model';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  sku: string;
  barcode?: string;
  category: Category;
  subcategory?: Subcategory;
  brand: string;
  supplier: Supplier;
  images: ProductImage[];
  specifications: ProductSpecification[];
  pricing: ProductPricing;
  inventory: ProductInventory;
  dimensions: ProductDimensions;
  weight: ProductWeight;
  tags: string[];
  status: ProductStatus;
  isActive: boolean;
  isFeatured: boolean;
  rating: ProductRating;
  reviews: ProductReview[];
  seo: ProductSEO;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Subcategory {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  categoryId: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Supplier {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  rating: number;
  isVerified: boolean;
  responseTime: number; // in hours
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  altAr: string;
  isMain: boolean;
  sortOrder: number;
}

export interface ProductSpecification {
  name: string;
  nameAr: string;
  value: string;
  valueAr: string;
  type: SpecificationType;
}

export enum SpecificationType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select'
}

export interface ProductPricing {
  wholesalePrice: number;
  retailPrice: number;
  costPrice: number;
  currency: string;
  discount?: ProductDiscount;
  tax: {
    rate: number;
    included: boolean;
  };
}

export interface ProductDiscount {
  type: DiscountType;
  value: number;
  startDate?: Date;
  endDate?: Date;
  minQuantity?: number;
}

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed'
}

export interface ProductInventory {
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  reorderLevel: number;
  reorderQuantity: number;
  trackQuantity: boolean;
  allowBackorder: boolean;
  locations?: InventoryLocation[];
}

export interface InventoryLocation {
  id: string;
  name: string;
  quantity: number;
  address?: string;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: DimensionUnit;
}

export enum DimensionUnit {
  CM = 'cm',
  INCH = 'inch'
}

export interface ProductWeight {
  value: number;
  unit: WeightUnit;
}

export enum WeightUnit {
  KG = 'kg',
  GRAM = 'gram',
  LB = 'lb'
}

export enum ProductStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued'
}

export interface ProductRating {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  commentAr?: string;
  images?: string[];
  isVerified: boolean;
  helpfulCount: number;
  createdAt: Date;
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
}

export interface ProductFilter {
  categories?: string[];
  subcategories?: string[];
  brands?: string[];
  suppliers?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
  search?: string;
}
