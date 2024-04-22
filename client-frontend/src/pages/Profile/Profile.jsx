import React, { useEffect, useState } from 'react';
import useData from '../../hooks/globalHooks/useData';

const Profile = () => {
    const [user, setUser] = useState({});
    const email = localStorage.getItem('email');

    // Only fetch data if email is present in localStorage
    const { responseData: userInfo, refetch, isLoading, error } = useData(email ? `/users/single/user?email=${email}` : null);

    useEffect(() => {
        if (!isLoading && !error) {
            setUser(userInfo?.user);
        }
    }, [isLoading, error]);

    return (
        <div className='min-h-screen mt-24'>
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex">
                <div className="w-1/2 pr-4">
                    <div className="text-left mb-4">
                        <img src={user?.photo} alt="Profile" className="w-32 h-32 mx-auto rounded-full mb-4" />
                        <h2 className="text-xl text-center font-bold">{user?.username}</h2>
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">User Information</h3>
                        <table className="min-w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Email:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.email}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Date of Birth:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.dob}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Gender:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.gender}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">ID:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.id_no}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Dept:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.dept}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Address:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.address}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Condition:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.conditions}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Experience:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.experience}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Phone:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.phone || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Role:</td>
                                    <td className="border border-gray-300 px-4 py-2">{user?.role_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
