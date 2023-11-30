const express = require("express");
const route = express.Router();
const controller = require("../controller/controller");
const authenticationController = require("../controller/authenticationController");
const { authenticateToken } = require("../controller/authenticator");

// Blog
route.get("/api/blogs", controller.find);
route.post("/api/blogs", controller.create);

route.get("/auth", authenticateToken, (req, res) => {
  res.json("This is a protected route");
});

// User
route.post("/api/users/login", authenticationController.login);
route.post("/api/users/signup", authenticationController.signup);

module.exports = route;
