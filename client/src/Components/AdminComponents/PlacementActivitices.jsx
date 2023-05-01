import React,{useState,useEffect} from 'react'
import "../../CSS/PlacementActivitices.css"
import { ToastContainer, toast } from "react-toastify";

const PlacementActivitices = () => {

    const [PlacedStd, setPlacedStd] = useState({
        student_usn:"",
        company_id:"",
        placed_date:""
    });

    const [ComData, setComData] = useState([]);
    const [StdDta, setStdDta] = useState([]);
    const [StdInfo, setStdInfo] = useState([]);

    const inputEvent = (e) =>{
        
        let { name, value } = e.target;
        console.log(name, value);
    
        setPlacedStd({ ...PlacedStd, [name]: value });
    }

    const ReloadCompanies = async () => {
        try {
          const res = await fetch(`/fetch-company-list`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "applictaion/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
  
          setComData(data);
          console.log(data);
    
          if (!res.status === 200) {
            throw new Error(res.error);
          }
        } catch (err) {
          console.log(err);
          // history.push('/')
        }
      };

    const ReloadStudents = async () => {
        try {
          const res = await fetch(`/student-list-all`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "applictaion/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
  
          setStdDta(data);
          // console.log(data);
    
          if (!res.status === 200) {
            throw new Error(res.error);
          }
        } catch (err) {
          console.log(err);
          // history.push('/')
        }
      };

      const ReloadStudentsInfo = async () => {
        try {
          const res = await fetch(`/student-info-fetch-all`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "applictaion/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
    
          setStdInfo(data);
          console.log(data);
    
          if (!res.status === 200) {
            throw new Error(res.error);
          }
        } catch (err) {
          console.log(err);
          // history.push('/')
        }
      };

      // No student placed list
      const No_Placed_std = StdInfo.filter(ele=>{
        return ele.Placed === false
    
      });

      useEffect(() => {
        ReloadCompanies();
        ReloadStudents();
        ReloadStudentsInfo();
      },[]);

    const PostPlaced = async (e) =>{

        e.preventDefault();


        let {student_usn,company_id,placed_date} = PlacedStd
        if(!student_usn.trim() || !company_id.trim() || !placed_date.trim() ){
            toast.error("Please fill all fields!!..")
        }else{

            console.log(PlacedStd);
    
            const res = await fetch(`/student-placed-company`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_usn,company_id,placed_date
                }),
              });
          
          
              const data = await res.json();
            //   setComData(data);
          
              if (res.status === 422 ) {
                toast.error("Invalid  company");
                console.log("Invalid");
              } else {
                  toast.success(" Added Successfull !!..");
                  console.log(" Added Successfull !!..");
                  setPlacedStd({
                    student_usn:"",
                    company_id:"",
                    placed_date:""
                  })
                  e.preventDefault();
                //   alert("Fetched Successfull !!..");
                  // history.push("/");
                  // navigate("/temp-collections");
                  // window.location.reload(false);
                }


      }
    }

  return (
    <>
        <div className="placed_std_con">
            <div className="inner_placed_con">
                <h1>Student Placement</h1>
                <div className="placed_body">

                <form
              action=""
              method="POST"
              className="u_from"
              encType="multipart/form-data"
            > 

                <div className="u_data_frm_div u_data_control">
                <label htmlFor="">Student Name</label>
                    <select name="student_usn" id="branch" value={PlacedStd.student_usn}
                         onChange={inputEvent}
                         >
                            <option value=""></option>
                            {
                                No_Placed_std.map((ele,index) =>{
                                    
                                    return <option value={ele.USN} >  {ele.name} ({ele.Branch}) ( {ele.USN} )  </option>
                                })
                            }
                         </select>
              </div>

                <div className="u_data_frm_div u_data_control">
                <label htmlFor="">Company Name:</label>
                    <select name="company_id" id="branch" value={PlacedStd.company_id}
                         onChange={inputEvent}
                         >
                            <option value=""></option>
                            {
                                ComData.map((ele,index) =>{
                                    return <option value={ele._id}>{ele.company_name}</option>
                                })
                            }
                         </select>
              </div>

              <div className="s_year u_data_control u_data_frm_div">
                <label htmlFor="" >Date Of Placed : </label>
                    {/* <input type="month" name="" id="" /> */}
                   <input type="date" name="placed_date"
                   value={PlacedStd.placed_date}
                   onChange = {inputEvent}
                    id="" 
                    />
                </div>

                <button className='btn_form placed_btn' onClick={PostPlaced} >Submit</button>
            
            </form>

                   
                </div>
            </div>
        </div>
        <ToastContainer
            // position="top-center"
            position="bottom-center"
            style={{ fontSize: "1.7rem" }}
          />
    </>
  )
}

export default PlacementActivitices;