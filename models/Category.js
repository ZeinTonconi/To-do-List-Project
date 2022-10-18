const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');
const Task = require('./Task')

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

Task.belongsTo(Category,{
    foreignKey: 'id_category',
    targetKey: 'id'
});

Category.hasMany(Task,{
    foreignKey: 'id_category',
    sourceKey: 'id'
})

module.exports = Category;