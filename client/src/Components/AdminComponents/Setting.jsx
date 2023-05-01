import React,{useState,useContext} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AdminData } from "../Routing";
import { MdModeEdit,MdOutlineLogout } from "react-icons/md";

const Setting = () => {

  const adminData = useContext(AdminData);
  const {_id,email,number} = adminData;

  return (
    <div className="col-sm-12 mx-auto ">
      <div className="row ">
        <div className="col-sm-10 mx-auto rounded bg-light p-5 mt-5 bg-light">
          <div className="d-flex mt-3 border-bottom bg-light   p-4 ">
            <h4 class="">Change email</h4>
            <ChangeEmail id={_id} email={email} />
          </div>
          <div className="d-flex mt-3 border-bottom   p-4 ">
            <h4 class="">Change Password</h4>
            <ChangePass id={_id}  />
          </div>
          <div className="d-flex mt-3 border-bottom   p-4 ">
            <h4 class="">Change Phone no.</h4>
            <ChangePhone id={_id} num={number}  />
          </div>
          <div className="d-flex mt-3 border-bottom   p-4 ">
            <h3 class="">Log out </h3>
            <button type="button" className="btn ml-auto p-0">
            <Link to="/logout"  style={{color:"black"}}  >
                {/* <i className="bi bi-box-arrow-right font-20" /> */}
                <MdOutlineLogout  style={{fontSize:"1.8rem"}} />
              </Link>
            </button>
          </div>
          <div className="d-flex mt-3 border-bottom   p-4 ">
            <h3 class="">Log out from all devices </h3>
            <button type="button" className="btn ml-auto p-0" >
              <Link to="/logout-all" style={{color:"black"}} >
                {/* <i className="bi bi-box-arrow-right font-20" /> */}
                <MdOutlineLogout style={{fontSize:"1.8rem"}} />
              </Link>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Setting;

const ChangeEmail = ({id,email}) => {

  const [editEmail, setEditEmail] = useState({
    email: email,
  });

    // handleing Email
    const inputEmailEvent = (e) => {
      let { name, value } = e.target;
      console.log(name, value);
  
      setEditEmail({ ...editEmail, [name]: value });
    };

  
  const PostEmail = async (e) => {
    e.preventDefault();
  
      let { email } = editEmail;
  
      // const u_email = document.getElementById("email");
  
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
        toast.error("email can not be blank");
      } else if (!isEmail(email)) {
        toast.error("not a valid Email");
      } else {
        
  
        try {
          const res = await fetch(`/update-email/${id}`, {
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
          }
        } catch (err) {
          console.log(err);
        }
    }
};

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn ml-auto bi bi-pen font-20"
        data-toggle="modal"
        data-target="#EmailModal"
      >
        {/* <MdModeEdit/> */}
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="EmailModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="EmailModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div
            className="modal-content"
            style={{ position: "fixed", marginTop: "100px" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="row p-4">
              <div className="form-group col-sm-10 mx-auto ">
                <label className="font-20" style={{fontWeight:"bold" }} >Change email </label>
                <input type="email" 
                className="form-control  font-20" 
                placeholder="" 
                name="email"
                value={editEmail.email}
                onChange={inputEmailEvent}
                style={{height:"4rem" }}
                />
              </div>
            </div>
            <div className="row mb-5 text-center">
              <button
                type="button"
                className="btn btn-lg btn-secondary ml-auto mr-4"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-lg btn-primary mr-auto" 
              onClick={PostEmail}
               >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer
          // position="top-center"
          position="bottom-center"
          style={{ fontSize: "1.7rem" }}
        />
    </>
  );
};


const ChangePass = ({id}) => {

  const [editPass, setEditPass] = useState({
    curr_password: "",
    password: "",
    cpassword: "",
  });


  // handleing Password
  const inputPassEvent = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setEditPass({ ...editPass, [name]: value });
  };

  const PostPassword = async (e) => {
    e.preventDefault();

    let { curr_password, password, cpassword } = editPass;


    curr_password = curr_password.trim();
    password = password.trim();
    cpassword = cpassword.trim();

    if (password === "" && curr_password === "" && cpassword === "") {
      toast.error("Please fill all the fields");
    } else if (password === "" || curr_password === "" || cpassword === "") {
      //validate Curr_Password
      if (curr_password === "") {
        toast.error("password can not be blank");
      }

      //validate Password
      if (password === "") {
        toast.error( "password can not be blank");
      } else if (password.length <= 5) {
        toast.error("minimum char 6");
      } 

      //validate Confirm Password
      if (cpassword === "") {
        toast.error("confirm password can not be blank");
      } else if (cpassword !== password) {
        toast.error("password not matching");
      } 
    } else {

      let count = 0;

      //validate Curr_Password
      if (curr_password === "") {
        toast.error("password can not be blank");
        count = 0;
      }else{
        count++;
      }

      //validate Password
      if (password === "") {
        toast.error("password can not be blank");
        count = 0;
      } else if (password.length <= 5) {
        toast.error("minimum char 6");
        count = 0;
      } else{
        count++;
      }

      //validate Confirm Password
      if (cpassword === "") {
        toast.error("confirm password can not be blank");
        count = 0;
      } else if (cpassword !== password) {
        toast.error("password not matching");
        count = 0;
      } else{
        count++;
      }
      console.log("count=>",count);
      if(count === 3){
        try {
          const res = await fetch(`/update-pass/${id}`, {
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
          }
        } catch (err) {
          console.log(err);
        }
      }

    }
    
  };

  const clearData =() =>{
    setEditPass({
      curr_password: "",
      password: "",
      cpassword: "",
    })
  }

    return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn ml-auto bi bi-pen font-20"
        data-toggle="modal"
        data-target="#passModal"
      ></button>
      {/* Modal */}
      <div
        className="modal fade"
        id="passModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="passModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div
            className="modal-content"
            style={{ position: "fixed", marginTop: "100px" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="row p-4">
              <div className="form-group col-sm-10 mx-auto ">
                <label className="font-20" style={{fontWeight:"bold" }} >Old Password </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  name="curr_password"
                  value={editPass.curr_password}
                  onChange={inputPassEvent}
                  style={{height:"4rem" }}
                />
              </div>
              <div className="form-group col-sm-10 mx-auto ">
                <label className="font-20" style={{fontWeight:"bold" }} >New Password </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  name="password"
                  value={editPass.password}
                  onChange={inputPassEvent}
                  style={{height:"4rem" }}
                />
              </div>
              <div className="form-group col-sm-10 mx-auto ">
                <label className="font-20" style={{fontWeight:"bold" }} >Confirm Password </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  name="cpassword"
                  value={editPass.cpassword}
                  onChange={inputPassEvent}
                  style={{height:"4rem" }}
                />
              </div>
            </div>
            <div className="row mb-5 text-center">
              <button
                type="button"
                className="btn btn-secondary btn-lg ml-auto mr-4"
                data-dismiss="modal"
                onClick={clearData}
              >
                Close
              </button>
              <button type="button" className="btn btn-lg btn-primary mr-auto" onClick={PostPassword} >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer
          // position="top-center"
          position="bottom-center"
          style={{ fontSize: "1.7rem" }}
        />
    </>
  );
};


const ChangePhone = ({id,num}) => {

  const [editNum, setEditNum] = useState({
    number: num,
  });


    // handleing Number
  const inputNumEvent = (e) => {
      let { name, value } = e.target;
      console.log(name, value);
  
      setEditNum({ ...editNum, [name]: value });
    };

    const PostNumber = async (e) => {
      e.preventDefault();
  
      let { number } = editNum;

  
      number = number.trim();
  
      //validate Phone
      if (number === "") {
        toast.error("phone can not be blank");
      } else if (number.length !== 10) {
        toast.error("not a valid phone number");
      } else {

  
        try {
          const res = await fetch(`/update-number/${id}`, {
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
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
  

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn ml-auto bi bi-pen font-20"
        data-toggle="modal"
        data-target="#PhoneModal"
      ></button>
      {/* Modal */}
      <div
        className="modal fade"
        id="PhoneModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="PhoneModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div
            className="modal-content"
            style={{ position: "fixed", marginTop: "100px" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="row p-4">
              <div className="form-group col-sm-10 mx-auto ">
                <label className="font-20" style={{fontWeight:"bold" }} >Change Phone no. </label>
                <input type="text" 
                className="form-control font-20" 
                placeholder=""
                name="number"
                value={editNum.number}
                onChange={inputNumEvent}
                style={{height:"4rem" }}
                />
              </div>
            </div>
            <div className="row mb-5 text-center">
              <button
                type="button"
                className="btn btn-lg btn-secondary ml-auto mr-4"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" 
              onClick={PostNumber}
              className="btn btn-primary btn-lg mr-auto">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer
          // position="top-center"
          position="bottom-center"
          style={{ fontSize: "1.7rem" }}
        />
    </>
  );
};
