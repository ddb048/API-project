'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'superfly86@poser.com',
        username: 'flyboy86',
        firstName: 'Clark',
        lastName: 'Kent',
        hashedPassword: bcrypt.hashSync('louisLang')

      },
      {
        email: 'notbatman@wayneenterprises.corp',
        username: 'BillionaireBoss',
        firstName: 'Bruce',
        lastName: 'Wayne',
        hashedPassword: bcrypt.hashSync('IMissMyParents')
      },
      {
        email: 'mouse@disney.com',
        username: 'MrMouse',
        firstName: 'Mickey',
        lastName: 'Mouse',
        hashedPassword: bcrypt.hashSync('IHeartMinnie')
      },
      {
        email: 'CindyQueen@apple.com',
        username: 'number1programmer',
        firstName: 'Cindy',
        lastName: 'Guzman',
        hashedPassword: bcrypt.hashSync('Harper1')
      },
      {
        email: 'Abel@tabelsRUs.com',
        username: 'stabelish',
        firstName: 'Abel',
        lastName: 'Tabel',
        hashedPassword: bcrypt.hashSync('CryingFace')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['flyboy86', 'BillionaireBoss', 'MrMouse', 'number1programmer', 'stabelish'] }
    }, {});
  }
};
