import React from 'react';
import { User, Order, OrderStatus } from '../../types';

interface ViewCustomerOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: User | null;
  orders: Order[];
}

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


const ViewCustomerOrdersModal: React.FC<ViewCustomerOrdersModalProps> = ({ isOpen, onClose, customer, orders }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Orders for {customer.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {orders.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Order ID</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono">#{order.id}</td>
                    <td className="p-2">{order.date}</td>
                    <td className="p-2">${order.total.toFixed(2)}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600 py-8">This customer has not placed any orders yet.</p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerOrdersModal;