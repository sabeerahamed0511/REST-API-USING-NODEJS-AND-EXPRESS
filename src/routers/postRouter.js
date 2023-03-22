require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const controller = require("../controllers/postController");

//TO GET ALL POSTS
router.get("/posts", authentication, controller.get);
//TO CREATE NEW POST
router.post("/posts", authentication, controller.post);
//TO UPDATE
router.put("/posts/:id", authentication, controller.put);
//TO DELETE
router.delete("/posts/:id", authentication, controller.delete);

//AUTHENTICATION MIDDLEWARE
async function authentication(req, res, next) {
    if(req.headers.authorization) {
        let token = req.headers.authorization.split(" ");
        let payLoad = await jwt.verify(token[1], process.env.SECRET); 
        req.loginUser = payLoad;
    } else {
        return res.status(401).json({status : "Failed", message : "Unauthorized"})
    }
    next();
}


module.exports = router;