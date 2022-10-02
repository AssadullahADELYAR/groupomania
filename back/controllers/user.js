const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = db.users;
const Posts = db.posts;

//--------------- Sign Up ---------------//
exports.signup = (req, res, next) => {
   const email = req.body.email;
   Users.findOne({ where: { email } })
      .then((user) => {
         if (user) {
            res.json({
               message: "Email Already Exsit",
            });
            // console.log("Email exsit");
            return;
         } else {
            bcrypt
               .hash(req.body.password, 10)
               .then((hash) => {
                  const user = {
                     first_name: req.body.first_name,
                     last_name: req.body.last_name,
                     email: req.body.email,
                     password: hash,
                  };
                  console.log("after bcrypt =>", user);
                  Users.create(user).then(() => {
                     res.status(201).json({
                        message: "User added",
                     });
                  });
               })
               .catch((error) => {
                  res.status(500).json({
                     error: error,
                  });
               });
         }
      })
      .catch((error) => {
         res.status(500).json({
            error: error,
         });
      });
};

//------------- Sign in -------------//

exports.login = (req, res, next) => {
   const email = req.body.email;
   Users.findOne({ where: { email } })
      .then((user) => {
         if (!user) {
            res.status(401).json({
               error: "User not found!",
            });
            return;
         }
         bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
               if (!valid) {
                  return res.status(401).json({
                     error: "Incorrect password!",
                  });
               }
               const token = jwt.sign(
                  { userId: user.user_id },
                  "8fxvnPnp0gGiwziUMsEQ",
                  {
                     expiresIn: "24h",
                  }
               );
               res.status(200).json({
                  userId: user.user_id,
                  token: token,
               });
            })
            .catch((error) => {
               res.status(500).json({
                  error: error,
               });
            });
      })
      .catch((error) => {
         res.status(500).json({
            error: error,
         });
      });
};

//------------User Profile-----------------//

exports.userProfile = (req, res, next) => {
   const id = req.params.id;
   Users.findByPk(id)
      .then((user) => {
         if (!user) {
            return res.status(404).json({
               message: "user not found",
            });
         }
         console.log("User found");
         res.status(200).json({
            userId: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profilePic: user.image_url,
         });
      })
      .catch((err) => res.status(500).json({ err }));
};

//-------------- Delete User --------------//
exports.deleteUser = (req, res, next) => {
   const id = req.params.id;
   console.log("This is id => ", id);
   Users.findByPk(id)
      .then((user) => {
         if (!user) {
            return res.status(404).json({
               message: "user not found",
            });
         } else {
            Posts.destroy({ where: { userUserId: id } })
               .then((res) => {
                  console.log(res);
               })
               .catch((error) => {
                  console.log(error);
               });
            Users.destroy({ where: { user_id: id } })
               .then((user) => {
                  console.log("This is user", user);
                  if (user == 1) {
                     res.status(200).json({
                        message: "user deleted",
                     });
                     console.log("deleted");
                  } else {
                     console.log("Not deleted");
                  }
               })
               .catch((error) => {
                  res.status(404).json({
                     error: error,
                  });
               });
         }
      })
      .catch((err) => res.status(500).json({ err }));
};

//--------------- Update User ---------------//
exports.modifyUser = (req, res, next) => {
   const url = req.protocol + "://" + req.get("host");

   let userObject = { ...req.body };

   //If the user update the image
   if (req.file) {
      userObject = {
         ...req.body,
         image_url: url + "/images/" + req.file.filename,
         user_id: req.params.id,
      };
   } else {
      //Or only the information fileds
      userObject = { ...req.body, user_id: req.params.id };
   }
   Users.update(userObject, { where: { user_id: req.params.id } })
      .then(() => {
         res.status(200).json({
            message: "User updated successfully",
         });
      })
      .catch((error) => {
         res.status(404).json({
            error: error,
         });
      });
};

//--------------- Update Password ---------------//
exports.changePassword = (req, res, next) => {
   const id = req.params.id;
   Users.findByPk(id).then((user) => {
      if (!user) {
         return res.status(404).json({
            message: "user not found",
         });
      }
      // console.log("This user before bcrypt", user);
      // let userObject = { ...req.body };
      // console.log("This user req body", userObject);
      // console.log("This old pass", userObject.oldPass);
      // console.log("This new pass", userObject.newPass);
      bcrypt
         .compare(req.body.oldPass, user.password)
         .then((valid) => {
            if (!valid) {
               res.status(401).json({
                  error: "password not muched",
               });
               return;
            }

            bcrypt
               .hash(req.body.newPass, 10)
               .then((hash) => {
                  let updateUser = {
                     user_id: req.params.id,
                     password: hash,
                  };
                  Users.update(updateUser, {
                     where: { user_id: req.params.id },
                  })
                     .then(() => {
                        res.status(200).json({
                           message: "Password updated successfully",
                        });
                        console.log("password changed");
                     })
                     .catch((error) => {
                        res.status(404).json({
                           error: error,
                        });
                     });
               })
               .catch((error) => {
                  res.status(500).json({
                     error: error,
                  });
               });
         })
         .catch((error) => {
            res.status(500).json({
               error: error,
            });
         });
   });
};
