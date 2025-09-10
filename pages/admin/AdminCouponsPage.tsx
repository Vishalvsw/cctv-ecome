
import React, { useEffect, useState } from 'react';
import { getCoupons } from '../../services/api';
import { Coupon } from '../../types';
import Spinner from '../../components/Spinner';

const AdminCouponsPage: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await getCoupons();
                setCoupons(data);
            } catch (error) {
                console.error("Failed to fetch coupons:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Coupons</h1>
                 <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Add Coupon
                </button>
            </div>

            {loading ? <Spinner /> : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Code</th>
                                <th className="p-3">Discount</th>
                                <th className="p-3">Expiry Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(coupon => (
                                <tr key={coupon.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-mono font-semibold">{coupon.code}</td>
                                    <td className="p-3">{coupon.discount}%</td>
                                    <td className="p-3">{coupon.expiry}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${coupon.isActive ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                            {coupon.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                        <button className="text-red-600 hover:underline">Delete</button>
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

export default AdminCouponsPage;
