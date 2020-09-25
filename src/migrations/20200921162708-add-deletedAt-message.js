module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('messages', 'deletedAt', Sequelize.DATE);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('messages', 'deletedAt');
  }
};
