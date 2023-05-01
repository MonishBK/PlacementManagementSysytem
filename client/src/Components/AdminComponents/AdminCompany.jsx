import React,{useState} from 'react'
import {CompanyCard} from './StudentCard'
import "../../CSS/AdminStudent.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const AdminCompany = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [comData, setComData] = useState([]);
    const [ComDetails, setComDetails] = useState({
        company_name:"",
        company_link: "",
        package:"",
        year:""
    });

    let chk_box = document.getElementById("chk_box");

    // console.log(chk_box);

    const ClearData =() =>{
        setStartDate("")
    }

    const SubmitRequest = async (e) =>{

        e.preventDefault();

        if(chk_box.checked){
          console.log(chk_box.checked,"==>values")
          ReloadCompanies();
        }else{

          let comp_Year =startDate.toString().split(" ")[3];
          console.log(comp_Year);
  
          const res = await fetch(`/company-list`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  comp_Year
              }),
            });
        
        
            const data = await res.json();
            setComData(data);
        
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

        console.log(comData);

    const inputEvent = (e) =>{
        let { name, value } = e.target;
        console.log(name, value);
    
        setComDetails({ ...ComDetails, [name]: value });
    }

    const OpenAddCompany = () =>{
        document.getElementById("close_add_comp").style.display = "flex";
    }

    const CloseAddCompany =() =>{
        document.getElementById("close_add_comp").style.display = "none";
        setComDetails({
            company_name:"",
            company_link: "",
            cpackage:"",
        })

        setStartDate(new Date());
    }

    const PostCompany = async (e) =>{
        e.preventDefault();

        let cyear =startDate.toString().split(" ")[3];
        // setComDetails({year:cyear});
        console.log(ComDetails,cyear)
        let {company_name,company_link,cpackage} = ComDetails
        if(!company_name.trim() || !company_link.trim() || !cpackage.trim() || !cyear.trim()){
            toast.error("Please fill all fields!!..")
        }else{

            let comp_Year =startDate.toString().split(" ")[3];
            console.log(comp_Year);
    
            const res = await fetch(`/add-company`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_name, company_link, cpackage, comp_Year 
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
                  CloseAddCompany();
                  SubmitRequest();
                  setStartDate(new Date());
                  e.preventDefault();
                //   alert("Fetched Successfull !!..");
                  // history.push("/");
                  // navigate("/temp-collections");
                  // window.location.reload(false);
                }


        }

    }

  const ReloadCompanies = async (e) => {
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
  
        // if (!res.status === 200) {
        //   throw new Error(res.error);
        // }

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


      } catch (err) {
        
        console.log(err);
        // history.push('/')
      }
    };

  return (
    <>
    
    <div className="admin_student_con">
            <div className="student_header cmp_heard ">
                <div className="s_branch std_hrd cmp_hdr">
                    <label className='addcom' onClick={OpenAddCompany} > +Add comany </label>
                    
                </div>
                <div className="s_year std_hrd cmp_hdr">
                <label htmlFor="" >Select Year : </label>
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
                <div className=" s_hdr cmp_hdr chk_div">
                  <input type="checkbox" className='check_box' name="" value="yes" id="chk_box" /> All
                </div>
                <div className="btn_search std_hrd">
                    <button onClick={ClearData} > Clear</button>
                    <button onClick={SubmitRequest} >Search</button>
                </div>
            </div>

            <div className="student_list">
                <div className="std_hearder_row">
                    <div className="std_hearder_parts s_p1">Sl.No</div>
                    <div className="std_hearder_parts s_p2">Company</div>
                    <div className="std_hearder_parts s_p3">Link</div>
                    <div className="std_hearder_parts s_p4">Package(LPA)</div>
                    <div className="std_hearder_parts s_p5"></div>
                </div>
                <div className="std_lists">
                    {
                        comData.length === 0? <div className="no_data">No Data Available</div>:
                        comData.map((ele,index) =>{
                            return(
                                <CompanyCard slno={index+1} name= {ele.company_name} com_link={ele.company_link} 
                                sal={ele.cpackage} id={ele._id} />
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

{/* Add Company Component */}
        <div className="add_comany_div" id="close_add_comp" >
            <div className="inner_add_con">
                <h1>Company Details</h1>
                <div className="company_details">

                <form
              action=""
              method="POST"
              className="u_from"
              encType="multipart/form-data"
            >
                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="cname"> Company Name:</label>
                <input
                  type="text"
                  placeholder=""
                  name="company_name"
                  value={ComDetails.company_name}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="cname"
                />
              </div>

                <div className="u_data_frm_div u_data_control">
                  <label htmlFor="clink"> Company Link:</label>
                <input
                  type="text"
                  placeholder=""
                  name="company_link"
                  value={ComDetails.company_link}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="clink"
                />
              </div>

                <div className="u_data_frm_div u_data_control">
                <label htmlFor="cpack">Package (LAP) :  </label>
                <input
                  type="number"
                  placeholder=""
                  name="cpackage"
                  value={ComDetails.cpackage}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="cpack"
                />
              </div>

              <div className="s_year u_data_control u_data_frm_div">
                <label htmlFor="" >Select Year : </label>
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

                <button className='btn_form add_comp_btn' onClick={PostCompany} >Add Company</button>

            </form>

                </div>
                <div className="disbale_btn" onClick={CloseAddCompany} > <AiOutlineClose/>  </div>
            </div>
        </div>

    </>
  )
}

export default AdminCompany