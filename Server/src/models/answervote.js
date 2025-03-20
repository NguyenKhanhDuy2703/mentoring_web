'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnswerVote.init({
    answer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Answers',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    vote_type: {
      type: DataTypes.ENUM,
      values:[ 'up', 'down']
    },
  }, {
    sequelize,
    modelName: 'AnswerVote',
    tableName: 'AnswerVotes',
    timestamps :true
  });
  return AnswerVote;
};