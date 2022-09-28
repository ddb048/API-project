'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: "groupId"
      });

      Group.hasMany(models.Membership, {
        foreignKey: "groupId",
        as: "groupMemberIds"
      });

      Group.belongsTo(models.User, {
        foreignKey: "organizerId",
        allowNull: false,
        as: "Organizer"
      });

      Group.hasMany(models.Venue, {
        foreignKey: "groupId"
      });

      Group.hasMany(models.GroupImage, {
        foreignKey: "groupId"
      });

      Group.hasMany(models.Event, {
        foreignKey: 'groupId'
      })
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM({
        values: ["In person", "Online"]
      }),
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
    scopes: {
      eventRoutes: {
        attributes: ['id', 'name', 'city', 'state']
      },
      eventIdRoutes: {
        attributes: ['id', 'name', 'private', 'city', 'state']
      },
      updateImageRoutes: {
        attributes: ['name', 'about', 'type', 'private', 'city', 'state']
      }
    }
  });
  return Group;
};
