const mongoose = require("mongoose");
const DB = process.env.DATABASE;
const DBL = process.env.DATABASELOCAL;

mongoose.connect(DBL, {
}).then(() =>{
    console.log("Connection Successful!!..");
}).catch((err) => console.log("No connection ==>", err));

