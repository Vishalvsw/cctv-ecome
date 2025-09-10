import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { Product } from '../../types';
import Spinner from '../../components/Spinner';
import ProductFormModal from '../../components/admin/AddProductModal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import ViewImageModal from '../../components/admin/ViewImageModal';

const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // State for delete confirmation modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // State for image viewer modal
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [imagesToView, setImagesToView] = useState<{ name: string; urls: string[] } | null>(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...newProductData,
            id: ((products.length > 0 ? Math.max(...products.map(p => parseInt(p.id, 10))) : 0) + 1).toString(),
        };
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };

    const handleEditProduct = (updatedProduct: Product) => {
        setProducts(prevProducts => 
            prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };
    
    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            setProducts(prevProducts => prevProducts.filter(p => p.id !== productToDelete.id));
            setToastMessage(`Product "${productToDelete.name}" was successfully deleted.`);
            setIsConfirmModalOpen(false);
            setProductToDelete(null);
        }
    };

    const handleViewImageClick = (product: Product) => {
        setImagesToView({ name: product.name, urls: product.imageUrls });
        setIsImageViewerOpen(true);
    };


    const handleSaveProduct = (productData: Omit<Product, 'id'> & { id?: string }) => {
        if (productData.id) {
            handleEditProduct(productData as Product);
        } else {
            handleAddProduct(productData);
        }
    };
    
    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    }
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <button 
                    onClick={openAddModal}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Add Product
                </button>
            </div>

            <ProductFormModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProduct}
                productToEdit={editingProduct}
            />

            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={`Delete Product: ${productToDelete?.name}`}
                message={`Are you sure you want to permanently delete "${productToDelete?.name}"? This action cannot be undone.`}
            />
            
             <ViewImageModal
                isOpen={isImageViewerOpen}
                onClose={() => setIsImageViewerOpen(false)}
                productName={imagesToView?.name || ''}
                imageUrls={imagesToView?.urls || []}
            />

            {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center z-50">
                    <span>{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="ml-4 font-bold text-lg">&times;</button>
                </div>
            )}

            {loading ? <Spinner /> : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Image</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{product.id}</td>
                                    <td className="p-3 font-semibold">{product.name}</td>
                                    <td className="p-3">
                                        <button onClick={() => handleViewImageClick(product)} className="text-blue-600 hover:underline">
                                            View ({product.imageUrls.length})
                                        </button>
                                    </td>
                                    <td className="p-3">{product.category}</td>
                                    <td className="p-3">INR {product.price.toFixed(2)}</td>
                                    <td className="p-3">{product.stock}</td>
                                    <td className="p-3 space-x-2">
                                        <button onClick={() => openEditModal(product)} className="text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => handleDeleteClick(product)} className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded">Delete</button>
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

export default AdminProductsPage;