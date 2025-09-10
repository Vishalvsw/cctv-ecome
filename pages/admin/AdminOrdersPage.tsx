import React, { useEffect, useState } from 'react';
import { getOrders, getTechnicians } from '../../services/api';
import { Order, OrderStatus, Technician } from '../../types';
import Spinner from '../../components/Spinner';
import ManageOrderModal from '../../components/admin/ManageOrderModal';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING: return 'bg-yellow-200 text-yellow-800';
        case OrderStatus.PROCESSING: return 'bg-blue-200 text-blue-800';
        case OrderStatus.SHIPPED: return 'bg-indigo-200 text-indigo-800';
        case OrderStatus.INSTALLATION_SCHEDULED: return 'bg-purple-200 text-purple-800';
        case OrderStatus.DELIVERED: return 'bg-cyan-200 text-cyan-800';
        case OrderStatus.COMPLETED: return 'bg-green-200 text-green-800';
        case OrderStatus.CANCELLED: return 'bg-red-200 text-red-800';
        default: return 'bg-gray-200 text-gray-800';
    }
}

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersData, techniciansData] = await Promise.all([
                    getOrders(),
                    getTechnicians(),
                ]);
                setOrders(ordersData);
                setTechnicians(techniciansData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
        // In a real application, an API call would be made here to persist the change.
    };
    
    const handleOpenModal = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleSaveChanges = (updatedOrder: Order) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
        handleCloseModal();
        // In a real application, you would make an API call here to persist the change.
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            
            {selectedOrder && (
                <ManageOrderModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveChanges}
                    order={selectedOrder}
                    technicians={technicians}
                />
            )}

            {loading ? <Spinner /> : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Technician</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-mono">#{order.id}</td>
                                    <td className="p-3 font-semibold">{order.customerName}</td>
                                    <td className="p-3">{order.date}</td>
                                    <td className="p-3">INR {order.total.toFixed(2)}</td>
                                    <td className="p-3">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            className={`w-full p-2 text-xs font-semibold rounded-md border-transparent appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${getStatusColor(order.status)}`}
                                        >
                                            {Object.values(OrderStatus).map(status => (
                                                <option key={status} value={status} className="bg-white text-black">
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-3">{order.technicianName || 'N/A'}</td>
                                    <td className="p-3">
                                        <button onClick={() => handleOpenModal(order)} className="text-blue-600 hover:underline">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;