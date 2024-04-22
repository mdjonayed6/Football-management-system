// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import secureApi from '../../../api/secureApi';

// const EditUser = () => {
//     const [userData, setUserData] = useState({});
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [role_id, setRoleId] = useState('');
//     const [photo, setPhoto] = useState(null);
//     const [roles, setRoles] = useState([]);
//     const { id } = useParams();
//     const navigate = useNavigate()

//     // Getting the single user info
//     useEffect(() => {
//         secureApi.get(`/users/${id}`)
//             .then(res => {
//                 setUserData(res.user);
//                 setName(res.user.username);
//                 setEmail(res.user.email);
//                 setRoleId(res.user.role_id);
//             })
//             .catch(err => {
//                 console.log(err);
//             });

//         // Fetching roles
//         secureApi.get('/roles')
//             .then(res => {
//                 setRoles(res.result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, [id]);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // console.log(name, email, role_id)
//         try {
//             const formData = new FormData();
//             formData.append('username', name);
//             formData.append('email', email);
//             formData.append('role_id', role_id);

//             // Check if photo is not null before appending to formData
//             if (photo) {
//                 formData.append('photo', photo);
//             }

//             const response = await axios.put(`${import.meta.env.VITE_PUBLIC_API}/users`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             if (response.data.success == true) {
//                 window.alert(response.data.message);
//                 navigate('/dashboard/view-users');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };


//     const handleImage = (e) => {
//         const image = e.target.files[0];
//         setPhoto(image);
//     };

//     return (
//         <div className="mt-5 max-w-lg mx-auto px-5 lg:px-12 py-5">
//             <h2 className="text-2xl font-bold mb-4">Edit User</h2>
//             <form onSubmit={handleSubmit}>
//                 <input className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" defaultValue={userData?.username} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//                 <input type="email" value={userData.email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" readOnly />
//                 <input type="text" defaultValue={userData?.role_id} onChange={(e) => setRoleId(e.target.value)} placeholder="Role ID" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
//                 <input type="file" name="photo" accept="image/*" onChange={handleImage} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                 <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default EditUser;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const EditUser = () => {
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState('');
    const [photo, setPhoto] = useState(null);
    const [roles, setRoles] = useState([]);
    const [dob, setDob] = useState('');
    const [dept, setDept] = useState('');
    const [conditions, setConditions] = useState('');
    const [experience, setExperience] = useState('');
    const [id_no, setIdNo] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        secureApi.get(`/users/${id}`)
            .then(res => {
                // console.log(res)
                setUserData(res.user);
                setUsername(res.user.username);
                setPassword(res.user.password);
                setEmail(res.user.email);
                setRoleId(res.user.role_id);
                setDob(res.user.dob);
                setDept(res.user.dept);
                setConditions(res.user.conditions);
                setExperience(res.user.experience);
                setIdNo(res.user.id_no);
                setPhone(res.user.phone);
                setGender(res.user.gender);
                setAddress(res.user.address);
            })
            .catch(err => {
                console.log(err);
            });

        secureApi.get('/roles')
            .then(res => {
                // console.log(res)
                setRoles(res.result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('role_id', role_id);
        formData.append('photo', photo);
        formData.append('dob', dob);
        formData.append('dept', dept);
        formData.append('conditions', conditions);
        formData.append('experience', experience);
        formData.append('id_no', id_no);
        formData.append('phone', phone);
        formData.append('gender', gender);
        formData.append('address', address);

        try {
            const response = await axios.put(`${import.meta.env.VITE_PUBLIC_API}/users`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success === true) {
                window.alert(response.data.message);
                navigate('/dashboard/view-users');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleImage = (e) => {
        const image = e.target.files[0];
        setPhoto(image);
    };

    return (
        <div className="mt-5 max-w-lg mx-auto px-5 lg:px-12 py-5">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" readOnly />
                <input type="file" name="photo" accept="image/*" onChange={handleImage} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />

                <select value={role_id} onChange={(e) => setRoleId(e.target.value)} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                    <option value="">Select Role</option>
                    {roles.map(role => (
                        <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                    ))}
                </select>

                <select value={dept} onChange={(e) => setDept(e.target.value)} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                    <option value="">Select Department</option>
                    <option value="cse">CSE</option>
                    <option value="eee">EEE</option>
                    <option value="civil">Civil</option>
                    <option value="me">ME</option>
                </select>

                <select value={conditions} onChange={(e) => setConditions(e.target.value)} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                    <option value="">Select Conditions</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="bad">Bad</option>
                </select>

                <select value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <input type="text" value={id_no} onChange={(e) => setIdNo(e.target.value)} placeholder="ID No" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>

                <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default EditUser;
