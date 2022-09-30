'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venue.hasMany(models.Event, {
        foreignKey: "venueId",
        allowNull: true
      });

      Venue.belongsTo(models.Group, {
        foreignKey: "groupId"
      });
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(9, 7),
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Venue',
    scopes: {
      eventRoutes: {
        attributes: ['id', 'city', 'state']
      },
      eventIdRoutes: {
        attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
      },
      allVenuesRoutes: {
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
      }
    }
  });
  return Venue;
};
