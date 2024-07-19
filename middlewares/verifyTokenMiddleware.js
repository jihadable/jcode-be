const { verify } = require("jsonwebtoken")
const User = require("../models/userModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

const verifyTokenMiddlware = async (req, res, next) => {
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }
        
        const token = authorization.split(" ")[1]
        
        const { id } = verify(token, process.env.JWT_SECRET)

        const user = await User.findById(id)

        if (!user){
            return res.status(404).json(defaultResponse(404, false, "Pengguna tidak terdaftar"))
        }

        req.body.user_id = id

        next()
    } catch (error){
        serverErrorResponse(error, res)
    }
}

module.exports = verifyTokenMiddlware