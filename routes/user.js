const express = require("express");
const USER = require("../model/user")
const router = express.Router();
const {handleUserLogin,handleUserSignUp,getUserInfo} = require("../controller/user")
// const {authenticateUser} = require("../middleware/user")

router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
// router.get("/",authenticateUser,getUserInfo);

module.exports = router