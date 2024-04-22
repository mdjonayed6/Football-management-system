import React, { useEffect, useState } from 'react';
import secureApi from '../../../../api/secureApi';

const Section1 = () => {
    const [totalPlayers, setTotalPlayers] = useState(null)
    const [totalCoach, setTotalCoach] = useState(null)
    const [totalTeams, setTotalTeams] = useState(null)
    const [totalReferee, setTotalReferee] = useState(null)
    const [recentPlayers, setRecentPlayers] = useState([])
    useEffect(() => {
        async function totalPlayers() {
            try {
                const result = await secureApi.get('/total/players')
                // console.log(result)
                setTotalPlayers(result.totalPlayers)
                setTotalCoach(result.totalCoaches)
                setTotalTeams(result.totalTeams)
                setTotalReferee(result.totalReferee)
                setRecentPlayers(result.recentPlayers)
            } catch (error) {
                console.log(error)
            }
        }

        totalPlayers()
    }, [])
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {/* Total Players Card */}
                <div className="bg-blue-500 text-white rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-4 h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-xl font-semibold">Total Players</h3>
                            <p className="text-sm">{totalPlayers}</p>
                        </div>
                    </div>
                </div>

                {/* Total Coaches Card */}
                <div className="bg-green-500 text-white rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-4 h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-xl font-semibold">Total Coaches</h3>
                            <p className="text-sm">{totalCoach}</p>
                        </div>
                    </div>
                </div>

                {/* Total Teams Card */}
                <div className="bg-yellow-500 text-white rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-4 h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-xl font-semibold">Total Teams</h3>
                            <p className="text-sm">{totalTeams}</p>
                        </div>
                    </div>
                </div>

                {/* Total Referee Card */}
                <div className="bg-red-500 text-white rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-4 h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-xl font-semibold">Total Referees</h3>
                            <p className="text-sm">{totalReferee}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Added players */}
            <div className=" mx-2 mt-5 p-4 border border-gray-300 rounded-md shadow">
                <h2 className="text-xl font-bold mb-4">Recent Registered Players</h2>
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4">Username</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Department</th>
                            <th className="py-2 px-4">Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentPlayers.map(player => (
                            <tr key={player.user_id}>
                                <td className="border px-4 py-2">{player.username}</td>
                                <td className="border px-4 py-2">{player.email}</td>
                                <td className="border px-4 py-2">{player.dept}</td>
                                <td className="border px-4 py-2">{player.experience}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default Section1;
