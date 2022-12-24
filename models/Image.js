const sequelize = require('../database/config');
const {DataTypes} = require('sequelize');
const Task = require('./Task');

const Image = sequelize.define('images', {
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    imgName:{
        type: DataTypes.STRING(32),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(32),
        allowNull: false
    }
},{
    timestamps: false
});

Image.belongsTo(Task,{
    foreignKey: "id_task",
    targetKey: "id"
});

Task.hasMany(Image,{
    foreignKey: "id_task",
    sourceKey: "id"
});


module.exports = Image;