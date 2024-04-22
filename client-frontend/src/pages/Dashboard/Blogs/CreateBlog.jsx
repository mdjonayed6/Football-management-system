import React, { useState } from 'react';
import secureApi from '../../../api/secureApi';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: ''
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await secureApi.post('/blogs', formData);
            if (res.success) {
                setSuccessMessage(res.message);
                navigate('/dashboard/blogs');
                setFormData({
                    title: '',
                    description: '',
                    photo: ''
                });
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="container px-5 md:px-24 my-5">
            <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                        type="text"
                        name="photo"
                        id="photo"
                        required
                        value={formData.photo}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
