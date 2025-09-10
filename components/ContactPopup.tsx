
import React, { useState } from 'react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you, ${name}! We will contact you at ${email} shortly.`);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Side: Hero Product */}
                <div className="w-full md:w-1/2 p-8 bg-gray-100 flex flex-col justify-center items-center text-center">
                    <img 
                        src="../images/heroproduct.png"
                        alt="4K Ultra HD IP Camera" 
                        className="w-full max-w-xs rounded-lg shadow-md mb-4" 
                    />
                    <h3 className="text-2xl font-bold text-gray-800">4K Ultra HD IP Camera</h3>
                    <p className="text-gray-600 mt-2">Capture every detail with stunning 4K resolution. Don't miss a thing.</p>
                </div>
                
                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 p-8 relative">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                        aria-label="Close popup"
                    >
                        &times;
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get a Free Consultation</h2>
                    <p className="text-gray-600 mb-6">Have questions? Fill out the form below, and one of our security experts will be in touch!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="popup-name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input
                                id="popup-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="popup-email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                id="popup-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                         <div className="mb-6">
                            <label htmlFor="popup-message" className="block text-gray-700 text-sm font-bold mb-2">Your Requirements (optional)</label>
                            <textarea
                                id="popup-message"
                                rows={3}
                                placeholder="e.g., 'I need 3 outdoor cameras for my home...'"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPopup;
