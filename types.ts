export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  purchaseHistory?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrls: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
    PENDING = 'Pending',
    PROCESSING = 'Processing',
    SHIPPED = 'Shipped',
    INSTALLATION_SCHEDULED = 'Installation Scheduled',
    DELIVERED = 'Delivered', // Physical delivery of product
    COMPLETED = 'Completed', // Installation is done
    CANCELLED = 'Cancelled',
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  shippingAddress: string;
  // New fields for installation and service management
  technicianId?: string;
  technicianName?: string;
  installationDate?: string;
  installationNotes?: string;
  installationImages?: string[];
  customerFeedback?: string;
}

export interface Coupon {
    id: string;
    code: string;
    discount: number; // percentage
    expiry: string;
    isActive: boolean;
}

export interface Technician {
    id: string;
    name: string;
    contact: string;
}