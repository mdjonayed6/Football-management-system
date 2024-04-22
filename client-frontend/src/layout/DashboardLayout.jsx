import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { Link, Outlet } from 'react-router-dom';
import secureApi from '../api/secureApi';

const DashboardLayout = () => {
    const [userRole, setUserRole] = useState('');
    const email = localStorage.getItem('email');
    useEffect(() => {
        async function userRole() {
            const response = await secureApi.get(`/users/single/user?email=${email}`);
            setUserRole(response.user)
            // console.log(response)
        }
        userRole();
    }, [email])

    return (
        <div className='mt-16'>
            <div className="drawer lg:drawer-open relative">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button absolute top-5 right-4 lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className=" text-left p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {/* Dashboard links */}
                        <li className="px-4 py-3 border-b border-gray-300">
                            <Link to="/dashboard" className="block font-semibold hover:text-blue-600">Dashboard</Link>
                        </li>





                        {/* FOR ADMIN ROUTES */}

                        {
                            userRole.role_name == 'admin' ?
                                <>
                                    {/* Users box */}
                                    <div className="collapse border-b border-gray-300 dropdwndetails">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title">
                                            <p className="flex justify-between"><span className="flex items-center gap-2 font-semibold">Users</span> <FaAngleDown /></p>
                                        </div>
                                        <div className="collapse-content ml-6">
                                            <ul className="space-y-3 ullist">
                                                <li className="mb-2"><Link to="/dashboard/view-users"> View Users</Link></li>
                                                <li className="mb-2"><Link to="/dashboard/view-player-list">Player List</Link></li>
                                                <li className="mb-2"><Link to="/dashboard/view-coach-list">Coach List</Link></li>
                                                <li className="mb-2"><Link to="/dashboard/view-referee-list">Referee List</Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Roles box */}
                                    <div className="collapse border-b border-gray-300 dropdwndetails">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title">
                                            <p className="flex justify-between"><span className="flex items-center gap-2 font-semibold">Roles</span> <FaAngleDown /></p>
                                        </div>
                                        <div className="collapse-content ml-6">
                                            <ul className="space-y-3 ullist">
                                                <li className="mb-2"><Link to="/dashboard/view-roles"> View Roles</Link></li>
                                                <li className="mb-2"><Link to="/dashboard/create-roles"> Create Roles</Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Teams box */}
                                    <div className="collapse border-b border-gray-300 dropdwndetails">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title">
                                            <p className="flex justify-between"><span className="flex items-center gap-2 font-semibold">Teams</span> <FaAngleDown /></p>
                                        </div>
                                        <div className="collapse-content ml-6">
                                            <ul className="space-y-3 ullist">
                                                <li className="mb-2"><Link to="/dashboard/view-teams"> View Teams</Link></li>
                                                <li className="mb-2"><Link to="/dashboard/create-teams"> Create Teams</Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Create Match */}
                                    <div className="collapse border-b border-gray-300 dropdwndetails">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title">
                                            <p className="flex justify-between"><span className="flex items-center gap-2 font-semibold">Match</span> <FaAngleDown /></p>
                                        </div>
                                        <div className="collapse-content ml-6">
                                            <ul className="space-y-3 ullist">
                                                <li className="mb-2"><Link to="/dashboard/create-match">Create Match</Link></li>
                                                <li className="mb-2"><Link to="/dashboard/view-matches">View Match</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <li className="px-4 py-3 border-b border-gray-300">
                                        <Link to="/dashboard/blogs" className="block font-semibold hover:text-blue-600">Blogs</Link>
                                    </li>
                                    <li className="px-4 py-3 border-b border-gray-300">
                                        <Link to="/dashboard/notice" className="block font-semibold hover:text-blue-600">Notice</Link>
                                    </li>
                                </>

                                :
                                <>

                                    {
                                        userRole.role_name == 'coach' ?

                                            <>
                                                {/* Players box */}
                                                <div div className="collapse border-b border-gray-300 dropdwndetails">
                                                    <input type="checkbox" className="peer" />
                                                    <div className="collapse-title">
                                                        <p className="flex justify-between"><span className="flex items-center gap-2 font-semibold">Players</span> <FaAngleDown /></p>
                                                    </div>
                                                    <div className="collapse-content ml-6">
                                                        <ul className="space-y-3 ullist">
                                                            <li className="mb-2"><Link to="/dashboard/view-my-players"> My Players</Link></li>
                                                            <li className="mb-2"><Link to="/dashboard/create-players">Create Player</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <li className="px-4 py-3 border-b border-gray-300">
                                                    <Link to="/dashboard/view-all-users" className="block font-semibold hover:text-blue-600">View All Users</Link>
                                                </li>
                                            </>
                                            :
                                            <>

                                                {
                                                    userRole.role_name == 'referee' ?

                                                        <>
                                                            {/* Referee Routes */}
                                                            {/* Create Match box */}
                                                            <li className="px-4 py-3 border-b border-gray-300">
                                                                <Link to="/dashboard/view-referee-teams" className="block font-semibold hover:text-blue-600">View All Teams</Link>
                                                            </li>



                                                            {/* Result Match box */}
                                                            <div className="collapse border-b border-gray-300 dropdwndetails">
                                                                <input type="checkbox" className="peer" />
                                                                <div className="collapse-title">
                                                                    <p className="flex justify-between"><span className="flex items-center gap-2 font-semibold">Results</span> <FaAngleDown /></p>
                                                                </div>
                                                                <div className="collapse-content ml-6">
                                                                    <ul className="space-y-3 ullist">
                                                                        <li className="mb-2"><Link to="/dashboard/create-results">Create Results</Link></li>
                                                                        <li className="mb-2"><Link to="/dashboard/view-results">View Results</Link></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <>

                                                            {/* Student view */}
                                                            {/* <li className="px-4 py-3 border-b border-gray-300">
                                                                <Link to="/dashboard/myteam" className="block font-semibold hover:text-blue-600">My Team</Link>
                                                            </li> */}

                                                            {/* If others condition are exist */}
                                                        </>
                                                }

                                            </>
                                    }



                                </>
                        }








                    </ul>

                </div>
            </div>
        </div >
    );
};

export default DashboardLayout;