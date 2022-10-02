const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routers/userRoutes");
const postRoutes = require("./routers/postRoutes");
const path = require("path");
const cors = require("cors");

app.use("*", cors());
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
   );
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
   );
   next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

//Export app
module.exports = app;
