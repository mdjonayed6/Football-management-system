import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import axios from 'axios';

const EditTeams = () => {
    const [singleTeam, setSingleTeam] = useState([])
    const [users, setUsers] = useState([])
    const [teamName, setTeamName] = useState('')
    const [coachId, setCoachId] = useState('')
    const [logo, setLogo] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function users() {
            const users = await secureApi.get('/total/print-coach')
            setUsers(users.players)
        }
        async function singleUser() {
            const singTeams = await secureApi.get(`/teams/${id}`)
            setSingleTeam(singTeams.team)
        }

        users()
        singleUser()
    }, [id])

    const handleImage = (e) => {
        const image = e.target.files[0];
        setLogo(image);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (coachId == '') {
            return window.alert('Coach is required')
        }
        const formdata = new FormData()
        formdata.append('team_id', id)
        formdata.append('team_name', teamName)
        formdata.append('coach_id', coachId)
        formdata.append('photo', logo)
        // console.log(teamName, coachId, logo)
        try {
            const res = await axios.put(`${import.meta.env.VITE_PUBLIC_API}/teams`, formdata)
            // console.log(res)
            if (res.data.success == true) {
                window.alert(res.data.message)
                setTeamName('')
                navigate('/dashboard/view-teams')
            }
        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <div className='p-5'>
            <h1 className="text-2xl text-center mt-5 font-bold mb-4">Edit Team</h1>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <input defaultValue={singleTeam.team_name} onChange={(e) => setTeamName(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" required />
                    {/* <input onChange={(e) => setCoachId(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Coach Id" required /> */}
                    <select defaultValue={singleTeam.coach_id} onChange={(e) => setCoachId(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                        <option value={singleTeam.coach_id}>{singleTeam.coach_username}</option>
                        {
                            users.map(use => (
                                <option key={use.user_id} value={use?.user_id}>{use.username}</option>
                            ))
                        }
                    </select>
                    <input type="file" name="photo" accept="image/*" onChange={handleImage} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default EditTeams;