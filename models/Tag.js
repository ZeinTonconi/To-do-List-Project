const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');
const Task = require('./Task');

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
    through: "taskTag",
    timestamps: false
});
Tag.belongsToMany(Task, {
    through: "taskTag",
    timestamps: false
});

module.exports = Tag;