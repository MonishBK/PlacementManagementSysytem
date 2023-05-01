import React,{useEffect,useState,useContext} from 'react';
import StudentResumeForm from './StudentResumeForm';

import "../../CSS/TemplateArea.css"
import {CvData } from "../Routing";  
import { NavLink} from "react-router-dom";
import ResumeCard from './ResumeCard';
import ReactTooltip from 'react-tooltip';

const StudentTemplateArea = () => {
    
    const CvDetails = useContext(CvData);
    // console.log("from templates",CvDetails )


    if(CvDetails.email === undefined){
        return <StudentResumeForm />
    }else{
        return(
            <>
            <div className="temp_main_container" id="all_temp">
              <div className="temp_inner_containe">
                <div className="temp_inner_partition">
                    <ResumeCard  loc = "/resume" img_loc = "ss1.jpg"/>
                    {/* <ResumeCard  loc = "/resume2" img_loc ="ss2.jpg" /> */}
                </div> 
                <div className="temp_edit" data-tip="Edit the Resume Data"  >
                  <NavLink exact to="/edit-std-from" 
                  className='edit_res_icon'
                  >
                  </NavLink>
                </div>
              </div>
            </div>
              <ReactTooltip
              type="dark"
                effect="solid"
                delayHide={100}
              />
            </>
        )
    }
}

export default StudentTemplateArea;
