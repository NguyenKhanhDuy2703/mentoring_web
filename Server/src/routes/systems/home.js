const express = require('express');
const routes = express.Router();
const {authenticateLogin , authenticationRole} = require("../../services/authentication")   
const {getAllUser} = require("../../controllers/common/common")

routes.get("/user-get-all",getAllUser)

routes.get("/", authenticateLogin, authenticationRole(["mentee","mentor"]), (req, res) => {
    res.json({
        user: req.data, // Hiển thị thông tin user từ token
    });
});

module.exports = routes;    