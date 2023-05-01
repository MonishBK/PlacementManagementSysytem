import React from 'react';
import "../CSS/contact.css"
import { HiOutlineSupport } from "react-icons/hi";
import { SiWhatsapp } from "react-icons/si";
import { GrLocation } from "react-icons/gr";
// import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <>
        {/* <Navbar /> */}
        <div className="contact_main_div"> 
            <div className="inner_con_div">
                <div className="f_con_div">
                    <h1>Contact US</h1>
                    <p>Contact us in case of placement related queries.<br /> We’ll help you get in the touch with the right people because we hate wasting time.<br /> just like you. <br /></p>
                </div>
                <div className="s_con_div">

                    <div className="con_box">
                        <div className="inner_con_box">
                            <div className="f_con_box">
                                <HiOutlineSupport className='HiOutlineSupport'/>
                                <p>For any queries</p>
                                <p>+91 8310582079</p>
                            </div>
                            <div className="s_con_box">
                                <p>
                                    <a className='mail_to' href="mailto:support@smvitplacement.com">
                                        support@smvitplacement.com
                                    </a>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="con_box">
                        <div className="inner_con_box">
                            <div className="f_con_box">
                                <SiWhatsapp className='HiOutlineSupport'/>
                                <p>Talk to us over WhatsApp</p>
                                <p>+91 8310582079</p>
                            </div>
                            <div className="s_con_box">
                                <p style={{backgroundColor: "#00d12e"}}> Chat now</p>
                            </div>
                        </div>
                    </div>
                    <div className="con_box">
                        <div className="inner_con_box">
                            <div className="f_con_box f_con_add">
                                <GrLocation className='HiOutlineSupport'/>
                                <p>Registered Office</p>
                                <p className='add_box' style={{fontSize : "1.6rem"}}>Krishnadevaraya Nagar, Hunasamaranahalli, International Airport Road, Bengaluru – 562 157</p>
                            </div>
                            {/* <div className="s_con_box">
                                <p>support@myCV.com</p>
                            </div> */}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact
