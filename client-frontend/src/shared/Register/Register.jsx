// import React, { useState } from 'react';
// import secureApi from '../../api/secureApi';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [photo, setPhoto] = useState('');
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // console.log(photo)

//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('password', password);
//         formData.append('email', email);
//         formData.append('photo', photo);

//         // Log form data
//         // for (var pair of formData.entries()) {
//         //     console.log(pair[0] + ': ' + pair[1]);
//         // }

//         try {
//             const result = await axios.post(`${import.meta.env.VITE_PUBLIC_API}/users`, formData)
//             if (result) {
//                 // console.log(result)
//                 window.alert('Registration successfull')
//                 navigate('/login')
//             }
//         } catch (error) {
//             window.alert(error.response.data.message)
//         }

//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 <div>
//                     <h3 className='text-center mb-4'>User Registration Form</h3>
//                     <hr />
//                 </div>
//                 <div className="mb-4 mt-2">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//                         Username
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="username"
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                         id="password"
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="email"
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
//                         Photo
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         name='photo'
//                         id="photo"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => setPhoto(e.target.files[0])}
//                         required
//                     />
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         type="submit"
//                     >
//                         Register Now
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [role_id, setRoleId] = useState('');
    const [dob, setDob] = useState('');
    const [dept, setDept] = useState('');
    const [conditions, setConditions] = useState('');
    const [experience, setExperience] = useState('');
    const [id_no, setIdNo] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('photo', photo);
        formData.append('role_id', role_id);
        formData.append('dob', dob);
        formData.append('dept', dept);
        formData.append('conditions', conditions);
        formData.append('experience', experience);
        formData.append('id_no', id_no);
        formData.append('phone', phone);
        formData.append('gender', gender);
        formData.append('address', address);

        try {
            const result = await axios.post(`${import.meta.env.VITE_PUBLIC_API}/users`, formData);
            if (result) {
                toast("Registration successful!");
                setTimeout(() => {
                    navigate('/login');
                }, 1500); // 1500 milliseconds delay
            }
        } catch (error) {
            window.alert(error.response.data.message);
        }
    };

    return (
        <div className="px-[200px] h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                <h3 className='text-center mb-4'>User Registration Form</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                            Photo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='photo'
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role_id">
                            Role
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="role_id"
                            onChange={(e) => setRoleId(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            {/* <option value="1">User</option> */}
                            {/* <option value="2">Admin</option> */}
                            <option value="3">Referee</option>
                            <option value="4">Player</option>
                            <option value="5">Coach</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                            Date of Birth
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dob"
                            type="date"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dept">
                            Department
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dept"
                            onChange={(e) => setDept(e.target.value)}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="cse">CSE</option>
                            <option value="eee">EEE</option>
                            <option value="civil">Civil</option>
                            <option value="me">ME</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conditions">
                            Conditions
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="conditions"
                            onChange={(e) => setConditions(e.target.value)}
                            required
                        >
                            <option value="">Select Conditions</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="bad">Bad</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                            Experience
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="experience"
                            type="text"
                            placeholder="Experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_no">
                            ID No
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="id_no"
                            type="text"
                            placeholder="ID No"
                            value={id_no}
                            onChange={(e) => setIdNo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="gender"
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register Now
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;



