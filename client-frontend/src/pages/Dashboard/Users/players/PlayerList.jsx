import React, { useState, useEffect, useRef } from 'react';
import secureApi from '../../../../api/secureApi';
import { useReactToPrint } from 'react-to-print';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const componentRef = useRef();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await secureApi.get('/total/print-player');
                setPlayers(response.players);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <div className="container mx-auto mt-5 p-4">
            <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrint}>
                Print
            </button>
            <div ref={componentRef} className='px-3'>
                <h2 className="text-xl mb-4">Player List</h2>
                <hr />
                <table className="min-w-full leading-normal" >
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Username
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Experience
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                DOB
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Gender
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID No
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Address
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Conditions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={player.user_id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {index + 1}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.username}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.email}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.dept}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.experience}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.phone}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.dob}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.gender}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.id_no}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.address}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {player.conditions}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PlayerList;
