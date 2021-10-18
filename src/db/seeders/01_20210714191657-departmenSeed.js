module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Departments', [
      {
        name: 'IT',
        description: 'olol1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'finance',
        description: 'olol2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'legal',
        description: 'olol3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
