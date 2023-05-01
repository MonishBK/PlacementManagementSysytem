import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/Registration.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [userRegData, setUserRegData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
    DOB: "",
    gender: "",
  });

  const inputEvent = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setUserRegData({ ...userRegData, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    document.getElementById("load_img").style.display = "flex"

    let {
      firstname,
      lastname,
      email,
      number,
      password,
      cpassword,
      DOB,
      gender,
    } = userRegData;

    // Validation

    const f_name = document.getElementById("f_name");
    const l_name = document.getElementById("l_name");
    const u_email = document.getElementById("email");
    const ph_no = document.getElementById("ph_no");
    const passw = document.getElementById("passw");
    const Cpassw = document.getElementById("Cpassw");
    const dob = document.getElementById("dob");
    const u_gender = document.getElementById("u_gender");

    const isEmail = (emailVal) => {
      let atSynmol = emailVal.indexOf("@");
      if (atSynmol < 1) return false;
      let dot = emailVal.lastIndexOf(".");
      if (dot <= atSynmol + 2) return false;
      if (dot === emailVal.length - 1) return false;
      return true;
    };

    const showMsg = (curr_div, msg) =>{
        curr_div.setAttribute(
            "style",
            `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
          );
          toast.error(msg);
    }

    const hideMsg = (curr_div) =>{
        curr_div.setAttribute(
            "style",
            `border: 1px solid gray; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
          );
    }

    const allInput = (curr_div) =>{
        curr_div.setAttribute(
          "style",
          `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
        );
    }

    // Triming the Extra Spaces from the data
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    number = number.trim();
    password = password.trim();
    cpassword = cpassword.trim();
    DOB = DOB.trim();

    if (
      firstname === "" &&
      lastname === "" &&
      email === "" &&
      number === "" &&
      password === "" &&
      cpassword === "" &&
      DOB === "" &&
      gender === ""
    ) {
        allInput(f_name);
        allInput(l_name);
        allInput(u_email);
        allInput(ph_no);
        allInput(passw);
        allInput(Cpassw);
        allInput(dob);
        allInput(u_gender);
        toast.error("Please fill all the fields");
        document.getElementById("load_img").style.display = "none"

    } else if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      number === "" ||
      password === "" ||
      cpassword === "" ||
      DOB === "" ||
      gender === ""
    ) {
      //validate username
      if (firstname === "") {
        showMsg(f_name, "First name can not be blank")
      } else if (firstname.length <= 2) {
        showMsg(f_name, "username min 3 char")
      } else {
        hideMsg(f_name)
      }

      //validate username
      if (lastname === "") {
        showMsg(l_name, "Lastname can not be blank")
      } else if (lastname.length === " ") {
        showMsg(l_name, "username min 1 char")
      } else {
        hideMsg(l_name);
      }

      //validate email
      if (email === "") {
        showMsg(u_email, "email can not be blank")
      } else if (!isEmail(email)) {
        showMsg(u_email, "not a valid Email")
      } else {
        hideMsg(u_email);
      }

      //validate Phone
      if (number === "") {
        showMsg(ph_no, "phone can not be blank")
      } else if (number.length !== 10) {
        showMsg(ph_no, "not a valid phone number")
      } else {
        hideMsg(ph_no);
      }

      //validate Password
      if (password === "") {
        showMsg(passw, "password can not be blank")
      } else if (password.length <= 5) {
        showMsg(passw, "minimum char 6")
      } else {
        hideMsg(passw)
      }

      //validate Confirm Password
      if (cpassword === "") {
        showMsg(Cpassw, "confirm password can not be blank")
      } else if (cpassword !== password) {
        showMsg(Cpassw, "password not matching")
      } else {
        hideMsg(Cpassw);
      }

      //validate DOB
      if (DOB === "") {
        showMsg(dob, "Datenof Birth can not be blank")
      } else {
        hideMsg(dob);
      }

      //validate Gender
      if (gender === "") {
        showMsg(u_gender,"Gender can not be blank")
      }else{
          // hideMsg(u_gender);
          u_gender.setAttribute(
            "style",
            `border: none;`
          );
      }
      document.getElementById("load_img").style.display = "none";

    } else {
      // console.log(firstname, lastname);
      document.getElementById("load_img").style.display = "flex";

      let count = 0;
      var alpha = /^[A-Za-z]+$/;
      
      //validate username
      if (firstname === "") {
        showMsg(f_name, "First name can not be blank")
        count = 0;
      } else if (firstname.length <= 2) {
        showMsg(f_name, "username min 3 char")
        count = 0;
      }
      else if(!alpha.test(firstname)){
        showMsg(f_name, "username cannot include number")
        count = 0;

      } else {
        hideMsg(f_name)
        count++;
      }

      //validate username
      if (lastname === "") {
        showMsg(l_name, "Lastname can not be blank")
        count = 0;
      } else if (lastname.length === " ") {
        showMsg(l_name, "username min 1 char")
        count = 0;
      }else if(!alpha.test(lastname)){
        showMsg(l_name, "Username cannot include number or any Special charector")
        count = 0;

      } else {
        hideMsg(l_name);
        count++;
      }

      //validate email
      if (email === "") {
        showMsg(u_email, "email can not be blank")
        count = 0;
      } else if (!isEmail(email)) {
        showMsg(u_email, "not a valid Email")
        count = 0;
      } else {
        hideMsg(u_email);
        count++;
      }

      //validate Phone
      if (number === "") {
        showMsg(ph_no, "phone can not be blank")
        count = 0;
      } else if (number.length !== 10) {
        showMsg(ph_no, "not a valid phone number")
        count = 0;
      } else {
        hideMsg(ph_no);
        count++;
      }

      //validate Password
      if (password === "") {
        showMsg(passw, "password can not be blank")
        count = 0;
      } else if (password.length <= 5) {
        showMsg(passw, "minimum char 6")
        count = 0;
      } else {
        hideMsg(passw)
        count++;
      }

      //validate Confirm Password
      if (cpassword === "") {
        showMsg(Cpassw, "confirm password can not be blank")
        count = 0;
      } else if (cpassword !== password) {
        showMsg(Cpassw, "password not matching")
        count = 0;
      } else {
        hideMsg(Cpassw);
        count++;
      }

      //validate DOB
      if (DOB === "") {
        showMsg(dob, "Date of Birth can not be blank")
        count = 0;
      } else {
        hideMsg(dob);
        count++;
      }

      //validate Gender
      if (gender === "") {
        showMsg(u_gender,"Gender can not be blank")
        count = 0;
      }else{
        u_gender.setAttribute(
          "style",
          `border: none;`
        );
          // hideMsg(u_gender);
          count++;
      }
      console.log(count,"==> count value")
      document.getElementById("load_img").style.display = "none"

      if(count === 8){
        document.getElementById("load_img").style.display = "flex"
        console.log("inside the condition")
        const res = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            number,
            password,
            cpassword,
            DOB,
            gender,
            UserType:"Student"
          }),
        });
  
        const data = await res.json();
  
        if (res.status === 422 || !data) {
          // window.alert("Invalid registration ");
          toast.error("Invalid registration");
          document.getElementById("load_img").style.display = "none"
          console.log("Invalid registration ");
        } else {
          // window.alert(" Registration Successfull !!..");
          toast.success("Registration Successfull !!..");
          document.getElementById("load_img").style.display = "none"
          console.log(" Registration Successfull !!..");
         navigate("/signin");  
        }

      }
    }
    
  };

  return (
    <div className="reg_main_div ">
      <div className="reg_inner_main_div">
        <div className="reg_left_div">
          <div className="reg_left_inner_div">
            <form method="POST">
              <div className="reg_inner_form reg_name_div">
                <input
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  value={userRegData.firstname}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="f_name"
                />

                <input
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={userRegData.lastname}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="l_name"
                />
              </div>

              <div className="reg_inner_form">
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={userRegData.email}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="email"
                />
              </div>

              <div className="reg_inner_form">
                <input
                  type="number"
                  placeholder="Phone number"
                  name="number"
                  value={userRegData.number}
                  onChange={inputEvent}
                  autoCorrect="off"
                  id="ph_no"
                />
              </div>
              <div className="reg_inner_form">
                <input
                  type="password"
                  placeholder="New password"
                  name="password"
                  value={userRegData.password}
                  onChange={inputEvent}
                  autoCorrect="off"
                  autoComplete="off"
                  id="passw"
                />
              </div>

              <div className="reg_inner_form">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={userRegData.cpassword}
                  onChange={inputEvent}
                  autoCorrect="off"
                  autoComplete="off"
                  id="Cpassw"
                />
              </div>

              <div className="reg_inner_form">
                <input
                  type="date"
                  placeholder=""
                  name="DOB"
                  value={userRegData.DOB}
                  onChange={inputEvent}
                  id="dob"
                />
              </div>

              <div className="reg_inner_form reg_gender_field" id="u_gender">
                Gender :
                <div className="reg_gender_sel">
                  <input
                    type="radio"
                    placeholder=""
                    name="gender"
                    value="Male"
                    // value={ userRegData.gender }
                    onChange={inputEvent}
                  />
                  Male
                </div>
                <div className="reg_gender_sel">
                  <input
                    type="radio"
                    placeholder=""
                    name="gender"
                    value="Female"
                    // value={ userRegData.gender }
                    onChange={inputEvent}
                  />
                  Female
                </div>
                <div className="reg_gender_sel">
                  <input
                    type="radio"
                    placeholder=""
                    name="gender"
                    value="Other"
                    // value={ userRegData.gender }
                    onChange={inputEvent}
                  />
                  Others
                </div>
              </div>

              <div className="inner_form">
                <button
                  type="submit"
                  className="btn_form reg_btn"
                  value="register"
                  onClick={PostData}
                >
                  Signup
                </button>
              </div>
            </form>
            <p className="reg_form_control_toggle">
              Already on myCV ? <NavLink to="/signin">Login </NavLink>
            </p>
          </div>
        </div>
        <div className="reg_right_img"></div>
      </div>
      <ToastContainer
        // position="top-center"
        position="bottom-center"
        style={{ fontSize: "1.7rem" }}
      />
        <div className="basic_loading" id='load_img'>
          <div className="lod_img"></div>
        </div>
    </div>
    
  );
  
};

export default Signup;
