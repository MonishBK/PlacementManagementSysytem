import React from 'react'
import { NavLink } from "react-router-dom";

import { MdLogout, MdSpeed, MdSupervisorAccount } from "react-icons/md";
import { BsCalendarWeek, BsPersonFill } from "react-icons/bs";
import { FaRegBell,FaSuitcase } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
// import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";


const AdminNavbar = ({u_pic, fname,lname}) => {

    return (
        <>
           <div className="user_navbar">
                <div className="user_nav_inner">
                    <div className="u_n_box1">
                        <div className="school_name">
                            SMVIT
                            <span>Placement Center</span>
                        </div>
                    </div>

                    <div className="inner_box_scroll">

                    <div className="u_n_box2">
                        <div className="user_nav_items">
                            <div className="u_head">MAIN</div>
                            <div className="u_body">
                                <div className="item_box">
                                    <div className="inner_item">
                                       <NavLink to="/" 
                                            className={({ isActive }) => (isActive ? 'u_active' : 'inactive')}
                                            style={({ isActive }) => ({
                                                color: isActive ? '#0d67ff' : '#000',
                                                
                                              })}
                                             >
                                                
                                           <MdSpeed />
                                       <span>Dashboard</span></NavLink> 
                                    </div>
                                </div>
                                <div className="item_box">
                                    <div className="inner_item">
                                        <NavLink to="/calender" 
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                            
                                          })} > 
                                        <BsCalendarWeek />
                                        <span>Calendar</span></NavLink>
                                    </div>
                                </div>
                                <div className="item_box">
                                    <div className="inner_item">
                                        <NavLink to="/notices" 
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                          })}><FaRegBell />
                                        <span>Notices</span></NavLink> 
                                    </div>
                                </div>
                                <div className="item_box">
                                    <div className="inner_item">
                                        <NavLink to="/students" 
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                            
                                          })}> <MdSupervisorAccount />
                                        <span>Students</span></NavLink>
                                    </div>
                                </div>

                                <div className="item_box">
                                    <div className="inner_item">
                                        <NavLink to="/companies" 
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                            
                                          })}> <TbBuildingSkyscraper />
                                        <span>Companies</span></NavLink>
                                    </div>
                                </div>

                                <div className="item_box">
                                    <div className="inner_item">
                                        <NavLink to="/placed-student" 
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                            
                                          })}> <FaSuitcase />
                                        <span>Placements</span></NavLink>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className="u_n_box3">
                        <div className="user_general_items">
                            <div className="general_head">GENERAL</div>
                            <div className="general_body">

                                {/* <div className="g_box"> 
                                    <div className="inner_g_box">
                                        <NavLink to="/account"
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                            
                                          })}
                                        > <BsPersonFill />
                                        <span>Account</span></NavLink>
                                    </div>
                                </div> */}

                                <div className="g_box">
                                    <div className="inner_g_box">
                                        <NavLink to="/admin-settings"
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                            
                                          })}
                                        > <AiFillSetting />
                                        <span>Settings</span></NavLink>
                                    </div>
                                </div>

                                {/* <div className="g_box">
                                    <div className="inner_g_box">
                                        <NavLink to="/logout"
                                        style={({ isActive }) => ({
                                            color: isActive ? '#0d67ff' : '#000',
                                            
                                          })}
                                        > <RiLogoutCircleRLine />
                                        <span>Logout</span></NavLink>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>

            {/* Top Navbar */}
            <div className="user_nav_top">
                <div className="inner_user_nav_top">
                    <div className="user_pro_top">
                        <div className="user_pro_pic">
                            <img src={u_pic} alt="pro pic" />
                        </div>
                        <div className="user_pro_name">{fname} {lname} </div>
                    </div>
                    <div className="logout_icon">
                        <NavLink exact to="/logout"
                        className={({ isActive }) => (isActive ? 'u_active' : 'inactive')}
                        style={({ isActive }) => ({
                            color: isActive ? '#0d67ff' : '#000',
                        })}
                        >
                            <MdLogout/>
                        </NavLink>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default AdminNavbar
