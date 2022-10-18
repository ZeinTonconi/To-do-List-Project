
const { Sequelize } = require('sequelize');
require('dotenv').config();


const configDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const dbConnection = async () => {
    try {
        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql',
            port: process.env.DB_PORT
        })
        await sequelize.sync({ force: false });
        return sequelize;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = dbConnection()