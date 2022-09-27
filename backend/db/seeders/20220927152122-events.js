'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Events', [
      {
        venueId: 1,
        groupId: 1,
        name: '111th birthday party',
        description: "this is the 111th birthday party for one Bilbo Baggins",
        type: "In person",
        capacity: "121",
        price: 20,
        startDate: "2023-12-15 07:00:00",
        endDate: "2023-12-16 07:00:00"
      }, {
        venueId: 2,
        groupId: 2,
        name: 'Tea Party',
        description: "This is a casual meetup to display unrest with taxations",
        type: "In person",
        capacity: "1774",
        price: 0,
        startDate: "2023-04-15 07:00:00",
        endDate: "2023-04-16 07:00:00"
      }, {
        venueId: 3,
        groupId: 3,
        name: 'Super Secret Conference',
        description: "This is a super secret conference we are having a hard time advertising",
        type: "In person",
        capacity: "50",
        price: 200,
        startDate: "2024-12-01 07:00:00",
        endDate: "2024-12-08 07:00:00"
      }, {
        venueId: 4,
        groupId: 4,
        name: 'Red Wedding',
        description: "this is a feast to celebrate a marriage and honor a house in a permanent fashion",
        type: "In person",
        capacity: "200",
        price: 0,
        startDate: "2025-06-10 07:00:00",
        endDate: "2025-06-11 07:00:00"
      }, {
        venueId: 5,
        groupId: 5,
        name: 'Council of Cats',
        description: "this is the sacred meeting of street cats",
        type: "In person",
        capacity: "3",
        price: 3.50,
        startDate: "2023-03-15 07:00:00",
        endDate: "2023-03-16 07:00:00"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      id: { [Op.between]: [0, 10] }
    }, {});
  }
};
