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
   QuestionTag.init(
    {
        
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'Questions',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'Tags',
                key: 'id'
            }
        }
    
   }, {
     sequelize,
     modelName: 'QuestionTag',
     tableName: 'question_tags',
     timestamps: true,
   });
   return QuestionTag;
 };