const { Router } = require("express")
const { getUserProfile, register, login, updateUserProfile } = require("../controllers/userController")
const verifyTokenMiddlware = require("../middlewares/verifyTokenMiddleware")
const encryptPasswordMiddleware = require("../middlewares/encryptPasswordMiddleware")

const userRouter = Router()

userRouter.get("/", verifyTokenMiddlware, getUserProfile)

userRouter.post("/register", encryptPasswordMiddleware, register)

userRouter.post("/login", login)

userRouter.patch("/", verifyTokenMiddlware, updateUserProfile)

module.exports = userRouter