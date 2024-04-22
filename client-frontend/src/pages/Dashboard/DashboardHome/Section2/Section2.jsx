import React, { useState, useEffect } from 'react';
import secureApi from '../../../../api/secureApi';

const Section2 = () => {
    const [myTeam, setMyTeam] = useState([]);
    const [totalPlayer, setTotalPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await secureApi.get(`/total/${email}`);
                setMyTeam(response?.myTeam);
                setTotalPlayer(response?.totalPlayer[0]?.num_players);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching team data:', error);
                setIsLoading(false);
            }
        };

        fetchTeamData();
    }, [email]);

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    return (
        <section className='mt-16 flex flex-wrap justify-center'>
            {myTeam.length === 0 ? (
                <p className="text-center mt-4 text-gray-600">You don't have any team.</p>
            ) : (
                <div className="">
                    {myTeam.map((team) => (
                        <div key={team.team_id} className="bg-white w-96 mr-3 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out mb-6">
                            <img src={team.logo} alt={team.team_name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <div className="font-bold text-xl mb-2">{team.team_name}</div>
                                <p className="text-gray-700 text-base">
                                    Coach: {team.username}
                                    <br />
                                    Email: {team.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center w-full">
                <div className="bg-white rounded-lg overflow-hidden shadow-md p-6 text-center w-full">
                    <i className="fas fa-users text-5xl text-blue-500 mb-4"></i>
                    <div className="text-xl font-bold mb-2 text-blue-500">Total Players</div>
                    <div className="text-3xl font-bold mb-4 text-gray-700">
                        {totalPlayer ? totalPlayer : 'N/A'}
                    </div>
                    <p className="text-gray-500">Players associated with your teams</p>
                </div>
            </div>
        </section>
    );
};

export default Section2;
