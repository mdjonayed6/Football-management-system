import React, { useState } from 'react';
import playersHooks from '../../hooks/projectHooks/playersHooks';
import Spinner from '../../components/ui/Spinner';
import Pagination from 'rc-pagination/lib/Pagination';
import { Link } from 'react-router-dom';
import moment from 'moment';
import secureApi from '../../api/secureApi';
import searchPlayerHooks from '../../hooks/projectHooks/searchPlayerHooks';

const RegisteredPlayers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;
    const { playersInfo, isLoading, error, total, refetch } = playersHooks(currentPage, itemsPerPage)
    const { searchPlayerInfo } = searchPlayerHooks(searchTerm, currentPage, itemsPerPage)
    // console.log(playersInfo)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Search Input Change
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="min-h-screen mt-20 px-4 lg:px-32">
            <h1 className="text-2xl text-center mt-5 font-bold mb-4"> Registered Players List</h1>
            {isLoading && <Spinner />}
            {searchPlayerInfo.length === 0 && <p className='text-red-500 text-center'>Data not found</p>}
            {error && <p>Error: {error.message}</p>}

            <form className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="py-2 px-4 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </form>

            {playersInfo && (
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jersery Number</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {searchPlayerInfo.map((player, index) => (
                                <tr key={player.player_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.player_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.player_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.team_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.jersey_number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{moment(player.date_of_birth).format('LL')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/players/${player.user_id}`}>
                                            <button className="btn btn-accent">View</button>
                                        </Link>
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
        </div>

    );
};

export default RegisteredPlayers;