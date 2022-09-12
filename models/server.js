require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.connectDB();

    }

    async connectDB() {
        this.pool = await dbConnection();
    }

    start(){
        this.app.listen(this.port, ()=> {
            console.log(`Server online on port ${this.port}`);
        })
    }


}

module.exports = Server;