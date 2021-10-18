module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      teamid: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Teams',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      departmentid: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Departments',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
