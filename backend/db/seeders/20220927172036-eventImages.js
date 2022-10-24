'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: "https://st4.depositphotos.com/3343365/24565/i/600/depositphotos_245650834-free-stock-photo-man-gives-woman-gift-red.jpg",
        preview: true
      },
      {
        eventId: 2,
        url: "https://www.usu.edu/involvement/images/fsl/fraternitygroup.jpg",
        preview: false
      }, {
        eventId: 3,
        url: "https://st4.depositphotos.com/13194036/22335/i/600/depositphotos_223357792-free-stock-photo-young-beautiful-woman-glittery-makeup.jpg"
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
