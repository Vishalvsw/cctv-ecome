
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'qrcode'>('card');

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would integrate with a real payment gateway based on paymentMethod
        alert(`Thank you for your order! Your purchase has been completed using ${paymentMethod}.`);
        clearCart();
        navigate('/');
    };
    
    if (cartItems.length === 0) {
        return (
             <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto px-6 py-8 text-center">
                     <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                     <p className="text-xl text-gray-600">Your cart is empty. Nothing to checkout.</p>
                      <Link to="/shop" className="mt-4 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700">
                            Continue Shopping
                        </Link>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-grow container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
                <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipping & Payment Details */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input type="text" placeholder="First Name" required className="p-3 border rounded-md" />
                            <input type="text" placeholder="Last Name" required className="p-3 border rounded-md" />
                            <input type="email" placeholder="Email Address" required className="p-3 border rounded-md md:col-span-2" />
                            <input type="text" placeholder="Address" required className="p-3 border rounded-md md:col-span-2" />
                            <input type="text" placeholder="City" required className="p-3 border rounded-md" />
                            <input type="text" placeholder="State / Province" required className="p-3 border rounded-md" />
                            <input type="text" placeholder="ZIP / Postal Code" required className="p-3 border rounded-md" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
                        <div className="mb-4">
                            <label className="inline-flex items-center mr-6">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                />
                                <span className="ml-2">Credit/Debit Card</span>
                            </label>
                            <label className="inline-flex items-center mr-6">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="paymentMethod"
                                    value="upi"
                                    checked={paymentMethod === 'upi'}
                                    onChange={() => setPaymentMethod('upi')}
                                />
                                <span className="ml-2">UPI</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="paymentMethod"
                                    value="qrcode"
                                    checked={paymentMethod === 'qrcode'}
                                    onChange={() => setPaymentMethod('qrcode')}
                                />
                                <span className="ml-2">QR Code</span>
                            </label>
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="space-y-4">
                                <input type="text" placeholder="Card Number" required className="w-full p-3 border rounded-md" />
                                <input type="text" placeholder="Name on Card" required className="w-full p-3 border rounded-md" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Expiry Date (MM/YY)" required className="p-3 border rounded-md" />
                                    <input type="text" placeholder="CVC" required className="p-3 border rounded-md" />
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'upi' && (
                            <div className="space-y-4">
                                <input type="text" placeholder="UPI ID (e.g., example@bank)" required className="w-full p-3 border rounded-md" />
                                <p className="text-sm text-gray-600">
                                    After placing the order, you will be redirected to your UPI app to complete the payment.
                                </p>
                            </div>
                        )}

                        {paymentMethod === 'qrcode' && (
                            <div className="space-y-4 text-center">
                                <p className="text-lg font-semibold">Scan this QR code to pay:</p>
                                {/* Replace with actual QR code generation */}
                                <img src="https://via.placeholder.com/200" alt="QR Code" className="mx-auto border rounded-md p-2" />
                                <p className="text-sm text-gray-600">
                                    Open your preferred UPI app and scan the QR code to complete the payment.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-lg shadow-md h-fit">
                        <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
                        <div className="space-y-4 border-b pb-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <span className="truncate">{item.name} x {item.quantity}</span>
                                    <span className="font-semibold">INR {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold text-xl pt-4">
                            <span>Total</span>
                            <span>INR {cartTotal.toFixed(2)}</span>
                        </div>
                         <button type="submit" className="w-full mt-8 py-3 bg-green-600 text-white font-bold text-lg rounded-md hover:bg-green-700">
                            Place Order
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
