// import React from 'react';

// const Section5 = () => {
//     return (
//         <div>
//             <div className="container px-5 md:px-24 my-5">
//                 <div className="row">
//                     <div className="col-6 title-section">
//                         <h2 className="heading">Our Blog</h2>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div className="col-lg-6">
//                         <div className="custom-media flex">
//                             <div className="img mr-4">
//                                 <img src="images/i1.jpg" alt="Image" className="img-fluid" />
//                             </div>
//                             <div className="">
//                                 <span className="meta">February 20, 2024</span>
//                                 <h3 className="mb-4 text-black hover:text-red-600"><a href="#">Romolu to stay at Real Madrid?</a></h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.</p>
//                                 <p><a href="#" className="text-blue-500">Read more</a></p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <div className="custom-media flex">
//                             <div className="img mr-4">
//                                 <img src="images/outdoor2.jpg" alt="Image" className="img-fluid" />
//                             </div>
//                             <div className="">
//                                 <span className="meta">February 20, 2024</span>
//                                 <h3 className="mb-4 hover:text-red-600"><a href="#" >Romolu to stay at Real Nadrid?</a></h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.</p>
//                                 <p><a href="#" className="text-blue-500">Read more</a></p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </div>
//     );
// };

// export default Section5;

import React, { useEffect, useState } from 'react';
import secureApi from '../../../api/secureApi';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Section5 = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await secureApi.get('/blogs/recent');
                // console.log(res.result)
                if (res.success) {
                    setBlogs(res.result);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (isLoading) {
        return <p className="text-center mt-16">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-16">Error fetching data</p>;
    }

    return (
        <div className="container px-5 md:px-24 my-5">
            <div className="row">
                <div className="col-6 title-section">
                    <h2 className="heading">Our Recent Blog</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {blogs.map(blog => (
                    <div className="col-lg-6" key={blog?.id}>
                        <div className="custom-media flex">
                            <div className="img mr-4">
                                <img src={blog?.photo} alt="Blog" className="img-fluid" />
                            </div>
                            <div className="">
                                <span className="meta">{moment(blog.created_at).format('LL')}</span>
                                <h3 className="mb-4 hover:text-red-600"><a href="#">{blog.title}</a></h3>
                                <p>{(blog.description).slice(0, 50)}...</p>
                                <p><Link to={`/blogs/${blog?.id}`} className="text-blue-500">Read more</Link></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section5;
