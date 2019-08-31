module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      path: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('files');
  }
};
