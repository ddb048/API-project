'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Attendees', [
      {
        eventId: 1,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 2,
        userId: 2,
        status: 'member'
      }, {
        eventId: 3,
        userId: 3,
        status: 'member'
      }, {
        eventId: 1,
        userId: 4,
        status: 'pending'
      }, {
        eventId: 2,
        userId: 5,
        status: 'waitlist'
      }], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Attendees', {
      id: { [Op.between]: [0, 5] }
    }, {});
  }
};
