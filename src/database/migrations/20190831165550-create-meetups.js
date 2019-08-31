module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetups', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      file_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        required: true
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('meetups');
  }
};
