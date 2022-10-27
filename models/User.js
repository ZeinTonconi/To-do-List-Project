const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

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


module.exports = User;