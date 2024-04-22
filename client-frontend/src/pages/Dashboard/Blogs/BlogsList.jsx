import React, { useEffect, useState } from 'react';
import secureApi from '../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import secureApi from '../../../../api/secureApi';

const BlogsList = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await secureApi.get('/blogs');
                setBlogs(res.result);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-16">Error: {error}</p>;
    }

    const handleDelete = async (id) => {
        try {
            // Make API call to delete the blog
            const res = await secureApi.delete(`/blogs/${id}`);

            if (res.success) {
                // Filter out the deleted blog from the current blogs state
                const updatedBlogs = blogs.filter(blog => blog.id !== id);
                setBlogs(updatedBlogs);

                // Show success toast
                toast.success(res.message);
            } else {
                // Show error toast
                toast.error(res.message);
            }
        } catch (err) {
            // Show error toast
            toast.error('Error deleting blog');
        }
    }

    return (
        <div className="container min-h-screen px-5 md:px-24 my-5">
            <h2 className="text-2xl font-semibold mb-4">Blogs List</h2>
            <Link to={`/dashboard/create-blog`} className='btn btn-link'>Create</Link>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{blog.description}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button onClick={() => handleDelete(blog.id)} className='btn btn-error'>Delete</button>
                                    <Link to={`/dashboard/edit-blog/${blog.id}`} className='btn btn-primary'>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BlogsList;
