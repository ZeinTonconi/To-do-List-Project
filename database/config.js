
const mysql = require('mysql2');
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
        const pool = await mysql.createPool(configDB);
        const connection = await pool.promise();
        return {connection,pool};
    } catch (error) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    dbConnection
}