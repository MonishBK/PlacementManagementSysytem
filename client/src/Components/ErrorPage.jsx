import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../CSS/ErrorPage.css";

const ErrorPage = () => {

    const navigate = useNavigate();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        let currLoc = window.location.pathname;
        let toggle = document.getElementById("toggle-404");
        let toggle_load = document.getElementById("toggle-loading");
        
    
        if (currLoc === "/user-profile") {
            toggle.style.display = "none"
        toggle_load.style.display = "flex"
          console.log("Checking curr location ==>",currLoc )
          setTimeout(() => {
            toggle_load.style.display = "none"
            toggle.style.display = "flex"
          }, 6000);
        }

        setTimeout(() => {
          setloading(false)
        }, 3000);

    },[])

    if(loading){
      return <div className="loading_container">
        <div className="img_lod_fixed"></div>
      </div>;
    }else{
      return (
        <>
            <div className="main_error_con"  id='toggle-404'>
                <div className="inner_err_pg">
                    <div className="error_img"></div>
                    <div className="error_header"><h1>OOP's Page Not Found</h1> </div>
                    <div className="error_desc">
                        The page you're looking for might have been removed <br />had its name changed or is temporarily unavailable.
                    </div>
                    <div className="error_buttons">
                        <button onClick={() => navigate(-1) }>Go Back</button>
                        {/* <button onClick={ () => navigate("/") } >Go TO Home</button> */}
                    </div>
                </div>
            </div>
            <div className="loading_container" id='toggle-loading'></div>
        </>
      )
    }
}

export default ErrorPage