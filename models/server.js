require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const { dbConnection } = require('../database/config');
const cors = require('cors');


class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.connectDB();
        this.middlewares();
    }

    async connectDB() {
        this.pool = await dbConnection();
    }

    middlewares(){

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    start(){
        this.app.listen(this.port, ()=> {
            console.log(`Server online on port ${this.port}`);
        })
    }


}

module.exports = Server;