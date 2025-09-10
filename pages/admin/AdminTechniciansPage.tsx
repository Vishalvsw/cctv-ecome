import React, { useEffect, useState } from 'react';
import { getTechnicians, getOrders } from '../../services/api';
import { Technician } from '../../types';
import Spinner from '../../components/Spinner';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import TechnicianFormModal from '../../components/admin/TechnicianFormModal';

const AdminTechniciansPage: React.FC = () => {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(true);
    const [jobCounts, setJobCounts] = useState<Record<string, number>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTechnician, setEditingTechnician] = useState<Technician | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [technicianToDelete, setTechnicianToDelete] = useState<Technician | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [techniciansData, ordersData] = await Promise.all([
                    getTechnicians(),
                    getOrders(),
                ]);
                setTechnicians(techniciansData);

                const counts: Record<string, number> = {};
                ordersData.forEach(order => {
                    if (order.technicianId) {
                        counts[order.technicianId] = (counts[order.technicianId] || 0) + 1;
                    }
                });
                setJobCounts(counts);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSaveTechnician = (technicianData: Omit<Technician, 'id'> & { id?: string }) => {
        if (technicianData.id) { // Editing existing technician
            setTechnicians(prev => prev.map(t => t.id === technicianData.id ? (technicianData as Technician) : t));
        } else { // Adding new technician
            const newTechnician: Technician = {
                ...technicianData,
                id: `T${Date.now()}`, // Simple unique ID generation
            };
            setTechnicians(prev => [newTechnician, ...prev]);
        }
    };

    const handleDeleteClick = (technician: Technician) => {
        setTechnicianToDelete(technician);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (technicianToDelete) {
            setTechnicians(prev => prev.filter(t => t.id !== technicianToDelete.id));
            setIsConfirmModalOpen(false);
            setTechnicianToDelete(null);
        }
    };

    const openEditModal = (technician: Technician) => {
        setEditingTechnician(technician);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingTechnician(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTechnician(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Technicians</h1>
                <button 
                    onClick={openAddModal}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Add Technician
                </button>
            </div>

            <TechnicianFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTechnician}
                technicianToEdit={editingTechnician}
            />

            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={`Delete Technician: ${technicianToDelete?.name}`}
                message={`Are you sure you want to delete "${technicianToDelete?.name}"? This action cannot be undone.`}
            />

            {loading ? <Spinner /> : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Contact</th>
                                <th className="p-3 text-center">Assigned Jobs</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {technicians.map(tech => (
                                <tr key={tech.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-mono">{tech.id}</td>
                                    <td className="p-3 font-semibold">{tech.name}</td>
                                    <td className="p-3">{tech.contact}</td>
                                    <td className="p-3 text-center">{jobCounts[tech.id] || 0}</td>
                                    <td className="p-3 space-x-2">
                                        <button onClick={() => openEditModal(tech)} className="text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => handleDeleteClick(tech)} className="text-red-600 hover:underline">Delete</button>
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

export default AdminTechniciansPage;