'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Question, {foreignKey: 'user_id', as: 'questions'})
      User.hasMany(models.Answer, {foreignKey: 'user_id', as: 'answers'})
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role:{
      type: DataTypes.ENUM,
      values:["mentee" , "mentor"],
      defaultValue : "mentee"
    },
  
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
   
  });
  return User;
};