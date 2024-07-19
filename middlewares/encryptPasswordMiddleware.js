const { hash } = require("bcrypt")
const serverErrorResponse = require("../utils/serverErrorResponse")

const encryptPasswordMiddleware = async (req, res, next) => {
    try {
        req.body.password = await hash(req.body.password, 10)
        
        next()
    } catch (error){
        serverErrorResponse(error, res)
    }
}

module.exports = encryptPasswordMiddleware