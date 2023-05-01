import React from 'react'
import "../../CSS/StudentCard.css"
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { IoIosEye } from "react-icons/io";

const StudentCard = ({slno, usn , fname, lname, branch}) => {


    const DeleteStudent = (usn) =>{
        window.confirm("Do you want to delete the Student of "+usn)
    }

    const ViewStudent = (usn) =>{
        window.alert("This is to view student details of "+ usn)
    }

  return (
    <>

        <div className="Std_card_con">
            <div className="std_brif_list">
                <div className="std_brif_parts s_b_p1">{slno}</div>
                <div className="std_brif_parts s_b_p2"> {usn} </div>
                <div className="std_brif_parts s_b_p3"> {fname} {lname} </div>
                <div className="std_brif_parts s_b_p4"> {branch} </div>
                <div className="std_brif_parts s_b_p5">
                    {/* <IoIosEye onClick={()=>ViewStudent(usn)}  className="view_std" />
                    <MdDelete onClick={()=> DeleteStudent(usn)} className="del_std" /> */}
                    </div>
            </div>
        </div>

    </>
  )
}

export default StudentCard

export const CompanyCard = ({slno, name, id, sal, com_link }) => {


    const DeleteCompany = async (id,name) =>{

    
       let ans =  window.confirm("Do you want to delete the Comapny of "+name)

       if(ans){

        const res = await fetch(`/delete-company/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
            }),
          });
      
      
        //   const data = await res.json();
        //   setComData(data);
      
          if (res.status === 422 ) {
            toast.error("Invalid ");
            console.log("Invalid");
          } else {
              toast.success(" Deleted Successfull !!..");
              console.log(" Deleted Successfull !!..");
            //   e.preventDefault();
            //   alert("Fetched Successfull !!..");
              // history.push("/");
              // navigate("/temp-collections");
              // window.location.reload(false);
            }

       }
    }


  return (
    <>

        <div className="Std_card_con">
            <div className="std_brif_list">
                <div className="std_brif_parts s_b_p1">{slno}</div>
                <div className="std_brif_parts s_b_p2"> {name} </div>
                <div className="std_brif_parts s_b_p3"> <span style={{
                    color:"blue",textDecoration:"underline",cursor:"pointer"
                    }} 
                    onClick={()=> window.open(com_link, '_blank') }
                    >goto site</span> </div>
                <div className="std_brif_parts s_b_p4"> {sal} </div>
                <div className="std_brif_parts s_b_p5">
                    {/* <IoIosEye onClick={()=>ViewStudent(usn)}  className="view_std" /> */}
                    <MdDelete onClick={()=> DeleteCompany(id,name)} className="del_std" />
                    </div>
            </div>
        </div>

    </>
  )
}

export const StudentCard1 = ({slno, usn , fname, com_name,pack_sal}) => {

return (
  <>

      <div className="Std_card_con">
          <div className="std_brif_list">
              <div className="std_brif_parts s_b_p1">{slno}  </div>
              <div className="std_brif_parts s_db_p2"> {usn} </div>
              <div className="std_brif_parts s_db_p3"> {fname}  </div>
              <div className="std_brif_parts s_db_p4"> {com_name} </div>
              <div className="std_brif_parts s_db_p5"> 
                  {/* <IoIosEye onClick={()=>ViewStudent(usn)}  className="view_std" />
                  <MdDelete onClick={()=> DeleteStudent(usn)} className="del_std" /> */}
                  {pack_sal}
                  </div>
          </div>
      </div>

  </>
)
}