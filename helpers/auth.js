

const isAuthorized = (req,res, object) => {
    if(object.id_user !== req.id_user){
        throw new Error("You are not authorized!");
        /*return res.status(403).json({
            msg: "You are not authorized!!"
        })*/
    }
}

module.exports = {
    isAuthorized
}