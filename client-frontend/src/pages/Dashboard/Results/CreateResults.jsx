import React, { useState } from 'react';
import secureApi from '../../../api/secureApi';
import { useNavigate } from 'react-router-dom';

const CreateResults = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        match_id: '',
        home_team_score: '',
        away_team_score: '',
        winner_team_id: ''
    });

    const navigate = useNavigate()

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData); // Output form data to console
        
        try {
            const result = await secureApi.post('/results', formData)
            if (result.success == true) {
                window.alert(result.message)
                navigate('/dashboard/view-results')
            }
        } catch (error) {
            window.alert(error.response.data.message)
        }
    };

    return (
        <div className="mt-5 p-5 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Results</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="match_id" className="block text-sm font-medium text-gray-700">Match ID:</label>
                    <input
                        type="text"
                        id="match_id"
                        name="match_id"
                        value={formData.match_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="home_team_score" className="block text-sm font-medium text-gray-700">Home Team Score:</label>
                    <input
                        type="text"
                        id="home_team_score"
                        name="home_team_score"
                        value={formData.home_team_score}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="away_team_score" className="block text-sm font-medium text-gray-700">Away Team Score:</label>
                    <input
                        type="text"
                        id="away_team_score"
                        name="away_team_score"
                        value={formData.away_team_score}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="winner_team_id" className="block text-sm font-medium text-gray-700">Winner Team ID:</label>
                    <input
                        type="text"
                        id="winner_team_id"
                        name="winner_team_id"
                        value={formData.winner_team_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"                     
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
            </form>
        </div>
    );
};

export default CreateResults;
