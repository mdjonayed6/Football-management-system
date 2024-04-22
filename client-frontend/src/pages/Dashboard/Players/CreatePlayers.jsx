import React, { useEffect, useState } from 'react';
import secureApi from '../../../api/secureApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CreatePlayers = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        team_id: '',
        user_id: '',
        position: '',
        jersey_number: '',
        date_of_birth: ''
    });
    const [coach, setCoach] = useState('');
    const email = localStorage.getItem('email');
    const navigate = useNavigate()

    useEffect(() => {
        async function coach() {
            try {
                const users = await secureApi.get(`/users/search/coach/${email}`)
                // setUser(users.users)
                setCoach(users.coach)
                setFormData(prevFormData => ({
                    ...prevFormData,
                    team_id: users.coach?.team_id
                }));
            } catch (error) {
                console.log(error)
            }
        }

        coach()
    }, [])


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
        // console.log(formData);
        try {
            const result = await secureApi.post('/players', formData)
            if (result.success === true) {
                toast.success(result.message);

                setTimeout(() => {
                    navigate('/dashboard/view-my-players');
                }, 1500);
            }

            else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    if (formData.team_id == undefined) {
        return <div className='mt-12 text-lg font-semibold text-center'>
            Currently you don't have any team. Contact with admin/authority.
        </div>
    }
    return (
        <div className="mt-5 p-5 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Player</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="team_id" className="block text-sm font-medium text-gray-700">Team Name:</label>
                    <input
                        type="text"
                        id="team_id"
                        name="team_id"
                        value={coach.team_name}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="team_id" className="block text-sm font-medium text-gray-700">Team ID:</label>
                    <input
                        type="text"
                        id="team_id"
                        name="team_id"
                        value={formData?.team_id}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID:</label>
                    <input
                        type="text"
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position:</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="jersey_number" className="block text-sm font-medium text-gray-700">Jersey Number:</label>
                    <input
                        type="text"
                        id="jersey_number"
                        name="jersey_number"
                        value={formData.jersey_number}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className='hidden'>
                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                    <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className=" mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreatePlayers;
