
import React from 'react';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} className="text-gray-400 hover:text-white transition-colors duration-300" target="_blank" rel="noopener noreferrer">
        {children}
    </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand & Social */}
            <div className="md:col-span-1">
                <h3 className="text-2xl font-bold mb-4">CCTV World</h3>
                <p className="text-gray-400 mb-4">Your trusted partner in security solutions. Protecting what matters most to you.</p>
                <div className="flex space-x-4">
                    <SocialIcon href="#">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                    </SocialIcon>
                     <SocialIcon href="#">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.794 2.013 10.148 2 12.315 2zm-1.163 1.943c-1.049.048-1.688.21-2.23.427-.636.254-1.076.592-1.527 1.042s-.788.89-1.042 1.528c-.217.542-.379 1.18-.427 2.23-.048 1.045-.06 1.374-.06 3.808s.012 2.763.06 3.808c.048 1.049.21 1.688.427 2.23.254.636.592 1.076 1.042 1.527s.89.788 1.528 1.042c.542.217 1.18.379 2.23.427 1.045.048 1.374.06 3.808.06s2.763-.012 3.808-.06c1.049-.048 1.688-.21 2.23-.427.636-.254 1.076-.592 1.527-1.042s.788-.89 1.042-1.528c.217-.542.379-1.18.427-2.23.048-1.045.06-1.374.06-3.808s-.012-2.763-.06-3.808c-.048-1.049-.21-1.688-.427-2.23-.254-.636-.592-1.076-1.042-1.527s-.89-.788-1.528-1.042c-.542-.217-1.18-.379-2.23-.427-1.045-.048-1.374-.06-3.808-.06zM12 8.118a4.1 4.1 0 110 8.2 4.1 4.1 0 010-8.2zm0 1.8a2.3 2.3 0 100 4.6 2.3 2.3 0 000-4.6zm4.614-4.215a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd"></path></svg>
                    </SocialIcon>
                </div>
            </div>
             {/* Column 2: Quick Links */}
            <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li><a href="#/shop" className="text-gray-400 hover:text-white">Shop</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                    <li><a href="#/track-order" className="text-gray-400 hover:text-white">Track Order</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
            </div>
             {/* Column 3: Support */}
            <div>
                 <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Installation Guides</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Warranty Information</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                </ul>
            </div>
             {/* Column 4: Newsletter */}
            <div>
                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest deals and product updates.</p>
                <form>
                    <div className="flex">
                        <input type="email" placeholder="Your Email" className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-l-md focus:outline-none" />
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700">
                            Go
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
             <p>&copy; 2024 CCTV World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
