const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');
const Task = require('./Task');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

Task.belongsTo(User,{
    foreignKey: "id_user",
    targetKey: "id"
});

User.hasMany(Task,{
    foreignKey: "id_user",
    sourceKey: "id"
})


module.exports = User;