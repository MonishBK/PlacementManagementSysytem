import { useEffect,useState,useContext } from "react";
import { Route, Routes } from "react-router-dom";
import pro_unknown from "../../images/pro_pic1.png";
import { AdminData } from "../Routing";
import "../../CSS/AdminInterface.css";

// Components
import PlacementDash from "../AdminComponents/Dashboard/PlacementDash"
import AdminNavbar from "../AdminComponents/AdminNavbar";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import AdminNotices from "../AdminComponents/AdminNotices";
import AdminStudents from "../AdminComponents/AdminStudents";
import AdminCalender from "../AdminComponents/AdminCalender";
import Logout,{LogoutAll} from "../Logout";
import AdminError from "../AdminComponents/AdminError";
import Setting from "../AdminComponents/Setting";
import AdminCompany from "../AdminComponents/AdminCompany";
import PlacementActivitices from "../AdminComponents/PlacementActivitices";


const AdminInterface = () => {


    const [Data, setData] = useState({});
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
    
      
      useEffect(() => {
          // console.log(history.location.pathname);
          console.log("from Admin Routing")
          ReloadData();
        },[]);
        
    const {firstname,lastname,Profile_pic} = Data;

    

    return (
        <>
        <div className="main_ui_con" >
        <AdminData.Provider value={Data}>
            <AdminNavbar u_pic={Profile_pic ==null?pro_unknown:Profile_pic} fname={firstname} lname={lastname} />

            <div className="user_body">
                <div className="inner_ui_body">
                <Routes>
                    {/* <Route  path='/' element={<PlacementDash/>} /> */}
                    <Route  path='/' element={<AdminDashboard/>} />
                    <Route  path='notices' element={<AdminNotices/>} />
                    <Route  path='students' element={<AdminStudents/>} />
                    <Route  path='calender' element={<AdminCalender/>} />
                    <Route path='logout' element={<Logout/>} />
                    <Route path='logout-all' element={<LogoutAll/>} />
                    <Route path='admin-settings' element={<Setting/>} />
                    <Route path='companies' element={<AdminCompany/>} />
                    <Route path='placed-student' element={<PlacementActivitices/>} />
                    <Route path='*' element={<AdminError/>} />
                    
                </Routes>
                </div>
            </div>
            </AdminData.Provider>
        </div>

        </>
    )
}

export default AdminInterface

