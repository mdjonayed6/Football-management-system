import React, { useState, useEffect } from 'react';
import Spinner from '../../../components/ui/Spinner';
import moment from 'moment';
import secureApi from '../../../api/secureApi';
import { Link } from 'react-router-dom';
import playersHooks from '../../../hooks/projectHooks/playersHooks';

const ViewMyPlayer = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [singlePager, setSinglePager] = useState(null);
    const { refetch } = playersHooks(1, 5)
    const email = localStorage.getItem('email');
    // const email = 'admin@gmail.com';

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await secureApi.get(`/players/coach/player/${email}`);
                setPlayers(response.result);
                // console.log(response.result)
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchPlayers();
    }, [email]);

    const handleDelete = async (id) => {
        const result = window.confirm('Are you sure you want to delete?')
        if (result) {
            const result = await secureApi.delete(`/players/${id}`)
            if (result.success == true) {
                window.alert('Deleted successfully')
                refetch()
            }
        } else {
            console.log('Not deleted')
        }
    }


    // Getting single player info
    const getSingleUserInfo = async (email) => {
        // console.log(email)
        const res = await secureApi.get(`users/single/user?email=${email}`)
        setSinglePager(res.user)
    }


    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (players.length == 0) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-2xl text-center mt-5 font-bold mb-4">No Players Found</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen mt-5 px-4">
            <h1 className="text-2xl text-center font-bold mb-4">My Players List</h1>
            <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jersey Number</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th> */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {players.map((player, index) => (
                            <tr key={player.player_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{player.player_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{player.team_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{player.jersey_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{player.position}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{moment(player.date_of_birth).format('LL')}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link onClick={() => getSingleUserInfo(player.player_email)}><button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn btn-primary mr-3">View</button></Link>
                                    <Link to={`/dashboard/edit-players/${player.player_id}`}><button className="btn btn-accent mr-3">Edit</button></Link>
                                    <button className="btn btn-error mr-3" onClick={() => handleDelete(player.player_id)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => { document.getElementById('my_modal_4').close(); }}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Player Information</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">User ID:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.user_id}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Username:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.username}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Email:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.email}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Role:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.role_name}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Department:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.dept}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Address:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.address}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Conditions:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.conditions}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Experience:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.experience}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Phone:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{singlePager?.phone || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Photo:</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={singlePager?.photo} alt="User" className="w-24 h-24 object-cover rounded-full" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default ViewMyPlayer;
