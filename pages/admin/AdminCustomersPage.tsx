import React, { useEffect, useState } from 'react';
import { getUsers, getOrders } from '../../services/api';
import { User, Order } from '../../types';
import Spinner from '../../components/Spinner';
import ViewCustomerOrdersModal from '../../components/admin/ViewCustomerOrdersModal';

const AdminCustomersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
    const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersData, ordersData] = await Promise.all([getUsers(), getOrders()]);
                setUsers(usersData);
                setAllOrders(ordersData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleViewOrdersClick = (customer: User) => {
        const ordersForCustomer = allOrders.filter(order => order.customerId === customer.id);
        setSelectedCustomer(customer);
        setCustomerOrders(ordersForCustomer);
        setIsOrdersModalOpen(true);
    };

    const handleCloseOrdersModal = () => {
        setIsOrdersModalOpen(false);
        setSelectedCustomer(null);
        setCustomerOrders([]);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Customers</h1>

            <ViewCustomerOrdersModal
                isOpen={isOrdersModalOpen}
                onClose={handleCloseOrdersModal}
                customer={selectedCustomer}
                orders={customerOrders}
            />

            {loading ? <Spinner /> : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">User ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3 font-semibold">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                    <td className="p-3">
                                        <button 
                                            onClick={() => handleViewOrdersClick(user)} 
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Orders
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

export default AdminCustomersPage;