module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        required: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
