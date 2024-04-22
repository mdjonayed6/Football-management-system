// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import secureApi from '../../../api/secureApi';

// const EditMatches = () => {
//     const { id } = useParams();
//     const navigate = useNavigate()
//     const [formData, setFormData] = useState({
//         match_id: '',
//         home_team_id: '',
//         away_team_id: '',
//         match_date: '',
//         match_time: '',
//         venue: '',
//         referee_id: ''
//     });

//     useEffect(() => {
//         const fetchMatchData = async () => {
//             try {
//                 const response = await secureApi.get(`/matches/${id}`);
//                 const matchData = response.match;

//                 setFormData(matchData);
//             } catch (error) {
//                 console.error('Error fetching match data:', error);
//             }
//         };

//         fetchMatchData();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // console.log(formData)
//         try {
//             const result = await secureApi.put(`/matches`, formData);
//             if (result.success) {
//                 window.alert('Match updated successfully:', result.message);
//                 navigate('/dashboard/view-matches')
//             } else {
//                 console.error('Match update failed:', result.message);
//                 // Show error message to user
//             }
//         } catch (error) {
//             console.error('Error updating match:', error);
//             // Show error message to user
//         }
//     };

//     return (
//         <div className="mt-5 p-5 max-w-lg mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Edit Match</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="home_team_id" className="block text-sm font-medium text-gray-700">Home Team ID:</label>
//                     <input
//                         type="text"
//                         id="home_team_id"
//                         name="home_team_id"
//                         value={formData.home_team_id}
//                         onChange={handleChange}
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="away_team_id" className="block text-sm font-medium text-gray-700">Away Team ID:</label>
//                     <input
//                         type="text"
//                         id="away_team_id"
//                         name="away_team_id"
//                         value={formData.away_team_id}
//                         onChange={handleChange}
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="match_date" className="block text-sm font-medium text-gray-700">Match Date:</label>
//                     <input
//                         type="date"
//                         id="match_date"
//                         name="match_date"
//                         value={formData.match_date}
//                         onChange={handleChange}
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"

//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="match_time" className="block text-sm font-medium text-gray-700">Match Time:</label>
//                     <input
//                         type="time"
//                         id="match_time"
//                         name="match_time"
//                         value={formData.match_time}
//                         onChange={handleChange}
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue:</label>
//                     <input
//                         type="text"
//                         id="venue"
//                         name="venue"
//                         value={formData.venue}
//                         onChange={handleChange}
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="referee_id" className="block text-sm font-medium text-gray-700">Referee ID:</label>
//                     <input
//                         type="text"
//                         id="referee_id"
//                         name="referee_id"
//                         value={formData.referee_id}
//                         onChange={handleChange}
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default EditMatches;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import teamsHooks from '../../../hooks/projectHooks/teamsHooks';

const EditMatches = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        match_id: '',
        home_team_id: '',
        away_team_id: '',
        match_date: '',
        match_time: '',
        venue: '',
        referee_id: ''
    });
    const [referees, setReferees] = useState([]);
    const { teamsInfo, isLoading, error, total, refetch } = teamsHooks(1, 100);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await secureApi.get(`/matches/${id}`);
                const matchData = response.match;

                setFormData(matchData);
            } catch (error) {
                console.error('Error fetching match data:', error);
            }
        };

        const fetchReferees = async () => {
            try {
                const response = await secureApi.get('/users/referee/user');
                if (response.success) {
                    setReferees(response.referies);
                }
            } catch (error) {
                console.error('Error fetching referees:', error);
            }
        };

        fetchMatchData();
        fetchReferees();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        try {
            const result = await secureApi.put(`/matches`, formData);
            if (result.success) {
                window.alert('Match updated successfully:', result.message);
                navigate('/dashboard/view-matches');
            } else {
                console.error('Match update failed:', result.message);
            }
        } catch (error) {
            console.error('Error updating match:', error.response.data.message);
        }
    };

    return (
        <div className="mt-5 p-5 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Match</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="home_team_id" className="block text-sm font-medium text-gray-700">Home Team:</label>
                    <select
                        id="home_team_id"
                        name="home_team_id"
                        value={formData.home_team_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Select Home Team</option>
                        {teamsInfo.map(team => (
                            <option key={team.team_id} value={team.team_id}>
                                {team.team_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="away_team_id" className="block text-sm font-medium text-gray-700">Away Team:</label>
                    <select
                        id="away_team_id"
                        name="away_team_id"
                        value={formData.away_team_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Select Away Team</option>
                        {teamsInfo.map(team => (
                            <option key={team.team_id} value={team.team_id}>
                                {team.team_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="match_date" className="block text-sm font-medium text-gray-700">Match Date:</label>
                    <input
                        type="date"
                        id="match_date"
                        name="match_date"
                        value={formData.match_date}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="match_time" className="block text-sm font-medium text-gray-700">Match Time:</label>
                    <input
                        type="time"
                        id="match_time"
                        name="match_time"
                        value={formData.match_time}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue:</label>
                    <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="referee_id" className="block text-sm font-medium text-gray-700">Referee:</label>
                    <select
                        id="referee_id"
                        name="referee_id"
                        value={formData.referee_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Select Referee</option>
                        {referees.map(referee => (
                            <option key={referee.user_id} value={referee.user_id}>
                                {referee.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
            </form>
        </div>
    );
};

export default EditMatches;
