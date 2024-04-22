import React, { useState, useEffect } from 'react';
import secureApi from '../../../api/secureApi';
import { useNavigate, useParams } from 'react-router-dom';

const EditResult = () => {
    const { id } = useParams();
    const [result, setResult] = useState({
        match_id: '',
        home_team_id: '',
        away_team_id: '',
        home_team_score: '',
        away_team_score: '',
        winner_team_id: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await secureApi.get(`/results/${id}`);
                setResult(response.result);
            } catch (error) {
                console.error('Error fetching result:', error);
            }
        };
        fetchResult();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResult(prevResult => ({
            ...prevResult,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(result)
        try {
            const response = await secureApi.put(`/results`, result);
            if (response.success == true) {
                window.alert(response.message)
                navigate('/dashboard/view-results')
            }
            // Handle success, e.g., show success message or redirect
        } catch (error) {
            window.alert('Error updating result:', error.response.data.message);
            // Handle error, e.g., show error message
        }
    };


    return (
        <div className="mt-5 max-w-md mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Edit Result</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="match_id" className="block text-sm font-medium text-gray-700">Result ID:</label>
                    <input
                        type="text"
                        id="result_id"
                        name="result_id"
                        value={result.result_id}
                        onChange={handleChange}
                        readOnly
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="match_id" className="block text-sm font-medium text-gray-700">Match ID:</label>
                    <input
                        type="text"
                        id="match_id"
                        name="match_id"
                        value={result.match_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="home_team_score" className="block text-sm font-medium text-gray-700">Home Team Score:</label>
                    <input
                        type="number"
                        id="home_team_score"
                        name="home_team_score"
                        value={result.home_team_score}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="away_team_score" className="block text-sm font-medium text-gray-700">Away Team Score:</label>
                    <input
                        type="number"
                        id="away_team_score"
                        name="away_team_score"
                        value={result.away_team_score}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="winner_team_id" className="block text-sm font-medium text-gray-700">Winner Team ID:</label>
                    <input
                        type="text"
                        id="winner_team_id"
                        name="winner_team_id"
                        value={result.winner_team_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
            </form>
        </div>
    );
};

export default EditResult;
