module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
      },
      second_name: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING(),
        allowNull: false
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      confirm_email_token: {
        type: Sequelize.DataTypes.STRING()
      },
      password_recovery_token: {
        type: Sequelize.DataTypes.STRING()
      },
      picture: {
        type: Sequelize.DataTypes.TEXT()
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
