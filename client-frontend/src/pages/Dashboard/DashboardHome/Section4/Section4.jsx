import React, { useEffect, useState } from 'react';
import useData from '../../../../hooks/globalHooks/useData';
import secureApi from '../../../../api/secureApi';
import moment from 'moment';

const Section4 = () => {
    const email = localStorage.getItem('email');
    const [id, setId] = useState(null);
    const [matches, setMatches] = useState([]);
    const { responseData: user, isLoading, error } = useData(email ? `/users/single/user?email=${email}` : null);

    useEffect(() => {
        if (user && user.user) {
            setId(user.user.user_id);

            async function getMatches() {
                try {
                    const res = await secureApi.get(`/players/team/playerschedule/${user.user.user_id}`);
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
        <div>
            <h3 >Match Schedule</h3>
            <hr className='mb-4' />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches.map((match, index) => (
                    <div key={index} className="border rounded-md p-4 shadow-md">
                        <h3 className="font-semibold text-lg mb-2">{moment(match.match_date).format('LL')}</h3>
                        <p><strong>Match Time:</strong> {match.match_time}</p>
                        <p><strong>Venue:</strong> {match.venue}</p>
                        <p><strong>Home Team:</strong> {match.home_team_name}</p>
                        <p><strong>Away Team:</strong> {match.away_team_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section4;
