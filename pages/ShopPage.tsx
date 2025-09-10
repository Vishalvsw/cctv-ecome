
import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { Product } from '../types';
import Spinner from '../components/Spinner';

const ShopPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getProducts();
                setProducts(allProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        const allCategories = products.map(p => p.category);
        return ['All', ...Array.from(new Set(allCategories))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products
            .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
            .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm, selectedCategory]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-4">
                        <label htmlFor="category-select" className="font-semibold">Category:</label>
                        <select
                            id="category-select"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? <Spinner /> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                 {filteredProducts.length === 0 && !loading && (
                    <p className="text-center text-gray-500 mt-12">No products found.</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ShopPage;
