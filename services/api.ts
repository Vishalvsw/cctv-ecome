import { Product, Order, User, UserRole, OrderStatus, Coupon, Technician } from '../types';

// --- MOCK DATABASE ---

const products: Product[] = [
  { id: '1', name: 'HD Dome Security Camera', description: 'A discreet, vandal-proof dome camera perfect for indoor and outdoor surveillance. 1080p resolution.', price: 150, stock: 25, category: 'Dome Cameras', imageUrls: ['images/product1.jpg', 'https://picsum.photos/seed/domecam1/800/600', 'https://picsum.photos/seed/domecam2/800/600', 'https://picsum.photos/seed/domecam3/800/600'] },
  { id: '2', name: 'Outdoor Bullet Camera', description: 'Weatherproof bullet camera with night vision. A visible deterrent for intruders.', price: 180, stock: 30, category: 'Bullet Cameras', imageUrls: ['images/product2.jpg', 'https://picsum.photos/seed/bulletcam1/800/600', 'https://picsum.photos/seed/bulletcam2/800/600'] },
  { id: '3', name: 'PTZ (Pan-Tilt-Zoom) Camera', description: 'Cover large areas with a single camera. Remote directional and zoom control.', price: 450, stock: 15, category: 'PTZ Cameras', imageUrls: ['images/product3.jpg', 'https://picsum.photos/seed/ptzcam1/800/600', 'https://picsum.photos/seed/ptzcam2/800/600', 'https://picsum.photos/seed/ptzcam3/800/600', 'https://picsum.photos/seed/ptzcam4/800/600'] },
  { id: '4', name: 'Wireless Smart Camera', description: 'Easy to install wireless camera with app integration and two-way audio.', price: 120, stock: 50, category: 'Wireless Cameras', imageUrls: ['images/product4.jpg', 'https://picsum.photos/seed/wirelesscam1/800/600'] },
  { id: '5', name: '4K Ultra HD IP Camera', description: 'Capture crystal-clear video with 4K resolution. Connects to your network for remote viewing.', price: 350, stock: 20, category: 'IP Cameras', imageUrls: ['https://picsum.photos/seed/4kcam1/800/600', 'https://picsum.photos/seed/4kcam2/800/600'] },
  { id: '6', name: 'Professional Box Camera', description: 'A versatile box camera with interchangeable lenses for professional-grade security.', price: 600, stock: 10, category: 'Box Cameras', imageUrls: ['https://picsum.photos/seed/boxcam1/800/600'] },
  { id: '7', name: 'Day/Night Vision Camera', description: 'High-performance camera that provides clear images in both daylight and complete darkness.', price: 220, stock: 40, category: 'Specialty Cameras', imageUrls: ['https://picsum.photos/seed/nightcam1/800/600', 'https://picsum.photos/seed/nightcam2/800/600'] },
  { id: '8', name: '360° Fisheye Camera', description: 'Get a complete panoramic view with no blind spots. Ideal for wide open areas.', price: 380, stock: 18, category: 'Specialty Cameras', imageUrls: ['https://picsum.photos/seed/fisheyecam1/800/600', 'https://picsum.photos/seed/fisheyecam2/800/600', 'https://picsum.photos/seed/fisheyecam3/800/600'] },
];

const users: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: UserRole.CUSTOMER },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: UserRole.CUSTOMER },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: UserRole.CUSTOMER },
    { id: '4', name: 'Admin User', email: 'admin@example.com', role: UserRole.ADMIN },
];

const technicians: Technician[] = [
    { id: 'T1', name: 'Mike Ross', contact: '555-0101' },
    { id: 'T2', name: 'Harvey Specter', contact: '555-0102' },
    { id: 'T3', name: 'Jessica Pearson', contact: '555-0103' },
];

const orders: Order[] = [
    { id: '101', customerId: '1', customerName: 'Alice Johnson', items: [{...products[0], quantity: 1}], total: 1150, status: OrderStatus.COMPLETED, date: '2023-10-15', shippingAddress: '123 Maple St, Springfield', technicianId: 'T1', technicianName: 'Mike Ross', installationDate: '2023-10-18', installationNotes: 'Customer requested camera to cover the front porch.', installationImages: ['https://picsum.photos/seed/install1/400/300', 'https://picsum.photos/seed/install2/400/300'], customerFeedback: 'Great service, very professional.' },
    { id: '102', customerId: '2', customerName: 'Bob Smith', items: [{...products[2], quantity: 1}, {...products[3], quantity: 2}], total: 690, status: OrderStatus.INSTALLATION_SCHEDULED, date: '2023-10-18', shippingAddress: '456 Oak Ave, Metropolis', technicianId: 'T2', technicianName: 'Harvey Specter', installationDate: '2023-10-25' },
    { id: '103', customerId: '1', customerName: 'Alice Johnson', items: [{...products[1], quantity: 4}], total: 720, status: OrderStatus.SHIPPED, date: '2023-10-20', shippingAddress: '123 Maple St, Springfield' },
    { id: '104', customerId: '3', customerName: 'Charlie Brown', items: [{...products[4], quantity: 1}], total: 350, status: OrderStatus.PROCESSING, date: '2023-10-21', shippingAddress: '789 Pine Ln, Gotham' },
    { id: '105', customerId: '2', customerName: 'Bob Smith', items: [{...products[7], quantity: 2}], total: 440, status: OrderStatus.PENDING, date: '2023-10-22', shippingAddress: '456 Oak Ave, Metropolis' },
];

const coupons: Coupon[] = [
    { id: 'c1', code: 'SUMMER20', discount: 20, expiry: '2024-08-31', isActive: true },
    { id: 'c2', code: 'WINTERSALE', discount: 15, expiry: '2024-12-31', isActive: true },
    { id: 'c3', code: 'EXPIRED10', discount: 10, expiry: '2023-01-01', isActive: false },
];


// --- MOCK API FUNCTIONS ---

const simulateDelay = <T>(data: T, delay: number = 500): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

export const getProducts = (): Promise<Product[]> => simulateDelay([...products]);
export const getProductById = (id: string): Promise<Product | undefined> => simulateDelay(products.find(p => p.id === id));
export const getOrders = (): Promise<Order[]> => simulateDelay([...orders]);
export const getOrderById = (id: string): Promise<Order | undefined> => simulateDelay(orders.find(o => o.id === id));
export const getUsers = (): Promise<User[]> => simulateDelay([...users]);
export const getTechnicians = (): Promise<Technician[]> => simulateDelay([...technicians]);
export const getCoupons = (): Promise<Coupon[]> => simulateDelay([...coupons]);
export const getDashboardData = () => {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const newCustomers = users.filter(u => u.role === UserRole.CUSTOMER).length;
    const salesData = [
        { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 5000 }, { name: 'Apr', sales: 4500 },
        { name: 'May', sales: 6000 }, { name: 'Jun', sales: 5500 },
    ];
    const customerData = [
        { name: 'Jan', customers: 10 }, { name: 'Feb', customers: 15 },
        { name: 'Mar', customers: 12 }, { name: 'Apr', customers: 20 },
        { name: 'May', customers: 25 }, { name: 'Jun', customers: 22 },
    ];
    return simulateDelay({
        totalSales,
        totalOrders: orders.length,
        newCustomers,
        salesData,
        customerData,
    });
}