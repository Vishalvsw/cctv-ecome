
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <img className="w-full h-56 object-cover" src={product.imageUrls[0]} alt={product.name} />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">INR {product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;