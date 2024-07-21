const { compareSync } = require("bcrypt")
const User = require("../models/userModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")
const generateJWT = require("../utils/generateJWT")
const Joi = require("joi")

const getUserProfile = async(req, res) => {
    try {
        const { user_id } = req.body

        const user = await User.findById(user_id)

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan data pengguna"),
            user: User.response(user)
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

const register = async(req, res) => {
    const registerSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    const { error } = registerSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

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
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    const { error } = loginSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

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

const updateUserProfile = async(req, res) => {
    const updateUserProfileSchema = Joi.object({
        user_id: Joi.string().required(),
        bio: Joi.string()
    })

    const { error } = updateUserProfileSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { user_id, bio } = req.body

        const user = await User.update(user_id, bio)

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }

        return res.status(200).json(defaultResponse(200, true, "Berhasil memperbarui data pengguna"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getUserProfile, register, login, updateUserProfile }