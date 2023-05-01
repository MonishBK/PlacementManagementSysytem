import React,{useContext,useState,useEffect} from 'react';
import "../../CSS/StudentNotification.css"
import {NotificationCards} from './Cards';
import calendar_icon from "../../images/calendar-event.png"
import notific_icon from "../../images/notific_icon.PNG"
import cele_icon  from "../../images/cele_icon.png"
import { StudentData } from '../Routing';

const StudentNotification = () => {

    const stdData = useContext(StudentData);
    const [Ndata, setNdata] = useState([]);

    const {branch,USN} = stdData;
    console.log(stdData);

    const ReloadNotidication = async () => {
        try {
          const res = await fetch(`/fetch-notification`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "applictaion/json",
            },
            credentials: "include",
          });
    
          const data = await res.json();
  
          setNdata(data);
    
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
        // console.log("from Routing")
        ReloadNotidication();
      },[]);

      // console.log(Ndata)

  return (
    <>
    
        <div className="Notification_main_con">
            <div className="inner_notification">
                <div className="left_notification_con notifi_cons">
                    <div className="l_parts l_p1">Notifications</div>
                    <div className="l_parts l_p2">You have new Notification</div>
                </div>
                <div className="center_notification_con notifi_cons">
                    {
                        Ndata.map((ele,index)=>{
                            let nimg
                            if(ele.notice_type === "Notification"){
                                 nimg = notific_icon;
                            }else{
                                nimg = calendar_icon;
                            }

                            if((ele.branch === branch || ele.branch === "Both" )&& ele.student_usn === null ) {
                              return(
                                  
                                  <NotificationCards img={nimg} title={ele.title} desc={ele.notice_desc} />
                              )
                            }else if(ele.student_usn === USN){
                              nimg = cele_icon;
                              return <NotificationCards img={nimg} title={ele.title} desc={ele.notice_desc} />
                            }
                        })
                    }
                    {/* <NotificationCards img={notific_icon} />
                    <NotificationCards img={calendar_icon} />
                    <NotificationCards img={notific_icon} />
                    <NotificationCards img={calendar_icon} />
                    <NotificationCards img={notific_icon} />
                    <NotificationCards img={notific_icon} />
                    <NotificationCards img={calendar_icon} />
                
                    <NotificationCards img={calendar_icon} /> */}
                    
                </div>
                <div className="right_notification_con notifi_cons"></div>
            </div>
        </div>

    </>
  )
}

export default StudentNotification