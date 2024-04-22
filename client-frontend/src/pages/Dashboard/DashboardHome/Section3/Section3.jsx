import React, { useEffect, useState } from 'react';
import useData from '../../../../hooks/globalHooks/useData';
import secureApi from '../../../../api/secureApi';

const Section3 = () => {
    const email = localStorage.getItem('email');
    const [id, setId] = useState(null);
    const [matches, setMatches] = useState([]);
    const { responseData: user, isLoading, error } = useData(email ? `/users/single/user?email=${email}` : null);

    useEffect(() => {
        if (user && user.user) {
            setId(user.user.user_id);

            async function getMatches() {
                try {
                    const res = await secureApi.get(`/referees/match/${user.user.user_id}`);
                    setMatches(res.result || []);
                    // console.log(res.result);
                } catch (error) {
                    console.error('Error fetching matches:', error);
                }
            }

            getMatches();
        }
    }, [user]);

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-16">Error fetching data</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Match Details</h2>
                        <hr />
                        <div className="mb-4">
                            <strong>Match ID:</strong> {match?.match_id}
                        </div>
                        <div className="mb-4">
                            <strong>Home Team Name:</strong> {match?.home_team_name}
                        </div>
                        <div className="mb-4">
                            <strong>Home Team ID:</strong> {match?.home_team_id}
                        </div>
                        <div className="mb-4">
                            <strong>Away Team Name:</strong> {match?.away_team_name}
                        </div>
                        <div className="mb-4">
                            <strong>Away Team ID:</strong> {match?.away_team_id}
                        </div>
                        <div className="mb-4">
                            <strong>Match Date:</strong> {new Date(match?.match_date).toLocaleDateString()}
                        </div>
                        <div className="mb-4">
                            <strong>Match Time:</strong> {match?.match_time}
                        </div>
                        <div className="mb-4">
                            <strong>Venue:</strong> {match?.venue}
                        </div>
                    </div>
                </div>
            ))}
        </div>


    );
};

export default Section3;
