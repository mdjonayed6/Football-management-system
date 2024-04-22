import React, { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi';
import moment from 'moment';
// import secureApi from '../../../../api/secureApi';

const Notices = () => {
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

    return (
        <div className="container min-h-screen mx-auto px-24 py-8 mt-16">
            <h1 className="text-2xl font-semibold mb-4 text-center">Notices Board</h1>
            <hr className='mb-2' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map((notice) => (
                    <div key={notice.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
                        <p className="text-gray-600 mb-4">{notice.description}</p>
                        <div className="text-sm text-gray-500">Published: {moment(notice.created_at).format('LLL')}</div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Notices;
