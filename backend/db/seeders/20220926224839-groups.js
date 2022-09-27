'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: "The Bone Society",
        about: "This secret group of elites tend to meet in person as members wish to keep identities private",
        type: "In person",
        private: true,
        city: "Washington D.C.",
        State: "D.C Municipality"
      },
      {
        organizerId: 2,
        name: "Theta Chi",
        about: "Collegiate fraternity focusing on networking and remembering college days",
        type: "In person",
        private: true,
        city: "Norfolk",
        State: "Virginia"
      },
      {
        organizerId: 3,
        name: "Boy Scouts of America",
        about: "This religious based organization if focused on teaching perceived qualities to allow boys to socialize and mature",
        type: "In person",
        private: false,
        city: "Houston",
        State: "Texas"
      },
      {
        organizerId: 4,
        name: "App Academy",
        about: "This group focuses on teaching others to learn to code effectively for future jobs",
        type: "Online",
        private: true,
        city: "San Francisco",
        State: "California"
      },
      {
        organizerId: 5,
        name: "Baptist Church Bible Study",
        about: "Church group welcoming to others in the hopes of spreading faith",
        type: "In person",
        private: false,
        city: "Atlanta",
        State: "Georgia"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0, 10] }
    }, {});
  }
};
