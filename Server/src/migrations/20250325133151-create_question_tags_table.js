module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Question_Tags', {
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Định nghĩa khóa chính kép (Composite Primary Key)
    await queryInterface.addConstraint('Question_Tags', {
      fields: ['question_id', 'tag_id'],
      type: 'primary key',
      name: 'pk_question_tags'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Question_Tags');
  }
};
