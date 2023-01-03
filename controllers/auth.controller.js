const { generateJWT } = require("../helpers/generateJWT");
const User = require("../models/User");
const {ulid} = require('ulid')

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


const postUser = async (req,res) => {
    const {email,password} = req.body;
    const id_user = ulid();
    try {
        await User.create({
            id: id_user,
            email,
            password
        });
        res.status(201).json({
            msg: "User Created"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "DB Error"
        })
    }
}

module.exports = {
    login,
    postUser
}