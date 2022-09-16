

const login = (req, res) => {
    const {user} = req;
    const {email,password} = req.body;

    console.log(user.password,email,password)

    if(user.password !== password){
        return res.status(400).json({
            msg: "Contrasena incorrecta"
        })
    }
    res.status(200).json({
        mst: "Logged in"
    })

}


module.exports = {
    login
}