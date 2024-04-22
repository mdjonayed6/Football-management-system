import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const MyTeamPlayer = () => {
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await secureApi.get(`/players/team/myteamplayer/${id}`);
                setPlayers(response?.result);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching players:', error);
                setIsLoading(false);
            }
        };

        fetchPlayers();
    }, [id]);

    const fetchUserInfo = async (userId) => {
        try {
            const response = await secureApi.get(`/users/${userId}`);
            setSelectedUser(response?.user);
            document.getElementById('user_modal').showModal();
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    return (
        <div className="container mx-auto mt-16 px-12">
            <h1 className="text-2xl font-semibold mb-4">Players in Team</h1>
            <table className="min-w-full bg-white border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Team Name</th>
                        <th className="border border-gray-300 px-4 py-2">Logo</th>
                        <th className="border border-gray-300 px-4 py-2">Coach ID</th>
                        <th className="border border-gray-300 px-4 py-2">Coach Username</th>
                        <th className="border border-gray-300 px-4 py-2">Player ID</th>
                        <th className="border border-gray-300 px-4 py-2">Player Username</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.user_id}>
                            <td className="border border-gray-300 px-4 py-2">{player.team_name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img src={player.logo} alt={player.team_name} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="btn btn-link" onClick={() => fetchUserInfo(player.coach_id)}>
                                    {player.coach_id}
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{player.coach_username}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="btn btn-link" onClick={() => fetchUserInfo(player.user_id)}>
                                    {player.user_id}
                                </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{player.player_username}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for User Info */}
            {/* <dialog id="user_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('user_modal').close()}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">User Info</h3>
                    {selectedUser && (
                        <div>
                            <p className="py-2">Username: {selectedUser.username}</p>
                            <p className="py-2">Email: {selectedUser.email}</p>
                        </div>
                    )}
                </div>
            </dialog> */}
            {/* Modal for User Info */}
            {/* Modal for User Info */}
            <dialog id="user_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('user_modal').close()}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Details</h3>
                    {selectedUser && (
                        <table className="min-w-full bg-white border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>User ID</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.user_id}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Username</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.username}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Email</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.email}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Registered at</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.created_at}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Date of Birth</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.dob}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Gender</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.gender}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Dept</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.dept}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Experience</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.experience}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Phone</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.phone}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Role</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">{selectedUser.role_name}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Photo</strong></td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={selectedUser.photo} alt={selectedUser.username} className="w-32 h-32 object-cover" />
                                    </td>
                                </tr>
                                {/* Add other fields similarly */}
                            </tbody>
                        </table>
                    )}
                </div>
            </dialog>


        </div>
    );
};

export default MyTeamPlayer;
