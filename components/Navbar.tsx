import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { UserRole } from '../types';

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">DIGITAL BHARATH</Link>
        <div className="flex items-center space-x-6">
          <Link to="/shop" className="text-gray-600 hover:text-blue-600">Shop</Link>
          <Link to="/track-order" className="text-gray-600 hover:text-blue-600">Track Order</Link>
          
          <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
          {user && user.role === UserRole.ADMIN && (
            <Link to="/admin/dashboard" className="text-purple-600 font-semibold hover:text-purple-800">Admin Panel</Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
            <ShoppingCartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
            )}
          </Link>
          {user ? (
            <>
              <span className="text-gray-700">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;