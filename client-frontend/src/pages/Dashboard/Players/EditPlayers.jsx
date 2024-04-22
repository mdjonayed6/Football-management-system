import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const EditPlayers = () => {
    const [singlePlayer, setSinglePlayer] = useState([])
    const [playerId, setPlayerId] = useState('')
    const [teamId, setTeamId] = useState('')
    const [position, setPosition] = useState('')
    const [jerseyNo, setJerseyNo] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function playerInfo() {
            const info = await secureApi.get(`/players/${id}`)
            setSinglePlayer(info.player)
            setPlayerId(info.player.user_id)
            setTeamId(info.player.team_id)
            setPosition(info.player.position)
            setJerseyNo(info.player.jersey_number)
            setDateOfBirth(info.player.date_of_birth)
        }
        playerInfo()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const playerInfo = {
            player_id: id,
            team_id: teamId,
            user_id: playerId,
            position: position,
            jersey_number: jerseyNo,
            date_of_birth: dateOfBirth,
        }

        const result = window.confirm('Are you sure you want to update this??')
        if (result) {
            const result = await secureApi.put('/players', playerInfo)
            if (result.success == true) {
                window.alert(result.message)
                navigate('/dashboard/view-players')
            }
            else {
                window.alert('Could not update', result.message)
            }
        }
        else {
            console.log('Not updated')
        }

    }

    return (
        <div className='p-5'>
            <h1 className="text-2xl text-center mt-5 font-bold mb-4">Edit Players</h1>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">User ID</label>
                    <input defaultValue={singlePlayer.user_id} onChange={(e) => setPlayerId(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" required />
                    <label htmlFor="">Team ID</label>
                    <input defaultValue={singlePlayer.team_id} onChange={(e) => setTeamId(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" required readOnly />
                    <label htmlFor="">Position</label>
                    <input defaultValue={singlePlayer.position} onChange={(e) => setPosition(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" required />
                    <label htmlFor="">Jersey No</label>
                    <input defaultValue={singlePlayer.jersey_number} onChange={(e) => setJerseyNo(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" required />
                    <label htmlFor="">Date of Birth</label>
                    <input type="date" defaultValue={singlePlayer.date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)} className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Name" />
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default EditPlayers;