'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuestionTag.init({
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Questions',
        key: 'id'
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'QuestionTag',
    tableName: 'QuestionTags',
    
  });
  return QuestionTag;
};