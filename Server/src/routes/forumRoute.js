const express = require('express');
const routes = express.Router();
const {createQuestion  , getAllQuestion } = require('../controllers/Forum/ForumController');
const {authenticationRole  , authenticateLogin} = require('../services/authentication')
const  {upload , uploadImageMiddleware}  = require('../middleware/uploadImage');
routes.post('/create-question-ask'  ,authenticateLogin,  authenticationRole(['mentee','mentor']) ,upload.none(),createQuestion );
routes.post('/create-question-post'  ,authenticateLogin , authenticationRole(['mentee','mentor']),upload.single("image"),uploadImageMiddleware,createQuestion );

// get all question
routes.get('/get-all-question', getAllQuestion)




module.exports = routes;