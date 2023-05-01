const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');


dotenv.config({path:"./config.env"}); 
const PORT = process.env.PORT;


require('./db/conn');
// to read json file we use this middle ware
app.use(express.json());

//linking the router files to make our route easly
app.use(require('./Router/auth'));

app.use(cors());

app.use(express.static(path.join(__dirname, "../client/public/uploads")));

app.get('/', (req, res) =>{
    res.send("Hello world from the server");
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})