// import React, { useState, useEffect } from 'react';
// import secureApi from '../../api/secureApi';
// import { useParams } from 'react-router-dom';
// import Spinner from '../../components/ui/Spinner';

// const RegisterPlayerDetails = () => {
//     const { id } = useParams()
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await secureApi.get(`/users/${id}`); // Replace 1 with the actual user ID
//                 setUserData(response.user);
//                 console.log(response.user)
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     if (!userData) {
//         return <div><Spinner /></div>; // You can show a loading indicator while data is being fetched
//     }

//     return (
//         <div className='min-h-screen mt-20 p-5'>
//             <div className="max-w-md mx-auto mt-5 p-4 border border-gray-300 rounded-md shadow">
//                 <h2 className="text-xl font-bold mb-4">Player Details</h2>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Username:</label>
//                     <p>{userData.username}</p>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Email:</label>
//                     <p>{userData.email}</p>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Role:</label>
//                     <p>{userData.role_name}</p>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Photo:</label>
//                     <div className='flex justify-center'>
//                         <div>
//                             <img src={userData.photo} alt="Player" className="w-32 rounded-md" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterPlayerDetails;


import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';

const RegisterPlayerDetails = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await secureApi.get(`/users/${id}`);
                setUserData(response.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    if (!userData) {
        return <div><Spinner /></div>;
    }

    return (
        <div className='min-h-screen mt-20 p-5'>
            <div className="max-w-4xl mx-auto mt-5 p-4 border border-gray-300 rounded-md shadow">
                <h2 className="text-xl font-bold mb-4">Player Details</h2>
                <div className="flex">
                    <div className="flex-none mr-6">
                        <img src={userData.photo} alt="Player" className="w-32 rounded-md" />
                        <p className="mt-2 text-center">{userData.username}</p>
                    </div>
                    <div className="flex-grow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Email:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.email}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Address:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.address}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Department:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.dept}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Conditions:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.conditions}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Experience:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.experience}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">DOB:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.dob}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Gender:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.gender}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">ID No:</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.id_no}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPlayerDetails;
