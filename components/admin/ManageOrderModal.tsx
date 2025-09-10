import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, Technician } from '../../types';

interface ManageOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
  order: Order;
  technicians: Technician[];
}

const ManageOrderModal: React.FC<ManageOrderModalProps> = ({ isOpen, onClose, onSave, order, technicians }) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [technicianId, setTechnicianId] = useState<string>(order.technicianId || '');
  const [installationDate, setInstallationDate] = useState<string>(order.installationDate || '');
  const [installationNotes, setInstallationNotes] = useState<string>(order.installationNotes || '');
  const [customerFeedback, setCustomerFeedback] = useState<string>(order.customerFeedback || '');

  useEffect(() => {
    if (isOpen) {
      setStatus(order.status);
      setTechnicianId(order.technicianId || '');
      setInstallationDate(order.installationDate || '');
      setInstallationNotes(order.installationNotes || '');
      setCustomerFeedback(order.customerFeedback || '');
    }
  }, [isOpen, order]);

  const handleSave = () => {
    const selectedTechnician = technicians.find(t => t.id === technicianId);
    const updatedOrder: Order = {
      ...order,
      status,
      technicianId,
      technicianName: selectedTechnician?.name,
      installationDate,
      installationNotes,
      customerFeedback,
    };
    onSave(updatedOrder);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Manage Order #{order.id}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Management Form */}
            <div className="space-y-6">
                 <div>
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Service Management</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="order-status" className="block text-sm font-medium text-gray-700">Order Status</label>
                            <select id="order-status" value={status} onChange={e => setStatus(e.target.value as OrderStatus)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="technician" className="block text-sm font-medium text-gray-700">Assign Technician</label>
                            <select id="technician" value={technicianId} onChange={e => setTechnicianId(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">- Select Technician -</option>
                                {technicians.map(t => <option key={t.id} value={t.id}>{t.name} (ID: {t.id})</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="install-date" className="block text-sm font-medium text-gray-700">Installation Date</label>
                            <input type="date" id="install-date" value={installationDate} onChange={e => setInstallationDate(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="install-notes" className="block text-sm font-medium text-gray-700">Installation Notes</label>
                            <textarea id="install-notes" rows={3} value={installationNotes} onChange={e => setInstallationNotes(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                    </div>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-md border">
                    <label htmlFor="customer-feedback" className="block text-lg font-semibold mb-2 text-gray-800">Customer Feedback</label>
                    <p className="text-sm text-gray-500 mb-3">Record any comments or feedback provided by the customer regarding the service and installation.</p>
                    <textarea 
                        id="customer-feedback"
                        placeholder="No feedback recorded yet. Click here to add notes..." 
                        rows={4} 
                        value={customerFeedback} 
                        onChange={e => setCustomerFeedback(e.target.value)} 
                        className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
            </div>

            {/* Right Side: Order Info & Evidence */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Order Details</h3>
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <p><strong>Address:</strong> {order.shippingAddress}</p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <ul className="mt-2 list-disc list-inside">
                        {order.items.map(item => <li key={item.id}>{item.name} x {item.quantity}</li>)}
                    </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-md border">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Installation Evidence</h3>
                    <p className="text-sm text-gray-500 mb-4">Images uploaded by the technician as proof of installation.</p>
                    {order.installationImages && order.installationImages.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {order.installationImages.map((url, index) => (
                                <a href={url} target="_blank" rel="noopener noreferrer" key={index} className="block group">
                                    <img 
                                        src={url} 
                                        alt={`Installation evidence ${index + 1}`} 
                                        className="w-full h-32 object-cover rounded-md border border-gray-200 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg" 
                                    />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 bg-gray-100 rounded-md">
                            <p className="text-gray-500 italic">No evidence uploaded.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrderModal;