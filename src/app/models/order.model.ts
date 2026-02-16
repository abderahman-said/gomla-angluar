import { User, Address } from './user.model';
import { Product } from './product.model';

export interface Order {
  id: string;
  orderNumber: string;
  customer: User;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shipping: ShippingInfo;
  billing: BillingInfo;
  pricing: OrderPricing;
  notes?: string;
  internalNotes?: string;
  documents: OrderDocument[];
  tracking: OrderTracking[];
  timeline: OrderTimeline[];
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
  tax: number;
  notes?: string;
  status: OrderItemStatus;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  RETURNED = 'returned'
}

export enum OrderItemStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  RETURNED = 'returned'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export interface ShippingInfo {
  method: ShippingMethod;
  address: Address;
  cost: number;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  instructions?: string;
}

export enum ShippingMethod {
  STANDARD = 'standard',
  EXPRESS = 'express',
  OVERNIGHT = 'overnight',
  PICKUP = 'pickup',
  FREIGHT = 'freight'
}

export interface BillingInfo {
  address: Address;
  method: PaymentMethod;
  transactionId?: string;
  gateway?: string;
  cardLast4?: string;
  bankAccount?: string;
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'cash_on_delivery',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  CHECK = 'check',
  DIGITAL_WALLET = 'digital_wallet'
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  taxBreakdown: TaxBreakdown[];
}

export interface TaxBreakdown {
  name: string;
  rate: number;
  amount: number;
}

export interface OrderDocument {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export enum DocumentType {
  INVOICE = 'invoice',
  RECEIPT = 'receipt',
  SHIPPING_LABEL = 'shipping_label',
  PACKING_SLIP = 'packing_slip',
  RETURN_LABEL = 'return_label',
  CUSTOMS_DECLARATION = 'customs_declaration',
  CERTIFICATE_OF_ORIGIN = 'certificate_of_origin'
}

export interface OrderTracking {
  id: string;
  status: OrderStatus;
  location?: string;
  description: string;
  descriptionAr?: string;
  timestamp: Date;
  updatedBy?: string;
}

export interface OrderTimeline {
  id: string;
  event: TimelineEvent;
  description: string;
  descriptionAr?: string;
  timestamp: Date;
  user?: string;
  metadata?: Record<string, any>;
}

export enum TimelineEvent {
  ORDER_CREATED = 'order_created',
  ORDER_CONFIRMED = 'order_confirmed',
  PAYMENT_RECEIVED = 'payment_received',
  ORDER_PROCESSING = 'order_processing',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_CANCELLED = 'order_cancelled',
  ORDER_RETURNED = 'order_returned',
  PAYMENT_FAILED = 'payment_failed',
  PAYMENT_REFUNDED = 'payment_refunded'
}

export interface OrderFilter {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  customer?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  totalRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
  revenueByStatus: Record<OrderStatus, number>;
  topCustomers: {
    customer: User;
    orders: number;
    revenue: number;
  }[];
  topProducts: {
    product: Product;
    quantity: number;
    revenue: number;
  }[];
}
