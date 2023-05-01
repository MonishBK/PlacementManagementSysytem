import React,{useState,useEffect} from 'react'
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
import { StudentData,CvData } from '../Routing';

import StudentDetails from "../StudentComponents/StudentDetails"
import StudentNavbar from '../StudentComponents/StudentNavbar';
import Logout from '../Logout';
import Signup from '../Signup';
import StudentResumeForm from '../StudentComponents/StudentResumeForm';
import StudentTemplateArea from '../StudentComponents/StudentTemplateArea';
import Resume from '../StudentComponents/Templates/Resume';
import StudentProfile from '../StudentComponents/StudentProfile';
import EditStudentResume from '../StudentComponents/EditStudentResume';
import StudentNotification from '../StudentComponents/StudentNotification';
import ErrorPage from '../ErrorPage';
import StudentHome from '../StudentComponents/StudentHome';
import Contact from '../Contact';

// import StudentResumeForm from './StudentComponents/StudentResumeForm';


const StudentRouting = () =>{

  // const navigate = useNavigate();

  useEffect(() => {
    let currLoc = window.location.pathname ;
    // console.log("curr loc ==>",currLoc);
    let navbar = document.getElementById("toggle_std_nav");

    if (currLoc === "/login" || currLoc === "/signup" ) {
      navbar.style = "display:none";
    } else {
      navbar.style = "display:flex";
    }
  });

  return(
    <>
      <div id="toggle_std_nav">
        <StudentNavbar/>
      </div>
      <div className="std_interface">
        <Routes>
            <Route  path='/' element={<StudentHome/>} />
            <Route  path='std-details' element={<StudentDetails/>} />
            {/* <Route  path='/std-resume-frm' element={<StudentResumeForm/>} /> */}
            <Route path='logout' element={<Logout/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path= "std-from" element={<StudentResumeForm/>} />
            <Route path= "std-temp-res" element={<StudentTemplateArea/>} />
            <Route path= "resume" element={<Resume/>} />
            <Route path='/contactUs' element={<Contact/>} />
            <Route path="std-pro" element={<StudentProfile/>} />
            <Route path="edit-std-from" element={<EditStudentResume/>} />
            <Route path="std-notiications" element={<StudentNotification/>} />
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </div>

    </>
  )
}

const StudentInterface = () => {

    const [Data, setData] = useState({});
    const [CVData, setCVData] = useState({});

    const ReloadData = async () => {
      try {
        const res = await fetch("/datafetch", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "applictaion/json",
          },
          credentials: "include",
        });
  
        const data = await res.json();

        setData(data);
  
        if (!res.status === 200) {
          throw new Error(res.error);
        }
      } catch (err) {
        console.log(err);
        // history.push('/')
      }
    };
  
    const ResumeDetails = async () =>{
      try {

        const cvres = await fetch("/user/resume/resumeData", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "applictaion/json",
          },
          credentials: "include",
        });

        const cvdata = await cvres.json();
          console.log(cvdata);
          setCVData(cvdata);
          // setCVData(undefined);
  
          if (!cvres.status === 200) {
            throw new Error(cvres.error);
          }

      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
      // console.log(history.location.pathname);
      console.log("from Routing")
      ReloadData();
      ResumeDetails();
    },[]);

  return (
    <>
    <div className="std_interface">
    <StudentData.Provider value={Data}>
    <CvData.Provider value = {CVData}>
      <StudentRouting/>
    </CvData.Provider>
    </StudentData.Provider>
    </div>

    </>
  )
}

export default StudentInterface