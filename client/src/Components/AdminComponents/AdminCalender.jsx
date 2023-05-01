import React,{useState} from 'react'
import "../../CSS/AdminCalender.css"
import { ToastContainer, toast } from "react-toastify";

const AdminCalender = () => {

  const [branch, setBranch] = useState("");
  const [notice_type, setNotice_type] = useState("");
  const [noticeData, setNoticeData] = useState({
    title:"",notice_desc:""
  });

  const HandelInput = (e) =>{
    let { name, value } = e.target;
        console.log(name, value);
    
        setNoticeData({ ...noticeData, [name]: value });
  }




  const PostNotification = async (e) =>{
    e.preventDefault();

    const {title,notice_desc} = noticeData;
    // console.log(title,notice_desc,branch,notice_type);

    const res = await fetch(`/upload-Student-Nofifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,notice_desc,branch,notice_type
      }),
    });

    const data = await res.json();
  
      if (res.status === 422 || !data) {
        toast.error("Invalid Notification");
        console.log("Invalid Notification");
      } else {
        toast.success(" Successfull !!..");
        console.log(" Successfull !!..");
        
        e.preventDefault();
        // alert("Successfull !!..");
        ClearPoster();
      }

  }

  const ClearPoster = () =>{

    setBranch("");
    setNotice_type("");
    setNoticeData({
      title:"",notice_desc:""
    })

}
  
 
  return (
    <>
    
    <div className="admin_cal">
        <div className="inner_admin_cal">
            <div className="cal_header">
              Calender Schedule
            </div>
            <div className="cal_topic_desc">
                <div className="cal_topic">
                    Topic <input type="text"  name ="title" value={noticeData.title} placeholder='Topic...'  onChange={HandelInput}/>
                </div>
                <div className="desc_dynamic">
                   <textarea name="notice_desc" id="" cols="30" value={noticeData.notice_desc} rows="10" placeholder='Description...' onChange={HandelInput}></textarea>
                </div>
                <div className="cal_op">
                <div className="choice_box_nr">
                  <div className="inner_choice_box_nr">
                          <label htmlFor="notice">Remainder/Notifications: </label>
                          <select name="" id="notice" 
                          value={notice_type}
                          onChange={(e) =>{
                           const nid = e.target.value;
                           setNotice_type(nid);
                       } }
                          >
                              <option value=""></option>
                              <option value="Notification">Notification</option>
                              <option value="reminder">Reminder</option>
                          </select>
                      </div>
                  </div>
                </div>
            </div>
            <div className="cal_btn">
            <div className="choice_box">
                     <div className="inner_choice_box">
                         <label htmlFor="branch">Branch: </label>
                         <select name="" id="branch" value={branch}
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
                </div>
                
                <div className="only_btns">
                      <button onClick={ClearPoster}>Clear</button>
                        <button className='btn_post' onClick={PostNotification}>Post</button>
                </div>
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

export default AdminCalender
