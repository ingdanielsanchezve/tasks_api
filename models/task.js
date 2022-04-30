'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Task can not be null'
        },
        notEmpty: {
          msg: 'Task can not be empty'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Task can not be null'
        },
        notEmpty: {
          msg: 'Task can not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  })
  return Task
}