const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

//TO REGISTER 
router.post("/register", controller.register);

//TO LOG IN
router.post("/login", controller.login);

module.exports = router;