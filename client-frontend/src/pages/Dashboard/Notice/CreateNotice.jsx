import React, { useState } from 'react';
// import secureApi from '../../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import secureApi from '../../../api/secureApi';

const CreateNotice = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await secureApi.post('/notices', {
                title,
                description
            });

            if (res.success == true) {
                toast.success(res.message);
                setTimeout(() => {
                    navigate('/dashboard/notice')
                }, 1500);

                setTitle('');
                setDescription('');
            } else {
                setError(res.message);
            }

            setIsLoading(false);
        } catch (err) {
            console.log(err)
            setError('Something went wrong');
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h3 className="text-2xl font-semibold mb-4">Create Notice</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="4"
                        className="mt-1 p-2 w-full border rounded-md"
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Notice'}
                    </button>
                </div>

                {/* {error && <p className="text-red-500">{error}</p>} */}
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateNotice;
