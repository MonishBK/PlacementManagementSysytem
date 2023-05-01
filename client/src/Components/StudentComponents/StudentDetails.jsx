import React, { useState,useEffect} from "react";
// import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../CSS/Studentdetails.css";


const StudentDetails = () => {

  const navigate = useNavigate();

  const [Data, setData] = useState({
    usn:"",
    bid:""
  });

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

      setData({
        usn:data.USN,
        bid: data.branch
      });

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      // history.push('/')
    }
  };

  useEffect(() => {
    // console.log(history.location.pathname);
    ReloadData();
  },[]);

  // const cvData = useContext(BioData);
  // const [loading, setLoading] = useState(false);
  // const { DOB, email, firstname, gender, lastname, number, _id } = cvData.;
  let count = 0;


  // const [Work_Exp, setWork_Exp] = useState([
  //   { comp_name: "", desgination: "", wrk_year_start: "", wrk_year_end: "" },
  // ]);
  const [History_of_backlogs, setHistory_of_backlogs] = useState("");

  const [userCvData, setUserCvData] = useState({
    // user_ID: uid,
    USN: Data.usn,
    SSLC:"",
    PUC: "",
    PG:"",
    branch: Data.bid,
    Backlogs:"",
    sem:"",
    Detained_year:"" ,
    Pass_Year:""
  });

  // Handling Onchange Events
  const inputEvent = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setUserCvData({ ...userCvData, [name]: value });
  };


  // Posting/Sending the data to the backend
  const PostData = async (e) => {
    e.preventDefault();

    // Main database
    let {
      // user_ID,
      USN,
      SSLC,
      PUC,
      UG,
      PG,
      branch,
      Backlogs,
      sem,
      Detained_year,
      Pass_Year
    } = userCvData;


    // function to show errors
    const showMsg = (curr_div, msg) =>{
      curr_div.setAttribute(
          "style",
          `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
        );
        toast.error(msg);
  }

  // function to hide errors
  const hideMsg = (curr_div) =>{
    curr_div.setAttribute(
        "style",
        `border: 1px solid gray; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
      );
}


    // Validation
  let sslc_10 = document.getElementById("sslc_10");
  let puc = document.getElementById("puc");
  let pg = document.getElementById("pg");
  let ug = document.getElementById("ug");
  let detained_yr = document.getElementById("detained_yr");
  let curr_sem = document.getElementById("curr_sem");
  let back_logs = document.getElementById("back_logs");
  let pass_yr = document.getElementById("pass_yr");
  let his_backlogs = document.getElementById("his_backlogs");


    // Triming the Extra Spaces from the data
    sslc_10.value.trim();
    puc.value.trim();
    pg.value.trim();
    ug.value.trim();
    detained_yr.value.trim();
    curr_sem.value.trim();
    his_backlogs.value.trim();
    back_logs.value.trim();
    pass_yr.value.trim();

       //validate SSLC
       if (SSLC === "") {
        showMsg(sslc_10, "marks can not be blank")
        count = 0
      } else if (SSLC.length <= 2 && SSLC.length > 4) {
        showMsg(sslc_10, "Invalid Aggrigate")
        count = 0
      } else if(!String(SSLC).split(".").length === 2){
        showMsg(sslc_10, "Invalid Aggrigate")

      } else if(!String(SSLC).split(".")[0].length === 2){
        showMsg(sslc_10, "Invalid Aggrigate")

      }else {
        hideMsg(sslc_10)
        count++
      }

      //validate puc
        if (PUC === "") {
        showMsg(puc, "marks can not be blank")
        count = 0
      } else if (PUC.length <= 1 && PUC.length >= 5) {
        showMsg(puc, "Invalid Aggrigate")
        count = 0
      } else if(!String(PUC).split(".").length === 2){
        showMsg(puc, "Invalid Aggrigate")
        
      } else if(!String(PUC).split(".")[0].length === 2){
        showMsg(puc, "Invalid Aggrigate")

      }else {
        hideMsg(puc)
        count++
      }

      //validate UG
        if (UG === "") {
        showMsg(ug, "marks can not be blank")
        count = 0
      } else if (UG.length <= 2 && UG.length > 4) {
        showMsg(ug, "Invalid Aggrigate")
        count = 0
      } else if(!String(UG).split(".").length === 2){
        showMsg(ug, "Invalid Aggrigate")
        
      } else if(!String(UG).split(".")[0].length === 2){
        showMsg(ug, "Invalid Aggrigate")

      }else {
        hideMsg(ug)
        count++
      }
      
      //validate PG
        if (PG === "") {
        showMsg(pg, "marks can not be blank")
        count = 0
      } else if (PG.length <= 2 && PG.length > 4) {
        showMsg(pg, "Invalid Aggrigate")
        count = 0
      } else if(!String(PG).split(".").length === 2){
        showMsg(pg, "Invalid Aggrigate")
        
      } else if(!String(PG).split(".")[0].length === 2){
        showMsg(pg, "Invalid Aggrigate")

      }else {
        hideMsg(pg)
        count++
      }

      //validate Detained Years
        if (Detained_year === "") {
        showMsg(detained_yr, "marks can not be blank")
        count = 0
      } else {
        hideMsg(detained_yr)
        count++
      }

      //validate Detained Years
        if (Backlogs === "") {
        showMsg(back_logs, "backlogs can not be blank")
        count = 0
      } else {
        hideMsg(back_logs)
        count++
      }

      //validate Current sem
        if (sem === "") {
        showMsg(curr_sem, "Current sem can not be blank")
        count = 0
      }else if(sem >= 7){
        showMsg(curr_sem, "Invalid Sem")
        count = 0
      } else {
        hideMsg(curr_sem)
        count++
      }

      //validate Current sem
      let date = new Date();
      let year = date.getFullYear()
        if (Pass_Year === "") {
        showMsg(pass_yr, "Passing year can not be blank")
        count = 0
      }else if(Pass_Year < year){
        showMsg(pass_yr, "Invalid Year")
        count = 0
      } else {
        hideMsg(pass_yr)
        count++
      }

      //validate History of Backlogs
        if (History_of_backlogs === "") {
        showMsg(his_backlogs, "Passing year can not be blank")
        count = 0
      }else {
        hideMsg(his_backlogs)
        count++
      }




    if (
      !USN  &&
      !SSLC &&
      !PUC &&
      !UG &&
      !PG &&
      !branch &&
      !Backlogs &&
      !sem &&
      !Detained_year &&
      !History_of_backlogs &&
      !Pass_Year
    ) {
      console.log("Opps!!..");
    } else {
      console.log("yeah!!! Done");
    }

    console.log(
      USN,
      SSLC,
      PUC,
      UG,
      PG,
      branch,
      Backlogs,
      sem,
      Detained_year,
      History_of_backlogs,
      Pass_Year
    );
      console.log(count)
    if(count === 9){
      count =0;
      console.log("inside the api call")

      const res = await fetch(`/student-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          USN:Data.usn,
          SSLC,
          PUC,
          UG,
          PG,
          branch:Data.bid,
          Backlogs,
          sem,
          Detained_year,
          History_of_backlogs,
          Pass_Year
        }),
      });
  
  
      const data = await res.json();
  
      if (res.status === 422 || !data) {
        toast.error("Invalid registration ");
        console.log("Invalid registration ");
      } else {
        toast.success(" Registration Successfull !!..");
        console.log(" Registration Successfull !!..");
        // history.push("/");
        alert("Sucessfull..!!")
        navigate("/")
        window.location.reload(false);
      }
      
    }
  };

  // Uploading Profil picture


  if (true) {
    return (
      <>
        <div className="reg_frm_container">
          <div className="inner_reg_cv">
            <form
              action=""
              method="POST"
              className="u_from"
              encType="multipart/form-data"
            >

                <label htmlFor="" className="per_info">
                <span>Educational Details</span>
              </label>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="sslc_10"> 10th/SSLC percentage</label>
                <input
                  type="number"
                  placeholder="eg: 60"
                  name="SSLC"
                  value={userCvData.SSLC}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="sslc_10"
                />
              </div>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="puc"> 12/Diploma Aggregate</label>
                <input
                  type="number"
                  placeholder="eg: 60"
                  name="PUC"
                  value={userCvData.PUC}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="puc"
                />
              </div>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="puc"> Degree Aggregate</label>
                <input
                  type="number"
                  placeholder="eg: 60"
                  name="UG"
                  value={userCvData.UG}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="ug"
                />
              </div>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="pg"> Post garduation Aggregate</label>
                <input
                  type="number"
                  placeholder="eg: 60"
                  name="PG"
                  value={userCvData.PG}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="pg"
                />
              </div>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="detained_yr"> Detained Years</label>
                <input
                  type="number"
                  placeholder="Years"
                  name="Detained_year"
                  value={userCvData.Detained_year}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="detained_yr"
                />
              </div>
              

              <div className="u_data_frm_div u_data_control">
                  <label htmlFor="branch"> Branch of Study</label>
                    <select name="Branch" id="branch" value={Data.bid} disabled >
                      <option value=""></option>
                      <option value="MCA">MCA</option>
                      <option value="MBA">MBA</option>
                    </select>
      
             </div>

             <div className="u_data_frm_div u_data_control">
                  <label htmlFor="usn"> USN</label>
                <input
                  type="text"
                  placeholder=""
                  name="usn"
                  value={Data.usn}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="usn"
                  disabled
                />
              </div>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="curr_sem"> Current Semester</label>
                <input
                  type="number"
                  placeholder="Semester"
                  name="sem"
                  value={userCvData.sem}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="curr_sem"
                />
              </div>

              <div className="u_data_frm_div u_data_control">
                  <label htmlFor="his_backlogs"> History of Backlogs</label>
                    <select name="Branch" id="his_backlogs" 
                    value={History_of_backlogs} 
                    onChange={(e) =>{
                        const bid = e.target.value;
                        setHistory_of_backlogs(bid);
                    } }
                     >
                      <option value=""></option>
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
      
             </div>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="back_logs"> Current Backlogs</label>
                <input
                  type="number"
                  placeholder="Number"
                  name="Backlogs"
                  value={userCvData.Backlogs}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="back_logs"
                />
              </div>

              <div className="u_data_frm_div u_data_control">
                  <label htmlFor="pass_yr"> year of passing</label>
                   <input type="number" name="Pass_Year" id="pass_yr" 
                   value={userCvData.Pass_Year}
                   onChange={inputEvent}
                    placeholder="eg: 2023"/>
      
             </div>


             

              {/* <div className="u_data_frm_div dynamic_data_lang dynamic_add add_progress">
                <AvatarUpload />
              </div> */}

              <div className="inner_form u_reg_btn">
                <button
                  type="submit"
                  className="btn_form "
                  value="register"
                  onClick={PostData}
                >
                  Sumbit
                </button>
              </div>
            </form>
          </div>
          <ToastContainer
            // position="top-center"
            position="bottom-center"
            style={{ fontSize: "1.7rem" }}
          />
        </div>
      </>
    );
  }else{
    // return <div className="loading_container"></div>;
  }
};

export default StudentDetails;
