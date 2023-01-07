const jwt = require('jsonwebtoken')

const generateJWT = (id_user) =>{  
    return new Promise((resolve,reject) => {

        const payload = {id_user};
        jwt.sign(payload,process.env.SECRET_OR_PRIVATEKEY,{
            expiresIn: process.env.LIFE_JWT
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudeo generar el token');
            } else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}