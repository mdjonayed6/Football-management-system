import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = ({title}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <link rel="canonical" href="https://www.techzaint.com/" />
            </Helmet>
        </div>
    );
};

export default PageTitle;