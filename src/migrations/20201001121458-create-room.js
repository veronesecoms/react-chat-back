'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user_created_room: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
          allowNull: false,
        },
      },
      id_user_joined_room: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
          allowNull: false,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex(
      'rooms',
      ['id_user_created_room', 'id_user_joined_room'],
      {
        indicesType: 'UNIQUE',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  },
};
