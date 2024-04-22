import React, { useState } from 'react';
import secureApi from '../../../api/secureApi';
import { useNavigate } from 'react-router-dom';

const CreateRoles = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const roles = {
            role_name: role
        }

        try {
            const response = await secureApi.post('/roles', roles)
            if (response.success == true) {
                window.alert(response.message)
                navigate('/dashboard/view-roles')
                setRole('')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-5'>
            <h1 className="text-2xl text-center mt-5 font-bold mb-4">Create Role</h1>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <input className="mt-1 p-2 block w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" onChange={(e) => setRole(e.target.value)} placeholder="Name" required />
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default CreateRoles;