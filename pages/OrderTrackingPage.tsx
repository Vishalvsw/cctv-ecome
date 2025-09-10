import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getOrderById } from '../services/api';
import { Order } from '../types';

const OrderTrackingPage: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState<Order | null | undefined>(null); // null: not searched, undefined: not found
    const [loading, setLoading] = useState(false);

    const trackOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setOrder(null);
        try {
            const foundOrder = await getOrderById(orderId);
            setOrder(foundOrder);
        } catch (error) {
            console.error(error);
            setOrder(undefined);
        } finally {
            setLoading(false);
        }
    };
    
    const getStatusStep = (status: string | null) => {
        if (!status) return 0;
        switch(status) {
            case 'Pending': return 1;
            case 'Processing': return 2;
            case 'Shipped': return 3;
            case 'Installation Scheduled': return 4;
            case 'Delivered': return 4; // Delivered can be concurrent with scheduling
            case 'Completed': return 5;
            default: return 0;
        }
    }
    
    const step = getStatusStep(order?.status ?? null);
    const timelineSteps = ['Pending', 'Processing', 'Shipped', 'Scheduled', 'Completed'];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-6">Track Your Order</h1>
                    <form onSubmit={trackOrder} className="flex gap-4 mb-8">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter your order ID (e.g., 102)"
                            className="flex-grow p-3 border rounded-md"
                            required
                        />
                        <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700" disabled={loading}>
                            {loading ? 'Tracking...' : 'Track'}
                        </button>
                    </form>

                    {order === undefined && <p className="text-center text-red-500">Order not found.</p>}
                    
                    {order && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-center">Order Status: <span className="text-blue-600">{order.status}</span></h2>
                             <div className="w-full px-4">
                               <div className="flex justify-between items-center relative">
                                   {timelineSteps.map((s, i) => (
                                       <div key={s} className="z-10 flex flex-col items-center">
                                           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > i ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                                               {step > i ? '✓' : i + 1}
                                           </div>
                                       </div>
                                   ))}
                                   <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2 -z-1"></div>
                                   <div 
                                      className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2 -z-1 transition-all duration-500"
                                      style={{ width: `${(step-1) / (timelineSteps.length -1) * 100}%`}}
                                    ></div>
                               </div>
                                <div className="flex justify-between mt-2 text-sm text-center">
                                    {timelineSteps.map(s => (
                                        <div key={s} className="w-1/5">{s}</div>
                                    ))}
                                </div>
                            </div>
                            {order.technicianName && (
                                <p className="text-center mt-6">Installation by: <strong>{order.technicianName}</strong> on <strong>{order.installationDate}</strong></p>
                            )}
                            
                            {(order.status === 'Completed' || order.status === 'Delivered') && order.customerFeedback && (
                                <div className="mt-8 pt-6 border-t">
                                    <h3 className="text-xl font-semibold text-center mb-4">Service Feedback Summary</h3>
                                    <blockquote className="bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500 italic">
                                        <p className="text-gray-700">"{order.customerFeedback}"</p>
                                        <footer className="text-right text-sm text-gray-500 mt-2">- Your feedback</footer>
                                    </blockquote>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderTrackingPage;