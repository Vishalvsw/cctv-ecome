import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
        // We need a slight delay to allow context to update before checking the role
        setTimeout(() => {
            if (email.toLowerCase() === 'admin@example.com') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }, 100);
    };

    const handleAdminLogin = () => {
        login('admin@example.com');
        navigate('/admin/dashboard');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
                            Sign In
                        </button>
                    </form>

                    <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                        <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>

                    <button 
                        type="button" 
                        onClick={handleAdminLogin} 
                        className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700"
                    >
                        Login as Admin
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;