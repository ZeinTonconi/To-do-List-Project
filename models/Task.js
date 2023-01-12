const { DataTypes } = require('sequelize')
const sequelize = require('../database/config')

const Task = sequelize.define('tasks', {
  id: {
    type: DataTypes.STRING(32),
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
})

module.exports = Task
