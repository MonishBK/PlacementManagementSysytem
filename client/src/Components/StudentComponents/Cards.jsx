import React from 'react'
import { GrMore } from "react-icons/gr";
import { Navigate, useNavigate } from 'react-router-dom';
import "../../CSS/Cards.css";

export const NotificationCards = ({img,title,desc}) => {
  return (
    <>
        <div className="noti_cards">
          <div className="inner_noti_cards">
              <div className="noti_cats_arts n_c_p1">
                <img src={img} alt="" />
              </div>
              <div className="noti_cats_arts n_c_p2 ">
                {title}
              </div>
              <div className="noti_cats_arts n_c_p3">
                <div className="options_part o_p1">7h</div>
                <div className="options_part o_p2">
                  <GrMore/>
                </div>
              </div>
          </div>
        </div>
    </>
  )
}

export const FeedsCards = ({f_title,f_desc,f_link,f_time,f_pic}) =>{

  const navigate = useNavigate();

  return(
    <>

        <div className="feeds_card_main">
          <div className="inner_feeds">
            <div className="feeds_img">
              <img src={f_pic} alt="Feeds Image" />
            </div>
            <div className="feeds_title">
              <h1> {f_title} </h1>
            </div>
            <div className="feeds_desc">
              <p> {f_desc}
              </p>
              <div className="read_more_con">
                <span>read more...</span>
              </div>
            </div>
            <div className="btn_created_time">
              <div className="creted_time">
                <p>{f_time}</p>
              </div>
              <button className='applynow_btn ' onClick={()=> window.open(f_link, '_blank') } >Apply Now</button>
            </div>
          </div>
        </div>

    </>
  )
}
