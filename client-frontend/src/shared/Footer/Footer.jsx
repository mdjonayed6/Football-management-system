import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer-section">
                <div className="px-5 md:px-24 lg:ml-36">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <div className="">
                            <div className="widget mb-3">
                                <h3>News</h3>
                                <ul className="list-unstyled links">
                                    <li><a href="#">All</a></li>
                                    <li><a href="#">Club News</a></li>
                                    <li><a href="#">Media Center</a></li>
                                    <li><a href="#">Video</a></li>
                                    <li><a href="#">RSS</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="widget mb-3">
                                <h3>Tickets</h3>
                                <ul className="list-unstyled links">
                                    <li><a href="#">Online Ticket</a></li>
                                    <li><a href="#">Payment and Prices</a></li>
                                    <li><a href="#">Contact &amp; Booking</a></li>
                                    <li><a href="#">Tickets</a></li>
                                    <li><a href="#">Coupon</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="widget mb-3">
                                <h3>Matches</h3>
                                <ul className="list-unstyled links">
                                    <li><a href="#">Standings</a></li>
                                    <li><a href="#">World Cup</a></li>
                                    <li><a href="#">La Lega</a></li>
                                    <li><a href="#">Hyper Cup</a></li>
                                    <li><a href="#">World League</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="">
                            <div className="widget mb-3">
                                <h3>Social</h3>
                                <ul className="list-unstyled links">
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Facebook</a></li>
                                    <li><a href="#">Instagram</a></li>
                                    <li><a href="#">Youtube</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className=" py-4">
                        <p>All rights reserved Copyright &copy; 2024 || Designed & Developed by  <a href="#" target="_blank">Junayed</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;