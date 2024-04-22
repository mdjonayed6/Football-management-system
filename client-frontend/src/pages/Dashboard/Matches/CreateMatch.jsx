// import React, { useState } from 'react';
// import secureApi from '../../../api/secureApi';
// import { useNavigate } from 'react-router-dom';
// import teamsHooks from '../../../hooks/projectHooks/teamsHooks';

// const CreateMatch = () => {
//     const [formData, setFormData] = useState({
//         home_team_id: '',
//         away_team_id: '',
//         match_date: '',
//         match_time: '',
//         venue: 'IUBAT',
//         referee_id: ''
//     });
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 100;
//     const { teamsInfo, isLoading, error, total, refetch } = teamsHooks(currentPage, itemsPerPage)

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };
//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // console.log(formData); // Output form data to console
//         try {
//             const result = await secureApi.post('/matches', formData)
//             if (result.success == true) {
//                 window.alert(result.message)
//                 navigate('/dashboard/view-matches') //TODO: change to view-matches
//             }
//         } catch (error) {
//             window.alert(error.response.data.message)
//         }
//     };

//     return (
//         <div className="p-5 mt-5 max-w-md mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Create Match</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="home_team_id" className="block text-sm font-medium text-gray-700">Home Team ID:</label>
//                     <input
//                         type="text"
//                         id="home_team_id"
//                         name="home_team_id"
//                         value={formData.home_team_id}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
//                         required
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
//                         required
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
//                         required
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
//                         required
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
//                         required
//                         className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default CreateMatch;


import React, { useEffect, useState } from 'react';
import secureApi from '../../../api/secureApi';
import { useNavigate } from 'react-router-dom';
import teamsHooks from '../../../hooks/projectHooks/teamsHooks';
import { ToastContainer, toast } from 'react-toastify';
// import teamsHooks from '../../../hooks/teamsHooks'; // Import your teamsHooks

const CreateMatch = () => {
    const [formData, setFormData] = useState({
        home_team_id: '',
        away_team_id: '',
        match_date: '',
        match_time: '',
        venue: 'IUBAT',
        referee_id: ''
    });
    const [referees, setReferees] = useState([]);
    const { teamsInfo, isLoading, error, total, refetch } = teamsHooks(1, 100); // Using teamsHooks directly

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
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

        fetchReferees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        try {
            const result = await secureApi.post('/matches', formData);
            if (result.success === true) {
                toast.success(result.message);
                setTimeout(() => {
                    navigate('/dashboard/view-matches');
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="p-5 mt-5 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Match</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="home_team_id" className="block text-sm font-medium text-gray-700">Home Team:</label>
                    <select
                        id="home_team_id"
                        name="home_team_id"
                        value={formData.home_team_id}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                        required
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                        required
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
                        required
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                        required
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="referee_id" className="block text-sm font-medium text-gray-700">Referee:</label>
                    <select
                        id="referee_id"
                        name="referee_id"
                        value={formData.referee_id}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <ToastContainer />
        </div>
    );
};

export default CreateMatch;
