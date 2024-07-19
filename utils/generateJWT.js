const { sign } = require("jsonwebtoken")

const generateJWT = (id) => {
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = generateJWT