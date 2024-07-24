const { Router } = require("express")
const { getTestCasesByProblem } = require("../controllers/testCaseController")
const verifyTokenMiddlware = require("../middlewares/verifyTokenMiddleware")

const testCaseRouter = Router()

testCaseRouter.get("/:problem_id", verifyTokenMiddlware, getTestCasesByProblem)

module.exports = testCaseRouter