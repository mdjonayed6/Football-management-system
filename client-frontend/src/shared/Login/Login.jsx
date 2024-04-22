import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import secureApi from '../../api/secureApi'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = {
            email,
            password
        }
        secureApi.post('/users/login', users)
            .then(res => {
                if (res.success === true) {
                    toast("Login successful!");
                    setTimeout(() => {
                        localStorage.setItem('access-token', res.token);
                        localStorage.setItem('email', res.user.email);
                        navigate('/dashboard');
                        window.location.reload();
                    }, 1500); // 1000 milliseconds delay
                }
                setError('')
            })
            .catch(err => {
                setError(err.response.data.message)
            })
    };

    return (
        <div className=" p-5 flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">Login</h2>
                    {error ? <span className='py-3 text-center text-red-500'>{error}</span> : ''}
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between mb-5">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
                <div>
                    Don't have any account? <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Register Now
                    </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
