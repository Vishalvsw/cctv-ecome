
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Products', path: '/admin/products' },
        { name: 'Orders', path: '/admin/orders' },
        { name: 'Customers', path: '/admin/customers' },
        { name: 'Technicians', path: '/admin/technicians' },
        { name: 'Coupons', path: '/admin/coupons' },
    ];
    
    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
            <nav className="flex-grow p-4">
                <ul>
                    {navItems.map(item => (
                        <li key={item.name}>
                            <Link 
                                to={item.path} 
                                className={`block py-2 px-4 rounded-md transition-colors ${
                                    location.pathname === item.path 
                                    ? 'bg-blue-600' 
                                    : 'hover:bg-gray-700'
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <Link to="/" className="block text-center py-2 px-4 rounded-md bg-gray-600 hover:bg-gray-500 mb-2">Back to Shop</Link>
                <button onClick={logout} className="w-full py-2 px-4 rounded-md bg-red-600 hover:bg-red-700">Logout</button>
            </div>
        </aside>
    );
};


const AdminLayout: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4">
                    <h1 className="text-xl font-semibold">Welcome, {user?.name}!</h1>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;