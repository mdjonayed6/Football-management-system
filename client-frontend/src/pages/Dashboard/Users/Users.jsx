import React, { useEffect, useState } from 'react';
import allusersHooks from '../../../hooks/projectHooks/allusersHooks';
import Spinner from '../../../components/ui/Spinner';
import "rc-pagination/assets/index.css";
import Pagination from 'rc-pagination/lib/Pagination';
import searchusersHooks from '../../../hooks/projectHooks/searchusersHooks';
import secureApi from '../../../api/secureApi';
import { Link } from 'react-router-dom';

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    // const [usersInfo,setusersInfo] = useState([]);
    const email = localStorage.getItem('email');
    const itemsPerPage = 5;
    // const { usersInfo, refetch, isLoading, error } = allusersHooks(`/users?currentPage=${currentPage}&limit=${itemsPerPage}`);
    const { usersInfo: myuser, error, isLoading, total } = allusersHooks(currentPage, itemsPerPage)
    const { searchusersInfo, refetch } = searchusersHooks(searchTerm, currentPage, itemsPerPage)

    const [signleUser, setSingleUser] = useState([]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // refetch()
    };

    // Search Input Change
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };


    // Delete user from DB;
    const deleteUser = (id) => {
        const result = window.confirm('Are you sure you want to delete')
        if (result) {
            secureApi.delete(`/users/${id}`)
                .then(res => {
                    if (res.success == true) {
                        refetch()
                    }
                    else {
                        console.log(res.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            return;
        }
    }

    const getSingleUserInfo = (id) => {
        secureApi.get(`/users/${id}`)
            .then(res => {
                // console.log(res)
                setSingleUser(res.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="min-h-screen mt-5 px-4">
            <h1 className="text-2xl text-center font-bold mb-4">User List</h1>
            {error && <p>Error: {error.message}</p>}
            {isLoading && <Spinner />}
            {searchusersInfo.length == 0 && <p>user not found</p>}
            <form className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="py-2 px-4 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </form>

            {myuser && (
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {searchusersInfo?.map(user => (
                                <tr key={user.user_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><img src={user.photo} alt={user.username} className="h-8 w-8 rounded-full" /></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link className='mr-3' onClick={() => getSingleUserInfo(user.user_id)}><button className='btn btn-primary' onClick={() => document.getElementById('my_modal_3').showModal()}>View</button></Link>
                                        <Link to={`/dashboard/edit-user/${user.user_id}`}><button className="btn btn-accent mr-3">Edit</button></Link>
                                        <button className="btn btn-error" onClick={() => deleteUser(user.user_id)}>X</button>
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

            {/* VIew Users modal */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">User Information</h3>
                    <table className="min-w-full bg-white border-separate border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">User ID</td>
                                <td className="border px-4 py-2">{signleUser.user_id}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Username</td>
                                <td className="border px-4 py-2">{signleUser.username}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Email</td>
                                <td className="border px-4 py-2">{signleUser.email}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Photo</td>
                                <td className="border px-4 py-2"><img src={signleUser.photo} alt="User" className="w-32 h-32" /></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Role</td>
                                <td className="border px-4 py-2">{signleUser.role_name}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Status</td>
                                <td className="border px-4 py-2">{signleUser.status}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Date of Birth</td>
                                <td className="border px-4 py-2">{signleUser.dob}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Gender</td>
                                <td className="border px-4 py-2">{signleUser.gender}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">ID No</td>
                                <td className="border px-4 py-2">{signleUser.id_no}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Department</td>
                                <td className="border px-4 py-2">{signleUser.dept}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Address</td>
                                <td className="border px-4 py-2">{signleUser.address}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Conditions</td>
                                <td className="border px-4 py-2">{signleUser.conditions}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Experience</td>
                                <td className="border px-4 py-2">{signleUser.experience}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-semibold">Phone</td>
                                <td className="border px-4 py-2">{signleUser.phone}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </dialog>


        </div>

    );
};

export default Users;
