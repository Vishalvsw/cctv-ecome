
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { Product } from '../types';
import Spinner from '../components/Spinner';
import ContactPopup from '../components/ContactPopup';

// Add keyframes for the marquee animation directly in the component
const MarqueeStyles = () => (
    <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        @keyframes slide {
            0% { transform: translateX(0); }
            33% { transform: translateX(-100%); }
            66% { transform: translateX(-200%); }
            100% { transform: translateX(0); }
        }
        .image-slider-container {
            width: 100%;
            // aspect-ratio: 12 /8;
            overflow: hidden;
            max-height: 400px; /* Adjust this value as needed */
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .image-slider {
            display: flex;
            transition: transform 0.5s ease-in-out;
            height: 100%;
        }
        .image-slider img {
            width: 100%;
            height: 100%;
            object-fit: contain; /* Ensures the image fits within the container without cropping */
            flex-shrink: 0;
        }
    `}</style>
);

const reviews = [
    {
        name: 'Sarah L.',
        location: 'Springfield',
        text: "The installation was seamless, and the camera quality is fantastic. I feel so much safer at home now. Highly recommend CCTV World!",
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        name: 'Mike D.',
        location: 'Metropolis',
        text: "We got a complete system for our storefront. The remote access app is a game-changer for us. The team was professional and helpful.",
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        name: 'Jessica P.',
        location: 'Gotham',
        text: "Excellent customer service from start to finish. They helped me choose the right cameras for my needs without any pressure.",
        avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
        name: 'Tom B.',
        location: 'Star City',
        text: "The night vision on these cameras is incredibly clear. I was surprised by the quality for the price. A great investment for our family's security.",
        avatar: 'https://i.pravatar.cc/150?img=7'
    }
];


const HomePage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        "../images/hero1.png",
        "..cctv-ecome/images/hero2.png",
        "..cctv-ecome/images/Generated Image September 09, 2025 - 1_09PM.png" // Adding a third image for sliding
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setFeaturedProducts(products.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();

        const popupTimer = setTimeout(() => {
            setIsPopupVisible(true);
        }, 20000); // 20 seconds

        const imageSliderTimer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change image every 5 seconds

        // Cleanup timers on component unmount
        return () => {
            clearTimeout(popupTimer);
            clearInterval(imageSliderTimer);
        };
    }, [heroImages.length]);

    return (
        <div className="flex flex-col min-h-screen">
            <MarqueeStyles />
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="container mx-auto px-6 py-16">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 image-slider-container">
                            <div className="image-slider" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                                {heroImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Modern security camera ${index + 1}`} className="rounded-lg shadow-2xl" />
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">Advanced Security, Absolute Peace of Mind.</h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Protect your home and business with our state-of-the-art CCTV solutions. Crystal-clear video, remote access, and professional installation. Your safety is our priority.
                            </p>
                            <Link to="/shop" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block">
                                Explore Our Cameras
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Hero EMI Offers Section */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-extrabold mb-4 animate-pulse">Unlock Your Security with Easy EMI!</h2>
                        <p className="text-xl mb-8">Get your desired CCTV system today with flexible EMI options. No hidden charges, instant approval.</p>
                        <div className="flex justify-center space-x-6">
                            <div className="bg-white text-blue-800 rounded-lg p-6 shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <div>
                                    <p className="text-2xl font-bold">Starting from INR 999/month</p>
                                    <p className="text-blue-600">on selected products</p>
                                </div>
                            </div>
                            <Link to="/shop" className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-lg inline-flex items-center">
                                View EMI Plans
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>

       

                {/* Offers Section */}
                <div className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Exclusive Offers Just For You!</h2>
                        <p className="text-xl mb-8">Don't miss out on our limited-time deals on top security products.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Offer 1 */}
                            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                                <img src="../images/Generated Image September 09, 2025 - 1_10PM.png" alt="Dome Camera Offer" className="w-full h-40 object-cover rounded-md mb-4"/>
                                <h3 className="text-2xl font-bold mb-2">Flat 20% Off on All Dome Cameras</h3>
                                <p className="mb-4">Perfect for indoor surveillance. High-resolution and wide-angle view.</p>
                                <Link to="/shop?category=dome" className="inline-block bg-blue-700 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-800 transition-colors">Shop Now</Link>
                            </div>
                            {/* Offer 2 */}
                            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                                <img src="../images/cp-v32g-sp-3.webp" alt="Bullet Camera Offer" className="w-full h-40 object-cover rounded-md mb-4"/>
                                <h3 className="text-2xl font-bold mb-2">Buy 1 Get 1 Free on Selected Bullet Cameras</h3>
                                <p className="mb-4">Robust outdoor cameras for perimeter security. Weatherproof design.</p>
                                <Link to="/shop?category=bullet" className="inline-block bg-blue-700 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-800 transition-colors">View Deal</Link>
                            </div>
                            {/* Offer 3 */}
                            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                                <img src="../images/Generated Image September 09, 2025 - 1_18PM.png" alt="NVR/DVR Kit Offer" className="w-full h-40 object-cover rounded-md mb-4"/>
                                <h3 className="text-2xl font-bold mb-2">Free Installation with Any NVR/DVR Kit</h3>
                                <p className="mb-4">Get professional setup at no extra cost when you purchase a complete kit.</p>
                        <Link to="/shop?category=kits" className="inline-block bg-blue-700 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-800 transition-colors">Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
        {/* New Offers & Festival Specials Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-extrabold mb-4 animate-bounce">Don't Miss Our Latest Deals!</h2>
                <p className="text-xl mb-8">Discover exciting new offers and seasonal festival specials.</p>
                <div className="overflow-hidden whitespace-nowrap">
                    <div className="inline-block animate-marquee">
                        {/* Offer 1: New Arrival Discount */}
                        <div className="inline-flex items-center justify-center bg-white text-green-700 rounded-lg p-6 mx-4 w-80 h-40 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">New Arrival: 15% Off!</h3>
                                <p className="mb-4">On our latest range of smart security cameras.</p>
                                <Link to="/shop?new=true" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">Shop New Arrivals</Link>
                            </div>
                        </div>
                        {/* Offer 2: Festival Special */}
                        <div className="inline-flex items-center justify-center bg-white text-green-700 rounded-lg p-6 mx-4 w-80 h-40 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Diwali Dhamaka: Up to 30% Off!</h3>
                                <p className="mb-4">Celebrate with massive savings on security bundles.</p>
                                <Link to="/shop?festival=diwali" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">View Diwali Deals</Link>
                            </div>
                        </div>
                        {/* Offer 3: Free Accessory */}
                        <div className="inline-flex items-center justify-center bg-white text-green-700 rounded-lg p-6 mx-4 w-80 h-40 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Free Mounting Kit!</h3>
                                <p className="mb-4">With any purchase over INR 5000.</p>
                                <Link to="/shop" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">Claim Offer</Link>
                            </div>
                        </div>
                        {/* Duplicate offers to ensure smooth looping */}
                        <div className="inline-flex items-center justify-center bg-white text-green-700 rounded-lg p-6 mx-4 w-80 h-40 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">New Arrival: 15% Off!</h3>
                                <p className="mb-4">On our latest range of smart security cameras.</p>
                                <Link to="/shop?new=true" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">Shop New Arrivals</Link>
                            </div>
                        </div>
                        <div className="inline-flex items-center justify-center bg-white text-green-700 rounded-lg p-6 mx-4 w-80 h-40 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Diwali Dhamaka: Up to 30% Off!</h3>
                                <p className="mb-4">Celebrate with massive savings on security bundles.</p>
                                <Link to="/shop?festival=diwali" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">View Diwali Deals</Link>
                            </div>
                        </div>
                        <div className="inline-flex items-center justify-center bg-white text-green-700 rounded-lg p-6 mx-4 w-80 h-40 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Free Mounting Kit!</h3>
                                <p className="mb-4">With any purchase over INR 5000.</p>
                                <Link to="/shop" className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">Claim Offer</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Our Moments Section */}
                <div className="container mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center mb-2">Our Moments of Trust</h2>
                    <p className="text-center text-gray-600 mb-8">Celebrating successful installations and happy clients.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="overflow-hidden rounded-lg shadow-lg"><img src="../images/moments1.png" alt="Residential Installation" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"/></div>
                        <div className="overflow-hidden rounded-lg shadow-lg"><img src="../images/moments5.png" alt="Retail Store Security" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"/></div>
                        <div className="overflow-hidden rounded-lg shadow-lg"><img src="../images/installation 1.png" alt="Office Corridor Monitoring" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"/></div>
                        <div className="overflow-hidden rounded-lg shadow-lg"><img src="../images/moments4.png" alt="Warehouse Surveillance" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"/></div>
                    </div>
                </div>

                {/* Customer Reviews Section */}
                <div className="bg-gray-800 text-white py-16 overflow-hidden">
                    <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
                    <div className="relative w-full flex">
                        <div className="flex w-max animate-marquee">
                            {[...reviews, ...reviews].map((review, index) => (
                                <div key={index} className="bg-gray-700 rounded-lg p-6 mx-4 w-80 flex-shrink-0">
                                    <div className="flex items-center mb-4">
                                        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                                        <div>
                                            <p className="font-bold">{review.name}</p>
                                            <p className="text-sm text-gray-400">{review.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">"{review.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

 {/* Featured Products Section */}
<div className="bg-gray-100">
    <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        {loading ? <Spinner /> : (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
    </div>
</div>





                
                {/* Pricing Section */}
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-2">Flexible Plans for Every Need</h2>
                        <p className="text-center text-gray-600 mb-10">Get started with easy EMI options available on all plans.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {/* Basic Plan */}
                            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-gray-300 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-2xl font-bold mb-4">Basic</h3>
                                <p className="text-4xl font-extrabold mb-1">INR 499 <span className="text-lg font-medium text-gray-500">/ one-time</span></p>
                                <p className="text-gray-600 mb-6">or INR 42/mo</p>
                                <ul className="space-y-3 text-gray-700">
                                    <li>✓ 2 HD Cameras</li>
                                    <li>✓ Mobile App Access</li>
                                    <li>✓ 30-Day Cloud Storage</li>
                                    <li>✓ Self-Installation</li>
                                </ul>
                                <button className="w-full mt-8 py-3 px-6 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors">Get Started</button>
                            </div>
                            {/* Pro Plan */}
                             <div className="bg-white rounded-lg shadow-2xl p-8 border-t-4 border-blue-600 transform scale-105 hover:scale-110 transition-all duration-300 relative z-10">
                                <div className="absolute -top-3 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase">Popular</div>
                                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                                <p className="text-4xl font-extrabold mb-1">INR 999 <span className="text-lg font-medium text-gray-500">/ one-time</span></p>
                                <p className="text-gray-600 mb-6">or INR 84/mo</p>
                                <ul className="space-y-3 text-gray-700">
                                    <li>✓ 4 Full HD Cameras</li>
                                    <li>✓ Professional Installation</li>
                                    <li>✓ 60-Day Cloud Storage</li>
                                    <li>✓ 24/7 Professional Monitoring</li>
                                </ul>
                                <button className="w-full mt-8 py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Choose Plan</button>
                            </div>
                             {/* Enterprise Plan */}
                            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-gray-300 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                                 <p className="text-4xl font-extrabold mb-1">Custom</p>
                                 <p className="text-gray-600 mb-6">Let's talk</p>
                                <ul className="space-y-3 text-gray-700">
                                    <li>✓ Custom Camera Count</li>
                                    <li>✓ On-Premise & Cloud Storage</li>
                                    <li>✓ Dedicated Support</li>
                                    <li>✓ Advanced Analytics</li>
                                </ul>
                                <button className="w-full mt-8 py-3 px-6 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors">Contact Us</button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
            <ContactPopup isOpen={isPopupVisible} onClose={() => setIsPopupVisible(false)} />
        </div>
    );
};

export default HomePage;
