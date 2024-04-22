import React, { useState } from 'react';
import teamsHooks from '../../../hooks/projectHooks/teamsHooks';
import Spinner from '../../../components/ui/Spinner';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination/lib/Pagination';

const ViewTeams = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;
    const { teamsInfo, isLoading, error, total, refetch } = teamsHooks(currentPage, itemsPerPage)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // TODO: NEXT
    const handleDelete = (id) => {

    }

    return (
        <div className="min-h-screen mt-5 px-4">
            <h1 className="text-2xl text-center font-bold mb-4">Team List</h1>
            {isLoading && <Spinner />}
            {error && <p>Error: {error.message}</p>}
            <div className="overflow-x-auto">
                {teamsInfo && (
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coach Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coach Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teamsInfo?.map((team, index) => (
                                <tr key={team.team_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{team.team_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{team.team_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{team.coach_username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{team.coach_email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><img src={team.logo} alt={team.team_name} className="h-8 w-8 rounded-full" /></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/dashboard/edit-teams/${team.team_id}`}><button className="btn btn-accent mr-3">Edit</button></Link>
                                        {/* <button className="btn btn-error mr-3" onClick={() => handleDelete(team.team_id)}>X</button> */}
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
        </div>

    );
};

export default ViewTeams;