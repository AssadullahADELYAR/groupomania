const post = require("../models/posts");
const users = require("../models/users");
const db = require("../models/index");
const fs = require("fs");
const Posts = db.posts;
const Users = db.users;

//-------------- Create New Post -------------------//
exports.createPost = (req, res, next) => {
   const url = req.protocol + "://" + req.get("host");
   const post = { ...req.body };
   delete post.post_id;
   let newPost = {
      ...post,
   };
   if (req.file) {
      newPost = {
         ...post,
         image_url: url + "/images/" + req.file.filename,
      };
   } else {
      newPost = {
         ...post,
      };
   }
   console.log("This is post", newPost);
   Posts.create(newPost)
      .then(() => {
         res.status(201).json({
            message: "Post saved successfully",
         });
      })
      .catch((error) => {
         res.status(400).json({
            error: error,
         });
      });
};

//------------ Single Post -----------//
exports.getOnePost = (req, res, next) => {
   const post_id = req.params.id;
   Posts.findByPk(post_id)
      .then((post) => {
         console.log("This is post id => ", post.post_id);
         res.status(200).json(post);
      })
      .catch((error) => {
         res.status(404).json({
            error: error,
         });
      });
};

//------------ Modifing Post -------------//
exports.modifyPost = (req, res, next) => {
   const url = req.protocol + "://" + req.get("host");
   let post = { ...req.body };

   if (req.file) {
      post = {
         ...req.body,
         image_url: url + "/images/" + req.file.filename,
      };
   } else {
      post = {
         ...req.body,
      };
   }
   console.log("This is post=> ", post);
   //If the user update the image

   Posts.update(post, { where: { post_id: req.params.id } })
      .then(() => {
         res.status(200).json({
            message: "Post updated successfully",
         });
      })
      .catch((error) => {
         res.status(404).json({
            error: error,
         });
      });
};

//----------- Delete Post --------------//
exports.deletePost = (req, res, next) => {
   const id = req.params.id;
   console.log("This is id => ", id);
   Posts.findByPk(id)
      .then((post) => {
         if (!post) {
            res.status(404).json({
               message: "post not found",
            });
            return;
         } else {
            const filename = post.image_url.split("/images/")[1];
            fs.unlink("images/" + filename, () => {
               Posts.destroy({ where: { post_id: id } })
                  .then(() => {
                     res.status(200).json({
                        message: "Post Deleted Successfully",
                     });
                     // console.log(res);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            });
         }
      })
      .catch((err) => res.status(500).json({ err }));
};

//---------------- All Post --------------//
exports.getAllPost = (req, res, next) => {
   console.log("This is all post route");
   Posts.findAll({ include: Users })
      .then((post) => {
         res.status(200).json(post);
         console.log("This is all post => ", post);
      })
      .catch((error) => {
         res.status(400).json({
            error: error,
         });
      });
};

//-------------User All Post --------------//
exports.userAllPost = (req, res, next) => {
   console.log("This is all post route");

   Posts.findAll({
      include: [
         {
            model: Users,
            where: { user_id: req.params.id },
         },
      ],
   })
      .then((post) => {
         res.status(200).json(post);
         console.log("This is all post => ", post);
      })
      .catch((error) => {
         res.status(400).json({
            error: error,
         });
      });
};
