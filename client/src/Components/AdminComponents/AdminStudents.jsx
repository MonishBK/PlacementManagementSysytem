import React,{useState} from 'react'
import "../../CSS/AdminStudent.css"
import StudentCard from './StudentCard'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { ToastContainer, toast } from "react-toastify";

const AdminStudents = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [branch, setBranch] = useState("");
    const [stdData, setStdData] = useState([]);

    const ClearData =() =>{
        setBranch("")
        // setStartDate("")
    }

    const SubmitRequest = async (e) =>{
        
        e.preventDefault();
        let Pass_Year =startDate.toString().split(" ")[3];

        if(Pass_Year == "" || branch === "" ){
            toast.error("Fields cant be empty")
        }else{
            
    
            console.log(Pass_Year,branch);
    
            const res = await fetch(`/students-list`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Pass_Year,branch
                }),
              });
          
          
              const data = await res.json();
              setStdData(data);
          
              if (res.status === 422 || !data) {
                toast.error("Invalid ");
                console.log("Invalid");
              } else {
                  toast.success(" Fetched Successfull !!..");
                  console.log(" Fetched Successfull !!..");
                  e.preventDefault();
                //   alert("Fetched Successfull !!..");
                  // history.push("/");
                  // navigate("/temp-collections");
                  // window.location.reload(false);
                }

        }

            
    }
        console.log(stdData);

  return (
    <>
    
        <div className="admin_student_con">
            <div className="student_header ">
                <div className="s_branch std_hrd">
                    <label htmlFor="branch">Branch: </label>
                    <select name="" id="branch"
                        value={branch} 
                        onChange={(e) =>{
                            const bid = e.target.value;
                            setBranch(bid);
                        } }
                    >
                        <option value=""></option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                        <option value="Both">Both</option>
                    </select>
                </div>
                <div className="s_year std_hrd">
                <label htmlFor="branch">Year Of passing: </label>
                    {/* <input type="month" name="" id="" /> */}
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    // yearItemNumber={9}
                    className="date_picker"
                    />
                </div>
                <div className="btn_search std_hrd">
                    <button onClick={ClearData} > Clear</button>
                    <button onClick={SubmitRequest} >Search</button>
                </div>
            </div>

            <div className="student_list">
                <div className="std_hearder_row">
                    <div className="std_hearder_parts s_p1">Sl.No</div>
                    <div className="std_hearder_parts s_p2">USN</div>
                    <div className="std_hearder_parts s_p3">Name</div>
                    <div className="std_hearder_parts s_p4">Branch</div>
                    <div className="std_hearder_parts s_p5"></div>
                </div>
                <div className="std_lists">
                    {
                        stdData.length === 0? <div className="no_data">No Data Available</div>:
                        stdData.map((ele,index) =>{
                            return(
                                <StudentCard slno={index+1} usn= {ele.USN} fname={ele.firstname} 
                                lname={ele.lastname} branch={ele.branch} />
                            )
                        })
                    }
               

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

export default AdminStudents