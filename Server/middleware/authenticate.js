const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");
// const cookies = require("cookie-parser");

const Authenticate = async (req, res, next) =>{
    try{

        const token = req.cookies.jwtoken; 

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken);

        const rootUser = await User.findOne({_id: verifyToken._id , "tokens.token": token});

        const user = await User.findOne({_id:verifyToken._id});

        if(!rootUser){ throw new Error(" User not Found ") } 

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        req.user = user;

        next();

    } catch (err) {
        res.status(401).send("Unauthorized no token provide");
        console.log(err);
    }
}

module.exports = Authenticate;