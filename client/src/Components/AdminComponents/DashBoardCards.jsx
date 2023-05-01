import React from 'react'

const DashBoardCards = ({num,title,bg_color}) => {
    return (
        <>
            <div className="status_box">
                <div className="status_icon">
                    <div className="s_icon" style={{backgroundColor: bg_color}}></div>
                </div>
                <div className="status_num">{num}</div>
                <div className="status_title">{title}</div>
            </div>
        </>
    )
}

export default DashBoardCards

export const DashBoradCards2 = ({bg_box,card_title,card_val}) =>{


    return (
        <>
        
            <div className="dash_box" style={{backgroundColor: bg_box }}  >
                <div className="icon_dash_box">
                <i className="fa fa-snowflake-o dashboard-top-card-icon text-light icon_rotate" style={{ fontSize: "4rem" }} />
                </div>
                <div className="right_dash_box">
                    <div className="con_val"> {card_val} </div>
                    <div className="dsah_title"> {card_title} </div>
                </div>
            </div>


        </>
    )
}
