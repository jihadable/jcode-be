const { Router } = require("express")
const { getAllProblems } = require("../controllers/problemController")

const problemRouter = Router()

problemRouter.get("/", getAllProblems)

module.exports = problemRouter