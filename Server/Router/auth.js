const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const fast2sms = require('fast-two-sms')
const Authenticate = require("../middleware/authenticate")
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

router.use(cookieParser()); 

// Database Schema
const User = require("../model/UserSchema");
const {StudentCV,StdInfo, JobPosters,StdNotice,Company} = require("../model/StudentDataSchema")

// Config file 
const pathname = process.env.PRO_PIC_PATH_NAME ;
const F2S_API_KEY = process.env.F2S_API_KEY; 

// File Upload using multer
let storage = multer.diskStorage({
    destination: process.env.DISKSTORAGE,

    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, file.fieldname+""+ Date.now() + path.extname(file.originalname));
    }
}); 


const upload = multer({storage, 
    limits:{fileSize: 2000000},
    fileFilter: (req, file, cb) => {
            console.log("inside the multer loop")
            if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "application/pdf") {
                console.log("accepted file type")
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .jpg , .jpeg and application/pdf format allowed!'));
            }
    }
})


router.get('/home', async(req, res)=>{
    res.send("Hello from Home page");
})


// user Registration 
router.post('/register', async (req, res) =>{

    const {firstname, lastname, email, number, password, cpassword, DOB, gender, UserType} = req.body;

    if(!firstname || !lastname || !email || !number || !password || !cpassword || !DOB || !gender || !UserType){
        return res.status(422).json({error : "Plz fill all the field"});
    }
    
    try{

        const userExist = await User.findOne({email : email});
        const userNum = await User.findOne({number: number});

        if( userExist ){
            console.log("Email already exist")
            return res.status(422).json({error : "Email already exist"});
        }else if( userNum ){
            console.log("number already exist")
            return res.status(422).json({error : "number already exist"});
        }else if(password !== cpassword){
            console.log("Password are not matching")
            return res.status(422).json({error : "Password are not matching"});
        }else {
            console.log("inside the else loop")
            const user = new User({firstname, lastname, email, number, password, cpassword, DOB, gender, UserType});
            await user.save();
            res.status(201).json({ message: "successfully" });
        }

    } catch (err) {
        console.log(err);
    }
});


// user login 
router.post("/signin", async (req, res) =>{

    try{

        let token; 
        const { email, number , password } = req.body;
        // const email = req.body.email;

        console.log(email, number, "" === undefined, (!number || !password) &&  (!email || !password));

        if(email !== undefined){
           console.log("inside email ", email, password)
            if(email || password){
                var userLogin = await User.findOne( { email: email } );
            }

        }else if(number !== undefined){
            console.log("inside number", number, password)
            if(number || password){
                var userLogin = await User.findOne( { number: number } );
            }

        }else{
            console.log("in else statement")
            return res.status(400).json({error : "invalid login details"});
        } 

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthTocken();
            // console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            console.log("matching", isMatch)
            if(!isMatch){
                console.log("inside is Match")
                res.status(400).json({ error : "Invalid Credential"});
            } else {
                res.json({ message : "user Signin successfull!.."});
            }
        }else{
            console.log("didnt get the user")
            res.status(400).json({ error : "Invalid Credential"}); 
        }


    } catch (err) {
        console.log(err);
    }

});


// // user datafetching
router.get('/datafetch', Authenticate , (req,res) =>{
    // console.log("Hello from datafetch");
    // console.log("data from auth==>",req.rootUser)
    res.send(req.rootUser);
});


router.get("/user/resume/resumeData", Authenticate , async (req, res) =>{

    try {
        const user_ID = req.userID;
        console.log(user_ID)
        const resumeData = await StudentCV.findOne({user_ID});
        console.log("from the resume details",resumeData !== null)
        if(resumeData !== null){
            res.status(200).send(resumeData)
        } else{
            res.status(401).json({err: "Oop's on data found "})
        }
    
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }
   

});


// Retrive user CV Data 
router.get("/user-cv-data/:id",async (req, res) =>{
    try {
        const user_ID = req.params.id;
        const usercv = await UserCV.findOne({user_ID});

        res.status(200).send(usercv)
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }
});


// Student CV Details
router.post('/userCVdetails/:id', async (req, res) =>{

    const {
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
        Achivement,
        noAchivement,
        // CV_avatar
        } = req.body;

        const user_ID = req.params.id

    if(! user_ID ||
       ! firstname ||
       ! lastname ||
       ! email ||
       ! number ||
       ! DOB ||
       ! gender ||
       ! Address ||
       ! curr_profession ||
       ! Profile_desc ||
       ! EducationData ||
       ! Language ||
       ! Hobies ||
       ! Skills ||
       ! fresher ||
       ! Work_Exp ||
       ! Achivement 
    //    !noAchivement 
    //    ! CV_avatar
       ){
           console.log(
            ! user_ID ,
            ! firstname ,
            ! lastname ,
            ! email ,
            ! number ,
            ! DOB ,
            ! gender ,
            ! Address ,
            ! curr_profession ,
            ! Profile_desc ,
            ! EducationData ,
            ! Language ,
            ! Hobies ,
            ! Skills ,
            ! fresher ,
            ! Work_Exp ,
            ! Achivement )
            console.log(user_ID)
        return res.status(422).json({error : "Plz filled all the field"});
    }

    let work_Expirience = Work_Exp
    
    try{

        const fileFetch = await User.findById(req.params.id);

        const userdata = new StudentCV({
            user_ID,
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
            work_Expirience,
            Achivement,
            noAchivement,
            CV_avatar : fileFetch.Resume_img
            });

            // userdata.CV_avatar = req.file;

        await userdata.save();
        res.status(201).json({ message: "successfull" });

    } catch (err) {
        console.log("Error -->",err);
        res.status(422).json({ error: err });
    }
});


// Edit Student CV
router.post('/userCVdetailsEdit/:id', async (req, res) =>{

    const _id = req.params.id

    const {
        firstname,
        lastname,
        email,
        number,
        DOB,
        gender,
        Address,
        curr_profession,
        Profile_desc,
        educationData,
        Language,
        Hobies,
        Skills,
        fresher,
        Work_Exp,
        achivement,
        noAchivement,
        // CV_avatar
        } = req.body;

    if(
       ! firstname ||
       ! lastname ||
       ! email ||
       ! number ||
       ! DOB ||
       ! gender ||
       ! Address ||
       ! curr_profession ||
       ! Profile_desc ||
       ! educationData ||
       ! Language ||
       ! Hobies ||
       ! Skills ||
       ! fresher ||
       ! Work_Exp ||
       ! achivement 
    //    !noAchivement 
    //    ! CV_avatar
       ){
           console.log(
            ! firstname ,
            ! lastname ,
            ! email ,
            ! number ,
            ! DOB ,
            ! gender ,
            ! Address ,
            ! curr_profession ,
            ! Profile_desc ,
            ! educationData ,
            ! Language ,
            ! Hobies ,
            ! Skills ,
            ! fresher ,
            ! Work_Exp ,
            ! achivement )

        return res.status(422).json({error : "Plz filled all the field"});
    }
    
    try{

        const fileFetch = await StudentCV.findByIdAndUpdate(_id, {
            firstname,
            lastname,
            email,
            number,
            DOB,
            gender,
            Address,
            curr_profession,
            Profile_desc,
            EducationData: educationData,
            Language,
            Hobies,
            Skills,
            fresher,
            work_Expirience: Work_Exp,
            Achivement: achivement,
            noAchivement,
        });

            // userdata.CV_avatar = req.file;

        res.status(201).json({ message: "successfull" });

    } catch (err) {
        console.log("Error -->"+err);
        res.status(422).json({ error: err });
    }
});

// user Logout
router.get("/logout", Authenticate , async (req, res) =>{
    try {
        console.log(req.user.firstname);
        console.log(req.user.tokens.length +" " + "before logout");

        const email = req.user.email
        // for single logout in database
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !==  req.token;
        })

        // logout from all devices
        // req.user.tokens = []; 
        await req.user.save();
        

        res.clearCookie("jwtoken", {path:'/'});
        console.log(" logout Successfull!..");
        console.log(req.user.tokens.length + " " + "after logout");

        res.status(200).send("User Logout");
        // await req.user.save();
        // res.render("login");
    } catch (error) {
        res.status(500).sendStatus(error);

    }
});


// user Logout All
router.get("/logout-all-devices", Authenticate , async (req, res) =>{
    try {
        console.log(req.user.firstname);
        console.log(req.user.tokens.length +" " + "before logout");

        const email = req.user.email
        // for single logout in database
        // req.user.tokens = req.user.tokens.filter((currElement) => {
        //     return currElement.token !==  req.token;
        // })

        // logout from all devices
        req.user.tokens = []; 
        await req.user.save();
        

        res.clearCookie("jwtoken", {path:'/'});
        console.log(" logout Successfull!..");
        console.log(req.user.tokens.length + " " + "after logout");

        res.status(200).send("User Logout");
        // await req.user.save();
        // res.render("login");
    } catch (error) {
        res.status(500).sendStatus(error);

    }
});


// Forgot Password
router.post("/forgot-password/:num", async (req, res) =>{

    try {
        
        const number = String(req.params.num);
        const check = await User.findOne({number});
        // let otp = 89456;

        // Function to generate OTP
        const generateOTP = () =>{
            // Declare a digits variable 
            // which stores all digits
            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 6; i++ ) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return Number(OTP); 
        }

        const DelOTP = async () =>{
            await User.findOneAndUpdate({number},{OTP:null})
            console.log("OTP deleted successfull!!..")
        }

        if(check === null){
            res.status(422).json({ message: "Invaluid Cridensials" });
        }else{
            console.log(number)
            let otp = generateOTP()
            console.log(otp)
            await User.findOneAndUpdate({number},{OTP:otp})
            console.log("before set timeout") 
            // console.log("after set timeout")
            let options = {authorization : F2S_API_KEY , message : `${otp} is your placement Online Portal code ` ,  numbers : [number] } 
            fast2sms.sendMessage(options).then(response=>{
                console.log(response)
                setTimeout(DelOTP, 300000)
                console.log("after set timeout")
                // res.status(201).json({ message: "message sent successfully" });
                res.status(201).send(check);
                console.log("message sent successfully")
            }).catch((err)=>{
                res.status(422).json({ error: err }); 
                console.log(err)
            })
        }

    } catch (err) {
        res.status(400).json({ error: err }); 
    }

    
});


// Matching the OTP
router.post("/check-otp-match/:num", async (req, res) =>{
    try {
        console.log("inside the otp-match")
        const number = req.params.num;
        const {OTP} = req.body;
        const check = await User.findOne({number});

        if(check === null){
            console.log("invalid number")
            res.status(422).json({error: "invalid number"})
        }else{
            if(check.OTP === Number(OTP)){
                await User.findOneAndUpdate({number},{OTP:null})
                res.status(200).json({message: "OTP Matched!!.."})
            }else{
                res.status(422).json({message: "Invalid OTP!!.."})
            }
        }

    } catch (err) {
        confirm.log(err)
        res.status(422).json({error: err})
    }
});


// Changing Password using OTP
router.post("/change-pass-otp/:num", async (req, res) =>{
    try {
        console.log("inside change-otp-pass")
        const number = req.params.num;
        const {password, cpassword} = req.body;
        const updatePassword = await User.findOne({number})

        if(updatePassword){
            if(!password || !cpassword){
                return res.status(422).json({error : "Plz fill all the field"});
            }
            updatePassword.password = password
            // updatePassword.cpassword = cpassword
            updatePassword.save(function (err,data){
                if(err || !data){
                    throw new Error("Oops something went wrong!..")
                }
            }); 
            res.status(201).json({ message: "password changed successfull" });
            console.log("password changed sucessful");
        }else{
            console.log("Oop's No User Found ")
        res.status(400).json({error: "Oop's Number did't match"})
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({error: err})
    }
});


// Retrive Students
router.get("/get-student-list", async (req, res) =>{
    try{

        const [Branch ,Yr_of_pass] = req.body;
        const stdList = await User.find({Branch , Yr_of_pass}).exec();

        if(stdList){

            res.status(201).json({ message: "password changed successfull" });
        }else{
            console.log("Oop's No Students Found ")
            res.status(400).json({error: "Oop's No Students Found "})
        }

    }catch(err){
        console.log(err)
        res.status(400).json({error: err})
    }
});


// Updating Email
router.patch("/update-email/:id", async (req, res) =>{
    try {
        const _id = req.params.id;
        const {email} = req.body;
        console.log("inside the update",email)
        if(!email.trim()){
            return res.status(422).json({error : "Plz fill the field"});
        }
        console.log("after inside")
        const userExist = await User.findOne({email});
        console.log("after fetching", userExist)
        if( userExist ){
            console.log("Email already exist")
            return res.status(422).json({error : "Email already exist"});
        }
        const updateEmail = await User.findByIdAndUpdate( _id, {email},{
            new : true
        });
        res.status(201).json({ message: "email updated successfull" });
        console.log("email Updated sucessful")
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }
});

// Updating Number
router.patch("/update-number/:id", async (req, res) =>{
    try {
        const _id = req.params.id;
        const {number} = req.body;
        console.log("inside the update",number)
        if(!number.trim()){
            return res.status(422).json({error : "Plz fill the field"});
        }
        console.log("after inside")
        const userExist = await User.findOne({number});
        console.log("after fetching", userExist);
        if( userExist ){
            console.log("Number already exist")
            return res.status(422).json({error : "Number already exist"});
        }
        const updateEmail = await User.findByIdAndUpdate( _id, {number},{
            new : true
        });
        res.status(201).json({ message: "number updated successfull" });
        console.log("number Updated sucessful")
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }
});


// Updating Password
router.patch("/update-pass/:id", async (req, res) =>{
    try {
        const _id = req.params.id;
        const {password, cpassword, curr_password} = req.body;
        console.log("from the req.body",password, cpassword, curr_password)
        const updatePassword = await User.findById(_id)
        console.log("inside the update password", updatePassword)
        if(updatePassword){
            console.log("entered the if condion",curr_password, updatePassword.password);
            const isMatch = await bcrypt.compare(curr_password, updatePassword.password);
            console.log("inside the updatePassword ")
            if(!isMatch){
                console.log("couldn't match");
                res.status(400).json({ error : "Invalid Credential"});
            } else {
                console.log("password matched")
                if(!password || !cpassword){
                    return res.status(422).json({error : "Plz fill all the field"});
                }
                updatePassword.password = password
                // updatePassword.cpassword = cpassword
                updatePassword.save(function (err,data){
                    if(err || !data){
                        throw new Error("Oops something went wrong!..")
                    }
                }); 
                res.status(201).json({ message: "password updated successfull" });
                console.log("password Updated sucessful");
            }
        }else{
            res.status(400).json({ error : "Invalid Credential"}); 
        }
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }
});


// Uploading the Profile Picture
router.put('/upload/profile-pic/:id', upload.single("propic_avatar"), async (req, res) =>{

    try{
        const Uploaded_File = req.file
        const _id = req.params.id
        // console.log(Uploaded_File,"==>filename")

        const fetch_pic = await User.findById(_id);
        const r_pic = fetch_pic.Profile_pic;

        if(r_pic !== null) {

            fs.unlink(`${pathname}/${r_pic}`, (err) =>{
                if (err) throw err;
                console.log('File deleted!');
            })
        }


        const UserUpdate = await User.findByIdAndUpdate( _id, {Profile_pic :  Uploaded_File.filename},{
            new : true
        });

        // console.log(UserUpdate);
        res.status(201).json({ message: "File Uploaded successfully" });
        console.log("File Uploaded sucessful")

    }catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }


});


// Deleting Profile pic
router.put('/delete-propic/:id', async (req, res) =>{
    try {
        const _id = req.params.id

        const fetch_pic = await User.findById(_id);
        const r_pic = fetch_pic.Profile_pic;

        console.log(r_pic,"==> from delete pic")

        if(r_pic !== null) {

            fs.unlink(`${pathname}/${r_pic}`, (err) =>{
                if (err) throw err;
                console.log('File deleted!');
            })
        }
        const UserUpdate = await User.findByIdAndUpdate( _id, {Profile_pic : null},{
            new : true
        });
        // console.log(UserUpdate) 

        res.status(201).json({ message: "Profile pic Removed successfully" });
        console.log("Pro pic deleted sucessful")
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }
});


// Delete User Account
router.delete("/user/delete-acc/:id", async (req, res) =>{
    try{

        const _id = req.params.id;
        const User_ID = _id;
        const {passDel} = req.body
        let password = passDel

        const UserLog = await User.findById(_id);

        const isMatch = await bcrypt.compare(password, UserLog.password);

        if(isMatch){  
            const check_resume = await StudentCV.findOne({User_ID})
            const pro_pic = UserLog.Profile_pic
            const USN = UserLog.USN;
            await StdNotice.deleteMany({student_usn:USN})
            await StdInfo.deleteOne({USN});

            // console.log(pro_pic,"==> from delete pic")
    
            if(pro_pic !== null) {
    
                fs.unlink(`${pathname}/${pro_pic}`, (err) =>{
                    if (err) throw err;
                    console.log('File deleted!');
                })
            }
    
            if(check_files){

                const files = check_files.E_Certificates

                if(files.length !== 0){
                    files.map((curr) =>{
                        fs.unlink(`${pathname}/${curr.file_name.filename}`, (err) =>{
                            if (err) throw err;
                            console.log('File deleted!');
                        })   
                    })
                }

                // await UserCVFiles.findOneAndDelete({User_ID});
                console.log("User files deleted Successfully")
            }
    
            if(check_resume){
                await StudentCV.findOneAndDelete({User_ID});
                console.log("User Resume deleted Successfully");
            }
            res.clearCookie("jwtoken", {path:'/'});
            await User.findByIdAndDelete(_id)
    
            res.status(201).json({ message: "Account is deleted successfully" });
            console.log("Account is deleted successfully")
        }else{
            console.log("password do not match")
            res.status(400).json({ error : "Invalid Credential"});
        }


    }catch(err){
        console.log(err);
        res.status(422).json({ error: err });
    }
});

// Poster Pic Upload
router.post("/upload-poster-pic",upload.single("job_poster_pic"), async(req,res) =>{

    try{
        const Uploaded_File = req.file
        // const [poster_title,Poster_desc, poster_link,branch] = req.body;
        // console.log(Uploaded_File,"==>filename");
        // console.log(poster_title,Poster_desc, poster_link,branch);

        const posterpic = new JobPosters({poster_pic:  Uploaded_File.filename});

        const DelPost = async () =>{

        //    let _id =  posterpic._id;

        try{

            let checkPoster = await JobPosters.find();
 
            checkPoster.map(ele=>{
 
             if(ele.poster_title === null){
 
                 if(ele.poster_pic !== null) {
 
                     fs.unlink(`${pathname}/${ele.poster_pic}`, (err) =>{
                         if (err) throw err;
                         console.log('Poster deleted!');
                     })
                    }
                }
                
            })
            
            
            await JobPosters.deleteMany({poster_title: null});
            console.log("Poster Data Deleted Succefull!!..")

        }catch(err){
            console.log("error=>", err);
        }

        }

        // console.log(UserUpdate);
        await posterpic.save();
        console.log("poster data uploade==>",posterpic._id);
        setTimeout(DelPost, 2000000);
        res.status(201).json({ message: "File Uploaded successfully", post_id: posterpic._id});
        console.log("Poster Uploaded sucessful");

    }catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }


})

// Upload job posters/Brochure
router.post("/upload-job-posters-data", async (req,res)=>{
    console.log("inside poster-data");

    const {poster_title,Poster_desc, poster_link,branch,p_loc }= req.body;
    console.log(poster_title,Poster_desc, poster_link,branch,p_loc );

    if(!poster_title || !Poster_desc || !poster_link || !branch || !p_loc){
        return res.status(422).json({error : "Plz filled all the field"});
    }

    try{
        
        const pdata = await JobPosters.findOneAndUpdate({_id:p_loc},{poster_title,Poster_desc, poster_link,branch})

        await pdata.save();
        res.status(201).json({ message: "successfull" });

    }catch(err){
        console.log("Error -->",err);
        res.status(422).json({ error: err });
    }

})


// Upload Calender Reaminders
router.post("/upload-Student-Nofifications", async (req,res)=>{
    console.log("inside upload-Student-Nofifications");

    const {title,notice_desc,notice_type,branch}= req.body;
    console.log(title,notice_desc,notice_type,branch );

    if(!title || !notice_desc || !notice_type || !branch){
        return res.status(422).json({error : "Plz filled all the field"});
    }

    try{
        
        const std_notices = new StdNotice({title,notice_desc,notice_type,branch})

        await std_notices.save();
        res.status(201).json({ message: "successfull" });

    }catch(err){
        console.log("Error -->",err);
        res.status(422).json({ error: err });
    }

})

// Student List
router.post("/students-list", async(req,res)=>{

    try{

        const {branch,Pass_Year} = req.body;
        console.log(branch,Pass_Year)

        if(branch === "Both"){
            const stdlist = await User.find({UserType:"Student",Pass_Year:Pass_Year}); 
            res.status(200).send(stdlist)
        }else{
            const stdlist = await User.find({UserType:"Student",branch:branch,Pass_Year:Pass_Year}); 
            res.status(200).send(stdlist)
        }
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }




})

// Company List
router.post("/company-list", async(req,res)=>{

    try{

        const {comp_Year} = req.body;
        console.log(comp_Year)


            const comlist = await Company.find({cyear:comp_Year}); 
            console.log(comlist)
            res.status(200).send(comlist)

    } catch (err) {
        console.log(err);
        res.status(422).json({ error: err });
    }




})

// Student USN Update
router.patch("/student-usn-update/:id",async(req,res) =>{
    try{

        const {branch,USN} = req.body;
        const _id = req.params.id; 

        // console.log(branch,USN,_id)
        const utdusn = await User.findOne({USN});

        if( utdusn ){
            console.log("USN already exist")
            return res.status(422).json({error : "USN already exist"});
        }else{
            const stdata = await User.findByIdAndUpdate({_id},{branch,USN});
    
            await stdata.save();
            res.status(201).json({ message: "successfull" });
        }


    }catch(err){
        console.log("Error -->",err);
        res.status(422).json({ error: err });
    }
})

// Student Information
router.post("/student-info",async(req,res) =>{
    try{

        const {  USN,
            SSLC,
            PUC,
            UG,
            PG,
            branch,
            Backlogs,
            sem,
            Detained_year,
            History_of_backlogs,
            Pass_Year} = req.body;

            console.log( USN,
                SSLC,
                PUC,
                UG,
                PG,
                branch,
                Backlogs,
                sem,
                Detained_year,
                History_of_backlogs,
                Pass_Year);

        // console.log(branch,USN,_id)
        const student = await User.findOne({USN});

        let name = student.firstname +" "+ student.lastname;

            const stdata = await new StdInfo({
                USN,
                SSLC,
                PU_Diploma:PUC,
                UG,
                PG,
                Branch: branch,
                Curr_Backlogs: Backlogs,
                Curr_Sem: sem,
                Detained_Years: Detained_year,
                History_of_backlogs,
                name,
                Pass_Year});
    
            await stdata.save();
            const upyear = await User.findOneAndUpdate({USN},{Pass_Year});
            await upyear.save();
            res.status(201).json({ message: "successfull" });


    }catch(err){
        console.log("Error -->",err);
        res.status(422).json({ error: err });
    }
})

// Student Notification
router.get("/fetch-notification", async (req,res) =>{
    try{

        // const branch = req.params.branch;

        const notificationData = await StdNotice.find()
        // const ndata = await StdNotice.find({branch:"Both"})
        // ndata.map(ele=>{

        //     notificationData.push(ele);
        // })
        // console.log(notificationData);
        notificationData.reverse();

        res.status(200).send(notificationData)
    }catch(err){
        console.log("Error -->",err);
        res.status(422).json({ error: err });
    }
})

router.delete("/delete-feeds-with-out-title", async (req,res) =>{

    try{ 

        let posters = await JobPosters.find({poster_title: null});

        console.log(posters);

        posters.map(pics =>{
            if(posters.pro_pic !== null) {
    
                fs.unlink(`${pathname}/${pics.poster_pic}`, (err) =>{
                    if (err) throw err;
                    console.log('File deleted!');
                })
            }
        })


        await JobPosters.deleteMany({poster_title: null}); 
        res.status(201).json({ message: "successfull" });

    }catch(err){
        console.log("Error -->",err); 
        res.status(422).json({ error: err });   
    }

})

router.get("/fetch-student-feeds", async (req,res) =>{
    try{

        let feedsData = await JobPosters.find();
        res.status(200).send(feedsData.reverse())

    }catch(err){
        console.log("err=>",err);
        res.status(422).json({ error: err });  
    }
})

// Delete all the data
router.delete("/delete-all-data", async (req,res) =>{
    try{

        await JobPosters.deleteMany();
        await StdNotice.deleteMany();

        res.status(200).json({message : "Deleted Successfull!..."})

    }catch(err){
        console.log("err=> ",err);
        res.status(400).jason({error: err});
    }
})

// Add Company
router.post("/add-company", async (req,res) =>{

    try{

        const {company_name,company_link,cpackage,comp_Year} = req.body;
        console.log("inside add company");
        console.log(company_name,company_link,cpackage,comp_Year);

        if(!company_name || !company_link || !comp_Year || !cpackage){
            console.log("Company name cant be empty");
            res.status(422).json({error: "Company name cant be empty"}); 
        }

        const comdata = new Company({company_name,company_link,cpackage,cyear:comp_Year});
        await comdata.save();
        res.status(201).json({ message: "successfull!!.." });


    }catch(err){
        console.log("err=>",err);
        res.status(422).json({error : err});
    }
})

// Add Company
router.delete("/delete-company/:id", async (req,res) =>{

    try{

        const _id = req.params.id;
        console.log(_id)

        if(!_id){
            console.log("Error in finding the company");
            res.status(422).json({error: "Error in finding the company"});
        }

        await Company.deleteOne({_id});
        res.status(201).json({ message: "successfull!!.." });


    }catch(err){
        console.log("err=>",err);
        res.status(422).json({error : err});
    }
})

// fetch company list
router.get("/fetch-company-list", async (req,res) =>{
    try{

        let comp_Data = await Company.find();
        res.status(200).send(comp_Data)

    }catch(err){
        console.log("err=>",err);
        res.status(422).json({ error: err });  
    }
})


// Student Placed to a company
router.post("/student-placed-company", async (req,res)=>{

    try{
        console.log("inside student placed") 
        const {student_usn,company_id,placed_date}= req.body;

        if(!student_usn || !company_id || !placed_date){  
            console.log("Fill all the fields")
            res.status(422).json({error:"Fill all the fields"});
        }

      

        const placedstudent = await Company.findOne({_id : company_id});

        const placed = await StdInfo.findOneAndUpdate({USN:student_usn},{
            Placed:true,
            placed_company_id:company_id,
            date_of_placed:placed_date,
            placed_company:placedstudent.company_name,
            cpackage: placedstudent.cpackage
        })

        await placed.save();

        const _id = company_id

        const student_info = await StdInfo.findOne({USN:student_usn})
        const company_info = await Company.findById(_id);

        const std_notice = new StdNotice({
            title: ` Congartulation you have placed in ${company_info.company_name} Company`,
            notice_desc:"All the best for your future regards SMVIT Placement cell",
            notice_type:"Notification",
            branch:student_info.Branch,
            student_usn:student_usn,
        })

        
        await std_notice.save();
        res.status(201).json({message:"Updated Successfull..!!"})


    }catch(err){
        console.log("err=>",err);
        res.status(422).json({error: err});
    }

});


// Get Student list all
router.get("/student-list-all", async (req,res) =>{
    try{

        let comp_Data = await User.find({UserType:"Student"});
        res.status(200).send(comp_Data)

    }catch(err){
        console.log("err=>",err);
        res.status(422).json({ error: err });  
    }
})

// Fetch all Student info
router.get("/student-info-fetch-all", async (req,res) =>{

    try{

        let stdinfo = await StdInfo.find();
        res.status(200).send(stdinfo)

    }catch(err){
        console.log("err=>",err);
        res.status(422).json({ error: err });  
    }

})

// placed Student details
router.get("student-placed-list", async(req,res) =>{

    try{

        let stdinfo = await StdInfo.find();
        let susn = stdinfo.map(ele=>{
            if(ele.placed === true){
                return ele;
            }
        })


        
        res.status(200).send(stdinfo)

    }catch(err){
        console.log("err=>",err);
        res.status(422).json({ error: err });  
    }

})

module.exports = router;