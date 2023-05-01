import React,{useState,createContext,useEffect,useContext} from 'react'


// import UserDetailsForm from './UserDetailsForm';
import AdminInterface from './Interfaceses/AdminInterface';
import StudentInterface from  './Interfaceses/StudentInterface';
import BasicRouting from './BasicRouting';


export const StudentData = createContext();
export const AdminData = createContext();
export const CvData = createContext();


const Routing = () => {

  const [users, setUsers] = useState({});
  const [loading, setloading] = useState(true);

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
      // console.log(data);
      // console.log(data.UserType);
      setUsers(data);
      // console.log("from data==>",Data); 
      // console.log("current state",state);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      // history.push('/')
    }
  };

  useEffect(() => {

    setTimeout(() => {
      setloading(false)
    }, 1000);
    // console.log(history.location.pathname);
    console.log("from Routing")
    ReloadData();
  },[]);
  
  console.log("from data==>",users); 
  const RenderRouting = () => {

    if(loading){
      return <div className="loading_container">
      <div className="img_lod_fixed"></div>
    </div>;
    }else{

      if (users.tokens && users.UserType === "Student") return <StudentInterface />
      else if(users.tokens && users.UserType === "Admin") return <AdminInterface/>
      else if (users.tokens === undefined)  return  <BasicRouting /> 
      else  return <StudentInterface />
    }

    }


  return (
    <RenderRouting />  
    // <StudentInterface/>
    )
  
}

export default Routing