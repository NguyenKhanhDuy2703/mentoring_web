const express = require("express");
const routes = express.Router();
const {
  createQuestion,
  getAllQuestion,
  getAllQuestionByTag
} = require("../controllers/Forum/ForumController");
const {
  createComment,
  getCommentsByQuestion,
  updateComment,
  deleteComment,

} = require("../controllers/Forum/commentController");
const {
  authenticationRole,
  authenticateLogin,
} = require("../services/authentication");
const { upload, uploadImageMiddleware } = require("../middleware/uploadImage");
routes.post(
  "/create-question-ask",
  authenticateLogin,
  authenticationRole(["mentee", "mentor"]),
  upload.none(),
  createQuestion
);
routes.post(
  "/create-question-post",
  authenticateLogin,
  authenticationRole(["mentee", "mentor"]),
  upload.single("image"),
  uploadImageMiddleware,
  createQuestion
);

// get all question
routes.get("/get-all-question", getAllQuestion);
routes.get("/get-question-by-tag",getAllQuestionByTag );
// Route cho bình luận
routes.post("/create-comment", authenticateLogin,  authenticationRole(["mentee", "mentor"]), createComment);
routes.get("/get-comments", getCommentsByQuestion);
routes.put("/edit-comment", authenticateLogin, authenticationRole(["mentee", "mentor"]) , updateComment);
routes.delete("/delete-comment", authenticateLogin , authenticationRole(["mentee", "mentor"]) , deleteComment);



module.exports = routes;
