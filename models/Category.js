const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');
const Task = require('./Task');
const User = require('./User');

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

User.hasMany(Category,{
    foreignKey: "id_user",
    sourceKey: "id"
});

Category.belongsTo(User,{
    foreignKey: "id_user",
    targetKey: "id"
})

module.exports = Category;