const express = require('express');
const routes = express.Router();
const { 
    createQuestion, 
    getAllQuestion, 
    createComment, 
    getCommentsByQuestion, 
    updateComment, 
    deleteComment 
  } = require("../controllers/Forum/ForumController");
const {authenticationRole  , authenticateLogin} = require('../services/authentication')
const  {upload , uploadImageMiddleware}  = require('../middleware/uploadImage');
routes.post('/create-question-ask'  ,authenticateLogin,  authenticationRole(['mentee','mentor']) ,upload.none(),createQuestion );
routes.post('/create-question-post'  ,authenticateLogin , authenticationRole(['mentee','mentor']),upload.single("image"),uploadImageMiddleware,createQuestion );

// get all question
routes.get('/get-all-question', getAllQuestion)

// Route cho bình luận
routes.post("/create-comment", authenticateLogin, createComment);
routes.get("/get-comments/:questionId", getCommentsByQuestion);
routes.put("/edit-comment/:commentId", authenticateLogin, updateComment);
routes.delete("/delete-comment/:commentId", authenticateLogin, deleteComment);


routes.put("/edit-comment/:commentId", authenticateLogin, updateComment);
routes.delete("/delete-comment/:commentId", authenticateLogin, deleteComment);


module.exports = routes;
