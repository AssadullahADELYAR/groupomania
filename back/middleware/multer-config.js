const multer = require("multer");

//Supported file types for images
const MIME_TYPES = {
   "image/jpg": "jpg",
   "image/jpeg": "jpg",
   "image/png": "png",
};

const upload = multer({
   storage: multer.diskStorage({
      destination: function (req, file, callback) {
         callback(null, "images");
      },
      filename: function (req, file, callback) {
         const name = file.originalname.split(" ").join("_");
         const extension = MIME_TYPES[file.mimetype];
         callback(null, name + "_" + Date.now() + "." + extension);
      },
   }),
}).single("theImage");
module.exports = upload;
