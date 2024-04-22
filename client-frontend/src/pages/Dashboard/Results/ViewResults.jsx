import React, { useState } from 'react';
import resultsHooks from '../../../hooks/projectHooks/resultsHooks';
import Pagination from 'rc-pagination/lib/Pagination';
import { Link } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const ViewResults = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { resultsInfo, isLoading, error, total, refetch } = resultsHooks(currentPage, itemsPerPage)
    // console.log(resultsInfo)
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    // Delete Mathces
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this match?');
        if (confirmed) {
            try {
                const response = await secureApi.delete(`/results/${id}`);
                if (response.success == true) {
                    alert('Result deleted successfully');
                    refetch();
                } else {
                    alert('Failed to delete Result');
                }
            } catch (error) {
                console.error('Error deleting Result:', error);
                alert('Failed to delete Result');
            }
        }
    };


    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold my-4 text-center">Game Results</h2>
            {isLoading && <p>Loading matches...</p>}
            {error && <p>Error: {error.message}</p>}
            {resultsInfo && resultsInfo && (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 py-2 px-4">SL</th>
                                <th className="border border-gray-400 py-2 px-4">Match ID</th>
                                <th className="border border-gray-400 py-2 px-4">Home Team</th>
                                <th className="border border-gray-400 py-2 px-4">Away Team</th>
                                <th className="border border-gray-400 py-2 px-4">Home Team Score</th>
                                <th className="border border-gray-400 py-2 px-4">Away Team Score</th>
                                <th className="border border-gray-400 py-2 px-4">Winner Team</th>
                                <th className="border border-gray-400 py-2 px-4" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultsInfo.map((match, index) => (
                                <tr key={index + 1}>
                                    <td className="border border-gray-400 py-2 px-4">{index + 1}</td>
                                    <td className="border border-gray-400 py-2 px-4">{match.match_id}</td>
                                    <td className="border border-gray-400 py-2 px-4">{match.home_team_name}</td>
                                    <td className="border border-gray-400 py-2 px-4">{match.away_team_name}</td>
                                    <td className="border border-gray-400 py-2 px-4">{match.home_team_score}</td>
                                    <td className="border border-gray-400 py-2 px-4">{match.away_team_score}</td>
                                    <td className="border border-gray-400 py-2 px-4">{match.winner_team_name}</td>
                                    <td className="border border-gray-400 py-2 px-4">
                                        <Link to={`/dashboard/edit-results/${match.result_id}`}><button className="btn btn-accent mr-3">Edit</button></Link>
                                        <button className="btn btn-error mr-3" onClick={() => handleDelete(match.result_id)}>X</button>
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

export default ViewResults;