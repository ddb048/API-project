'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: "https://static.wikia.nocookie.net/middle-earth-film-saga/images/5/57/PARTY_OF_BILBO.jpg/revision/latest?cb=20190916221320",
        preview: true
      },
      {
        eventId: 2,
        url: "https://www.usu.edu/involvement/images/fsl/fraternitygroup.jpg",
        preview: false
      }, {
        eventId: 3,
        url: "https://i.guim.co.uk/img/media/aa73db67df7d318fa25e6f6a15a309ad336a8826/0_71_4261_2557/master/4261.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=8fc18b4439dbf09a62cec3c7dab88b7f",
        preview: true
      }, {
        eventId: 4,
        url: "https://computersciencehero.com/wp-content/uploads/2019/10/51573033_2076486832438827_2048960555678433280_n.jpg",
        preview: true
      }, {
        eventId: 5,
        url: "https://static01.nyt.com/images/2018/12/13/us/13slavery/13slavery-superJumbo.jpg",
        preview: true
      }], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('EventImages', {
      id: { [Op.between]: [0, 10] }
    }, {});
  }
};
