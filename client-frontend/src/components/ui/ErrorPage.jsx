import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <div className='text-center py-20'>
                <h1 className='text-2xl font-bold text-red-500'>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>

        </div>
    );
};

export default ErrorPage;