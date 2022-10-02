const jwt = require("jsonwebtoken");

//Creating Authentication Token
module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "8fxvnPnp0gGiwziUMsEQ");
      const userId = decodedToken.userId;
      req.auth = { userId };
      if (req.body.user_id && req.body.user_id !== userId) {
         throw "Invalid user ID";
      } else {
         next();
      }
   } catch {
      res.status(401).json({
         error: new Error("Invalid request!"),
      });
   }
};
