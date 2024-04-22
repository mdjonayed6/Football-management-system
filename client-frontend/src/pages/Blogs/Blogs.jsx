import React, { useEffect, useState } from 'react';
import secureApi from '../../api/secureApi';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await secureApi.get('/blogs');
                if (res.success) {
                    // console.log(res)
                    setBlogs(res.result);
                    setIsLoading(false);
                } else {
                    setError('Failed to fetch blogs');
                    setIsLoading(false);
                }
            } catch (err) {
                setError('Failed to fetch blogs');
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-16">{error}</p>;
    }

    return (
        <div className="container min-h-screen mx-auto px-4 py-8 mt-20">
            <h1 className="text-2xl font-semibold mb-4">Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={blog.photo} alt={blog.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600">{blog.description}</p>
                            <p className="text-gray-500 mt-2">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
