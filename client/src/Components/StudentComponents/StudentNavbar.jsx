import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
// import "./Navbar.css";
import "../../CSS/StudentNavbar.css"
import { StudentData } from "../Routing";
import { MdLogout } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper,IoMdNotifications } from "react-icons/io";


import Pro_pic from "../../images/pro_pic1.png";


const StudentNavbar = () => {

  const userData = useContext(StudentData);

  
  const {
    Profile_pic,
    firstname,
    lastname,
  } = userData;

  console.log("Navbar details ==> ",firstname,Profile_pic)

  return (
    <>
    
        <div className="std_nav_main" id="non-printable">
          <div className="std_nav_inner">
              <div className="std_nav_parts st_p1"> 
                <span>SMVIT</span> placement portal
              </div>


              <div className="std_nav_parts st_p2">
                  <div className="nav_links">
                    <NavLink exact to="/" 
                      className={({ isActive }) => (isActive ? 'u_active' : 'inactive')}
                      style={({ isActive }) => ({
                          color: isActive ? '#0d67ff' : '#000',
                        })}
                      >
                        <AiFillHome />
                    </NavLink>
                  </div>
                  <div className="nav_links">
                  <NavLink exact to="/std-temp-res" 
                      className={({ isActive }) => (isActive ? 'u_active' : 'inactive')}
                      style={({ isActive }) => ({
                          color: isActive ? '#0d67ff' : '#000',
                        })}
                      >
                        <IoIosPaper />
                    </NavLink>
                  </div>
                  <div className="nav_links">
                    <NavLink exact to="/std-notiications" 
                      className={({ isActive }) => (isActive ? 'u_active' : 'inactive')}
                      style={({ isActive }) => ({
                          color: isActive ? '#0d67ff' : '#000',
                        })}
                      >
                        <IoMdNotifications />
                    </NavLink>
                  </div>
              </div>


              <div className="std_nav_parts st_p3">

                <div className="pro_box_nav">
                  <div className="pro_inner_box_nav">
                    <div className="pro_img_nav">
                    {Profile_pic === null ? <img src={Pro_pic} alt="" /> : <img src={Profile_pic} alt="" />}
                      
                    </div>
                    <div className="pro_name_nav">
                      <NavLink exact to="/std-pro"
                        className={({ isActive }) => (isActive ? 'u_active' : 'inactive')}
                        style={{textDecoration:"none"}}
                      >
                          {firstname} {lastname}
                      </NavLink>
                      </div>
                  </div>
                </div>

                <div className="log_out_nav">
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
        </div>

    </>
  )
}

export default StudentNavbar;

