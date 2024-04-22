import axios from 'axios';
import React, { useEffect, useState } from 'react';
import secureApi from '../../../api/secureApi';

const CreateTeams = () => {
    const [user, setUser] = useState([])
    const [teamName, setTeamName] = useState('')
    const [coachId, setCoachId] = useState('')
    const [logo, setLogo] = useState('')
    const email = localStorage.getItem('email')

    const handleImage = (e) => {
        const image = e.target.files[0];
        setLogo(image);
    };

    // Fetched users details
    useEffect(() => {
        async function users() {
            try {
                const users = await secureApi.get('/total/print-coach')
                setUser(users.players)
                // console.log(users)
            } catch (error) {
                console.log(error)
            }
        }

        users()
    }, [])

    // Add to database
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (coachId == '') {
            return window.alert('Coach is required')
        }
        const formdata = new FormData()
        formdata.append('team_name', teamName)
        formdata.append('coach_id', coachId)
        formdata.append('photo', logo)
        console.log(teamName, coachId, logo)
        try {
            const res = await axios.post(`${import.meta.env.VITE_PUBLIC_API}/teams`, formdata)
            if (res.data.success == true) {
                window.alert(res.data.message)
                setTeamName('')
            }
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }

    // console.log(user)
    return (
        <div className='p-5'>
            <h1 className="text-2xl text-center mt-5 font-bold mb-4">Create Team</h1>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setTeamName(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" required />
                    {/* <input onChange={(e) => setCoachId(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Coach Id" required /> */}
                    <select name="" id="" defaultValue={coachId} onChange={(e) => setCoachId(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                        <option value={''}>Choose Coach</option>
                        {
                            user.map(use => (
                                <option key={use.user_id} value={use?.user_id}>{use.username}</option>
                            ))
                        }
                    </select>
                    <input type="file" name="photo" accept="image/*" onChange={handleImage} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default CreateTeams;