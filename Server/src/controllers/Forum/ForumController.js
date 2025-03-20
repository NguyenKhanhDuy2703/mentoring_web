const { type } = require("os");
const db = require("../../models/index");

const createQuestion = async (req, res) => {
  const newQuestion = {
    user_id: req.data.id,
    tittle : req.body.tittle || "",
    body: req.body.body,
    images : req.body.images || "",
    folder : req.body.folder || "",
    type : req.body.types,
    tags : req.body.tags
  };
  try {
    // Check if the question is empty
    if (newQuestion.body === "") {
      return res.status(400).json({ message: "Question is empty" });
    }

    const createQuestion = await db.Question.create(newQuestion);
    if (createQuestion) {
        const createTag = await createTagQuestion(createQuestion.id , newQuestion.tags);
        if(!createTag){
            return res.status(500).json({ message: "Create question failed" });
        }
      return res.status(200).json({ 
        message: "Create question successfully",
        data: createQuestion,
        tags: createTag
     });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createTagQuestion = async ( idQuestion , tags ) => {
    try {
        if(!tags){
            return res.status(400).json({ message: "Tags is empty" });
        }   
        const createTag = db.QuestionTag.create({question_id : idQuestion , tag : tags});
        return createTag;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createQuestion };
