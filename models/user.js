'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Task, {
        foreignKey: 'userId',
      })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/g,
          msg: 'Please enter a valid name'
        },
        notNull: {
          msg: 'Name field can not be null'
        },
        notEmpty: {
          msg: 'Name field can not be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/g,
          msg: 'Please enter a valid name'
        },
        notNull: {
          msg: 'Name field can not be null'
        },
        notEmpty: {
          msg: 'Name field can not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email'
        },
        notNull: {
          msg: 'Email field can not be null'
        },
        notEmpty: {
          msg: 'Email field can not be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password should be between 6 and 20 chars long'
        },
        notNull: {
          msg: 'Password field can not be null'
        },
        notEmpty: {
          msg: 'Password field can not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  })
  return User
}