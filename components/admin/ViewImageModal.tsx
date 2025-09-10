import React, { useState, useEffect } from 'react';

interface ViewImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  imageUrls: string[];
}

const ViewImageModal: React.FC<ViewImageModalProps> = ({ isOpen, onClose, productName, imageUrls }) => {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (isOpen && imageUrls.length > 0) {
      setSelectedImage(imageUrls[0]);
    }
  }, [isOpen, imageUrls]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-bold text-gray-800">{productName}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        </div>
        
        <div className="flex-grow mb-4 flex justify-center items-center">
             <img className="max-w-full max-h-[50vh] object-contain rounded-md" src={selectedImage} alt={productName} />
        </div>
       
        {imageUrls.length > 1 && (
            <div className="flex gap-2 justify-center flex-wrap p-2 bg-gray-100 rounded-b-lg">
                {imageUrls.map((imgUrl, index) => (
                    <img 
                        key={index}
                        src={imgUrl} 
                        alt={`${productName} thumbnail ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${selectedImage === imgUrl ? 'border-blue-500 scale-105' : 'border-transparent hover:border-blue-300'}`}
                        onClick={() => setSelectedImage(imgUrl)}
                    />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default ViewImageModal;
