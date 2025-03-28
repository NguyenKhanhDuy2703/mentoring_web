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



const getAllQuestion =  async (req , res , io) => {
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



module.exports = { createQuestion , getAllQuestion };
