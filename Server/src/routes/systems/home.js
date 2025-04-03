const express = require('express');
const routes = express.Router();
const {authenticateLogin , authenticationRole} = require("../../services/authentication")   
const {getAllUser, searchEverything ,searchTags } = require("../../controllers/common/common")
const {getAllTags} = require("../../controllers/Forum/tagsController")
routes.get("/user-get-all",getAllUser)
routes.get("/tags-get-all",getAllTags)
routes.get("/search", searchEverything)
routes.get("/search-tags" , searchTags)
routes.get("/", authenticateLogin, authenticationRole(["mentee","mentor"]), (req, res) => {
    res.json({
        user: req.data, // Hiển thị thông tin user từ token
    });
});

module.exports = routes;