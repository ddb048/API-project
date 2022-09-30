'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Venue, {
        foreignKey: "venueId",
        allowNull: true
      });

      Event.belongsTo(models.Group, {
        foreignKey: "groupId"
      });

      Event.hasMany(models.EventImage, {
        foreignKey: "eventId"
      });

      Event.belongsToMany(models.User, {
        through: models.Attendance,
        foreignKey: "eventId"
      });
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 45]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM({
        values: ['Online', 'In person']
      }),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        FutureDate(value) {
          if (new Date(value) - new Date() < 0) {
            throw new Error("This start date has already passed.")
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        FutureDate(value) {
          if (new Date(value) - new Date(this.startDate) < 0) {
            throw new Error("The end date must be after the start date.")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Event;
};
