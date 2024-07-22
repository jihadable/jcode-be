const { Router } = require("express")
const { getDefaultCodeByProblem } = require("../controllers/defaultCodeController")

const defaultCodeRouter = Router()

defaultCodeRouter.get("/:problem_id", getDefaultCodeByProblem)

module.exports = defaultCodeRouter