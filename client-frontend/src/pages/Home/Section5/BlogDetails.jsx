import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import moment from 'moment';
// import secureApi from '../../../../api/secureApi';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await secureApi.get(`/blogs/single-blog/${id}`);
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

    return (
        <div className="container min-h-screen px-5 md:px-24 my-5">
            <div className="row">
                <div className="col-12 title-section">
                    <h2 className="heading">{blog.title}</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
                <div className="custom-media flex">
                    <div className="img mr-4">
                        <img src={blog.photo} alt={blog.title} className="img-fluid" />
                    </div>
                    <div className="">
                        <h3 className="mb-4 text-black">{blog.title}</h3>
                        <p>{blog.description}</p>
                        <p>Published: {moment(blog?.created_at).format('LL')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
