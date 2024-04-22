import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/ui/Spinner';
import "rc-pagination/assets/index.css";
import Pagination from 'rc-pagination/lib/Pagination';
import allplayersHooks from '../../../hooks/projectHooks/allplayersHooks';
import { Link } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const ViewUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const email = localStorage.getItem('email');
    const itemsPerPage = 100;
    const { allPlayers: myuser, isLoading, total } = allplayersHooks(currentPage, itemsPerPage);

    useEffect(() => {
        const filteredResults = myuser.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredResults);
    }, [searchTerm, myuser]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const singleUserInfo = async (id) => {
        const userInfo = await secureApi.get(`/users/${id}`);
        setSelectedUser(userInfo.user);
        document.getElementById('my_modal_5').showModal();
    }

    return (
        <div className="min-h-screen mt-5 px-4">
            <h1 className="text-2xl text-center font-bold mb-4">User List</h1>
            {isLoading && <Spinner />}
            {filteredUsers.length === 0 && <p>No users found</p>}
            <form className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="py-2 px-4 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </form>

            {filteredUsers && (
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map(user => (
                                <tr key={user.user_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><img src={user.photo} alt={user.username} className="h-8 w-8 rounded-full" /></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className='btn btn-info' onClick={() => singleUserInfo(user.user_id)}>View Info</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center mt-4">
                <div>
                    <Pagination
                        current={currentPage}
                        total={total}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                        jumpPrevIcon="..."
                        jumpNextIcon="..."
                    />
                </div>
            </div>

            {/* Modal for displaying user details */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_5').close()}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">User Details</h3>
                    {selectedUser && (
                        <div className="py-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">ID</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.user_id}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Username</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.username}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Email</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Role</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.role_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Address</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.address}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Conditions</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.conditions}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Department</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.dept}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">DOB</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.dob}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Gender</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">ID No</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.id_no}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Experience</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.experience}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Phone</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{selectedUser.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Photo</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={selectedUser.photo} alt={selectedUser.username} className="h-44 w-44 rounded-full" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Register Date</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(selectedUser.created_at).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ViewUsers;
