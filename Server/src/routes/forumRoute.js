const express = require('express');
const routes = express.Router();
const {createQuestion } = require('../controllers/Forum/ForumController');
const {authenticationRole } = require('../services/authentication')

routes.post('/create-question'  , authenticationRole(['mentee','mentor']),createQuestion );





module.exports = routes;