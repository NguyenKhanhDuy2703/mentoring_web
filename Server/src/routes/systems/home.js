const express = require('express');
const routes = express.Router();
const {authenticateLogin , authenticationRole} = require("../../services/authentication")   

routes.get("/", authenticateLogin, authenticationRole(["mentee","mentor"]), (req, res) => {
    res.json({
        message: "Hello World",
        user: req.data, // Hiển thị thông tin user từ token
    });
});

module.exports = routes;    