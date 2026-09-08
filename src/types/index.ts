export type ProductCategory = 'Herbs' | 'Dry Fruits' | 'Remedies' | 'Nuts' | 'Seeds' | 'Powders';

export interface ProductVariant {
  weight: string; // e.g. '250g', '500g', '1kg'
  price: number;
  originalPrice?: number;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  subtitle: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  weight: string;
  variants: ProductVariant[];
  images: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  stock: number;
  sku: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  organicCertified?: boolean;
}

export interface CategoryInfo {
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export type OrderStatus = 'Ordered' | 'Confirmed' | 'Processing' | 'Packed' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface TimelineStep {
  status: OrderStatus;
  date: string;
  time?: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantWeight: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string; // e.g., 'ASH10023'
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'Razorpay' | 'UPI' | 'Card' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: OrderStatus;
  timeline: TimelineStep[];
  trackingNumber?: string;
  courierName?: string;
  whatsAppNotificationsEnabled: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  whatsAppVerified: boolean;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  avatar: string;
  recentWishlistCount: number;
  communicationLogs: {
    id: string;
    type: 'WhatsApp' | 'Email' | 'SMS';
    message: string;
    timestamp: string;
    status: 'Sent' | 'Delivered' | 'Read';
  }[];
}

export interface InventoryBatch {
  id: string;
  batchNumber: string;
  productId: string;
  productName: string;
  weight: string;
  quantityAdded: number;
  manufactureDate: string;
  expiryDate: string;
  supplier: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userLocation: string;
  verifiedPurchase: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  weights: string[];
  ratings: number[];
  inStockOnly: boolean;
  organicOnly: boolean;
  sortBy: 'featured' | 'price-low-high' | 'price-high-low' | 'rating' | 'newest';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
