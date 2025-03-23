const { type } = require("os");
const db = require("../../models/index");
const { raw } = require("mysql2");

const createQuestion = async (req, res ) => {
  const io = req.app.locals.io;
  try {
    // create new constuction new question
    const newQuestion = {
      user_id: req.data.id,
      title: req.body.title || "",
      body: req.body.content,
      image: req.imagesUrl || "",
      folder: req.body.folder || "",
      type: req.body.type,
      tags: req.body.tags,
    };
    // Check if the question is empty
    if (newQuestion.body === "") {
      return res.status(400).json({ message: "Question is empty" });
    }

    const createQuestion = await db.Question.create(newQuestion);
    if (createQuestion) {
      const createTag = await createTagQuestion(
        createQuestion.id,
        newQuestion.tags
      );
      if (!createTag) {
        return res.status(500).json({ message: "Create question failed" });
      }


      // tạo data emit cho socket
      const userQuestion = await db.User.findOne({
        where: { id: newQuestion.user_id },
        attributes: ["full_name", "role"],
      });
      createQuestion.dataValues.user = userQuestion;
      io.emit("newQuestion", createQuestion  );
      return res.status(200).json({
        message: "Create question successfully",
        data: createQuestion,
        tags: createTag,
        user : userQuestion
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createTagQuestion = async (idQuestion, tags) => {
  try {
    if (!tags) {
      throw new Error("Tags is empty");
    }
    const createTag = db.QuestionTag.create({
      question_id: idQuestion,
      tag: tags,
    });
    return createTag;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllQuestion =  async (req , res , io) => {
  try{
    const listQuestion = await db.Question.findAll(
      {where:{type:req.query.type},
      include:{
        model : db.User,
        as : "user",
        attributes : ["full_name","role"]
      },
      raw:true,
      nest:true
    });
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
