const { compareSync } = require("bcrypt")
const User = require("../models/userModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")
const generateJWT = require("../utils/generateJWT")

const getUserProfile = async(req, res) => {
    try {
        const { user_id } = req.body

        const user = await User.findById(user_id)

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan data pengguna"),
            user
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

const register = async(req, res) => {
    try {
        let user = await User.findByEmail(req.body.email)

        if (user){
            return res.status(400).json(defaultResponse(400, false, "Email yang dimasukkan sudah terdaftar"))
        }

        user = await User.create({ ...req.body })
    
        return res.status(201).json({
            ...defaultResponse(201, true, "Pengguna berhasil registrasi"),
            token: generateJWT(user.id),
            user: User.response(user)
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findByEmail(email)

        if (!user || !compareSync(password, user.password)){
            return res.status(401).json(defaultResponse(401, false, "Email atau password salah"))
        }

        return res.status(202).json({
            ...defaultResponse(202, true, "Pengguna berhasil login"),
            token: generateJWT(user.id),
            user: User.response(user)
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getUserProfile, register, login }