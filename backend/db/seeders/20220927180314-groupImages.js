'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: "https://upload.wikimedia.org/wikipedia/commons/4/41/Bones_logo.jpg",
        preview: true
      }, {
        groupId: 2,
        url: "https://upload.wikimedia.org/wikipedia/en/5/58/Theta_Chi_fraternity_Crest.png",
        preview: true
      }, {
        groupId: 3,
        url: "https://www.scouting.org/wp-content/uploads/2018/11/Prepared_For_Life_Stacked_Color-1200x628.gif",
        preview: true
      }, {
        groupId: 4,
        url: "https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png",
        preview: true
      }, {
        groupId: 5,
        url: "https://static1.squarespace.com/static/6284242c2959060c0f3617d8/t/62843d81b7d1d5182eb67ecc/1664080922277/",
        preview: true
      }], {})
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('GroupImages', {
      id: { [Op.between]: [0, 10] }
    }, {});
  }
};
