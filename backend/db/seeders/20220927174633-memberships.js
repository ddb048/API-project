'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: "co-host"
      },
      {
        userId: 2,
        groupId: 1,
        status: "member"
      }, {
        userId: 3,
        groupId: 3,
        status: "co-host"
      }, {
        userId: 4,
        groupId: 4,
        status: "pending"
      }, {
        userId: 5,
        groupId: 5,
        status: "member"
      }], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Memberships', {
      id: { [Op.between]: [0, 10] }
    }, {});
  }
};
