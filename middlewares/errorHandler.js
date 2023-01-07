const {validationResult} = require('express-validator');
const {ErrorResponse} = require("../ErrorResponse");

const errorHandler = (error, req, res, next) => {
    if (error instanceof ErrorResponse) {
        return res.status(400).json({
            msg: error.message,
            reasons: error.reasons
        })
    }
    // if (error instanceof ErrorAuthorization) {
    //     return res.status(404).json({
    //         msg: 'Unauthorized',
    //     })
    // }

    reportError(error);
    return res.status(500).json({
        msg: error.message,
        reasons: error.reasons
    })
}

const reportError = (error, req) => {
    console.log("error server", error, req);
}

module.exports = {
    errorHandler
}