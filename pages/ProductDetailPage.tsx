import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProductById } from '../services/api';
import { Product } from '../types';
import Spinner from '../components/Spinner';
import { useCart } from '../hooks/useCart';



const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const fetchedProduct = await getProductById(id);
                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                    setSelectedImage(fetchedProduct.imageUrls[0]);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <>
            <Navbar />
            <div className="flex-grow container mx-auto p-8 flex justify-center items-center h-[60vh]">
                <Spinner />
            </div>
            <Footer />
            </>
        );
    }

    if (!product) {
        return (
             <>
            <Navbar />
            <div className="flex-grow container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
            <Footer />
            </>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                        <img className="w-full h-auto rounded-lg shadow-lg mb-4" src={selectedImage} alt={product.name} />
                        {product.imageUrls.length > 1 && (
                            <div className="flex gap-2 justify-center">
                                {product.imageUrls.map((imgUrl, index) => (
                                    <img 
                                        key={index}
                                        src={imgUrl} 
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === imgUrl ? 'border-blue-500' : 'border-transparent'}`}
                                        onClick={() => setSelectedImage(imgUrl)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-500 mb-4">{product.category}</p>
                        <p className="text-lg text-gray-700 mb-6">{product.description}</p>
                        <p className="text-3xl font-extrabold text-gray-900 mb-6">INR {product.price.toFixed(2)}</p>
                        <p className={`font-semibold mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </p>
                        <button 
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;