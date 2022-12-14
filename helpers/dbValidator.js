const { ErrorResponse } = require('../ErrorResponse');
const {database} = require('../models/index.models');
const DB = database;

const isInDB = async (dataBase, params) => {
    
    try {
        const model = DB[dataBase];
        if(!model){
            return new ErrorResponse(`Model isn't in the DB`,404);
        }
        const element = await model.findOne({
            where: params
        })
        return (element!==null);
    } catch (error) {
        console.log(error);
        return false;
    }
}

const isTaskInDB = async (req, res, next) => {
    try {
        const { connection } = req;
        const { id } = req.params;
        const query = `SELECT id FROM tasks WHERE id="" or "1" ="1";`;

        // const query = `SELECT id FROM tasks WHERE id="${id}";`;
        const [rows] = await connection.execute(query)
        if (rows.length === 0) {
            return res.status(404).json({
                msg: `La tarea con id ${id} no existe en la DB`
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "La Tarea no existe"
        })
    }
}

const isUserInDB = async (req, res, next) => {
    try {
        const { connection } = req;
        const { email } = req.body;

        const query = `select * from users where email = "${email}"`;
        const [rows] = await connection.execute(query)
        if (rows.length === 0) {
            return res.status(404).json({
                msg: "El Usuario no existe"
            })
        }
        req.user = rows[0];
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "El Usuario no existe"
        })
    }
}

const isCategoryInDB = async (req, res, next) => {
    try {
        const { connection } = req;
        const { id_category } = req.body;
        const query = `select * from categories where id = "${id_category}";`;
        const [rows] = await connection.execute(query);
        if ((rows.length === 0)) {
            return res.status(404).json({
                msg: 'La categoria no existe'
            })
        }
        next();
    } catch (error) {
        return res.status(404).json({
            msg: "Not found"
        })
    }
}

module.exports = {
    isTaskInDB,
    isUserInDB,
    isCategoryInDB,
    isInDB
}