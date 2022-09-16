const { generateJWT } = require("../helpers/generateJWT");


const login = async (req, res) => {
    const { user } = req;
    const { email, password } = req.body;

    if (user.password !== password) {
        return res.status(400).json({
            msg: "Contrasena incorrecta"
        })
    }
    try {
        const token = await generateJWT(user.id_user);
        const {id_user} = user;
        res.status(200).json({
            mst: "Logged in",
            //user.id_user,
            id_user,
            token
        })
    } catch (error) {

    }

}


module.exports = {
    login
}