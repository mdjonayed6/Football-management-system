import React, { useEffect, useState } from 'react';
import secureApi from '../../../api/secureApi';
import { Link } from 'react-router-dom';

const MyTeam = () => {
    const [team, setTeam] = useState([]);
    const email = localStorage.getItem('email');

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await secureApi.get(`/players/team/myteam/${email}`);
                // console.log(response)
                setTeam(response.result);
            } catch (error) {
                console.error('Error fetching team:', error);
            }
        }

        fetchTeam();
    }, [email]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h3 className="text-center text-2xl font-bold mb-4">My Team</h3>
            {team.length === 0 && <p className="text-center">Team not found</p>}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {team.map((player, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={player?.team_logo} alt={player?.team_name} className="w-full h-32 object-cover" />
                        <p className="text-xl text-center font-semibold mt-2">Team: {player?.team_name}</p>
                        <p className="text-xl text-center font-semibold mt-2">Team_ID: {player?.team_id}</p>
                        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out mb-4">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <span className=" text-lg font-bold mb-2 mr-2">{player?.coach_name}</span>
                                    <img src={player?.coach_photo} alt={player?.team_name} className="w-10 h-10 rounded-full" />
                                </div>
                            </div>
                            <div>
                                <Link to={`/dashboard/my-team-player/${player?.team_id}`}><button className='btn btn-accent mt-5'>View Players</button></Link>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTeam;
