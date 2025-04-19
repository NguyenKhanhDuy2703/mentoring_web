const express = require('express');
const routes = express.Router();
const {LoginController  , RegisterController , LogoutController} =  require("../controllers/auth/authenController")
const {authenticateLogin , authenticationRole} = require("../services/authentication")
routes.post("/login", LoginController);
routes.post("/register", RegisterController);
routes.post("/logout", LogoutController);
routes.get("/get-token", authenticateLogin, authenticationRole(["mentee","mentor"]), (req, res) => {
    res.json({
        user: req.data, // Hiển thị thông tin user từ token
    });
});


module.exports = routes;