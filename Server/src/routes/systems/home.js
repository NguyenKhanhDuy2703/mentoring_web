const express = require('express');
const routes = express.Router();
const {authenticateLogin , authenticationRole} = require("../../services/authentication")   
const {getAllUser , getAllTags} = require("../../controllers/common/common")

routes.get("/user-get-all",getAllUser)
routes.get('/get-all-tags' , getAllTags)



routes.get("/", authenticateLogin, authenticationRole(["mentee","mentor"]), (req, res) => {
    res.json({
        user: req.data, // Hiển thị thông tin user từ token
    });
});

module.exports = routes;    