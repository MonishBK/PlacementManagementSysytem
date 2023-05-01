import React,{useContext,useState,useEffect} from 'react'
import { StudentData } from '../Routing';
import { Link } from 'react-router-dom';
import "../../CSS/StudentHome.css"
import { ToastContainer, toast } from "react-toastify";
import StudentDetails from './StudentDetails';
import pro_pic1 from "../../images/pro_pic1.png"
import { FeedsCards } from './Cards';

import { MdCall , MdEmail,MdLogout } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { AiTwotoneNotification } from "react-icons/ai";
import { RiCalendarEventFill } from "react-icons/ri";

import calendar_icon from "../../images/calendar-event.png"
import notific_icon from "../../images/notific_icon.PNG"
import cele_icon  from "../../images/cele_icon.png"

const StudentHome = () => {

    const userData = useContext(StudentData);
    const [sbranch, setSBranch] = useState("");
    const [usn, setusn] = useState("");
    const [feedsData, setFeedsData] = useState([]);
    const navigate = useNavigate();
    const [Ndata, setNdata] = useState([]);
    // document.getElementById("std_details").style.display ="flex"
    // document.getElementById("std_details").style.display ="none"

    const {
      _id,USN,Pass_Year,Profile_pic,email,firstname,lastname,number,branch
    } = userData;

    const fetchFeeds = async () =>{
        try {
            const res = await fetch(`/fetch-student-feeds`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "applictaion/json",
              },
              credentials: "include",
            });
      
            const data = await res.json();
    
            setFeedsData(data);
      
            if (!res.status === 200) {
              throw new Error(res.error);
            }
          } catch (err) {
            console.log(err);
            // history.push('/')
          }
    }


    useEffect(() => {        
        fetchFeeds();
        ReloadNotidication();
    }, []);

    const PostUSN = async (e) =>{

        e.preventDefault();
        // usn = usn.toLocaleUpperCase();
        // alert(usn)

        document.getElementById("usn_id").style.border="1px solid grey";
        document.getElementById("branch_id").style.border="1px solid grey";
        
        let usn_pattern = /^[1-4][A-Z][A-Z][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9]$/
        console.log("matching usn =>",usn.match(usn_pattern))

        if(!usn.length === 10 && usn === "" &&  sbranch.trim() === ""){
            toast.error("Enter the proper usn");
            document.getElementById("usn_id").style.border="1px solid red";
            toast.error("Branch cannot be blank!!..")
            document.getElementById("branch_id").style.border="1px solid red";
        }else if(!usn.length === 10 || usn === ""){
            toast.error("Enter the proper usn");
            document.getElementById("usn_id").style.border="1px solid red";
       } else if(sbranch.trim() === ""){
            toast.error("Branch cannot be blank!!..")
            document.getElementById("branch_id").style.border="1px solid red";
        }else if(!usn.match(usn_pattern)){
            
            toast.error("Enter the proper usn");
            document.getElementById("usn_id").style.border="1px solid red";
        }else{ 

            const res = await fetch(`/student-usn-update/${_id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  branch:sbranch, USN:usn
                }),
              });
    
              const data = await res.json();
      
              if (res.status === 422 || !data) {
                document.getElementById("usn_id").style.border="1px solid grey";
                // window.alert("Invalid registration ");
                toast.error("USN Alaready in use");
                console.log("USN Alaready in use");
              } else {
                // window.alert(" Registration Successfull !!..");
                toast.success(" Successfull !!..");
                document.getElementById("usn_id").style.border="1px solid red";
                document.getElementById("disapper_usn").style.display ="none"
                // document.getElementById("std_details").style.display ="flex"
                console.log("  Successfull !!.."); 
                window.location.reload(false);
              }


        }


    }

    // Fetch notification and Events
    const ReloadNotidication = async () => {
        try {
          const res = await fetch(`/fetch-notification`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "applictaion/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
  
          setNdata(data);
          console.log(data)
    
          if (!res.status === 200) {
            throw new Error(res.error);
          }
        } catch (err) {
          console.log(err);
          // history.push('/')
        }
      };

    // console.log(feedsData);

    if(USN === null){
        // console.log("no usn")
        return(
            <>
                <div className="usn_popup" >
                <div className="logout_con_home"> <button onClick={()=> navigate("/logout")}>Logout</button>  </div>
                    <div className="inner_usn_popup" id='disapper_usn'>
                        <div className="header_usn">
                            <h1>Please Enter Your Details</h1>
                        </div>
                        <div className="body_usn_div">

                            <div className="usn_part">
                                <label htmlFor="usn_id">USN: </label>
                                <input type="text"
                                    id="usn_id"
                                    value={usn} 
                                    name="usn"
                                    toUpperCase
                                    onChange={(e) =>{
                                        let usnid = e.target.value;
                                        usnid =usnid.toUpperCase()
                                        console.log(usnid)
                                        setusn(usnid);
                                    } }
                                 />
                            </div>
                            
                            <div className="sel_branch">
                                <label htmlFor="branch_id">Branch: </label>
                                <select name="" id="branch_id" value={sbranch} 
                                onChange={(e) =>{
                                    const bid = e.target.value;
                                    setSBranch(bid);
                                } }
                                >
                                    <option value=""></option>
                                    <option value="MCA">MCA</option>
                                    <option value="MBA">MBA</option>
                                </select>
                            </div>

                        </div>

                        <div className="usn_btn">
                            <button onClick={PostUSN} className="usn_btn_sub"  >submit</button>
                        </div>
                    </div>
                                
                        
                    
                    <ToastContainer
                        // position="top-center"
                        position="bottom-center"
                        style={{ fontSize: "1.7rem" }}
                    />
                </div>
           </> 
        )
    }if(USN && !Pass_Year){
        return(
            <div className="usn_popup" >
                 <div className="logout_con_home"> <button onClick={()=> navigate("/logout")}>Logout</button>  </div>
                <div className="inner_second_step" id='std_details'>
                     <StudentDetails />
                 </div>
            </div>
        )
    }
    else{
        return (
            <>
                <div className="main_std_home">
                    <div className="inner_main_home">
                        <div className="std_home_parts1">
                            <div className="left_con_1">
                                <div className="l_c_p1">
                                    <div className="image_con">
                                        {Profile_pic===null?<img src={pro_pic1} alt="nopic" />: <img src={Profile_pic} alt="pro_pic" />}
                                    
                                    </div>
                                </div>
                                <div className="l_c_p2"> </div>
                                <div className="l_c_p3">
                                    <div className="name_con"> {firstname} {lastname}  </div>
                                </div>
                                <div className="l_c_p4">
                                    <div className="inner_l_c_p4_phno">
                                       <MdCall/> <span>{number}</span></div>
                                    <div className="inner_l_c_p4_email">
                                      <MdEmail/> <span> {email} </span> </div>
                                </div>
                            </div>
                            <div className="left_con_2">
                                <div className="l_c_s_p">
                                    <BiSupport/> <span
                                     onClick={()=> navigate("/contactUs")} >Contact Us</span>
                                </div>
                                <div className="l_c_s_p">
                                <FiHelpCircle/><span>Privacy Policy</span>
                                </div>
                            </div>
                        </div>
                        <div className="std_home_parts2">
                            <div className="center_con_1">
                                <div className="greeting_center_div">
                                    <p>Welcome to your Placement Protal</p>
                                    <p>{firstname} 📢</p>
                                </div>
                            </div>
                            <div className="center_con_2">

                            {
                                feedsData.map((ele,index)=>{
                                    if(ele.branch === branch || ele.branch === "Both"){
                                        return(
                                            <FeedsCards key={ele._id} f_pic={ele.poster_pic}
                                             f_title ={ele.poster_title} f_desc ={ele.Poster_desc} 
                                             f_link={ele.poster_link} 
                                            f_time={ele.PostedOn}  />
                                        )
                                    }
                                })
                            }

                            </div>
                        </div>
                        <div className="std_home_parts3">
                            <div className="right_first_son">
                                <div className="r_f_hearder">Notifications <AiTwotoneNotification/> </div>
                                <div className="r_f_body">

                                {
                                    Ndata.map(ele =>{
                                        
                                        if(ele.notice_type === "Notification" ){
                                            if((ele.branch === branch || ele.branch === "Both" )&& ele.student_usn === null )
                                                return  <NotificationHome n_pic = {notific_icon} n_title={ele.title} key={ele._id} /> 
                                         else if(ele.student_usn === USN){
                                            console.log("student usn",ele.student_usn)
                                            return <NotificationHome n_pic={cele_icon} n_title={ele.title} key={ele._id} />
                                          }
                                        }

                                    })
                                }
                                   

                                </div>
                            </div>
                            <div className="right_second_con">
                            <div className="r_f_hearder">Events <RiCalendarEventFill/> </div>
                                <div className="r_f_body">

                                {
                                    Ndata.map(ele =>{
                                        
                                        if(ele.notice_type === "reminder"){
                                            if(ele.branch === branch || ele.branch === "Both" )
                                                return <NotificationHome n_pic = {calendar_icon} 
                                                n_title={ele.title} 
                                                key={ele._id} /> 
                                            
                                        }

                                    })
                                }

                                </div>
                            </div>
                        </div>
                    </div>
        
        
                <ToastContainer
                    // position="top-center"
                    position="bottom-center"
                    style={{ fontSize: "1.7rem" }}
                  />
                </div>
            </>
          )
    }


}

export default StudentHome

const NotificationHome = ({n_pic,n_title}) =>{

    return(
        <>
        <div className="home_notices_con">
            <div className="n_c_img">
                <img src={n_pic} alt="" />
            </div>
            <div className="n_c_title">
                {n_title}
            </div>
        </div>
        </>
    )
}