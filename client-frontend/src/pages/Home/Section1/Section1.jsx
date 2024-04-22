import React from 'react';
import { Link } from 'react-router-dom';

const Section1 = () => {

    return (
        <div>
            <div className="hero min-h-screen relative" style={{ backgroundImage: `url(images/bg_3.jpg)` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="px-12 absolute right-14">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">ICFL 2024</h1>
                        <p className="mb-5">The one of the biggest sports festivals take place at IUBAT is football tournaments arranged by different departments. Such occasions keep our campus vibrant and jovial. The university authority encourages and patronizes these sports events to develop social aspects and enhance social awareness among the students.
                        </p>
                        <Link to="/register"><button className="btn btn-primary">Get Started</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section1;