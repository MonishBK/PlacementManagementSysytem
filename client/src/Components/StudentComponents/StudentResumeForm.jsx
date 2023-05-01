import React, { useState, useEffect, useContext } from "react";
// import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../CSS/StudentResumeForm.css";
import { StudentData } from "../Routing";

const StudentResumeForm = () => {
  const navigate = useNavigate();
  const cvData = useContext(StudentData);
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const { DOB, email, firstname, gender, lastname, number, _id } = cvData.;
  // console.log(Number(number));
  let count = 0;

 let creer_Objective = `To work for an organization that will provide me opportunities to improve, utilize my skills and knowledge for the growth along with organization objective.`

 let num = cvData.number;
 let fName = cvData.firstname;
 let lName = cvData.lastname;
 let uid =  cvData._id;
 let uemail = cvData.email;
 let udob = cvData.DOB;
 let ugender = cvData.gender
 console.log("userid -->",uid)

//  if(ugender){
//    if(ugender === "Male"){
//      let male = document.getElementById("male")
//      console.warn(male.checked = true)
//    }else if(ugender === "Female"){
//      let female = document.getElementById("female")
//    }else if(ugender === "Other"){
//      let other = document.getElementById("other")
//    }
//  } else{
//   document.getElementById("male")
//  }

  // useEffect(() => {
  //   // let { DOB, email, firstname, gender, lastname, number, _id } = cvData;
  //   console.log(loading ,"==> from basin Resume details");
  //   if (cvData.tokens === undefined) {
  //     // setLoading(false);
  //     console.log("from form checking tockens=>",cvData.tokens)
  //   } else {
  //     console.log("from form checking tockens=>",cvData.tokens)
  //     // setLoading(true);
  //   }
  // },[]);

  useEffect(() => {
    // let { DOB, email, firstname, gender, lastname, number, _id } = cvData;
    console.log(loading ,"==> from basin Resume details");
    if (uid === undefined) {
      setLoading(false);
      console.log("from form checking tockens=>",cvData.tokens)
    } else {
      console.log("from form checking tockens=>",cvData.tokens)
      setLoading(true);
    }
  },[]);

  // States
  const [EducationData, setEducationData] = useState([
    {
      edu_id: uid,
      institute_name: "",
      edu_combination: "",
      university: "",
      edu_year_start: "",
      edu_year_end: "",
    },
  ]);

  const [Work_Exp, setWork_Exp] = useState([
    { comp_name: "", desgination: "", wrk_year_start: "", wrk_year_end: "" },
  ]);

  const [achivement, setAchivement] = useState([{ achived: "" }]);

  const [userCvData, setUserCvData] = useState({
    // user_ID: uid,
    firstname: fName,
    lastname: lName,
    email: uemail,
    number: num,
    DOB: udob,
    gender: ugender,
    Address: "",
    curr_profession: "",
    Profile_desc: creer_Objective,
    // Education: [],
    Language: "",
    Hobies: "",
    Skills: "",
    fresher: "false",
    // work_Expirience: [],
    Achivement: [],
    noAchivement: false,
    // CV_avatar: null
  });

  // Handling Onchange Events
  const inputEvent = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setUserCvData({ ...userCvData, [name]: value });
  };

  const handingEducationInput = (index, event) => {
    let { name, value } = event.target;
    // console.log(index, name, value);

    const values = [...EducationData];
    values[index][name] = value;
    setEducationData(values);
  };

  const handlingWorkExp = (index, event) => {
    let { name, value } = event.target;
    // console.log(index, name, value);

    const values = [...Work_Exp];
    values[index][name] = value;
    setWork_Exp(values);
  };

  const handingAchivementInput = (index, event) => {
    let { name, value } = event.target;
    console.log(index, name, value);

    const values = [...achivement];
    values[index][name] = value;
    setAchivement(values);
  };

  // Posting/Sending the data to the backend
  const PostData = async (e) => {
    e.preventDefault();

    // Main database
    let {
      // user_ID,
      firstname,
      lastname,
      email,
      number,
      DOB,
      gender,
      Address,
      curr_profession,
      Profile_desc,
      // Education,
      Language,
      Hobies,
      Skills,
      fresher,
      // work_Expirience,
      Achivement,
      noAchivement,
      // CV_avatar
    } = userCvData;

    // Achivement data
    // let { achived } = achivement;

    // Work expirence data
    // let { comp_name, desgination, exp_year_start, exp_year_end } = Work_Exp;

    // function to show errors
    const showMsg = (curr_div, msg) =>{
      curr_div.setAttribute(
          "style",
          `border:1px solid red; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
        );
        toast.error(msg);
  }

  // function to hide errors
  const hideMsg = (curr_div) =>{
    curr_div.setAttribute(
        "style",
        `border: 1px solid gray; box-shadow: 1px 1px 2px 1px rgba(16,128,234,.1);`
      );
}


    // Validation
    const f_name = document.getElementById("f_name");
    const l_name = document.getElementById("l_name");
    const u_email = document.getElementById("u_email");
    const ph_no = document.getElementById("ph_no");
    const dob = document.getElementById("dob");
    const u_gender = document.getElementById("u_gender");
    const u_address = document.getElementById("u_address");
    const u_curr_pro = document.getElementById("u_curr_pro");
    const u_pro_desc = document.getElementById("u_pro_desc");
    const u_lang_known = document.getElementById("u_lang_known");
    const u_hobbies = document.getElementById("u_hobbies");
    const u_skills = document.getElementById("u_skills");

    // Work Expirence Fields
    let Company_name = document.getElementsByName("comp_name");
    let u_designation = document.getElementsByName("desgination");
    let u_wrk_yr_start = document.getElementsByName("exp_year_start");
    let u_wrk_yr_end = document.getElementsByName("exp_year_end");
    let wrk_check = document.getElementById("cbox").checked;

    let wrk_exp_count = Company_name.length;

    if (!wrk_check) {
      console.log("from work exp");
      for (let i = 0; i <= wrk_exp_count - 1; i++) {
        // Validate Company Name
        if (Company_name[i].value.trim() === "") {
          showMsg(Company_name[i], "enter the company name")
          count = 0;
        } else {
          hideMsg(Company_name[i])
          count++;
        }

        // Validate Designation
        if (u_designation[i].value.trim() === "") {
          showMsg(u_designation[i],"Designation can not be empty")
          count = 0;
        } else {
          hideMsg(u_designation[i]);
          count++;
        }

        // console.log(u_wrk_yr_start[i])

        // Validate Starting Year
        if (u_wrk_yr_start[i].value.trim() === "") {
          showMsg(u_wrk_yr_start[i], "Year not be empty")
          count = 0
        } else {
          hideMsg(u_wrk_yr_start[i])
          count++
        }

        // Validate Ending year
        if (u_wrk_yr_end[i].value.trim() === "") {
          showMsg(u_wrk_yr_end[i], "Year not be empty")
          count = 0
        } else {
          hideMsg(u_wrk_yr_end[i])
          count++
        }
      }
    } else {
      // work_Expirience = [];
      setWork_Exp([])
    }

    // Achivements Fields
    let u_achive = document.getElementsByName("achived");
    let achive_check = document.getElementById("cbox_achive").checked;

    let achive_count = u_achive.length;

    if (!achive_check) {
      for (let i = 0; i <= achive_count - 1; i++) {
        if (u_achive[i].value.trim() === "") {
          showMsg(u_achive[i], "Achivement cant not be empty")
          count = 0
        } else {
          hideMsg(u_achive[i])
          count++
        }
      }
    } else {
      Achivement = [];
      noAchivement = true;
    }

    // Triming the Extra Spaces from the data
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    // number = number.trim();
    Address = Address.trim();
    curr_profession = curr_profession.trim();
    Profile_desc = Profile_desc.trim();
    Language = Language.trim();
    Hobies = Hobies.trim();
    Skills = Skills.trim();

    const isEmail = (emailVal) => {
      let atSynmol = emailVal.indexOf("@");
      if (atSynmol < 1) return false;
      let dot = emailVal.lastIndexOf(".");
      if (dot <= atSynmol + 2) return false;
      if (dot === emailVal.length - 1) return false;
      return true;
    };

       //validate username
       if (firstname === "") {
        showMsg(f_name, "First name can not be blank")
        count = 0
      } else if (firstname.length <= 2) {
        showMsg(f_name, "username min 3 char")
        count = 0
      } else {
        hideMsg(f_name)
        count++
      }

      //validate username
      if (lastname === "") {
        showMsg(l_name, "Lastname can not be blank")
        count = 0
      } else if (lastname.length === " ") {
        showMsg(l_name, "username min 1 char")
        count = 0
      } else {
        hideMsg(l_name);
        count++
      }

      //validate email
      if (email === "") {
        showMsg(u_email, "email can not be blank")
        count = 0
      } else if (!isEmail(email)) {
        showMsg(u_email, "not a valid Email")
        count = 0
      } else {
        hideMsg(u_email);
        count++
      }

      //validate Phone
      if (number === "") {
        showMsg(ph_no, "phone can not be blank")
        count = 0
      } else if (String(number).length !== 10) {
        showMsg(ph_no, "not a valid phone number")
        count = 0
      } else {
        hideMsg(ph_no);
        count++
      }

      //validate DOB
      if (DOB === "") {
        showMsg(dob, "Datenof Birth can not be blank")
        count = 0
      } else {
        hideMsg(dob);
        count++
      }

      //validate Gender
      if (gender === "") {
        showMsg(u_gender,"Gender can not be blank")
        count = 0
      }else{
        u_gender.setAttribute(
          "style",
          `border: none;);`
        );
        count++
      }

    // validate Address
    if (Address === "") {
      showMsg(u_address, "Address can not be blank")
      count = 0
    } else {
      hideMsg(u_address)
      count++
    }

    // validate Current Profession
    if (curr_profession === "") {
      showMsg(u_curr_pro, "Current Profession can not be blank")
      count = 0
    } else {
      hideMsg(u_curr_pro)
      count++
    }

    // validate Profession Description
    if (Profile_desc === "") {
      showMsg(u_pro_desc, "Career Objective can not be blank")
      count = 0
    } else {
      hideMsg(u_pro_desc)
      count++
    }

    // validate Languages Known
    if (Language === "") {
      showMsg(u_lang_known, "Language can not be blank")
      count = 0
    } else {
      hideMsg(u_lang_known)
      count++
    }

    // validate Hobbies
    if (Hobies === "") {
      showMsg(u_hobbies,"Hobbies can not be blank")
      count = 0
    } else {
      hideMsg(u_hobbies)
      count++
    }

    // validate Hobbies
    if (Skills === "") {
      showMsg(u_skills,"Skills can not be blank")
      count = 0
    } else {
      hideMsg(u_skills)
      count++
    }

    // Education Fields
    let institute_id = document.getElementsByName("institute_name");
    let combination = document.getElementsByName("edu_combination");
    let u_university = document.getElementsByName("university");
    let u_edu_yr_start = document.getElementsByName("edu_year_start");
    let u_edu_yr_end = document.getElementsByName("edu_year_end");

    // Education = [
    //   ...new Map(
    //     Education.map((item) => [item["edu_year_start"], item])
    //   ).values(),
    // ];
    // console.log("checking " + Education);

    let edu_count = institute_id.length;

    for (let i = 0; i <= edu_count - 1; i++) {
      if (
        !institute_id[i].value.trim() === "" ||
        !combination[i].value.trim() === "" ||
        !u_university[i].value.trim() === "" ||
        !u_edu_yr_start[i].value === "" ||
        !u_edu_yr_end[i].value === ""
      ) {
        toast.error("Educations fields can not be blank");
      } else {
        // let {
        //   edu_id,
        //   institute_name,
        //   edu_combination,
        //   university,
        //   edu_year_start,
        //   edu_year_end,
        // } = EducationData;

        // Education.push({ EducationData });
        // Education[0] = { EducationData };
      }

      // Validate Institute
      if (institute_id[i].value.trim() === "") {
        showMsg(institute_id[i],"institute cant not be empty")
        count = 0
      } else {
        hideMsg(institute_id[i]);
        count++
      }

      // Validate Combination
      if (combination[i].value.trim() === "") {
        showMsg(combination[i],"Combination cant not be empty")
        count = 0
      } else {
        hideMsg(combination[i])
        count++
      }

      // Validate University
      if (u_university[i].value.trim() === "") {
        showMsg(u_university[i], "University cant not be empty")
        count = 0
      } else {
        hideMsg(u_university[i])
        count++
      }

      // Validate Starting year
      if (u_edu_yr_start[i].value.trim() === "") {
        showMsg(u_edu_yr_start[i],"Year cant not be empty")
        count = 0
      } else {
        hideMsg(u_edu_yr_start[i])
        count++
      }

      // Validate End year
      if (u_edu_yr_end[i].value.trim() === "") {
        showMsg(u_edu_yr_end[i],"Year cant not be empty")
        count = 0
      } else {
        hideMsg(u_edu_yr_end[i])
        count++
      }

    }
    // console.log("===================================================")

    // work_Expirience[0] = { Work_Exp };
    // Achivement[0] = { achivement };
    // user_ID = uid
    // CV_avatar = {};

    console.log("Checking in last",uid)

    if (
      // !user_ID &&
      !firstname &&
      !lastname &&
      !email &&
      !number &&
      !DOB &&
      !gender &&
      !Address &&
      !curr_profession &&
      !Profile_desc &&
      // !Education &&
      !Language &&
      !Hobies &&
      !Skills &&
      !fresher &&
      // !work_Expirience &&
      !Achivement &&
      !noAchivement
    ) {
      console.log("Opps!!..");
    } else {
      console.log("yeah!!! Done");
    }

    console.log(
      // user_ID,
      firstname,
      lastname,
      email,
      number,
      DOB,
      gender,
      Address,
      curr_profession,
      Profile_desc,
      // Education,
      Language,
      Hobies,
      Skills,
      fresher,
      // work_Expirience,
      // Achivement,
      +"  " + noAchivement
    );
      console.log(count)
    if(count >= 17){

      const res = await fetch(`/userCVdetails/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // user_ID,
          firstname,
          lastname,
          email,
          number,
          DOB,
          gender,
          Address,
          curr_profession,
          Profile_desc,
          EducationData,
          Language,
          Hobies,
          Skills,
          fresher,
          // work_Expirience,
          Work_Exp,
          Achivement: achivement,
          noAchivement,
        }),
      });
  
  
      const data = await res.json();
  
      if (res.status === 422 || !data) {
        toast.error("Invalid registration ");
        console.log("Invalid registration ");
      } else {
        toast.success(" Registration Successfull !!..");
        console.log(" Registration Successfull !!..");
        // history.push("/");
        navigate("/std-temp-res");
        window.location.reload(false);
      }

      // console.log( firstname,
      //   lastname,
      //   email,
      //   number,
      //   DOB,
      //   gender,
      //   Address,
      //   curr_profession,
      //   Profile_desc,
      //   // Education,
      //   EducationData,
      //   Language,
      //   Hobies,
      //   Skills,
      //   fresher,
      //   Work_Exp,
      //   // work_Expirience,
      //   // Achivement,
      //   achivement
      //   )
      
    }
  };

  // Uploading Profil picture

  // Dynamic Education fields
  const AddEducationField = () => {
    let values = [...EducationData];
    console.log(values);
    setEducationData([
      ...EducationData,

      {
        edu_id: uid,
        institute_name: "",
        edu_combination: "",
        university: "",
        edu_year_start: "",
        edu_year_end: "",
      },
    ]);
    // console.log(values)
  };

  const RemoveEducationField = (index) => {
    let values = [...EducationData];

    console.log("value of the index",index)

    // console.log("Index val  "+ index)
    // console.log("length "+ values[index]);
    // console.log(JSON.stringify(values[index]))
    // console.log(res);

    if (values.length === 0) {
      alert("can't delete");
    } else {
      console.log(index);
      values = values.filter((val, ind) => {
        console.log("index values "+ ind,index )
       return ind !== index 
      });
      console.log(values);
      // values.splice(index, 1);
      // console.log(index, values);
      setEducationData(values);
    }
  };

  // Dynamic Achivements Field
  const AddAchivement = () => {
    setAchivement([...achivement, { achived: "" }]);
  };

  const RemoveAchivement = (index) => {
    const values = [...achivement];

    console.log("Index val  " + index);
    console.log("length " + values.length);

    if (values.length === 1) {
      alert("can't delete");
    } else {
      console.log(index);
      values.splice(index, 1);
      setAchivement(values);
    }
  };

  // Dynamic WorkExpirence Field
  const AddWorkExp = () => {
    setWork_Exp([
      ...Work_Exp,
      { comp_name: "", desgination: "", wrk_year_start: "", wrk_year_end: "" },
    ]);
  };

  const RemoveWorkExp = (index) => {
    const values = [...Work_Exp];

    console.log("Index val  " + index);
    console.log("length " + values.length);

    if (values.length === 1) {
      alert("can't delete");
    } else {
      console.log(index);
      values.splice(index, 1);
      setWork_Exp(values);
    }
  };

  // toggle the work fields
  const ToRemoveWrk = () => {
    let removeDiv = document.getElementById("rm_div").style;
    let check = document.getElementById("cbox").checked;
    // console.log(check)
    if (check) {
      setWork_Exp([]);
      removeDiv.display = "none";
    } else {
      AddWorkExp();
      removeDiv.display = "flex";
    }
  };

  const ToRemoveAchivements = () => {
    let removeDiv = document.getElementById("rm_achive").style;
    let check = document.getElementById("cbox_achive").checked;
    // console.log(check)
    if (check) {
      setAchivement([]);
      removeDiv.display = "none";
    } else {
      AddAchivement();
      removeDiv.display = "flex";
    }
  };

  if (loading) {
    return (
      <>
        <div className="reg_frm_container">
          <div className="inner_reg_cv">
            <form
              action=""
              methd="post"
              className="u_from"
              encType="multipart/form-data"
            >
              <label htmlFor="" className="per_info">
                <span>Personal Information</span>
              </label>
              <div className="u_data_frm_div name_details">
                <input
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  value={userCvData.firstname}
                  // value="monishbk17@gmail.com"
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="f_name"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={userCvData.lastname}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="l_name"
                />
              </div>

              <div className="u_data_frm_div">
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={userCvData.email}
                  onChange={inputEvent}
                  autoComplete="off"
                  autoCorrect="off"
                  id="u_email"
                />
              </div>

              <div className="u_data_frm_div">
                <input
                  type="number"
                  placeholder="Phone number"
                  name="number"
                  value={userCvData.number}
                  onChange={inputEvent}
                  autoCorrect="off"
                  id="ph_no"
                />
              </div>

              <div className="u_data_frm_div">
                <input
                  type="date"
                  placeholder=""
                  name="DOB"
                  value={userCvData.DOB}
                  onChange={inputEvent}
                  id="dob"
                />
              </div>

              <div className="u_data_frm_div reg_gender_field" id="u_gender">
                Gender :
                <div className="reg_gender_sel">
                  <input
                    type="radio"
                    placeholder=""
                    name="gender"
                    value="Male"
                    // value={ userCvData.gender }
                    onChange={inputEvent}
                    id="male"
                  />
                  Male
                </div>
                <div className="reg_gender_sel">
                  <input
                    type="radio"
                    placeholder=""
                    name="gender"
                    value="Female"
                    // value={ userCvData.gender }
                    onChange={inputEvent}
                    id="female"
                  />
                  Female
                </div>
                <div className="reg_gender_sel">
                  <input
                    type="radio"
                    placeholder=""
                    name="gender"
                    value="Other"
                    // value={ userCvData.gender }
                    onChange={inputEvent}
                    id="other"
                  />
                  Others
                </div>
              </div>

              <div className="u_data_frm_div">
                <textarea
                  cols="30"
                  rows="5"
                  type="text"
                  placeholder="Address.."
                  name="Address"
                  value={userCvData.Address}
                  onChange={inputEvent}
                  autoCorrect="off"
                  autoComplete="off"
                  id="u_address"
                ></textarea>
              </div>

              <label htmlFor="" className="per_info">
                <span>Educational/Professional Infomation</span>
              </label>
              <div className="u_data_frm_div dynamic_add">
              <label htmlFor="">
                  <span >Current Profession:</span>
                </label>
                <input
                  type="text"
                  placeholder="Current Profession"
                  name="curr_profession"
                  value={userCvData.curr_profession}
                  onChange={inputEvent}
                  autoCorrect="off"
                  autoComplete="off"
                  id="u_curr_pro"
                  style={{marginTop: '10px'}}
                />
              </div>

              <div className="u_data_frm_div dynamic_add">
              <label htmlFor="">
                  <span>Career Objective:</span>
                </label>
                <textarea
                  name="Profile_desc"
                  cols="30"
                  rows="3"
                  type="text"
                  placeholder="Career Objective"
                  value={userCvData.Profile_desc}
                  onChange={inputEvent}
                  autoCorrect="off"
                  autoComplete="off"
                  id="u_pro_desc"
                ></textarea>
              </div>

              <div className="u_data_frm_div dynamic_add">
                <label htmlFor="">
                  <span>Educational Details:</span>
                </label>
                {EducationData.map((currField, index) => (
                  <div className="dynamic_data spac_in_input" key={index+50}>
                    <input
                      type="text"
                      placeholder="Institute name"
                      name="institute_name"
                      value={currField.institute_name}
                      onChange={(event) => handingEducationInput(index, event)}
                      autoCorrect="off"
                      autoComplete="off"
                    />
                    <div className="combi_university">
                      <input
                        type="text"
                        placeholder="Combination"
                        name="edu_combination"
                        value={currField.edu_combination}
                        onChange={(event) =>
                          handingEducationInput(index, event)
                        }
                        autoCorrect="off"
                        autoComplete="off"
                      />

                      <input
                        type="text"
                        placeholder="University"
                        name="university"
                        value={currField.university}
                        onChange={(event) =>
                          handingEducationInput(index, event)
                        }
                        autoCorrect="off"
                        autoComplete="off"
                      />
                    </div>

                    <div className="adding_remov">
                      <div className="edu_yr">
                        <input
                          type="month"
                          placeholder="Year_of_Joining"
                          name="edu_year_start"
                          value={currField.edu_year_start}
                          onChange={(event) =>
                            handingEducationInput(index, event)
                          }
                          autoCorrect="off"
                          autoComplete="off"
                          maxLength="3"
                        />
                        <span className="saparating"> - </span>
                        <input
                          type="month"
                          placeholder="Year_of_passing"
                          name="edu_year_end"
                          value={currField.edu_year_end}
                          onChange={(event) =>
                            handingEducationInput(index, event)
                          }
                          autoCorrect="off"
                          autoComplete="off"
                          maxLength="3"
                        />
                      </div>
                      <div className="icon_btn_dynamic" id="divlen">
                        {/* <h1 onClick={() => AddEducationField()} className="adding_btn">+</h1> */}
                        <h1
                          onClick={() => RemoveEducationField(index)}
                          className="removing_btn"
                        >
                          <MdDelete />
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="icon_rm_dynamic">
                  <h1
                    onClick={() => AddEducationField()}
                    className="adding_btn"
                  >
                    Add +
                  </h1>
                </div>
              </div>

              <div className="u_data_frm_div dynamic_add">
                <label htmlFor="" className="wrk_exp">
                  <span>Work Experience:</span>
                  <div className="fresher_div">
                    <input
                      type="checkbox"
                      name="fresher"
                      value="Fresher"
                      onChange={inputEvent}
                      onClick={ToRemoveWrk}
                      id="cbox"
                    />
                    Fresher
                  </div>
                </label>
                <div className="remove_div" id="rm_div">
                  {Work_Exp.map((currField, index) => (
                    <div className="dynamic_data spac_in_input " key={index+20}>
                      <input
                        type="text"
                        placeholder="company name"
                        name="comp_name"
                        value={currField.comp_name}
                        onChange={(event) => handlingWorkExp(index, event)}
                        autoCorrect="off"
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        placeholder="Designation"
                        name="desgination"
                        value={currField.desgination}
                        onChange={(event) => handlingWorkExp(index, event)}
                        autoCorrect="off"
                        autoComplete="off"
                      />
                      <div className="adding_remov">
                        <div className="edu_yr">
                          <input
                            type="month"
                            placeholder="From"
                            name="exp_year_start"
                            value={currField.exp_year_start}
                            onChange={(event) => handlingWorkExp(index, event)}
                            autoCorrect="off"
                            autoComplete="off"
                          />
                          <span className="saparating">-</span>
                          <input
                            type="month"
                            placeholder="To"
                            name="exp_year_end"
                            value={currField.exp_year_end}
                            onChange={(event) => handlingWorkExp(index, event)}
                            autoCorrect="off"
                            autoComplete="off"
                          />
                        </div>
                        <div className="icon_btn_dynamic">
                          {/* <h1 onClick={() => AddWorkExp()}>+</h1> */}
                          <h1
                            onClick={() => RemoveWorkExp(index)}
                            className="removing_btn"
                          >
                            <MdDelete />
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="icon_rm_dynamic">
                    <h1 onClick={() => AddWorkExp()} className="adding_btn">
                      Add +
                    </h1>
                  </div>
                </div>
              </div>

              <div className="u_data_frm_div dynamic_data_lang dynamic_add">
                <label htmlFor="">
                  <span>Language Known:</span>
                </label>
                <div className="lang_Container ">
                  <input
                    type="text"
                    placeholder="eg: English, kannada, hindi..."
                    name="Language"
                    value={userCvData.Language}
                    onChange={inputEvent}
                    autoCorrect="off"
                    autoComplete="off"
                    id="u_lang_known"
                  />
                </div>
              </div>

              <div className="u_data_frm_div dynamic_data_lang dynamic_add">
                <label htmlFor="">
                  <span>Hobies:</span>
                </label>
                <div className="lang_Container ">
                  <input
                    type="text"
                    placeholder="eg: Reading books, painting, coding..."
                    name="Hobies"
                    value={userCvData.Hobies}
                    onChange={inputEvent}
                    autoCorrect="off"
                    autoComplete="off"
                    id="u_hobbies"
                  />
                </div>
              </div>

              <div className="u_data_frm_div dynamic_data_lang dynamic_add">
                <label htmlFor="">
                  <span>Skills:</span>
                </label>
                <div className="lang_Container ">
                  <input
                    type="text"
                    placeholder="eg: Java, JavaScript, Python..."
                    name="Skills"
                    value={userCvData.Skills}
                    onChange={inputEvent}
                    autoCorrect="off"
                    autoComplete="off"
                    id="u_skills"
                  />
                </div>
              </div>

              <div className="u_data_frm_div dynamic_data_lang dynamic_add">
                <label htmlFor="" className="u_achive_div">
                  <span>Achivements:</span>
                  <div className="achivemet_div">
                    <input
                      type="checkbox"
                      name="usera"
                      value={true}
                      onChange={inputEvent}
                      onClick={ToRemoveAchivements}
                      id="cbox_achive"
                    />
                    No Achivements
                  </div>
                </label>
                <div className="remove_div" id="rm_achive">
                  {achivement.map((currEle, index) => (
                    <>
                      <div className="lang_Container spac_in_input" key={index+1}>
                        <input
                          type="text"
                          placeholder="Activements"
                          name="achived"
                          value={currEle.achived}
                          onChange={(event) =>
                            handingAchivementInput(index, event)
                          }
                          autoCorrect="off"
                          autoComplete="off"
                        />
                        <div className="icon_btn_dynamic">
                          {/* <h1 onClick={() => AddAchivement()}>+</h1> */}
                          <h1
                            onClick={() => RemoveAchivement(index)}
                            className="removing_btn"
                          >
                            <MdDelete />
                          </h1>
                        </div>
                      </div>
                    </>
                  ))}

                  <div className="icon_rm_dynamic">
                    <h1 onClick={() => AddAchivement()} className="adding_btn">
                      Add +
                    </h1>
                  </div>
                </div>
              </div>

              {/* <div className="u_data_frm_div dynamic_data_lang dynamic_add add_progress">
                <AvatarUpload />
              </div> */}

              <div className="inner_form cv_submit">
                <button
                  type="submit"
                  className="btn_form reg_cv_btn"
                  value="register"
                  onClick={PostData}
                >
                  Sumbit
                </button>
              </div>
            </form>
          </div>
          <ToastContainer
            // position="top-center"
            position="bottom-center"
            style={{ fontSize: "1.7rem" }}
          />
        </div>
      </>
    );
  }else{

    setTimeout(() => {
      if(loading === true)
          navigate("/");
    }, 3000);

    console.log("value=>",loading)
    return <div className="loading_container">
    <div className="img_lod_fixed"></div>
  </div>;
  }
};

export default StudentResumeForm;
