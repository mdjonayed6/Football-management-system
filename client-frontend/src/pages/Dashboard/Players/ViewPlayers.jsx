import React, { useState } from 'react';
import playersHooks from '../../../hooks/projectHooks/playersHooks';
import Spinner from '../../../components/ui/Spinner';
import Pagination from 'rc-pagination/lib/Pagination';
import { Link } from 'react-router-dom';
import moment from 'moment';
import secureApi from '../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';

const ViewPlayers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { playersInfo, isLoading, error, total, refetch } = playersHooks(currentPage, itemsPerPage)
    // console.log(playersInfo)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDelete = async (id) => {
        const result = window.confirm('Are you sure you want to delete?')
        if (result) {
            const result = await secureApi.delete(`/players/${id}`)
            if (result.success == true) {
                toast.success('Deleted successfully')
                refetch()
            }
        } else {
            console.log('Not deleted')
        }
    }

    return (
        <div className="min-h-screen mt-5 px-4">
            <h1 className="text-2xl text-center font-bold mb-4">Players List</h1>
            {isLoading && <Spinner />}
            {playersInfo.length === 0 && <p>Data not found</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="overflow-x-auto">
                {playersInfo && (
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jersey Number</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {playersInfo?.map((player, index) => (
                                <tr key={player.player_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.player_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.player_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.team_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.jersey_number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{player.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{moment(player.date_of_birth).format('LL')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/dashboard/edit-players/${player.player_id}`}><button className="btn btn-accent mr-3">Edit</button></Link>
                                        <button className="btn btn-error mr-3" onClick={() => handleDelete(player.player_id)}>X</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
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
            <ToastContainer />
        </div>

    );
};

export default ViewPlayers;