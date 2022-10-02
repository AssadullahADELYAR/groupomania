const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer-config");

//Post route
router.post("/", auth, upload, postCtrl.createPost);

//Get route
router.get("/", auth, postCtrl.getAllPost);

//Get route user all post
router.get("/user/:id", auth, postCtrl.userAllPost);

//Get route single post
router.get("/:id", auth, postCtrl.getOnePost);

//Update route single post
router.put("/editpost/:id", auth, upload, postCtrl.modifyPost);

//Delete route
router.delete("/:id", auth, postCtrl.deletePost);

// //Exporting the Routes
module.exports = router;
