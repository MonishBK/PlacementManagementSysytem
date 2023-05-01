import React,{useState} from 'react'
import { useNavigate } from 'react-router';
import "../CSS/resetpassword.css";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {

    const navigate = useNavigate()
    const [UserData, setUserData] = useState({})

    const [U_number, setU_Number] = useState({
        number: ""
    });

    const [U_otp, setU_otp] = useState({
        OTP: ""
    });

    const [U_pass, setU_pass] = useState({
        password: "", cpassword: ""
    });

    const [Dis_Number, setDis_Number] = useState({
      f_num: "",
      l_num: ""
    })

     // Handling Onchange Events Number
    const inputEvent = (e) => {
        let { name, value } = e.target;
        console.log(name, value);

        setU_Number({ ...U_number, [name]: value });
    };
    
     // Handling Onchange Events OTP
    const inputOTPEvent = (e) => {
        let { name, value } = e.target;
        console.log(name, value);

        setU_otp({ ...U_otp, [name]: value });
    };

     // Handling Onchange Events Password
    const inputPassEvent = (e) => {
        let { name, value } = e.target;
        console.log(name, value);

        setU_pass({ ...U_pass, [name]: value });
    };

      // handle Message
    const showMsg = (curr_div, msg) => {
      document.getElementById("load_img").style.display = "none"
    curr_div.setAttribute(
      "style",
      `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
    );
    toast.error(msg);
    };

    const hideMsg = (curr_div) => {
      document.getElementById("load_img").style.display = "none"
    curr_div.setAttribute(
      "style",
      `border: 1px solid gray; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
    );
    };

    const allInput = (curr_div) => {
      document.getElementById("load_img").style.display = "none"
      curr_div.setAttribute(
        "style",
        `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
      );
    };
  

    // posting the number
    const PostNumber = async (e) => {
        e.preventDefault();
        document.getElementById("load_img").style.display = "flex"
        document.getElementById("disable_search").setAttribute("disabled", "");
    
        let { number } = U_number;
    
        const ph_no = document.getElementById("ph_no");
    
        number = number.trim();
    
        //validate Phone
        if (number === "") {
          showMsg(ph_no, "phone can not be blank");
          document.getElementById("disable_search").removeAttribute("disabled", "");
        } else if (number.length !== 10) {
          showMsg(ph_no, "not a valid phone number");
          document.getElementById("disable_search").removeAttribute("disabled", "");
        } else {
          hideMsg(ph_no);
    
          try {
            const res = await fetch(`/forgot-password/${number}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
              }),
            });
    
            const data = await res.json();
    
            if (res.status === 422 || !data) {
              document.getElementById("load_img").style.display = "none"
              document.getElementById("disable_search").removeAttribute("disabled", "");
              // window.alert("Invalid registration ");
              toast.error("Not a valid Number");
              console.log("Not a valid Number ");
            } else {
              document.getElementById("load_img").style.display = "none"
              // window.alert(" Registration Successfull !!..");
            //   toast.success("Number updated successfull !!..");
              console.log(" Number updated successfull!!..");
              document.getElementById("first_reset").style.display = "none"
              document.getElementById("second_reset").style.display = "flex"
              document.getElementById("third_reset").style.display = "none"
              document.getElementById("inn-reset").setAttribute(
                "style",
                `width: 45%; height: 47%;`
              );
              setUserData(data)
              console.log(number.slice(0,2))
              setDis_Number({
                f_num: number.slice(0,2),
                l_num: number.slice(7,10)
              })
              console.log(number.slice(7,10))
              document.getElementById("disable_search").removeAttribute("disabled", "");
              // let { number } = U_number;
              // setU_Number({number: ""})
              
            }
          } catch (err) {
            document.getElementById("load_img").style.display = "none"
            document.getElementById("disable_search").removeAttribute("disabled", "");
            console.log(err);
          }
        }
    };
    
    // posting the OTP
    const OTPVerify = async (e) => {
        e.preventDefault();
        document.getElementById("load_img").style.display = "flex"
        document.getElementById("disable_verify").setAttribute("disabled", "");
    
        let { number } = U_number;
        let {OTP} = U_otp;
    
        const u_otp = document.getElementById("u-otp");
    
         //Validate OTP
         if (OTP === "") {
            showMsg(u_otp, "Enter the OTP");
            document.getElementById("disable_verify").removeAttribute("disabled", "");
          } else {
            hideMsg(u_otp)

            try {
              console.log(number)
              const res = await fetch(`/check-otp-match/${number}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ OTP }),
              });
      
              const data = await res.json();
      
              if (res.status === 422 || !data) {
                // window.alert("Invalid registration ");
                document.getElementById("disable_verify").removeAttribute("disabled", "");
                toast.error("OTP not matched");
                console.log("Not a valid Number ");
              } else {
                document.getElementById("load_img").style.display = "none"
                // window.alert(" Registration Successfull !!..");
              //   toast.success("Number updated successfull !!..");
                console.log(" OTP Matched!!..");
                document.getElementById("first_reset").style.display = "none"
                document.getElementById("second_reset").style.display = "none"
                document.getElementById("third_reset").style.display = "flex"
                document.getElementById("inn-reset").setAttribute(
                  "style",
                  `width: 30%; height: 70%;`
                );
                document.getElementById("disable_verify").removeAttribute("disabled", "");
                setU_otp({OTP: ""})
                
              }
            } catch (err) {
              document.getElementById("load_img").style.display = "none"
              document.getElementById("disable_verify").removeAttribute("disabled", "");
              console.log(err);
            }
          }
    
    };

    // Posting Password
    const PostPassword = async (e) =>{
      e.preventDefault();
      document.getElementById("disable_save").setAttribute("disabled", "");
      document.getElementById("load_img").style.display = "flex"
      console.log("inside password")
        let { number } = U_number;
        let {password, cpassword} = U_pass;
    
        const passw = document.getElementById("passw");
        const Cpassw = document.getElementById("Cpassw");
    
        password = password.trim();
        cpassword = cpassword.trim();

      if (password === "" && cpassword === "") {
        allInput(passw);
        allInput(Cpassw);
        document.getElementById("disable_save").removeAttribute("disabled", "");
        toast.error("Please fill all the fields");
      } else if (password === "" || cpassword === "") {
        //validate Password
        if (password === "") {
          showMsg(passw, "password can not be blank");
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else if (password.length <= 5) {
          showMsg(passw, "minimum char 6");
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else {
          hideMsg(passw);
        }

        //validate Confirm Password
        if (cpassword === "") {
          showMsg(Cpassw, "confirm password can not be blank");
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else if (cpassword !== password) {
          showMsg(Cpassw, "password not matching");
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else {
          hideMsg(Cpassw);
        }
      } else {

        let count = 0;
        console.log("inside else ")
        //validate Password
        if (password === "") {
          showMsg(passw, "password can not be blank");
          count = 0;
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else if (password.length <= 5) {
          showMsg(passw, "minimum char 6");
          count = 0;
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else {
          hideMsg(passw);
          count++;
          document.getElementById("disable_save").removeAttribute("disabled", "");
        }

        //validate Confirm Password
        if (cpassword === "") {
          showMsg(Cpassw, "confirm password can not be blank");
          count = 0;
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else if (cpassword !== password) {
          showMsg(Cpassw, "password not matching");
          count = 0;
          document.getElementById("disable_save").removeAttribute("disabled", "");
        } else {
          hideMsg(Cpassw);
          count++;
        }
        console.log(count)
        if(count === 2){
          console.log("inside if ")
          try {
            const res = await fetch(`/change-pass-otp/${number}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                password, cpassword
              }),
            });
      
            const data = await res.json();
      
            if (res.status === 422 || !data) {
              // window.alert("Invalid registration ");
              document.getElementById("load_img").style.display = "none"
              document.getElementById("disable_save").removeAttribute("disabled", "");
              toast.error("Plz fill all the field");
              console.log("Plz fill all the field");
            } else if(res.status === 400){
              toast.error("Invalid Credential")
              document.getElementById("disable_save").removeAttribute("disabled", "");
              console.log("Invalid Credential")
            }
            else if(res.status === 201){
              // window.alert(" Registration Successfull !!..");
              document.getElementById("load_img").style.display = "none"
              document.getElementById("disable_save").removeAttribute("disabled", "");
              toast.success("password changed successfull!!..");
              console.log(" password changed successfull!!..");
              document.getElementById("first_reset").style.display = "none"
              document.getElementById("second_reset").style.display = "none"
              document.getElementById("third_reset").style.display = "none"
              document.getElementById("inn-reset").setAttribute(
                "style",
                `width: 45%; height: 47%;`
              );
              navigate("/signin")
              
            }
          } catch (err) {
            document.getElementById("load_img").style.display = "none"
            document.getElementById("disable_save").removeAttribute("disabled", "");
            console.log(err);
          }
        }

    }
    }

    // GO back 
    const GoFirst = () =>{
      console.log("in go first fun")
      // document.getElementById("disable_num").removeAttribute("disabled", "");
      // document.getElementById("disable_verify").removeAttribute("disabled", "");
      // document.getElementById("disable_save").removeAttribute("disabled", "");
      document.getElementById("inn-reset").setAttribute(
        "style",
        `width: 45%; height: 47%;`
      );
      document.getElementById("first_reset").style.display = "flex"
      document.getElementById("second_reset").style.display = "none"
      document.getElementById("third_reset").style.display = "none"
      setU_Number({number: ""})
      setU_otp({OTP: ""})
    }

    const GoSecond = () =>{
      document.getElementById("disable_num").removeAttribute("disabled", "");
      document.getElementById("disable_verify").removeAttribute("disabled", "");
      document.getElementById("disable_save").removeAttribute("disabled", "");
      document.getElementById("first_reset").style.display = "none"
      document.getElementById("second_reset").style.display = "flex"
      document.getElementById("third_reset").style.display = "none"
      document.getElementById("inn-reset").setAttribute(
        "style",
        `width: 45%; height: 47%;`
      );
      setU_otp({OTP: ""})
    }
    

    return (
        <>
            <div className="main_reset_con">
                <div className="inner_main_rest_con" id="inn-reset">

                    <div className="first_reset_con" id='first_reset'>
                        <div className="first_header_con">
                            <p>Find Your Account</p>
                        </div>
                        <div className="first_dis_msg">
                            <p>Please enter your email address or mobile number to search for your account.</p>
                            <input type="number" 
                            name="number" id="ph_no" 
                            value={U_number.number}
                            onChange={inputEvent}
                            autoCorrect="off"
                            autoComplete='off'
                            placeholder='Enter the Number' />
                        </div>
                        <div className="first_btn_con">
                            <button onClick={()=> navigate(-1) } > Cancel </button>
                            <button type='submit' id="disable_search" onClick={PostNumber}> Search </button>
                        </div>
                    </div>

                    <div className="Second_reset_con" id='second_reset'>
                        <div className="second_header_con">
                            <p>Verify Your Account</p>
                        </div>
                        <div className="second_dis_msg">
                            <p>OTP is Sent to your number +91{Dis_Number.f_num}******{Dis_Number.l_num} this is valid for 5 min</p>
                            <input type="number" 
                            name="OTP" id="u-otp" 
                            value={U_otp.OTP}
                            onChange={inputOTPEvent}
                            autoCorrect="off"
                            autoComplete='off'
                            placeholder='Enter the OTP' />
                        </div>
                        <div className="second_btn_con">
                            <button onClick={GoFirst} > go back </button>
                            <button type='submit' id='disable_verify' onClick={OTPVerify}> Verify </button>
                        </div>
                    </div>

                    <div className="third_reset_con" id='third_reset'>
                      <div className="third_img_name">
                        <div className="img_reset_div">
                        {UserData.Profile_pic === null ? "" : <img src={UserData.Profile_pic} alt="" />}
                        </div>
                        <p>{UserData.firstname} {UserData.lastname}</p>
                      </div>
                      <div className="third_dis_msg">
                            <input type="password" 
                            name="password" id="passw" 
                            value={U_pass.password}
                            onChange={inputPassEvent}
                            autoCorrect="off"
                            autoComplete='off'
                            placeholder='Password' />

                            <input type="password" 
                            name="cpassword" id="Cpassw" 
                            value={U_pass.cpassword}
                            onChange={inputPassEvent}
                            autoCorrect="off"
                            autoComplete='off'
                            placeholder='Confirm password' />
                        </div>
                        <div className="third_btn_con">
                            <button onClick={GoSecond} > go back </button>
                            <button type='submit' id='disable_save' onClick={PostPassword}> Save </button>
                        </div>

                    </div>

                </div>

                <ToastContainer
                // position="top-center"
                position="bottom-center"
                style={{ fontSize: "1.7rem" }}
                />
            </div>
            
            <div className="basic_loading" id='load_img'>
                <div className="lod_img"></div>
            </div>
        </>
    )
}

export default ResetPassword
