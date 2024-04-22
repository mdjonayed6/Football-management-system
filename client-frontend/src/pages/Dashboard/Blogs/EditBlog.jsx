import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const EditBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        photo: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await secureApi.get(`/blogs/single-blog/${id}`);
                // console.log(res)
                setBlog(res.result);
                setIsLoading(false);
              
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-16">Error: {error}</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await secureApi.put(`/blogs/${id}`, blog);

            if (res.success) {
                // Handle success
                navigate('/dashboard/blogs');
            } else {
                // Handle error
            }
        } catch (err) {
            // Handle error
        }
    };

    return (
        <div className="container min-h-screen px-5 md:px-24 my-5">
            <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" name="title" value={blog.title} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" value={blog.description} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" rows="4"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
                    <input type="text" id="photo" name="photo" value={blog.photo} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditBlog;
