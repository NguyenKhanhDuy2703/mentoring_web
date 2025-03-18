const express = require('express');
const routes = express.Router();
const {LoginController  , RegisterController , LogoutController} =  require("../controllers/auth/authenController")
routes.post("/login", LoginController);
routes.post("/register", RegisterController);
routes.post("/logout", LogoutController);
module.exports = routes;