const jwt = require("jsonwebtoken");
const secretKey = "1234";

function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    console.log(token);
  
    if (!token) {
      return res.json( "Unauthorized" );
    }
  
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        return res.json("Forbidden");
      }
      next();
    });
  }


module.exports = {authenticateToken};