import React from 'react';
import { NavLink } from 'react-router-dom';
// import "../../public/resumeLayouts"

const ResumeCard = (props) => {

    return (
        <>
            <div className="Resume_cards">
            <div className="Resume_card">
              <img src= {`${props.img_loc}`} alt="Resume Layouts" className="Resume_card_img" />
              <div className="Resume_card_cover">
                  {/* <Resume2 /> */}
                  {/* <p>hello monishasdfsfsdfsdsdsdsd sdf sdfwsdsefsdfe</p> */}
                  <NavLink exact to={props.loc} className="Resume_inner_card_cover"></NavLink>
              </div>
            </div>
            {/* <div className="Resume_file_title">
              
          </div> */}
          </div> 
        </>
    )
}

export default ResumeCard

