import React, { useState, useEffect } from 'react';
import secureApi from '../../../api/secureApi';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await secureApi.get('/notices');
                setNotices(res.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchNotices();
    }, []);

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-16">Error fetching data: {error}</p>;
    }

    const deleteNotice = async (id) => {
        try {
            const res = await secureApi.delete(`/notices/${id}`);
            if (res.success) {
                toast.success('Deleted successfully')
                setTimeout(() => {
                    const newNotices = notices.filter((notice) => notice.id !== id);
                    setNotices(newNotices);
                }, 1000);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container min-h-screen mx-auto px-24 py-8">
            <h1 className="text-2xl font-semibold mb-4">Notices</h1>
            <Link to={'/dashboard/create-notice'}><button className="btn btn-accent mb-4">Create Notice</button></Link>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice) => (
                            <tr key={notice.id}>
                                <td className="border border-gray-300 px-4 py-2">{notice.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{notice.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{notice.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(notice.created_at).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="btn btn-danger" onClick={() => deleteNotice(notice.id)}>Delete</button>
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

export default Notice;
