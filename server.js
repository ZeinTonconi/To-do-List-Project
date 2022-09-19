require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const { dbConnection } = require('./database/config');
const cors = require('cors');


class Server {

    constructor() {
        this.port = process.env.APP_PORT;
        this.app = express();
        this.taskPath = '/api/tasks';
        this.authPath = '/api/auth';
        this.categoryPath = '/api/category';
        this.init();

       // this.connectDB();
        //this.middlewares();
        //this.routes();
    }

    async connectDB() {
        this.pool = await dbConnection();
    }

    async init() {
        this.pool = await dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

     getPool = (req, res, next) => {
        req.pool = this.pool;
        next();
    }

    routes() {
        this.app.use(this.taskPath, [
            this.getPool
        ], require('./routes/tasks.js'));
        this.app.use(this.authPath, [
            this.getPool
        ], require('./routes/auth.js'));

        this.app.use(this.categoryPath, [
            this.getPool
        ], require('./routes/category'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server online on port ${this.port}`);
        })
    }


}

module.exports = Server;