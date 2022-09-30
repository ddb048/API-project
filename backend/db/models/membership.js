'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.belongsTo(models.User, {
        foreignKey: "userId",
        as: "Membership"
      });
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: DataTypes.ENUM({
      values: ["member", "pending", "co-host"]
    })
  }, {
    sequelize,
    modelName: 'Membership',
<<<<<<< HEAD
    // scopes: {
    //   userMemberships: {
    //     attributes: ["status"]
    //   },
    //   newMembers: {
    //     attributes: ['groupId', ['userId', 'memberId'], 'status']
    //   }
    // }
=======
    scopes: {
      userMembership: {
        attributes: ["status"]
      },
      newMember: {
        attributes: ['groupId', ['userId', 'memberId'], 'status']
      }
    }
>>>>>>> dev
  });
  return Membership;
};
