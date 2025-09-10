import React, { useState, useEffect } from 'react';
import { Technician } from '../../types';

interface TechnicianFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (technician: Omit<Technician, 'id'> & { id?: string }) => void;
  technicianToEdit: Technician | null;
}

const TechnicianFormModal: React.FC<TechnicianFormModalProps> = ({ isOpen, onClose, onSave, technicianToEdit }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const isEditing = !!technicianToEdit;

  useEffect(() => {
    if (isOpen) {
        if (isEditing) {
            setName(technicianToEdit.name);
            setContact(technicianToEdit.contact);
        } else {
            setName('');
            setContact('');
        }
        setErrors({});
    }
  }, [isOpen, technicianToEdit, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!contact.trim()) newErrors.contact = 'Contact information is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const technicianData = { name, contact };
      onSave(isEditing ? { ...technicianData, id: technicianToEdit.id } : technicianData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Technician' : 'Add New Technician'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            <div>
              <label htmlFor="tech-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="tech-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="tech-contact" className="block text-sm font-medium text-gray-700 mb-1">Contact (Phone/Email)</label>
              <input id="tech-contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)} className={`w-full p-2 border rounded-md ${errors.contact ? 'border-red-500' : 'border-gray-300'}`} required />
               {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save Technician
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechnicianFormModal;