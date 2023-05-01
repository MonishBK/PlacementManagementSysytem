import React,{useState,useEffect} from 'react'
import DashBoardCards,{DashBoradCards2} from './DashBoardCards'
import { AiOutlineClose } from "react-icons/ai";
import "../../CSS/AdminDashboard.css"

import BranchWiseChart from './Dashboard/BranchWiseChart'
import HighestPackageChart from './Dashboard/HighestPackageChart'
import PlacedStudentChart from './Dashboard/PlacedStudentChart'
import { StudentCard1 } from './StudentCard'

const UserDashboard = () => {


  const [ComData, setComData] = useState([]);
  const [StdDta, setStdDta] = useState([]);
  const [StdInfo, setStdInfo] = useState([]);

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
      console.log(data);

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

  let placed_count = 0, last_yr_placed = 0, Highest_pack,not_placed_count=0;

  // student list
const Placed_std = StdInfo.filter(ele =>{
    return ele.placed_company_id !== null
});

  // No student placed list
const No_Placed_std = StdInfo.filter(ele=>{
  return ele.Placed === false
 
});

// No of MCA Placed
let No_MCA_placed = 0;
StdInfo.map(ele=>{
  if (ele.Branch === "MCA" &&  ele.placed_company_id !== null)
    No_MCA_placed++;
})

// No of MBA Placed
let No_MBA_placed = 0; 
StdInfo.map(ele=>{
  if (ele.Branch === "MBA" &&  ele.placed_company_id !== null)
    No_MBA_placed++;
})

const BactchData = [No_MCA_placed, No_MBA_placed]
// console.log(BactchData);

console.log("placed=>",Placed_std);
// console.log("not placed=>",No_Placed_std);

// Total number of student placed
  StdInfo.map(ele =>{
    if(ele.Placed === true)
    placed_count++
  })

// Total number of student not placed
  StdInfo.map(ele =>{
    if(ele.Placed === false)
    not_placed_count++
  })

  // total number of student last year placed
  StdInfo.map(ele =>{
    if(!ele.date_of_placed === null){

      let dop = Number(ele.date_of_placed.split("-")[0]);
      let date = new Date();
      let curr_yr = date.getFullYear()-1;
      if(ele.Placed === true && dop === curr_yr)
      last_yr_placed++
    }
  })

  // placed Student In storted Order by years
 let sort_Placed  = Placed_std.sort((a, b) => parseFloat(b.date_of_placed.split("-")[0]) - parseFloat(a.date_of_placed.split("-")[0]))

 let Placed_Years = sort_Placed.map(ele=>{
  return ele.date_of_placed.split("-")[0]
 })

 let Unique_Placed_Years = Placed_Years.filter((ele, index) => {
  return Placed_Years.indexOf(ele) === index;
});

let y_val=0,Placed_Count= new Array(Unique_Placed_Years.length).fill(0); ;
sort_Placed.map(ele=>{
  if(Unique_Placed_Years[y_val] === ele.date_of_placed.split("-")[0] ){
    Placed_Count[y_val]++
  }else{
    y_val++;
    Placed_Count[y_val]++;
  }
})

//  console.log("ordered_by placing=>",sort_Placed)
//  console.log("Placing years=>",Unique_Placed_Years,Placed_Count)

 const Placed_Chart = [Unique_Placed_Years.reverse() , Placed_Count.reverse() ]

  let high_pack = ComData.map(ele=>{
      return ele.cpackage
  })

  // console.log("company package=>",high_pack);
  Highest_pack = Math.max(...high_pack);



  // Sort Company by year
  // console.log("Comp_by_yr=>",ComData.sort((a, b) => parseFloat(b.cyear) - parseFloat(a.cyear) ));

const sorted_comp = ComData.sort((a, b) => parseFloat(b.cyear) - parseFloat(a.cyear))
  // Sorting from sorted array

  let years = sorted_comp.map(ele=>{
    return ele.cyear
})

let uniqueYears = years.filter((ele, index) => {
  return years.indexOf(ele) === index;
});

// console.log("unique years==>",uniqueYears);
let yr =0, un_yr,n_pack;
let newArrVal =[]

sorted_comp.map(ele =>{
    un_yr = uniqueYears[yr];
    if(un_yr === ele.cyear){
      n_pack = ele.cpackage;
      let maxs = ele;
      let cnt = true
      sorted_comp.filter(e =>{
          if( un_yr === e.cyear){
            if(maxs.cpackage < e.cpackage){
              maxs = e;
            }
          }else{
            if(cnt){
              cnt=false;
              newArrVal.push(maxs);
            }
          }
      })
      yr++
    }
    
  })
  // console.log("max valuse =>",newArrVal)

  let pack_arr = newArrVal.map(ele=>{
    return ele.cpackage
})

let packs_label = uniqueYears.toString().split(",")

// console.log(pack_arr,packs_label);

// const SalData = [pack_arr.slice(0, 4),packs_label.slice(0, 4)]
const SalData = [pack_arr.slice(0, 5),packs_label.slice(0, 5)]

  // console.log("arr_size =>",sorted_comp.length)


  const ShowStudentPlaced = () =>{
      document.getElementById("toggle_div").style.display = "flex"
  }

  const ShowStudentNotPlaced =() =>{
    document.getElementById("toggle_div_no").style.display = "flex"
  }

  const CloseStudentList =() =>{
    document.getElementById("toggle_div").style.display = "none"
    document.getElementById("toggle_div_no").style.display = "none"
  }


  useEffect(() => {
    ReloadCompanies();
    ReloadStudents();
    ReloadStudentsInfo();
  },[]);

    return (
        <>
            <div className="dashboard_container">
                <div className="dash_head">Dashboard</div>
                <div className="f_status">

                    <DashBoradCards2  bg_box="#065bcb" card_title = "Placed Student" card_val = {placed_count} />
                    <DashBoradCards2  bg_box="#ff357e" card_title = "Companies" card_val = {ComData.length} />
                    <DashBoradCards2  bg_box="#12c889" card_title = "Not Placed Students" card_val = {not_placed_count} />
                    <DashBoradCards2  bg_box="#7c5dd6" card_title = "Highest Package (LPA)" card_val = {Highest_pack } />


                </div>

                <div className="s_status">
                  <div className="s_inner_box">
                    <h3>Branch wise Placed</h3>
                    <div className="s_inner_body">
                        <BranchWiseChart  Bdata={BactchData} />

                    </div>
                  </div>
                  <div className="s_inner_box">
                    <h3>Placed Students</h3>
                    <div className="s_inner_body">
                        <PlacedStudentChart placed={Placed_Chart} />

                    </div>
                  </div>
                  <div className="s_inner_box">
                    <h3>Highest Package</h3>
                    <div className="s_inner_body">
                        <HighestPackageChart pData={SalData} />

                    </div>
                  </div>

                </div>

              <div className="placed_students_con">
                <div className="placed_btn_con p_s" onClick={ShowStudentPlaced}  > Placed Students </div>
                <div className="placed_btn_con n_p_s"  onClick={ShowStudentNotPlaced} >  Not Placed Students </div>
              </div>
              
            </div>  

            {/* Student Placeda Container */}
            <div className="over_dash_con" id='toggle_div'>
              <div className="inner_dash_con">
                <h1>Student Placed</h1>
                <div className="student_hdr">
                  <div className="hrd_parts s_db_p1">Sl.no</div>
                  <div className="hrd_parts s_db_p2">USN</div>
                  <div className="hrd_parts s_db_p3">Name</div>
                  <div className="hrd_parts s_db_p4">Company</div>
                  <div className="hrd_parts s_db_p5">Package(LPA)</div>
                </div>
                <div className="con_body">
                  {
                    Placed_std.map((ele,index) =>{ 

                        return (
                          <StudentCard1 slno={index+1} usn={ele.USN} fname={ele.name} com_name={ele.placed_company} pack_sal= {ele.cpackage} />
                        )

                    })
                    
                  }
                </div>
                {/* <button onClick={()=>  document.getElementById("toggle_div").style.display = "none" } >close</button> */}
                <div className="disbale_btn_std_list" onClick={CloseStudentList} > <AiOutlineClose/>  </div>
              </div>
            </div>

{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            {/* Student not placed Container */}
            <div className="over_dash_con" id='toggle_div_no'>
              <div className="inner_dash_con">
                <h1>Student Not Placed</h1>
                <div className="student_hdr">
                  <div className="hrd_parts s_db_p1">Sl.no</div>
                  <div className="hrd_parts s_db_p2">USN</div>
                  <div className="hrd_parts s_db_p3">Name</div>
                  <div className="hrd_parts s_db_p4">Company</div>
                  <div className="hrd_parts s_db_p5">Package(LPA)</div>
                </div>
                <div className="con_body">
                  {
                    No_Placed_std.map((ele,index) =>{ 

                        return ( 
                          <StudentCard1 slno={index+1} usn={ele.USN} fname={ele.name} com_name="nill" pack_sal= "nill" />
                        )

                    })
                    
                  }
                </div>
                {/* <button onClick={()=>  document.getElementById("toggle_div").style.display = "none" } >close</button> */}
                <div className="disbale_btn_std_list" onClick={CloseStudentList} > <AiOutlineClose/>  </div>
              </div>
            </div>

        </>
    )
}

export default UserDashboard