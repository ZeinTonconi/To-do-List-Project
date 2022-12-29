const { generateJWT } = require("../helpers/generateJWT");
const User = require("../models/User");


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where:{
                    email,
                    password
            }
        })
        if(!user){
            throw "User Not Found!";
        }
        const token = await generateJWT(user.id);
        res.status(200).json({
            msg: "Logged in",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: error
        })
    }
}


module.exports = {
    login
}