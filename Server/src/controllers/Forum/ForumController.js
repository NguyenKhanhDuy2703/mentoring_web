const { type } = require("os");
const db = require("../../models/index");
const { raw } = require("mysql2");
const { json } = require("sequelize");

const createQuestion = async (req, res) => {
  const io = req.app.locals.io;
  try {
    // Tạo câu hỏi mới
    const newQuestion = {
      user_id: req.data.id,
      title: req.body.title || "",
      body: req.body.content || "",
      image: req.imagesUrl || "",
      folder: req.body.folder || "",
      type: req.body.type,
      tags: req.body.tags || "[]", // đảm bảo chuỗi JSON hợp lệ
    };

    // Kiểm tra nếu câu hỏi trống
    if (!newQuestion.body.trim()) {
      return res.status(400).json({ message: "Question is empty" });
    }

    // Parse tags an toàn
    let Tags;
    try {
      Tags = JSON.parse(newQuestion.tags);
      if (!Array.isArray(Tags)) throw new Error();
    } catch {
      return res.status(400).json({ message: "Invalid tags format" });
    }

    // Bắt đầu transaction
    const result = await db.sequelize.transaction(async (t) => {
      // Tạo câu hỏi
      const createdQuestion = await db.Question.create(newQuestion, { transaction: t });

      // Tạo tags (nếu có)
      const createdTags = await Promise.all(
        Tags.map(async (tag) => {
          const [tagInstance] = await db.Tag.findOrCreate({
            where: { name: tag },
            transaction: t,
          });
          return tagInstance;
        })
      );

      // Tạo liên kết giữa question và tag
      await Promise.all(
        createdTags.map(async (tag) => {
          await db.QuestionTag.create(
            { question_id: createdQuestion.id, tag_id: tag.id },
            { transaction: t }
          );
        })
      );

      return { createdQuestion, createdTags };
    } );

    // Lấy thông tin người dùng
    const userQuestion = await db.User.findOne({
      where: { id: newQuestion.user_id },
      attributes: ["full_name", "role"],
    });
    console.log(result)
    // Cập nhật dữ liệu để emit
    result.createdQuestion.dataValues.user = userQuestion;
    result.createdQuestion.dataValues.tags = result.createdTags;
    
    
    // Emit sự kiện socket
    io.emit("newQuestion", result.createdQuestion);

    return res.status(201).json({
      message: "Create question successfully",
      data: result.createdQuestion,
      tags: result.createdTags,
      user: userQuestion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const getAllQuestion =  async (req , res ) => {
  try{
    const listQuestion = await db.Question.findAll(
      {
      include:[{
        model : db.User,
        as : "user",
        attributes : ["full_name","role"]
      },
      {
        model : db.Tag,
        as : "tags",
        attributes : ["name"],
        through : {attributes : []}
      }
      ],
      order:[["createdAt","DESC"]]
    });
    console.log(listQuestion)
    if(!listQuestion){
      return res.status(404).json({message:"Not found question"})
    }
    
    return res.status(200).json({
      message:"Get all question successfully",
      data:listQuestion,
    })
  }catch(error){
    res.status(500).json({message:error.message})
  }
}

//  Hàm tạo bình luận
const createComment = async (req, res) => {
  try {
    const { question_id, content } = req.body;
    const user_id = req.data.id; // Lấy user từ token

    // Kiểm tra dữ liệu đầu vào
    if (!question_id || !content.trim()) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Tạo comment
    const newComment = await db.Comment.create({ question_id, user_id, content });

    // Lấy thông tin user để trả về
    const userComment = await db.User.findOne({
      where: { id: user_id },
      attributes: ["full_name", "role"],
    });

    // Emit sự kiện Socket.io để cập nhật real-time
    const io = req.app.locals.io;
    io.emit("newComment", { ...newComment.dataValues, user: userComment });

    return res.status(201).json({
      message: "Comment created successfully",
      data: { ...newComment.dataValues, user: userComment },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  Hàm lấy danh sách bình luận theo câu hỏi
const getCommentsByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    // Lấy danh sách bình luận theo câu hỏi
    const comments = await db.Comment.findAll({
      where: { question_id: questionId },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["full_name", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Get comments successfully",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  Chỉnh sửa bình luận
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const user_id = req.data.id; // Lấy user từ token

    // Kiểm tra dữ liệu đầu vào
    if (!content.trim()) {
      return res.status(400).json({ message: "Comment content cannot be empty" });
    }

    // Tìm bình luận trong database
    const comment = await db.Comment.findOne({ where: { id: commentId, user_id } });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found or you don't have permission" });
    }

    // Cập nhật nội dung bình luận
    await comment.update({ content });

    return res.status(200).json({ message: "Comment updated successfully", data: comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  Xóa bình luận
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const user_id = req.data.id; // Lấy user từ token

    // Kiểm tra bình luận
    const comment = await db.Comment.findOne({ where: { id: commentId, user_id } });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found or you don't have permission" });
    }

    // Xóa bình luận
    await comment.destroy();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuestion, getAllQuestion, createComment, getCommentsByQuestion, updateComment, deleteComment };
