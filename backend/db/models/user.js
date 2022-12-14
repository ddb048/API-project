'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName } = this;
      return { id, username, email, firstName, lastName };
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Group, {
        through: models.Membership,
        foreignKey: "userId"
      });

      User.belongsToMany(models.Event, {
        through: models.Attendance,
        foreignKey: "userId"
      });

      User.hasMany(models.Group, {
        foreignKey: "organizerId"
      });

      User.hasMany(models.Membership, {
        foreignKey: "userId",
        as: "Membership"
      });

      User.hasMany(models.Attendance, {
        foreignKey: "userId",
        as: "Attendance"
      });
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await
          User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await
        User.scope('currentUser').findByPk(user.id);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt", "firstName", "lastName"]
      },
    },
    scopes: {
      loginUser: {
        attributes: {}
      },
      currentUser: {
        attributes: { exclude: ["hashedPassword", 'createdAt', 'updatedAt', 'username'] }
      },
      organizer: {
        attributes: ['id', 'firstName', 'lastName']
      },
      userMembership: {
        attributes: ['id', 'firstName', 'lastName']
      },
      userAttendance: {
        attributes: ['id', 'firstName', 'lastName']
      }
    }
  });
  return User;
};
