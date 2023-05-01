import React,{useState} from "react";
import "../CSS/Login.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  return (
    <>
      <div className="l_m_d">
        <div className="c_shape s_c1"></div>
        <div className="c_shape s_c2"></div>
        <div className="l_i_d">
          <div className="in_part in_p1">Login form</div>
          <div className="in_part in_p2">
            <input type="text" placeholder="name" className="input_t" />
            <input type="password" placeholder="password" className="input_t" />
          </div>
          <div className="in_part in_p3">
            <button className="log_btn">Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Login1 = () => {


  const navigate = useNavigate();
    const [userLoginData, setUserLoginData] = useState({
        login_ID: '',
        password: ''
    });

    const inputEvent = (e) => {
        let { name, value } = e.target;
        // console.log(name, value);

        setUserLoginData({ ...userLoginData, [name]: value })

    }

    const LoginUser = async (e) => {
        e.preventDefault();
        document.getElementById("load_img").style.display = "flex"

        let lid = document.getElementById("lid");
        let pass = document.getElementById("pass");
        
        const { login_ID, password } = userLoginData;
        console.log(login_ID, password)
        var email , number

        //more email validate
        const isEmail = (emailVal) => {
            let atSynmol = emailVal.indexOf("@");
            if (atSynmol < 1) return false;
            let dot = emailVal.lastIndexOf(".");
            if (dot <= atSynmol + 2) return false;
            if (dot === emailVal.length - 1) return false;
            return true
        }

        //validate email
        if (login_ID === "") {
            // toast.error("Please Enter the Login ID")
            lid.style.border = "1px solid red";
          } else if (!isEmail(login_ID)) {
            // lid.style.border = "1px solid gray";

            //validate Phone
            const userPhoneVal = login_ID;

            if (userPhoneVal.length !== 10) {
                // alert("not a valid phone number");
                lid.style.border = "1px solid red";
              } else {
                lid.style.border = "1px solid gray";
                number =parseInt( userPhoneVal);
                 email = undefined;
            }

        } else {
            lid.style.border = "1px solid gray";
             email = login_ID;
             number = undefined;
        }

         //validate Password
         if (password === "") {
            // toast.error("Please Enter the password");
            pass.style.border = "1px solid red";
          }else{
          pass.style.border = "1px solid gray";

        }


        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email, password, number
            })
        });

        const data = await res.json();

        if (res.status === 400 || !data) {
            // window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
            document.getElementById("load_img").style.display = "none"
            toast.error("Invalid Credentials");
            // pass.style.border = "1px solid red";
            // lid.style.border = "1px solid red";
        } else {
            toast.success("Login Successfull!!..");
            document.getElementById("load_img").style.display = "none"
            // dispatch({type: "USER", payload: true})
            // window.alert("Login Successfull!!..");
            pass.style.border = "1px solid gray";
            lid.style.border = "1px solid gray";
            console.log("Login Successfull!!..");
            // history.push(`/guest_homepage-basic_nav-header-signin`);
            navigate(`/`,{replace: true});
            window.location.reload(true)
        }
    }


  return (
    <>
      <div className="l1_m_d">
        <div className="l1_in_d">
          <div className="in_p1"></div>
          <div className="in_p2">
            <div className="form_head">
                Login
            </div>
            <form method="POST">
              <div className="login_inner_form">
                <div className="inner_form">
                <input
                  type="text"
                  placeholder="Email or phone number"
                  name="login_ID"
                  value={userLoginData.login_ID}
                  onChange={inputEvent}
                  autoComplete="off"
                  id="lid"
                />
              </div>
              
              <div className="inner_form">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userLoginData.password}
                  onChange={inputEvent}
                  autoComplete="off"
                  id='pass'
                />
                <span className="fgt_pass">
                  <NavLink to="/resetpass">
                    <p>Forgot password</p>
                  </NavLink>
                </span>
              </div>

              <div className="inner_form">
                <button type="submit" className="btn_form" onClick={LoginUser}>
                  Login
                </button>
              </div>

              <p className="form_navigate">Not a user ? 
              <NavLink to="/signup">
                 Sign Up
                </NavLink>
              </p>
              </div>
            </form>


            <ToastContainer
                // position="top-center"
                position="bottom-center"
                style={{ fontSize: "1.7rem" }}
            />
          </div>
        </div>
        <div className="basic_loading" id='load_img'>
                <div className="lod_img"></div>
            </div>
      </div>

    </>
  );
};


export default Login;
