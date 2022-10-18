
const mysql = require('mysql2');
const {Sequelize} = require('sequelize');
require('dotenv').config();


const configDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

/*const dbConnection = async () => {
    try {

        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
            host: 'localhost',
            dialect: 'mysql',
            port: process.env.DB_PORT   
        })

    } catch (error) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    dbConnection
}*/

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT   
})

module.exports = sequelize;