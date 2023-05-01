import React from 'react';
import { NavLink} from 'react-router-dom';
// import './footer.css';
import '../CSS/footer.css';


export const Copyright = () => {
    return (
        <>
            <footer>
                <p>copyright © { new Date().getFullYear() } www.PlacementManagementPortal.com All rights reserved </p>
            </footer>
        </>
    )
}

const Footer = () => {
    return (
        <>
            <div className="footer" >
                <div className="footer_container">
                    <div className="footer_child footer_pms">
                        <div className="pms_logo"></div>
                        <h1 className="footer_logos footer_child_1"> Placement Mangaement Portal </h1>
                    </div>
                    <div className="footer_child footer_child1">
                        <ul>
                            <li className="first"> Quick links</li>
                            <li className='second'><NavLink exact to='/'>Home</NavLink></li>
                            <li className='second'><NavLink exact to="/signup">Signup</NavLink></li>
                            <li className='second'><NavLink exact to="/signin">Login</NavLink></li>
                            <li className='second'><NavLink exact to="/contactUs">Contact</NavLink></li>
                        </ul>
                    </div>
                    <div className="footer_child footer_child2">
                        <ul>
                            <li className="first">Contact Us</li>
                            <li className='second'>India,Bengalore</li>
                            <li className='second'>+91 9999999999</li>
                            <li className='second'>support@smvitplacement.com</li>

                        </ul>
                    </div>
                    <div className="footer_child footer_logs_sec">
                            <a href="https://www.facebook.com/login/">
                                <div className="footer_logo footer_fb"></div>
                            </a>
                            <a href="https://in.linkedin.com/">
                                <div className="footer_logo footer_linkedin"></div>
                            </a>
                            <a href="https://twitter.com/i/flow/login">
                                <div className="footer_logo footer_twitter"></div>
                            </a>
                            <a href="mailto:support@smvitplacement.com">
                                <div className="footer_logo footer_gmail"></div>
                            </a>
                        
                    </div>
                </div>
            </div>
            <Copyright />
        </>
    )
}


export default Footer;
