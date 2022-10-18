require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database/config.js');

require('./models/Category');
require('./models/Task')



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


    async init() {

        await sequelize.sync({ force: false });
        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    getConnection = (req, res, next) => {
        const {pool,connection} = this.connection;
        req.pool = pool;
        req.connection = connection;
        next();
    }

    routes() {
        this.app.use(this.taskPath, [
            this.getConnection
        ], require('./routes/tasks.routes'));

        this.app.use(this.authPath, [
            this.getConnection
        ], require('./routes/auth.routes'));

        this.app.use(this.categoryPath, [
            this.getConnection
        ], require('./routes/category.routes'));
        
        this.app.use(this.tagPath, [
            this.getConnection
        ], require('./routes/tags.routes'))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server online on port ${this.port}`);
        })
    }


}

module.exports = Server;