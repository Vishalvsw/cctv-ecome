
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> & { id?: string }) => void;
  productToEdit: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const isEditing = !!productToEdit;

  useEffect(() => {
    if (isOpen) {
        if (isEditing) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price.toString());
            setStock(productToEdit.stock.toString());
            setCategory(productToEdit.category);
            setImageUrls(productToEdit.imageUrls.join(', '));
        } else {
            // Reset form for adding new product
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
            setCategory('');
            setImageUrls('');
        }
        setErrors({});
    }
  }, [isOpen, productToEdit, isEditing]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Price must be a positive number';
    if (!stock || isNaN(Number(stock)) || !Number.isInteger(Number(stock)) || Number(stock) < 0) newErrors.stock = 'Stock must be a non-negative integer';
    if (!category.trim()) newErrors.category = 'Category is required';
    
    const urls = imageUrls.split(',').map(url => url.trim()).filter(Boolean);
    if (urls.length === 0) {
        newErrors.imageUrls = 'At least one image URL is required';
    } else {
        try {
            urls.forEach(url => new URL(url));
        } catch (_) {
            newErrors.imageUrls = 'All URLs must be valid';
        }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const urls = imageUrls.split(',').map(url => url.trim()).filter(Boolean);
      const productData = {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        imageUrls: urls,
      };
      
      onSave(isEditing ? { ...productData, id: productToEdit.id } : productData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input id="product-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input id="product-category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={`w-full p-2 border rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'}`} required />
               {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`} required></textarea>
               {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input id="product-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0.01" step="0.01" className={`w-full p-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'}`} required />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label htmlFor="product-stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input id="product-stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} min="0" step="1" className={`w-full p-2 border rounded-md ${errors.stock ? 'border-red-500' : 'border-gray-300'}`} required />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="product-image-urls" className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma-separated)</label>
              <textarea id="product-image-urls" value={imageUrls} onChange={(e) => setImageUrls(e.target.value)} rows={2} className={`w-full p-2 border rounded-md ${errors.imageUrls ? 'border-red-500' : 'border-gray-300'}`} required></textarea>
              {errors.imageUrls && <p className="text-red-500 text-xs mt-1">{errors.imageUrls}</p>}
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
