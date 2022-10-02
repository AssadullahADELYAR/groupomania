const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.js");
const upload = require("../middleware/multer-config");

//Sign Up
router.post("/signup", userCtrl.signup);

//Sign In
router.post("/signin", userCtrl.login);

//Get User Profile
router.get("/user/:id", userCtrl.userProfile);

//Delete User
router.delete("/user/:id", userCtrl.deleteUser);

//Add and Update Profile photo
router.put("/user/:id", upload, userCtrl.modifyUser);

//Change Password
router.put("/user/cp/:id", userCtrl.changePassword);

// // //Exporting the Routes
module.exports = router;
