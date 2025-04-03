'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Question, {foreignKey: 'question_id', as: 'question'})
      Answer.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    }
  }
  Answer.init({
    question_id: {
      type : DataTypes.INTEGER,
      references: {
        model: 'Questions',
        key: 'id'
      }
    },
    user_id: {
      type : DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull : false
    } ,
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'Answers',
    timestamps: true
  });
  return Answer;
};