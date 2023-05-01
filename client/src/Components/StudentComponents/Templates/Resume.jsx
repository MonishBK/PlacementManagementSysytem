import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../CSS/resume.css";
import { CvData } from '../../Routing'; 
import { AiFillPrinter } from "react-icons/ai";
import { Navigate } from 'react-router-dom';

const Resume = () => {

    const CvDetails = useContext(CvData);
    const navigate = useNavigate();

    const {firstname, lastname, Achivement, Address, DOB, EducationData, Hobies, Language, Profile_desc, Skills, email, fresher, gender, noAchivement, number, work_Expirience} = CvDetails
    
    // const [eduData, setEduData] = useState([Education[0].educationData])

    // setEduData(Education[0].educationData)
    console.log(EducationData)


    // reverse the DOB
    var date = DOB;
    date = date.split("-").reverse().join("/");


    // Achivement.map(curr => console.log(curr.achivement[0].achived))
    // Education.map(curr => console.log(curr.educationData[0]))
    // work_Expirience.map(curr => console.log(curr.Work_Exp[0]))
    

    const PdfFormat = () =>{
        let print_btn = document.getElementById("print_btn").style
        print_btn.display = "none"
        window.print();
        print_btn.display = "block"
    }

    return (
        <>
            <div className="resume_container" >
                <div className="inner_resume" id="inner_pg" >
                <div className="res_head">
                    <div className="res_head_left">
                        <h1 className="res_heading">{ firstname } {lastname}</h1>
                    </div>
                    <div className="res_head_right">
                        <div className="inner_head_right">
                            <p> <span className="res_heading">Email:</span> {email} </p>
                            <p> <span className="res_heading">phone:</span> {number}</p>
                        </div>
                    </div>
                </div>

                <div className=" containers">
                    <h1 className="res_heading heading_style">Personal Details :</h1>

                    <div className="inner_container">
                        <div className="right_data">
                            <h2>Date Of Birth : </h2>
                        </div>
                        <div className="left_data">
                            <h2>{date}</h2>
                        </div>
                    </div>

                    {/* <div className="inner_container">
                        <div className="right_data">
                            <h2>Nationality : </h2>
                        </div>
                        <div className="left_data">
                            <h2>Indian
                            </h2>
                        </div>
                    </div>

                    <div className="inner_container">
                        <div className="right_data">
                            <h2>Marital Sataus : </h2>
                        </div>
                        <div className="left_data">
                            <h2>Single</h2>
                        </div>
                    </div> */}

                    <div className="inner_container">
                        <div className="right_data">
                            <h2>Gender : </h2>
                        </div>
                        <div className="left_data">
                            <h2>{gender} </h2>
                        </div>
                    </div>

                    <div className="inner_container">
                        <div className="right_data">
                            <h2>Languages Known : </h2>
                        </div>
                        <div className="left_data">
                            <h2> {Language} </h2>
                        </div>
                    </div>

                    <div className="inner_container">
                        <div className="right_data">
                            <h2> Address  : </h2>
                        </div>
                        <div className="left_data">
                            <h2>{Address}</h2>
                        </div>
                    </div>


                </div>

                <div className="containers">
                    <h1 className="res_heading heading_style">Career objective :</h1>
                    <p>{Profile_desc}</p>
                </div>

                <div className="edu_quli containers">
                    <h1 className="res_heading heading_style">Education Qualification :</h1>
                    <div className="qualifations">

                    {EducationData.map((curr, index)=>{

                        // reverse the dates
                        let s_date = curr.edu_year_start;
                        s_date = s_date.split("-").reverse().join("/");
                        let l_date = curr.edu_year_end;
                        l_date = l_date.split("-").reverse().join("/");

                        let ind = index + 55

                       return (
                        
                             <>
                                <div className="innr_quli" key= {ind}>
    
                                    <div className="pass_yaer">
                                        <h2>{s_date} - {l_date}</h2>
                                     </div>
                                     <div className="colg_name">
                                         <h2>{curr.edu_combination} </h2>
                                         <h2>{curr.institute_name}</h2>
                                    </div>
                                </div>
                                      
                            </>
                         )}
                    )} 

                    </div>
                </div>

                <div className="containers ">
                    <h1 className="heading_style res_heading"> Technical skills : </h1>
                    <p>{Skills}</p>
                </div>

                <div className="edu_quli containers ">
                    <h1 className="heading_style res_heading"> Experience : </h1>
                    {fresher === "Fresher"? <p className="noraml_txt">Fresher</p> : 
                    <>
                    <div className="qualifations">
                    { work_Expirience.map((curr, index)=> (
                        <>
                            <div className="innr_quli" key={index + 22} >
                                <div className="pass_yaer">
                                    <h2>{curr.exp_year_start} - {curr.exp_year_end}</h2>
                                </div>
                                <div className="colg_name">
                                    <h2> {curr.comp_name} </h2>
                                    <h2> {curr.desgination} </h2>
                                </div>
                            </div>
                        </>
                    ))}
                            

                    </div>
                    </>}
                    
                </div>

                <div className="containers ">
                    <h1 className="heading_style res_heading"> Hobies : </h1>
                    <p className="noraml_txt">{Hobies}</p>
                </div>

                <div className="padding_div"></div>
                {noAchivement === false ? 
                <div className="containers ">
                    <h1 className="heading_style res_heading"> Achivements : </h1>
                    {Achivement.map((curr, index) =>(
                        <p className="noraml_txt" key={index + 77}>
                            <ul><li>{curr.achived}</li></ul>
                        </p>
                    ))}
                </div>
                 : ""}
                

                {/* <div className="containers ">
                    <h1 className="heading_style res_heading"> Strengths : </h1>
                    <p className="noraml_txt">Team work, Leadership qualities.</p>
                </div> */}

                <div className="containers ">
                    <h1 className="heading_style res_heading"> Declaration : </h1>
                    <p className="">I here by declare that the information furnished above is true to the best of my knowledge and belief</p>
                </div>
 
            </div>
            </div>

            <button onClick={() =>  PdfFormat()  } id="print_btn" className="printbtn"> <AiFillPrinter/> </button>
            <button onClick={() =>  navigate(-1)  } id="go_back" className="goback_btn">  </button>

                
        </>
    )
    
}

export default Resume;
