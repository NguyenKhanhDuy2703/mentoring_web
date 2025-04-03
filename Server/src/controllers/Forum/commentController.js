const { where } = require("sequelize");
const db = require("../../models/index");
const { raw } = require("mysql2");
//  Hàm tạo bình luận
const createComment = async (req, res) => {
  const io = req.app.locals.io;
    const { question_id , user_id , body } = req.body;
    console.log(question_id , user_id , body)
    console.log(req.body)
    try {
        // Kiểm tra dữ liệu đầu vào 
        if (!question_id || !user_id || !body) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newComment = await db.Answer.create({question_id , user_id , body });
        io.emit("newComment", {
            message: "New comment added",
            data: newComment,
        });
        return res.status(200).json({ 
            message: "Comment created successfully",
            comment: newComment,
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  //  Hàm lấy danh sách bình luận theo câu hỏi
  const getCommentsByQuestion = async (req, res) => {
      const { question_id } = req.query;
      console.log(req.query)
      try {
        if (!question_id) {
          return res.status(400).json({ message: "Missing question_id" });
        }
        // Tìm câu hỏi trong database
        const inforAnswer = await db.Answer.findAll({
            where: { question_id }, 
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['id', 'full_name' , 'role'],
                },
                {
                    model: db.Question,
                    as: 'question',
                    attributes: ['id', 'title'],
                }
            ],attributes :['id', 'body', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']], // Sắp xếp theo thời gian tạo
        raw: true,
        }  );
      
        return res.status(200).json({
             message: "Comment created successfully",
                data: inforAnswer,
             });
      } catch (error) {
        return res.status(500).json({ message: error.message });

      }
        
  };
  
  //  Chỉnh sửa bình luận
  const updateComment = async (req, res) => {
    try {
      const { content , comment_id } = req.body;
      // Kiểm tra dữ liệu đầu vào
      if (!content.trim()) {
        return res.status(400).json({ message: "Comment content cannot be empty" });
      }
  
      // Tìm bình luận trong database
      const comment = await db.Answer.findOne({ where: { id: comment_id } });
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found or you don't have permission" });
      }
  
      // Cập nhật nội dung bình luận
      await comment.update({ body: content });
  
      return res.status(200).json({ message: "Comment updated successfully", data: comment });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  //  Xóa bình luận
 const deleteComment = async (req, res) => {
    try {
      const { comment_id } = req.query;
      const user_id = req.data.id; // Lấy user từ token
   
      // Tìm bình luận trong database
      const comment = await db.Answer.findOne({ where: { id: comment_id, user_id :user_id } });
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found or you don't have permission" });
      }
  
      // Xóa bình luận
      await comment.destroy();
  
      return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  module.exports = {
    createComment,
    getCommentsByQuestion,
    updateComment,
    deleteComment,
  };