const jwt = require('jsonwebtoken');

const checkJWT =  (req, res, next) => {
    const token = req.header('keyToken');
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try{
        const {id_user}=jwt.verify(token,process.env.SECRET_OR_PRIVATEKEY);
        req.id_user=id_user;
        next();
    }
    catch(err) {
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}

module.exports = {
    checkJWT
}