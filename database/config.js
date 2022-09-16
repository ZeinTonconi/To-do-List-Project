
const mysql = require('mysql');
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
        const connection = mysql.createConnection(configDB);
        connection.connect(err => {
            if (err) throw err; 
            console.log('Database Online');
        })
        return mysql.createPool(configDB);

    } catch (err) {
        console.log(`Failed to connect to DB. Error: ${err}`);
        throw new Error(`Error al conectar a la Base de Datos`);
    }
}

module.exports = {
    dbConnection
}