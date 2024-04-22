import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useData from '../../hooks/globalHooks/useData';

const Navbar = () => {
    const [username, setUsername] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    // Only fetch data if email is present in localStorage
    const { responseData: userInfo, refetch, isLoading, error } = useData(email ? `/users/single/user?email=${email}` : null);
    useEffect(() => {
        if (!isLoading && !error) {
            // console.log(responseData)
            setUsername(userInfo.user.username)
            setPhotoURL(userInfo.user.photo)
            refetch()
        }
    }, [isLoading, error])

    // HandleLogout
    const handleLogout = () => {
        localStorage.removeItem('access-token')
        localStorage.removeItem('email')
        refetch()
        navigate('/login')
    }

    return (
        <div>
            <div className="navbar bg-slate-700 text-white fixed z-10 top-0  px-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-700 text-white rounded-box w-52">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/blogs">Blogs</Link></li>
                            <li><Link to="/fixtures">Fixtures</Link></li>
                            <li><Link to="/players">Players</Link></li>
                            <li><Link to="/result-table">Result</Link></li>
                            <li><Link to="/notices">Notice</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">ICFL</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex space-x-4">
                        <li className="text-white hover:text-gray-300">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <Link to="/blogs">Blogs</Link>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <Link to="/fixtures">Fixtures</Link>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <Link to="/players">Players</Link>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <Link to="/result-table">Result Table</Link>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <Link to="/notices">Notice</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className="flex items-center gap-3">

                        {
                            username && photoURL ?
                                <>
                                    <span>{username}</span>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex">
                                            <div className="w-10 rounded-full">
                                                <img alt="Tailwind CSS Navbar component" src={photoURL ? photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-slate-700 text-white shadow rounded-box w-52">
                                            <li>
                                                <Link to="/dashboard" className="justify-between">
                                                    Dashboard
                                                    <span className="badge">New</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/profile" className="justify-between">
                                                    Profile
                                                    <span className="badge">New</span>
                                                </Link>
                                            </li>
                                            <li><Link onClick={handleLogout}>Logout</Link></li>
                                        </ul>
                                    </div>
                                </>
                                :
                                <>

                                    <div className="dropdown dropdown-end">
                                        <><Link to="/login" className='btn btn-error mr-2'>Login</Link></>
                                        <><Link to="/register" className='btn btn-accent'>Register</Link></>
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;