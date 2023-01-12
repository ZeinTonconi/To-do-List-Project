const { DataTypes } = require('sequelize')
const sequelize = require('../database/config')
const Task = require('./Task')
const User = require('./User')

const Tag = sequelize.define('tags', {
  id: {
    type: DataTypes.STRING(32),
    primaryKey: true
  },
  tagName: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})

Task.belongsToMany(Tag, {
  through: 'taskTag',
  timestamps: false
})
Tag.belongsToMany(Task, {
  through: 'taskTag',
  timestamps: false
})

Tag.belongsTo(User, {
  foreignKey: 'id_user',
  targetKey: 'id'
})

User.hasMany(Tag, {
  foreignKey: 'id_user',
  sourceKey: 'id'
})

module.exports = Tag
