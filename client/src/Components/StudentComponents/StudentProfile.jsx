import React, { useContext, useState } from "react";
import "../../CSS/StudentProfile.css";
import { StudentData } from "../Routing";
import { RiDeleteBin6Line,RiLogoutCircleLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { GoMail } from "react-icons/go";
import { IoIosLock, IoMdCall } from "react-icons/io";
import { useNavigate } from "react-router";

const StudentProfile = () => {

  const userData = useContext(StudentData);
  const navigate = useNavigate()
  // console.log(userData);
  // const [UpdatedData, setUpdatedData] = useState(userData)
  const {
    Profile_pic,
    firstname,
    lastname,
    _id,
    email,
    DOB,
    number,
  } = userData;

    // reverse the DOB
    // var date = DOB;
    // date = date.split("-").reverse().join("/");

  const [Img_res, setImg_res] = useState(null);
  const [img_content, setImg_content] = useState({ u_img: null });
  const [editEmail, setEditEmail] = useState({
    email: email,
  });
 
  const [editNum, setEditNum] = useState({
    number: number,
  });
  
  const [editPass, setEditPass] = useState({
    curr_password: "",
    password: "",
    cpassword: "",
  });
  
  const [sendPass, setSendPass] = useState({
    passDel: "",
  });

  const OnMouseHandler = (e) => {
    const ProPic_edit = document.getElementById("ProPic_edit");
    ProPic_edit.style.display = "flex";
  };

  const OnMouseDownHandler = (e) => {
    const ProPic_edit = document.getElementById("ProPic_edit").style;
    if ((ProPic_edit.display = "flex")) {
      ProPic_edit.display = "none";
    } else {
      ProPic_edit.display = "flex";
    }
  };

  const ImgSending = (file_data) => {
    setImg_content({ u_img: file_data });
  };

  const ImgHandler = (e) => {
    e.preventDefault();
    let file_data = e.target.files[0];
    // console.log(file_data)
    ImgSending(file_data);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log("image ready");
        setImg_res(reader.result);
        document.getElementById("popup_box").style.display ="flex";
        // const main_pro_container = document.getElementById("main_pro_container").style.position = "fixed"
        document.body.style.position = "relative";
      } else {
        ImgSending(null);
      }
      // console.log("somethimg wrong");
    };
    if (file_data === undefined) {
    } else {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const DiscardHandel = (e) => {
    e.preventDefault();
    document.getElementById("popup_box").style.display ="none";
    // const main_pro_container = document.getElementById("main_pro_container").style.position = "flex"
    document.body.style.position = "initial";
  };

  const DeletePicHandel = () => {
    console.log(Profile_pic);
    if (Profile_pic === null) {
      alert("Oops No Profile pic!!!");
    } else {
      let ans = window.confirm("Do you want to delete Profile Pic");
      if (ans) {
        axios
          .put(`/delete-propic/${_id}`)
          .then((res) => {
            console.log("Success!!", res);
            toast.error("Profile Pic Removed Sucessfull!!");
            // alert("Sucessfull..!!");

            window.location.reload(false);
            // Reload()

            // history.push('/');
            // history.push('/all_Doc-user', { replace: true });
          })
          .catch((err) => {
            alert("!Oops Unsucess!!");
            console.log("Error", err);
          });
      }
    }
  };

  const SaveHandel = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("propic_avatar", img_content.u_img);

    // console.log(data, "==> from data  now");
    // console.log(img_content.u_img.data);

    axios
      .put(`/upload/profile-pic/${_id}`, data)
      // .put(`/upload/profile-pics/${_id}`, data)
      .then((res) => {
        console.log("Success!!", res);
        document.getElementById("popup_box").style.display = "none";
        document.body.style.position = "initial";
        toast.success("Profile Pic successfully uploaded!!");
        // alert("Sucessfull..!!");

        window.location.reload(false);
        // Reload()

        // history.push('/');
        // history.push('/all_Doc-user', { replace: true });
      })
      .catch((err) => {
        alert("!Oops Unsucess!!");
        console.log("Error", err);
      });
  };

  // handle Message
  const showMsg = (curr_div, msg) => {
    curr_div.setAttribute(
      "style",
      `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
    );
    toast.error(msg);
  };

  const hideMsg = (curr_div) => {
    curr_div.setAttribute(
      "style",
      `border: 1px solid gray; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
    );
  };

  const allInput = (curr_div) => {
    curr_div.setAttribute(
      "style",
      `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
    );
  };

  // handleing Email
  const inputEmailEvent = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setEditEmail({ ...editEmail, [name]: value });
  };

  const toggleEmail = () => {
    console.log("toggle email");

    document.getElementById("toggle_height").style.height = "35%";
    document.getElementById("toggle_header_div").style.height = "20%";
    document.getElementById("hide_change").style.display = "none";
    document.getElementById("hide_email_body").style.display = "none";
    document.getElementById("show_edit_mail").style.display = "flex";
  };

  const DiscardEmail = (e) => {
    e.preventDefault();
    document.getElementById("toggle_height").style.height = "25%";
    document.getElementById("toggle_header_div").style.height = "30%";
    document.getElementById("hide_change").style.display = "inline";
    document.getElementById("hide_email_body").style.display = "flex";
    document.getElementById("show_edit_mail").style.display = "none";
    setEditEmail({ email: email, });
  };

  const PostEmail = async (e) => {
    e.preventDefault();

    let { email } = editEmail;

    const u_email = document.getElementById("email");

    const isEmail = (emailVal) => {
      let atSynmol = emailVal.indexOf("@");
      if (atSynmol < 1) return false;
      let dot = emailVal.lastIndexOf(".");
      if (dot <= atSynmol + 2) return false;
      if (dot === emailVal.length - 1) return false;
      return true;
    };

    email = email.trim();

    //validate email
    if (email === "") {
      showMsg(u_email, "email can not be blank");
    } else if (!isEmail(email)) {
      showMsg(u_email, "not a valid Email");
    } else {
      hideMsg(u_email);

      try {
        const res = await fetch(`/update-email/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
          // window.alert("Invalid registration ");
          toast.error("Email already exist");
          console.log("Email already exist ");
        } else {
          // window.alert(" Registration Successfull !!..");
          toast.success("email updated successfull !!..");
          console.log(" email updated successfull!!..");
          window.location.reload(false);

          // document.getElementById("toggle_height").style.height = "25%";
          // document.getElementById("toggle_header_div").style.height = "30%";
          // document.getElementById("hide_change").style.display = "inline";
          // document.getElementById("hide_email_body").style.display = "flex";
          // document.getElementById("show_edit_mail").style.display = "none";
          // Reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // handleing Number
  const inputNumEvent = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setEditNum({ ...editNum, [name]: value });
  };

  const ToggleNumber = () => {
    console.log("toggle number");

    document.getElementById("toggle_num_height").style.height = "35%";
    document.getElementById("toggle_num_header").style.height = "20%";
    document.getElementById("hide_num_change").style.display = "none";
    document.getElementById("hide_ph_body").style.display = "none";
    document.getElementById("show_edit_num").style.display = "flex";
  };

  const DiscardNum = (e) => {
    e.preventDefault();
    document.getElementById("toggle_num_height").style.height = "25%";
    document.getElementById("toggle_num_header").style.height = "30%";
    document.getElementById("hide_num_change").style.display = "inline";
    document.getElementById("hide_ph_body").style.display = "flex";
    document.getElementById("show_edit_num").style.display = "none";
    setEditNum({number: number,});
  };

  const PostNumber = async (e) => {
    e.preventDefault();

    let { number } = editNum;

    const ph_no = document.getElementById("ph_no");

    number = number.trim();

    //validate Phone
    if (number === "") {
      showMsg(ph_no, "phone can not be blank");
    } else if (number.length !== 10) {
      showMsg(ph_no, "not a valid phone number");
    } else {
      hideMsg(ph_no);

      try {
        const res = await fetch(`/update-number/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number,
          }),
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
          // window.alert("Invalid registration ");
          toast.error("Number already exist");
          console.log("Number already exist ");
        } else {
          // window.alert(" Registration Successfull !!..");
          toast.success("Number updated successfull !!..");
          console.log(" Number updated successfull!!..");
          window.location.reload(false);
          // document.getElementById("toggle_num_height").style.height = "25%";
          // document.getElementById("toggle_num_header").style.height = "30%";
          // document.getElementById("hide_num_change").style.display = "inline";
          // document.getElementById("hide_ph_body").style.display = "flex";
          // document.getElementById("show_edit_num").style.display = "none";
          // Reload()
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // handleing Password
  const inputPassEvent = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setEditPass({ ...editPass, [name]: value });
  };

  const TogglePass = () => {
    console.log("toggle number");

    document.getElementById("toggle_pass_height").style.height = "60%";
    document.getElementById("toggle_pass_header").style.height = "17%";
    document.getElementById("hide_pass_body").style.display = "none";
    document.getElementById("show_edit_pass").style.display = "flex";
    document.getElementById("show_edit_pass").style.height = "100%";
    document.getElementById("incrase_body_pass").style.height = "80%";
  };

  const DiscardPass = (e) => {
    e.preventDefault();

    document.getElementById("toggle_pass_height").style.height = "25%";
    document.getElementById("toggle_pass_header").style.height = "40%";
    document.getElementById("hide_pass_body").style.display = "flex";
    document.getElementById("show_edit_pass").style.display = "none";
    document.getElementById("incrase_body_pass").style.height = "60%";
    setEditPass({
      curr_password: "",
      password: "",
      cpassword: "",
    });
  };

  const PostPassword = async (e) => {
    e.preventDefault();

    let { curr_password, password, cpassword } = editPass;

    const curr_passw = document.getElementById("curr_passw");
    const passw = document.getElementById("passw");
    const Cpassw = document.getElementById("Cpassw");

    curr_password = curr_password.trim();
    password = password.trim();
    cpassword = cpassword.trim();

    if (password === "" && curr_password === "" && cpassword === "") {
      allInput(passw);
      allInput(Cpassw);
      allInput(curr_passw);
      toast.error("Please fill all the fields");
    } else if (password === "" || curr_password === "" || cpassword === "") {
      //validate Curr_Password
      if (curr_password === "") {
        showMsg(curr_passw, "password can not be blank");
      } else {
        hideMsg(curr_passw);
      }

      //validate Password
      if (password === "") {
        showMsg(passw, "password can not be blank");
      } else if (password.length <= 5) {
        showMsg(passw, "minimum char 6");
      } else {
        hideMsg(passw);
      }

      //validate Confirm Password
      if (cpassword === "") {
        showMsg(Cpassw, "confirm password can not be blank");
      } else if (cpassword !== password) {
        showMsg(Cpassw, "password not matching");
      } else {
        hideMsg(Cpassw);
      }
    } else {

      let count = 0;

      //validate Curr_Password
      if (curr_password === "") {
        showMsg(curr_passw, "password can not be blank");
        count = 0;
      } else {
        hideMsg(curr_passw);
        count++;
      }

      //validate Password
      if (password === "") {
        showMsg(passw, "password can not be blank");
        count = 0;
      } else if (password.length <= 5) {
        showMsg(passw, "minimum char 6");
        count = 0;
      } else {
        hideMsg(passw);
        count++;
      }

      //validate Confirm Password
      if (cpassword === "") {
        showMsg(Cpassw, "confirm password can not be blank");
        count = 0;
      } else if (cpassword !== password) {
        showMsg(Cpassw, "password not matching");
        count = 0;
      } else {
        hideMsg(Cpassw);
        count++;
      }

      if(count === 3){
        try {
          const res = await fetch(`/update-pass/${_id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password, cpassword, curr_password
            }),
          });
    
          const data = await res.json();
    
          if (res.status === 422 || !data) {
            // window.alert("Invalid registration ");
            toast.error("Plz fill all the field");
            console.log("Plz fill all the field");
          } else if(res.status === 400){
            toast.error("Invalid Credential")
            console.log("Invalid Credential")
          }
           else if(res.status === 201){
            // window.alert(" Registration Successfull !!..");
            toast.success("password updated successfull!!..");
            console.log(" password updated successfull!!..");
            window.location.reload(false);
            // document.getElementById("toggle_pass_height").style.height = "25%";
            // document.getElementById("toggle_pass_header").style.height = "40%";
            // document.getElementById("hide_pass_body").style.display = "flex";
            // document.getElementById("show_edit_pass").style.display = "none";
            // document.getElementById("incrase_body_pass").style.height = "60%";
            // setEditPass({
            //   curr_password: "",
            //   password: "",
            //   cpassword: "",
            // });
            // Reload()
          }
        } catch (err) {
          console.log(err);
        }
      }

    }
    
  };

  // handling Delete Account
  const inputPassHandel = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setSendPass({ ...sendPass, [name]: value });
  };

  const toggleAccDel = () =>{
    document.getElementById("show-del-msg").style.display = "flex";
    document.getElementById("popup-delete").style.display = "flex";
  }

  const DisapperAccDel = () =>{
    document.getElementById("show-del-msg").style.display = "none";
    document.getElementById("popup-delete").style.display = "none";
  }

  const CancleDeleAcc = (e) =>{
    e.preventDefault();

    document.getElementById("dele-acc-popup").style.display = "none";
  }

  const DisplayAccDel = (e) =>{
    e.preventDefault();

    document.getElementById("dele-acc-popup").style.display = "flex";
  }

  const PostDeleteAcc = async (e) =>{
    e.preventDefault();

    let {passDel} = sendPass;
    const passwdel = document.getElementById("passwdel");

    passDel = passDel.trim();

    if (passDel === "") {
      showMsg(passwdel, "password can not be blank");
    } else if (passDel.length <= 5) {
      showMsg(passwdel, "minimum char 6");
    } else {
      hideMsg(passwdel);

      try {
        const res = await fetch(`/user/delete-acc/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passDel
          }),
        });
  
        const data = await res.json();
  
        if (res.status === 422 || !data) {
          // window.alert("Invalid registration ");
          toast.error("Plz Enter the password");
          console.log("Plz Enter the password");
        } else if(res.status === 400){
          toast.error("Invalid Credential")
          console.log("Invalid Credential")
        }
         else if(res.status === 201){
          // window.alert(" Registration Successfull !!..");
          toast.success("Account Deleted Successfully!!..");
          console.log(" Account Deleted Successfully!!..");
          navigate("/signup")
          window.location.reload(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

  }

  return (
    <>
      <div className="pro_container" id="main_pro_container">
        <div className="pro_inner_container">
          <div className="pro_name">
            <h1>
              {firstname} {lastname}
            </h1>
          </div>
          <div className="profile_pic_container">
            <div className="inner_pro_gray"></div>
            <div className="inner_pro_black"></div>

            <div className="edit_pic" id="ProPic_edit">
              <div className="upload_pic">
                {/* <p>Upload photo</p> */}
                <input
                  type="file"
                  name="propic_avatar"
                  id=""
                  className="custom_file_input"
                  accept="image/*"
                  onChange={ImgHandler}
                />
              </div>
              <div className="delete_pic" onClick={DeletePicHandel}>
                <RiDeleteBin6Line className="delete_icon" />
              </div>
            </div>

            <div
              className="pro_pic"
              onMouseOver={OnMouseHandler}
              onMouseDown={OnMouseDownHandler}
            >
              {Profile_pic === null ? "" : <img src={Profile_pic} alt="" />}
            </div>

            <div className="acc_type">
              <div className="acc_left">
                <p>Account Type</p>
                <p>Basic</p>
              </div>
              <div className="acc_right">
                <p>Valid until</p>
                <p>Unlimited</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pro_info">
          <div className="profile_name_container" onMouseDown={DisapperAccDel}>
            <div className="left_pro_container">
              <div className="first_container_pro">
                <div className="profile_name_header">
                  <h2>
                    
                    <CgProfile /> Account
                    {/* <span>Edit</span> */}
                  </h2>
                </div>
                <div className="profile_name_body">
                  <div className="f_l_name_container">
                    <div className="f_name_container">
                      <p>First Name</p>
                      <p>{firstname}</p>
                    </div>
                    <div className="l_name_container">
                      <p>Last Name</p>
                      <p>{lastname}</p>
                    </div>
                  </div>
                  <div className="dob_container_pro">
                    <p>Birthday</p>
                    {/* <p>{date}</p> */}
                    <p>{DOB}</p>
                  </div>
                </div>
              </div>

              <div className="second_container_pro" id="toggle_height">
                <div className="header_mail_conatiner" id="toggle_header_div">
                  <h2>
                    
                    <GoMail /> Email
                    <span onClick={toggleEmail} id="hide_change">
                      Change
                    </span>
                  </h2>
                </div>
                <div className="body_mail_container">
                  <div
                    className="inner_body_mail_container"
                    id="hide_email_body"
                  >
                    <p>Account Email</p>
                    <p>{email}</p>
                  </div>
                  {/* </div> */}
                  <div className="edit_body_mail" id="show_edit_mail">
                    <form>
                      <div className="e_mail_edit_conat">
                        <input
                          type="email"
                          placeholder="Email address"
                          name="email"
                          value={editEmail.email}
                          onChange={inputEmailEvent}
                          autoComplete="off"
                          autoCorrect="off"
                          id="email"
                        />
                      </div>
                      <div className="submit_emil_btn">
                        <button
                          type="submit"
                          className="btn_submit_email"
                          value="register"
                          onClick={PostEmail}
                        >
                          Save
                        </button>
                        <button
                          type=""
                          className="btn_discard_email"
                          value=""
                          onClick={DiscardEmail}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="third_container_pro" id="">
                <div className="inner_third_div">
                  <h2> <RiLogoutCircleLine /> <span onClick={toggleAccDel} >Want to Leave Us ?</span> </h2>
                </div>
                <div className="display_mag" id="show-del-msg">
                  <p>We would be sad to see you go, but here you can permanently delete your Account Details and the created Resumes/CVs/Cover Letters etc.</p>
                </div>
              </div>
            </div>

            <div className="right_pro_container">
              <div
                className="first_right_conatiner_pro"
                id="toggle_pass_height"
              >
                <div
                  className="header_security_conatiner"
                  id="toggle_pass_header"
                >
                  <h2>
                    <IoIosLock /> Security
                  </h2>
                </div>
                <div className="body_security_container" id="incrase_body_pass">
                  <div className="inner_body_security" id="hide_pass_body">
                    <p>Password</p>
                    <p onClick={TogglePass}>Request Password Change</p>
                  </div>

                  <div className="edit_body_security" id="show_edit_pass">
                    <form>
                      <div className="security_edit_conat">
                        <input
                          type="password"
                          placeholder=" Current Password"
                          name="curr_password"
                          value={editPass.curr_password}
                          onChange={inputPassEvent}
                          autoComplete="off"
                          autoCorrect="off"
                          id="curr_passw"
                        />
                        <input
                          type="password"
                          placeholder=" New Password"
                          name="password"
                          value={editPass.password}
                          onChange={inputPassEvent}
                          autoComplete="off"
                          autoCorrect="off"
                          id="passw"
                        />
                        <input
                          type="password"
                          placeholder=" Confirm Password"
                          name="cpassword"
                          value={editPass.cpassword}
                          onChange={inputPassEvent}
                          autoComplete="off"
                          autoCorrect="off"
                          id="Cpassw"
                        />
                      </div>
                      <div className="submit_security_btn">
                        <button
                          type="submit"
                          className="btn_submit_security"
                          value="register"
                          onClick={PostPassword}
                        >
                          Save
                        </button>
                        <button
                          type=""
                          className="btn_discard_security"
                          value=""
                          onClick={DiscardPass}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div
                className="second_right_conatiner_pro"
                id="toggle_num_height"
              >
                <div className="header_ph_conatiner" id="toggle_num_header">
                  <h2>
                    
                    <IoMdCall /> Phone Number
                    <span onClick={ToggleNumber} id="hide_num_change">
                      Change
                    </span>
                  </h2>
                </div>
                <div className="body_ph_container">
                  <div className="inner_body_ph" id="hide_ph_body">
                    <p>Account Number</p>
                    <p>{number}</p>
                  </div>
                  <div className="edit_body_num" id="show_edit_num">
                    <form>
                      <div className="num_edit_conat">
                        <input
                          type="number"
                          placeholder="Phone Number"
                          name="number"
                          value={editNum.number}
                          onChange={inputNumEvent}
                          autoComplete="off"
                          autoCorrect="off"
                          id="ph_no"
                        />
                      </div>
                      <div className="submit_num_btn">
                        <button
                          type="submit"
                          className="btn_submit_num"
                          value=""
                          onClick={PostNumber}
                        >
                          Save
                        </button>
                        <button
                          className="btn_discard_num"
                          value=""
                          onClick={DiscardNum}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
            <div className="popup_delete" id ="popup-delete" >
              <div className="inner_popup_delete">
                <p>You'll need to enter your password before you can delete the account.</p>
                <button onClick={DisplayAccDel}> <span>Permanently Delete </span><RiDeleteBin6Line /> </button>
              </div>
            </div>
        </div>

        {/* popup Container */}
        <div className="popup_outerLayer" id="popup_box">
          <div className="popup_propic">
            <div className="header_popup_propic">
              <div className="save_pic">
                <button onClick={SaveHandel} type="sumbit">
                  Save
                </button>
              </div>
              <div className="discard_pic">
                
                <button onClick={DiscardHandel}>Discard</button>
              </div>
            </div>
            <div className="body_popup">
              <div className="inner_body_popup">
                <img src={Img_res} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Popup */}
        <div className="Acc_dele_contanier" id="dele-acc-popup">
          <div className="inner_acc_dele_conatainer">
            <div className="first_half_acc_del">
              <div className="acc_del_pic">
                {Profile_pic === null ? "" : <img src={Profile_pic} alt="" />}
                  {/* <img src="propic_avatar_1633328052077.jpg" alt="pro_pic" /> */}
              </div>
              <div className="acc_del_pass">
                <form action="">
                  <input type="password"
                    name="passDel" 
                    value={sendPass.passDel}
                    onChange={inputPassHandel} 
                    id="passwdel" 
                    placeholder="Password..." 
                    autoCorrect="off"
                    autoComplete="off"
                    />
                </form>
              </div>
            </div>
            <div className="second_half_acc_del">
              <div className="inner_second_half">
                <button onClick={PostDeleteAcc} type="submit" >Delete</button>
                <button onClick={CancleDeleAcc}> Cancel</button>
              </div>
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
  );
};

export default StudentProfile;
