'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: "1010 W Peachtree St NW",
        city: "Atlanta",
        state: "Georgia",
        lat: 33.7490011,
        lng: 84.3880120
      },
      {
        groupId: 2,
        address: "11 Karen Ave",
        city: "Medway",
        state: "Massachusetts",
        lat: 42.1418,
        lng: 71.3967
      },
      {
        groupId: 3,
        address: "1825 University Ave",
        city: "San Diego",
        state: "California",
        lat: 32.7353,
        lng: 117.1490
      },
      {
        groupId: 4,
        address: "145 Midvale Ave",
        city: "Houston",
        state: "Texas",
        lat: 29.7604,
        lng: 95.3698
      },
      {
        groupId: 5,
        address: "2901 Sam Houston Blvd",
        city: "Hunstville",
        state: "Texas",
        lat: 30.7235,
        lng: 95.5508
      }], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      id: { [Op.between]: [0, 10] }
    }, {});
  }
};
