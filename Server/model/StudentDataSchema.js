const mongoose = require("mongoose");
var validator = require('validator');

// Student Resume Data
const StudentResumeSchema = new mongoose.Schema({
    user_ID: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },
    firstname:{
        type: String,
        required: true,
        trim:true,
        minlength: [2, "minimum 2 letters"]
    },
    lastname:{
        type: String,
        required: true,
        trim:true,
        minlength: [1, "minimun 1 letter"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        validate(value){
          if(!validator.isEmail(value)){
             throw new Error("Email is inValid")
          }
        }
        
    },
    number: {
        type:Number,
        required: true,
        unique:true,
        trim:true,
        minlength: [9, "not a valid number"],
        maxlength:[10,  "not a valid number"],
        validate(value){ 
          console.log(value.length <= 9)
          if(value.length <= 9 ){
            throw new Error("invalid number ")
          } 
        }
   
    },
    DOB: {
        type:String,
        required: true,
        trim:true,
 
    },
    gender: {
        type: String,
        required: true,
        trim:true,
      
    },
    Address: {
        type: String,
        required: true,
        trim:true,
    },
    curr_profession: {
        type: String,
        required: true,
        trim:true,
    
    },
    Profile_desc: {
        type: String,
        required: true,
        trim:true,
      
    },
    EducationData: {
        type:Array,
        required:true,
        trim:true,
    },
    Language: {
        type: String,
        required: true,
        trim:true,
        default: null
    },
    Hobies: {
        type: String,
        required: true,
        trim:true,
        default: null
    },
    Skills: {
        type: String,
        required: true,
        trim:true,
        default: null
    },
    fresher: {
        type: String,
        required: true,
        trim:true,
    },
    work_Expirience: [],
    Achivement: [],
    noAchivement:{
        type:Boolean,
        required: true,
    },
    CV_avatar: {
        type:String,
    }
    
}) 


// UserFiles Schema
const StudentInfo = mongoose.Schema({
    USN: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    name:{
        type:String,
        required: true,
        trim: true,
    },

    SSLC:{
        type: String,
        required: true,
        trim: true
    },

    PU_Diploma:{
        type: String,
        required: true,
        trim: true
    },

    UG:{
        type: String,
        required: true,
        trim: true
    },
    PG:{
        type: String,
        required: true,
        trim: true
    },

    Detained_Years:{
        type: String,
        required: true,
        trim: true
    },
    Branch:{
        type: String,
        require: true,
        trim: true
    },

    Curr_Sem:{
        type: String,
        required: true,
        trim: true
    },
    Curr_Backlogs:{
        type: String,
        required: true,
        trim: true
    },
    History_of_backlogs:{
        type: String,
        required: true,
        trim: true
    },
    Pass_Year:{
        type: String,
        required: true,
        trim: true
    },

    Placed:{
        type:Boolean,
        default:false
    },
    placed_company_id:{
        type:String,
        default:null
    },
    placed_company:{
        type:String,
        default:null
    },

    cpackage:{
        type:Number,
        default:null
    },

    date_of_placed:{
        type:String,
        default:null
    }

})


// Posters Data Schema
const Posters = mongoose.Schema({
    poster_title:{
        type: String,
        // required: true,
        default:null,
        trim:true
    },
    Poster_desc:{
        type:String,
        // required: true,
        trim: true
    },
    poster_linkp:{
        type: String,
        trim:true
    },
    branch:{
        type: String,
        // required: true,
        trim: true
    },
    poster_pic:{
        type: Object,
        required: true
    },
    PostedOn: {
        type: String,
        default: new Date().toLocaleString(),
      }
})

// Notifications Schema
const Remainders = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    notice_desc:{
        type:String,
        required:true,
        trim:true
    },
   notice_type:{
        type:String,
        required:true,
        trip:true
   },
    branch:{
        type: String,
        required:true,
        trim:true
    },
    PostedOn: {
        type: String,
        default: new Date().toLocaleString(),
      },
      student_usn:{
        type:String,
        default:null
      }
})

// Company Schema
const Companies = mongoose.Schema({
    company_name:{
        type:String,
        required:true,
        trim:true
    },
    company_link:{
        type:String,
        required:true,
        trim:true 
    },
    cpackage:{
        type:Number,
        required:true,
        trim:true 
    },
    cyear:{
        type:Number,
        required:true,
        trim:true
    }
})


// collection creation
const StudentCV = mongoose.model("STUDENTCV", StudentResumeSchema);
const StdInfo = mongoose.model("STUDENTINFO", StudentInfo);
const JobPosters = mongoose.model("POSTERS", Posters);
const StdNotice = mongoose.model("REMAINDERS", Remainders);
const Company = mongoose.model("COMPANIES", Companies);

// exporting the modules
module.exports = {StudentCV, StdInfo, JobPosters,StdNotice,Company};
