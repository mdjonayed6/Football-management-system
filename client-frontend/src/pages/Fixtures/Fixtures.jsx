import React, { useState } from 'react';
import matchesHooks from '../../hooks/projectHooks/matchesHooks';
import Pagination from 'rc-pagination/lib/Pagination';
import { Link } from 'react-router-dom';
import secureApi from '../../api/secureApi';
import moment from 'moment';

const Fixtures = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { matchesInfo, isLoading, error, total, refetch } = matchesHooks(currentPage, itemsPerPage);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    return (
        <div className="container min-h-screen mt-20 mx-auto px-4 lg:px-24">
        <h2 className="text-2xl font-bold my-4 text-center">Match Fixtures</h2>
        {isLoading && <p>Loading matches...</p>}
        {error && <p>Error: {error.message}</p>}
        {matchesInfo && matchesInfo && (
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 py-2 px-4">Match ID</th>
                            <th className="border border-gray-400 py-2 px-4">Home Team</th>
                            <th className="border border-gray-400 py-2 px-4">Away Team</th>
                            <th className="border border-gray-400 py-2 px-4">Match Date</th>
                            <th className="border border-gray-400 py-2 px-4">Match Time</th>
                            <th className="border border-gray-400 py-2 px-4">Venue</th>
                            <th className="border border-gray-400 py-2 px-4">Referee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchesInfo.map(match => (
                            <tr key={match.match_id}>
                                <td className="border border-gray-400 py-2 px-4">{match.match_id}</td>
                                <td className="border border-gray-400 py-2 px-4">{match.home_team_name}</td>
                                <td className="border border-gray-400 py-2 px-4">{match.away_team_name}</td>
                                <td className="border border-gray-400 py-2 px-4">{moment(new Date(match.match_date).toLocaleDateString()).format('LL')}</td>
                                <td className="border border-gray-400 py-2 px-4">{match.match_time}</td>
                                <td className="border border-gray-400 py-2 px-4">{match.venue}</td>
                                <td className="border border-gray-400 py-2 px-4">{match.referee_name}</td>
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

export default Fixtures;
