const jwt = require('jsonwebtoken')

const generateJWT = (userId) =>{  
    return new Promise((resolve,reject) => {

        const payload = {userId};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '1d'
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