require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');


class Server {

    constructor() {
        this.port = process.env.APP_PORT;
        this.app = express();
        
        this.taskPath = '/api/tasks';
        this.authPath = '/api/auth';
        this.categoryPath = '/api/category';
        this.tagPath = '/api/tag';

        this.init();
    }

    async connectDB() {
        this.connection = await dbConnection();
    }

    async init() {
        this.connection = await dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    getConnection = (req, res, next) => {
        req.connection = this.connection;
        next();
    }

    routes() {
        this.app.use(this.taskPath, [
            this.getConnection
        ], require('./routes/tasks.js'));

        this.app.use(this.authPath, [
            this.getConnection
        ], require('./routes/auth.js'));

        this.app.use(this.categoryPath, [
            this.getConnection
        ], require('./routes/category'));
        
        this.app.use(this.tagPath, [
            this.getConnection
        ], require('./routes/tags.js'))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server online on port ${this.port}`);
        })
    }


}

module.exports = Server;