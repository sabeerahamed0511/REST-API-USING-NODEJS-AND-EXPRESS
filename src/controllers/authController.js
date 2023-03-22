require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const controller = {};

controller.register = async (req, res) => {
    let {name, email, password} = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    try {
        let newUser = await new User({
            name : name,
            email : email,
            password : hashedPassword
        });
        newUser = await newUser.save();
        res.status(201).json({status : "Success", data : newUser});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.login = async (req, res) => {
    let {email, password} = req.body;
    try {
        let user = await User.findOne({email : email});
        if(user) {
            if(await bcrypt.compare(password, user.password)) {
                let jwtToken = await jwt.sign({userName : user.name, userEmail : user.email, userId : user["_id"]}, process.env.SECRET, {expiresIn : 86400});
                res.status(200).json({status : "Success", token : jwtToken});
            } else {
                res.status(401).json({status : "Failed", message : "Password not match"});
            }
        } else {
            res.status(401).json({status : "Failed", message : "User not found"});
        }
       
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

module.exports = controller;