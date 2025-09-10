
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';

const CartPage: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">Your cart is empty.</p>
                        <Link to="/shop" className="mt-4 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between border-b py-4">
                                    <div className="flex items-center gap-4">
                                        <img src={item.imageUrls[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-gray-600">INR {item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="w-16 p-2 border border-gray-300 rounded-md text-center"
                                        />
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                            Remove
                                        </button>
                                    </div>
                                    <div className="font-semibold text-lg">
                                        INR {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>INR {cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span>Shipping</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl border-t pt-4">
                                <span>Total</span>
                                <span>INR {cartTotal.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout">
                                <button className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;