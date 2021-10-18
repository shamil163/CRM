module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@companyM.com',
        password: 'admin',
        picture: 'https://lh3.googleusercontent.com/proxy/JustQ1JCLz55MWNLo5gkpEViNHiyKiO70N1PS9Bu8f21_F0Tdh2zIR90BDNpL5h5AJgCeBkH6iqKvBA-dWsztZMFB9QBPJSaDBC_Hwb8rSCg71h-4_NyOq_hiZAfrHra',
        role: 'admin',
        teamid: 1,
        departmentid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'economist',
        email: 'economist@companyM.com',
        password: 'economist',
        picture: 'https://icanchoose.ru/file/redactor/r_2f821cec6f9e81fb4a2d08f346b055e3b3701485.jpg',
        role: 'economist',
        teamid: 2,
        departmentid: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'lawyer',
        email: 'lawyer@companyM.com',
        password: 'lawyer',
        picture: 'https://www.hse.ru/data/2018/06/05/1150064642/iStock-889101814.jpg',
        role: 'lawyer',
        teamid: 3,
        departmentid: 3,
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
