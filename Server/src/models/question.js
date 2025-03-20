'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
      
    static associate(models) {
      // define association here
      
    }
  }
  Question.init({
    user_id: {
      type : DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull : true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    folder: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type:{
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['ask', 'post','ideal']
    },
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'Questions',// name table in database
    timestamps: true
  });
  return Question;
};